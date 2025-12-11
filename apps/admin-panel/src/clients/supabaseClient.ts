import { logger } from '@jpx/shared';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import { parsedEnv as env } from '../config/env';

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

// Detect safe localStorage
let safeStorage: Storage | undefined;

try {
  if (typeof globalThis !== 'undefined' && 'localStorage' in globalThis) {
    const globalObj = globalThis as typeof globalThis & {
      localStorage?: Storage;
    };
    safeStorage = globalObj.localStorage;
  }
} catch (err) {
  logger.warn({ msg: 'Accessing localStorage failed', err });
  safeStorage = undefined;
}

// Create Supabase client with minimal surface
let supabase: SupabaseClient;

try {
  supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      storage: safeStorage,
      autoRefreshToken: true,
      persistSession: true,
    },
  });
} catch (err) {
  logger.error({ msg: 'Failed to create Supabase client', err });
  throw err;
}

export { supabase };
