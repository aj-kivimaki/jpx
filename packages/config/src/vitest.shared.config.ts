import type { ViteUserConfig } from 'vitest/config';

import { aliases } from './vite.shared.config.js';

export const createSharedVitestConfig = (): ViteUserConfig => ({
  test: {
    globals: true,
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html', 'lcov'],
    },
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['src/.DS_Store', 'src/**/*.d.ts'],
  },
  resolve: {
    alias: aliases,
  },
});
