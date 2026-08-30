/**
 * Axios base instance — CarePath AI
 * The Vite proxy in vite.config.js forwards /api → http://localhost:5000
 */

import axios from 'axios';

const TOKEN_KEY = 'cp_token';

const api = axios.create({
  baseURL: '/api',
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
