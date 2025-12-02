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
    },
  },
  resolve: {
    alias: {
      ui: path.resolve(__dirname, '../ui/src'),
      shared: path.resolve(__dirname, '../shared/src'),
    },
  },
});
