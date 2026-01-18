import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

// Tạo axios instance với config mặc định
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Request interceptor - thêm access token vào mỗi request
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Thêm refresh token vào header
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      config.headers["refresh-token"] = refreshToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - xử lý refresh token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const requestUrl = error?.config?.url || "";

    // Normalize to pathname
    const pathname = requestUrl.startsWith("http")
      ? new URL(requestUrl).pathname
      : requestUrl;

    const authApiUrls = ["/api/login", "/api/register", "/auth/callback"];

    if (
      status === 401 &&
      !authApiUrls.includes(pathname)
    ) {
      // Redirect to FRONTEND login page
      if (window.location.pathname !== "/login") {
        window.location.replace("/login");
      }
    }
    else if (status === 409) {
      window.location.replace("/");
    }
    return Promise.reject(error);
  }
);


// Hàm logout - xóa tokens và redirect
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

export const isauthenticated = async () => {
  const res = await api.get(`${API_BASE_URL}/login/`);
  if (!res.status || res.status === 409) {
    return false;
  } 
  return true;
};
export const tohomeifauthenticated = async () => {
  const result = await isauthenticated();
  if (result) {
    window.location.href = "/";
  }
}
export const ProductService = {
  // Gọi hàm getRecommendedProducts
  getRecommended: (limit = 10) => 
    api.get(`/products/recommended`, { params: { limit } }),

  // Gọi hàm getProductDetails
  getDetails: (id) => 
    api.get(`/product/${id}`),

  // Gọi hàm searchMobile (slug là 'galaxy-s24', 'galaxy-z',...)
  searchMobile: (slug, filters = {}) => 
    api.get(`/mobile/${slug}`, { params: filters }),

  // Gọi hàm searchTVAV
  searchTV: (slug, filters = {}) => 
    api.get(`/tv-av/${slug}`, { params: filters }),

  // Gọi hàm searchAll (Dùng cho thanh tìm kiếm chung)
  searchAll: (params) => 
    api.get(`/products/search`, { params })
};

export default api;
