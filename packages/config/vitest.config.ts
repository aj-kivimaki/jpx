import { defineConfig } from 'vitest/config';

import { createSharedVitestConfig } from './src';

const baseConfig = createSharedVitestConfig();

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    coverage: {
      ...baseConfig?.test?.coverage,
      reportsDirectory: '../../coverage/@jpx-config',
    },
  },
});
