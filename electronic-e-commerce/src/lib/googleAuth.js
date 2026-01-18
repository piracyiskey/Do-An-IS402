// src/lib/googleAuth.js
import api from "./api";

const CONFIG = {
  // Cần đảm bảo các biến môi trường này đã được khai báo và có giá trị
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI, // e.g. https://yourapp.netlify.app/auth/callback
  backendUrl: import.meta.env.VITE_BACKEND_API_URL,     // e.g. https://api.yourapp.com/api
  scope: 'openid email profile',
};

// Base64URL encode (RFC 7636)
const base64url = (buffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

// Generate PKCE pair
export const generatePKCE = async () => {
  const verifierBytes = crypto.getRandomValues(new Uint8Array(32));
  const verifier = base64url(verifierBytes); // 43+ chars

  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const challenge = base64url(hash);

  return { verifier, challenge };
};

// Start Google login (Chuyển hướng người dùng đến trang đăng nhập Google)
export const loginWithGoogle = async () => {
  const { verifier, challenge } = await generatePKCE();
  const state = base64url(crypto.getRandomValues(new Uint8Array(16)));

  // Store in sessionStorage (cleared after use)
  sessionStorage.setItem('pkce_verifier', verifier);
  sessionStorage.setItem('pkce_state', state);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CONFIG.clientId,
    redirect_uri: CONFIG.redirectUri,
    scope: CONFIG.scope,
    state,
    code_challenge: challenge,
    code_challenge_method: 'S256', // Sử dụng SHA256 cho challenge
  });

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  window.location.href = authUrl; // **Thực hiện chuyển hướng**
};

// Handle Google callback (Xử lý phản hồi từ Google sau khi đăng nhập)
export const handleGoogleCallback = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const state = urlParams.get('state');
  const error = urlParams.get('error');

  if (error) {
    throw new Error(`Google Error: ${error}`);
  }

  if (!code || !state) {
    throw new Error('Missing code or state');
  }

  const storedState = sessionStorage.getItem('pkce_state');
  const verifier = sessionStorage.getItem('pkce_verifier');

  if (state !== storedState) {
    throw new Error('State mismatch — possible CSRF');
  }

  if (!verifier) {
    throw new Error('PKCE verifier missing');
  }

  // Send to Laravel backend để đổi code lấy access token
  const response = await api.post(`${CONFIG.backendUrl}/auth/google/exchange`, {
      code: code,
      verifier: verifier,
  });


  if (!response.data.success) {
    throw new Error(response.data.error || 'Token exchange failed');
  }

  return response; // { success: true, access_token, refresh_token }
};