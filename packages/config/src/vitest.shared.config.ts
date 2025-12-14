import { defineConfig } from 'vitest/config';

import { aliases } from './vite.shared.config.js';

export const createSharedVitestConfig = () =>
  defineConfig({
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
