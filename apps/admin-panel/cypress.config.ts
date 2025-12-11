import { defineConfig } from 'cypress';
import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';

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
    supportFile: './cypress/support/e2e.ts',
  },
  env,
});
