import { defineConfig } from 'vitest/config';
import { aliases } from '../../config/build-config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: 'istanbul',
      reporter: ['lcov', 'text'],
      reportsDirectory: './coverage',
      all: true,
    },
    include: ['src/**'],
  },
  resolve: {
    alias: aliases,
  },
});
