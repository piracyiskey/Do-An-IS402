const rawApiBaseUrl = import.meta.env.VITE_BACKEND_API_URL || "";

const normalizedApiBaseUrl = rawApiBaseUrl.replace(/\/$/, "");

export const API_BASE_URL = normalizedApiBaseUrl;
export const BACKEND_BASE_URL = normalizedApiBaseUrl.replace(/\/api$/, "");

export const buildApiUrl = (path = "") => {
  if (!API_BASE_URL) {
    return path;
  }

  if (!path) {
    return API_BASE_URL;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

export const buildImageUrl = (imagePath = "") => {
  if (!imagePath) {
    return "";
  }

  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  if (!BACKEND_BASE_URL) {
    return imagePath;
  }

  const normalizedImagePath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${BACKEND_BASE_URL}${normalizedImagePath}`;
};