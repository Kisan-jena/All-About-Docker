import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // same as 0.0.0.0
    port: 5173,
    watch: {
      usePolling: true, // ensures hot reload works with mounted volumes
    },
  },
});
