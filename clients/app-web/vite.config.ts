import ports from '@repo/config-ports';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: ports.appWeb,
  },
});
