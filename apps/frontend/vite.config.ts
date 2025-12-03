import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@jpx/shared': path.resolve(__dirname, '../../packages/shared/src'),
      '@jpx/ui': path.resolve(__dirname, '../../packages/ui/src'),
    },
  },
  server: {
    port: 5173,
    open: true,
    fs: {
      // Allow serving files from the app folder, the monorepo packages and repo root
      allow: [
        path.resolve(__dirname),
        path.resolve(__dirname, '../../packages'),
        path.resolve(__dirname, '../../'),
      ],
    },
  },
});
