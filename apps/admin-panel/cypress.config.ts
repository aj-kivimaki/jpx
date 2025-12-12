import { startDevServer } from '@cypress/vite-dev-server';
import { defineConfig } from 'cypress';
import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';

import viteConfig from './vite.config';

dotenvConfig({ path: resolve(__dirname, '.env.local') });

const env = {
  SUPABASE_URL: process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL ?? '',
  SUPABASE_ANON_KEY:
    process.env.VITE_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY ?? '',
  ADMIN_EMAIL:
    process.env.VITE_ADMIN_EMAIL ??
    process.env.ADMIN_EMAIL ??
    process.env.VITE_ADMIN ??
    '',
  ADMIN_PASSWORD:
    process.env.VITE_ADMIN_PASSWORD ??
    process.env.ADMIN_PASSWORD ??
    process.env.VITE_ADMIN_PW ??
    '',
};

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL ?? 'http://localhost:5174',
    supportFile: !!(process.env.CI || process.env.GITHUB_ACTIONS)
      ? false
      : './cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      on('dev-server:start', (options) =>
        startDevServer({ options, viteConfig })
      );
      return config;
    },
  },
  env,
});
