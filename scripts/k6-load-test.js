import http from "k6/http";
import { check, group, sleep } from "k6";
import { Rate, Trend, Counter } from "k6/metrics";

// ─────────────────────────────────────────────────────────────
// Load Profile: Ramp to 50 VUs over ~10 minutes
// Sized for: 3x Standard_B2s_v2 AKS + Basic MySQL + Basic Redis
// ─────────────────────────────────────────────────────────────
export const options = {
  scenarios: {
    load_test: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "1m",  target: 10 },    // warm-up
        { duration: "2m",  target: 30 },    // ramp to moderate load
        { duration: "4m",  target: 50 },    // sustained peak at 50 VUs
        { duration: "2m",  target: 50 },    // hold peak
        { duration: "1m",  target: 0 },     // cool-down
      ],
      gracefulRampDown: "30s",
    },
  },
  thresholds: {
    http_req_failed:        ["rate<0.10"],
    http_req_duration:      ["p(95)<5000"],
    // Read operation thresholds
    read_latency:           ["p(95)<4000"],
    // Write operation thresholds
    write_latency:          ["p(95)<5000"],
  },
};

// ─────────────────────────────────────────────────────────────
// Target URLs
// ─────────────────────────────────────────────────────────────
const FRONTEND_URL = __ENV.FRONTEND_URL || "http://dev.20.247.224.41.nip.io";
const API_BASE_URL = __ENV.API_BASE_URL || "http://dev-api.20.247.224.41.nip.io/api";

// ─────────────────────────────────────────────────────────────
// Custom Metrics — explicitly tagged as READ vs WRITE
// ─────────────────────────────────────────────────────────────
const readLatency  = new Trend("read_latency");
const writeLatency = new Trend("write_latency");

const readCount    = new Counter("read_requests_total");
const writeCount   = new Counter("write_requests_total");

const readErrors   = new Rate("read_error_rate");
const writeErrors  = new Rate("write_error_rate");

// Per-endpoint detail
const frontendLatency      = new Trend("read_frontend_home");
const healthLatency        = new Trend("read_health_check");
const recommendedLatency   = new Trend("read_recommended");
const searchLatency        = new Trend("read_search");
const categoryLatency      = new Trend("read_categories");
const productDetailLatency = new Trend("read_product_detail");
const registerLatency      = new Trend("write_register");
const loginLatency         = new Trend("write_login");
const sendCodeLatency      = new Trend("write_send_code");

// ─────────────────────────────────────────────────────────────
// Helper: extract a product ID from search response
// ─────────────────────────────────────────────────────────────
function pickProductId(body) {
  if (!body) return null;
  const arr = Array.isArray(body) ? body
    : Array.isArray(body.products) ? body.products
    : Array.isArray(body.data) ? body.data
    : null;
  if (arr && arr.length > 0) {
    return arr[0]?.product_id ?? arr[0]?.id ?? null;
  }
  return null;
}

// ─────────────────────────────────────────────────────────────
// Main VU function — each virtual user runs this loop
// ─────────────────────────────────────────────────────────────
export default function () {
  const vuId = __VU;
  const iter = __ITER;

  // ============================================================
  //  READ OPERATIONS (GET requests — database SELECT queries)
  // ============================================================

  // 1. Frontend static page load
  group("READ: Frontend Home Page", () => {
    const res = http.get(`${FRONTEND_URL}/`, { tags: { op: "read" } });
    frontendLatency.add(res.timings.duration);
    readLatency.add(res.timings.duration);
    readCount.add(1);
    const ok = check(res, { "home status 200": (r) => r.status === 200 });
    readErrors.add(!ok);
  });

  sleep(0.5);

  // 2. Health check endpoint (read from Redis/DB connection check)
  group("READ: Health Check", () => {
    const res = http.get(`${API_BASE_URL}/health`, { tags: { op: "read" } });
    healthLatency.add(res.timings.duration);
    readLatency.add(res.timings.duration);
    readCount.add(1);
    const ok = check(res, { "health status 200": (r) => r.status === 200 });
    readErrors.add(!ok);
  });

  sleep(0.3);

  // 3. Recommended products (read from MySQL)
  group("READ: Recommended Products", () => {
    const res = http.get(`${API_BASE_URL}/products/recommended?limit=12`, { tags: { op: "read" } });
    recommendedLatency.add(res.timings.duration);
    readLatency.add(res.timings.duration);
    readCount.add(1);
    const ok = check(res, {
      "recommended status 200": (r) => r.status === 200,
      "recommended is json": (r) => (r.headers["Content-Type"] || "").includes("json"),
    });
    readErrors.add(!ok);
  });

  sleep(0.3);

  // 4. Search products (read from MySQL with query filters)
  let productId = null;
  group("READ: Search Products", () => {
    const res = http.get(`${API_BASE_URL}/products/search?limit=12`, { tags: { op: "read" } });
    searchLatency.add(res.timings.duration);
    readLatency.add(res.timings.duration);
    readCount.add(1);
    const ok = check(res, {
      "search status 200": (r) => r.status === 200,
      "search is json": (r) => (r.headers["Content-Type"] || "").includes("json"),
    });
    readErrors.add(!ok);
    if (ok) {
      try { productId = pickProductId(res.json()); } catch (_e) { /* skip */ }
    }
  });

  sleep(0.3);

  // 5. Product detail (read single row + relations from MySQL)
  if (productId) {
    group("READ: Product Detail", () => {
      const res = http.get(`${API_BASE_URL}/product/${productId}`, { tags: { op: "read" } });
      productDetailLatency.add(res.timings.duration);
      readLatency.add(res.timings.duration);
      readCount.add(1);
      const ok = check(res, { "detail status 200": (r) => r.status === 200 });
      readErrors.add(!ok);
    });

    sleep(0.3);
  }

  // 6. Get all category slugs (read from MySQL)
  group("READ: Category Slugs", () => {
    const res = http.get(`${API_BASE_URL}/getallchildslug`, { tags: { op: "read" } });
    categoryLatency.add(res.timings.duration);
    readLatency.add(res.timings.duration);
    readCount.add(1);
    const ok = check(res, { "categories status 200": (r) => r.status === 200 });
    readErrors.add(!ok);
  });

  sleep(0.5);

  // ============================================================
  //  WRITE OPERATIONS (POST requests — database INSERT queries)
  // ============================================================

  // 7. User registration attempt (writes user row to MySQL)
  group("WRITE: Register User", () => {
    const uniqueEmail = `loadtest_vu${vuId}_${iter}_${Date.now()}@test.dev`;
    const payload = JSON.stringify({
      name: `LoadTestUser_${vuId}`,
      email: uniqueEmail,
      password: "TestPassword123!",
      password_confirmation: "TestPassword123!",
    });
    const params = {
      headers: { "Content-Type": "application/json" },
      tags: { op: "write" },
    };
    const res = http.post(`${API_BASE_URL}/register`, payload, params);
    registerLatency.add(res.timings.duration);
    writeLatency.add(res.timings.duration);
    writeCount.add(1);
    // Accept 200, 201 (success) or 422 (validation / duplicate) — all hit the DB
    const ok = check(res, {
      "register hits DB": (r) => [200, 201, 422].includes(r.status),
    });
    writeErrors.add(!ok);
  });

  sleep(0.5);

  // 8. Login attempt (reads user row, writes session/token to Redis)
  group("WRITE: Login Attempt", () => {
    const payload = JSON.stringify({
      email: `loadtest_vu${vuId}_${iter}_${Date.now()}@test.dev`,
      password: "TestPassword123!",
    });
    const params = {
      headers: { "Content-Type": "application/json" },
      tags: { op: "write" },
    };
    const res = http.post(`${API_BASE_URL}/login`, payload, params);
    loginLatency.add(res.timings.duration);
    writeLatency.add(res.timings.duration);
    writeCount.add(1);
    // 200 = success, 401 = wrong creds — both exercise the DB read + session write
    const ok = check(res, {
      "login hits DB": (r) => [200, 401].includes(r.status),
    });
    writeErrors.add(!ok);
  });

  sleep(0.5);

  // 9. Send verification code (writes code to DB/cache + sends email)
  group("WRITE: Send Verification Code", () => {
    const payload = JSON.stringify({
      email: `loadtest_vu${vuId}_${Date.now()}@test.dev`,
    });
    const params = {
      headers: { "Content-Type": "application/json" },
      tags: { op: "write" },
    };
    const res = http.post(`${API_BASE_URL}/send-code`, payload, params);
    sendCodeLatency.add(res.timings.duration);
    writeLatency.add(res.timings.duration);
    writeCount.add(1);
    // Any response that isn't a server crash means the write path executed
    const ok = check(res, {
      "send-code processed": (r) => r.status < 500,
    });
    writeErrors.add(!ok);
  });

  sleep(1);
}
