import { startDevServer } from '@cypress/vite-dev-server';
import { defineConfig } from 'cypress';

import viteConfig from './vite.config';

const isCI = !!(process.env.CI || process.env.GITHUB_ACTIONS);

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    supportFile: isCI ? false : './cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      on('dev-server:start', (options) =>
        startDevServer({ options, viteConfig })
      );
      return config;
    },
  },
});
