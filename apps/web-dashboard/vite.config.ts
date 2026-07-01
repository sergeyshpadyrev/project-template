import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import ports from '@repo/config-ports'

export default defineConfig({
  plugins: [react()],
  server: {
    port: ports.webDashboard,
  },
});
