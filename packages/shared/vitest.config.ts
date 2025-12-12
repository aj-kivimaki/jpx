import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@jpx/shared': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    reporters: ['verbose'],
    coverage: {
      provider: 'istanbul',
    },
  },
});
