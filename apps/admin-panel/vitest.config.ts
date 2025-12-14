import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    globals: true,
    include: ['src/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@jpx/ui': resolve(__dirname, 'src/test/__mocks__/ui.tsx'),
      '@jpx/shared': resolve(__dirname, 'src/test/__mocks__/shared.ts'),
    },
  },
});
// (kept local config for admin-panel)
