import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    env: {
      VITE_SUPABASE_URL: process.env.CYPRESS_VITE_SUPABASE_URL,
      VITE_SUPABASE_ANON_KEY: process.env.CYPRESS_VITE_SUPABASE_ANON_KEY,
    },
    baseUrl: 'http://localhost:5173',
    supportFile: './cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      // Node event listeners
    },
  },
});
