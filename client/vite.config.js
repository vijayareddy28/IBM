import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Proxy target:
//   - If VITE_BACKEND_URL is set, use it.
//   - Otherwise use the deployed Render backend (always available, no local server needed).
//   - To use local server: set VITE_BACKEND_URL=http://localhost:5000 before running dev.
const BACKEND = process.env.VITE_BACKEND_URL || 'https://ibm-backend-qwiw.onrender.com';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: BACKEND,
        changeOrigin: true,
        secure: true,
      },
      '/uploads': {
        target: BACKEND,
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
