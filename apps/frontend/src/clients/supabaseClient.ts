import { logger } from '@jpx/shared';
import { createClient } from '@supabase/supabase-js';

import { parsedEnv } from '../config/env';

const supabaseUrl = parsedEnv.VITE_SUPABASE_URL;
const supabaseKey = parsedEnv.VITE_SUPABASE_ANON_KEY;

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
const supabase = (() => {
  try {
    return createClient(supabaseUrl, supabaseKey, {
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
})();

export { supabase };
