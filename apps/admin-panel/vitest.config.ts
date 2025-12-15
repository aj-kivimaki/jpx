import { createSharedVitestConfig } from '@jpx/config';
import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

const baseConfig = createSharedVitestConfig();

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      ...baseConfig?.test?.coverage,
      provider: 'istanbul', // explicitly here
      reportsDirectory: '../../coverage/admin-panel',
    },
  },
  resolve: {
    ...baseConfig.resolve,
    alias: {
      ...(baseConfig.resolve && baseConfig.resolve.alias),
      '@jpx/ui': resolve(__dirname, 'src/test/__mocks__/ui.tsx'),
      '@jpx/shared': resolve(__dirname, 'src/test/__mocks__/shared.ts'),
    },
  },
});
