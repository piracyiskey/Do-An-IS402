import http from "k6/http";
import { check, group, sleep } from "k6";
import { Rate, Trend } from "k6/metrics";

export const options = {
  scenarios: {
    user_journey: {
      executor: "ramping-vus",
      startVUs: 1,
      stages: [
        { duration: "30s", target: 5 },
        { duration: "1m", target: 20 },
        { duration: "1m", target: 40 },
        { duration: "30s", target: 0 },
      ],
      gracefulRampDown: "20s",
    },
  },
  thresholds: {
    http_req_failed: ["rate<0.02"],
    http_req_duration: ["p(95)<1200", "p(99)<2000"],
    journey_failure_rate: ["rate<0.05"],
    frontend_home_latency: ["p(95)<1500"],
    api_recommended_latency: ["p(95)<1200"],
    api_search_latency: ["p(95)<1200"],
    api_detail_latency: ["p(95)<1200"],
  },
};

const FRONTEND_URL = __ENV.FRONTEND_URL || "http://dev.20.247.224.41.nip.io";
const API_BASE_URL = __ENV.API_BASE_URL || "http://dev-api.20.247.224.41.nip.io/api";

const journeyFailureRate = new Rate("journey_failure_rate");
const frontendHomeLatency = new Trend("frontend_home_latency");
const apiRecommendedLatency = new Trend("api_recommended_latency");
const apiSearchLatency = new Trend("api_search_latency");
const apiDetailLatency = new Trend("api_detail_latency");

function pickProductId(searchBody) {
  if (!searchBody) return null;

  if (Array.isArray(searchBody) && searchBody.length > 0) {
    return searchBody[0]?.product_id ?? searchBody[0]?.id ?? null;
  }

  if (Array.isArray(searchBody.products) && searchBody.products.length > 0) {
    return (
      searchBody.products[0]?.product_id ??
      searchBody.products[0]?.id ??
      null
    );
  }

  if (Array.isArray(searchBody.data) && searchBody.data.length > 0) {
    return searchBody.data[0]?.product_id ?? searchBody.data[0]?.id ?? null;
  }

  return null;
}

export default function () {
  let journeyFailed = false;

  group("01_home_page", () => {
    const res = http.get(`${FRONTEND_URL}/`);
    frontendHomeLatency.add(res.timings.duration);

    const ok = check(res, {
      "home status 200": (r) => r.status === 200,
    });
    if (!ok) journeyFailed = true;
  });

  group("02_recommended_products", () => {
    const res = http.get(`${API_BASE_URL}/products/recommended?limit=12`);
    apiRecommendedLatency.add(res.timings.duration);

    const ok = check(res, {
      "recommended status 200": (r) => r.status === 200,
      "recommended json": (r) =>
        (r.headers["Content-Type"] || "").toLowerCase().includes("application/json"),
    });
    if (!ok) journeyFailed = true;
  });

  let productId = null;

  group("03_search_products", () => {
    const res = http.get(`${API_BASE_URL}/products/search?limit=12`);
    apiSearchLatency.add(res.timings.duration);

    const ok = check(res, {
      "search status 200": (r) => r.status === 200,
      "search json": (r) =>
        (r.headers["Content-Type"] || "").toLowerCase().includes("application/json"),
    });
    if (!ok) {
      journeyFailed = true;
      return;
    }

    let body = null;
    try {
      body = res.json();
    } catch (_e) {
      journeyFailed = true;
      return;
    }

    productId = pickProductId(body);
  });

  group("04_product_detail", () => {
    if (!productId) {
      return;
    }

    const res = http.get(`${API_BASE_URL}/product/${productId}`);
    apiDetailLatency.add(res.timings.duration);

    const ok = check(res, {
      "detail status 200": (r) => r.status === 200,
      "detail json": (r) =>
        (r.headers["Content-Type"] || "").toLowerCase().includes("application/json"),
    });
    if (!ok) journeyFailed = true;
  });

  journeyFailureRate.add(journeyFailed);
  sleep(1);
}
