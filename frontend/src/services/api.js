import axios from 'axios';
import { API_BASE_URL } from '../utils/env.js';
import { AUTH_TOKEN_KEY as TOKEN_KEY } from '../utils/constants.js';

// Single axios instance used by every service module.
// The backend team only needs to change VITE_API_URL (see .env.example)
// for this to point at the real API.
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach the auth token (set by AuthContext after login) to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize error responses so UI components can rely on a consistent shape:
// { status, message, details }
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status ?? null;
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again.';

    if (status === 401) {
      // Session expired / not authenticated — let AuthContext react to this
      // by clearing local state; individual pages don't need to know.
      window.dispatchEvent(new CustomEvent('aquaalert:unauthorized'));
    }

    return Promise.reject({ status, message, details: error.response?.data });
  }
);

export default api;
