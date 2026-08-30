/**
 * Axios base instance — CarePath AI
 *
 * In development: Vite proxy forwards /api → deployed backend (Render).
 * In production build: VITE_API_URL sets the absolute base URL directly,
 *   falling back to the Render backend URL if the env variable is not set.
 */

import axios from 'axios';

const TOKEN_KEY = 'cp_token';

// Use the deployed backend URL in production; keep /api (proxied) in dev.
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? '/api' : 'https://ibm-8o9e.onrender.com/api');

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor — attach JWT from localStorage ────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor — handle 401 globally ────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear stale token and broadcast so AuthContext can reset user state immediately
      localStorage.removeItem(TOKEN_KEY);
      window.dispatchEvent(new Event('carepath:auth:expired'));
    }
    return Promise.reject(error);
  }
);

export default api;
