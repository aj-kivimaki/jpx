import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { aliases, createFsAllow } from '../../config/build-config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: aliases,
  },
  server: {
    port: 5173,
    open: true,
    fs: {
      allow: createFsAllow(__dirname),
    },
  },
});
