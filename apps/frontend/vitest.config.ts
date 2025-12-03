import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: 'istanbul',
      reporter: ['lcov', 'text'],
      reportsDirectory: './coverage',
      all: true,
      include: ['src/**'],
    },
  },
  resolve: {
    alias: {
      '@jpx/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@jpx/shared': path.resolve(__dirname, '../../packages/shared/src'),
    },
  },
});
