import { createClient } from '@supabase/supabase-js';
import { env, logger } from '@jpx/shared';

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  logger.warn('Supabase environment variables missing', {
    VITE_SUPABASE_URL: Boolean(supabaseUrl),
    VITE_SUPABASE_ANON_KEY: Boolean(supabaseKey),
  });
}

let _supabase;

// Resolve localStorage safely — may not be available in some environments
let safeStorage: Storage | undefined;
try {
  // Use a typed cast to avoid `any` while checking for global localStorage
  safeStorage =
    typeof globalThis !== 'undefined' && 'localStorage' in globalThis
      ? (globalThis as unknown as { localStorage?: Storage }).localStorage
      : undefined;
} catch (err) {
  logger.warn({ msg: 'Accessing global localStorage failed', err });
  safeStorage = undefined;
}

try {
  _supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      storage: safeStorage as unknown as Storage | undefined,
      autoRefreshToken: true,
      persistSession: true,
    },
  });
} catch (err) {
  logger.error({ msg: 'Failed to create Supabase client', err });
  // rethrow to let the app handle it if needed
  throw err;
}

export const supabase = _supabase;
