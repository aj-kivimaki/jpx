import { createSharedVitestConfig } from '@jpx/config';
import { defineConfig } from 'vitest/config';

const baseConfig = createSharedVitestConfig();

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    coverage: {
      ...baseConfig?.test?.coverage,
      reportsDirectory: '../../coverage/@jpx-ui',
    },
  },
});
