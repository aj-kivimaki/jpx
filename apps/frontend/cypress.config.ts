import { defineConfig } from 'cypress';

const isCI = !!(process.env.CI || process.env.GITHUB_ACTIONS);

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    supportFile: isCI ? false : './cypress/support/e2e.ts',
  },
});
