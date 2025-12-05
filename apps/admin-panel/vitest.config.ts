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
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['src/.DS_Store', 'src/**/*.d.ts'],
  },
  resolve: {
    alias: aliases,
  },
});
