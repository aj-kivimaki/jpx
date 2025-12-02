import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Map 'shared' to the src folder of the shared package
      shared: path.resolve(__dirname, '../shared/src'),
      // Map 'ui' to the src folder of the ui package
      ui: path.resolve(__dirname, '../ui/src'),
    },
  },
});
