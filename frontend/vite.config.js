import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dns from 'node:dns';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth/login': {
        target: 'http://localhost:3000',
        rewrite: (path) => path.replace(/^\/auth\/login/, '') 
      }
    }
  },
});
