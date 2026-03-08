// src/lib/googleAuth.js
import api from "./api";

const CONFIG = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
  backendUrl: import.meta.env.VITE_BACKEND_API_URL,
  scope: 'openid email profile',
};

// Generate random state for CSRF protection
const generateState = () => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Start Google login
export const loginWithGoogle = async () => {
  const state = generateState();

  // Store state in sessionStorage for verification
  sessionStorage.setItem('oauth_state', state);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CONFIG.clientId,
    redirect_uri: CONFIG.redirectUri,
    scope: CONFIG.scope,
    state,
    access_type: 'offline',
    prompt: 'consent',
  });

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  window.location.href = authUrl;
};

// Handle Google callback
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

  const storedState = sessionStorage.getItem('oauth_state');

  if (state !== storedState) {
    throw new Error('State mismatch — possible CSRF attack');
  }

  // Send to Laravel backend to exchange code for tokens
  const response = await api.post(`${CONFIG.backendUrl}/auth/google/exchange`, {
    code: code,
  });

  if (!response.data.success) {
    throw new Error(response.data.error || 'Token exchange failed');
  }

  return response;
};