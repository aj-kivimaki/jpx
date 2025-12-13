import { createClient } from '@supabase/supabase-js';

import { logger } from '../../logger';

export const createSafeStorage = () => {
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
  return safeStorage;
};

export const createSupabaseClient = (
  supabaseUrl: string,
  supabaseKey: string
) => {
  const supabase = (() => {
    try {
      return createClient(supabaseUrl, supabaseKey, {
        auth: {
          storage: createSafeStorage(),
          autoRefreshToken: true,
          persistSession: true,
        },
      });
    } catch (err) {
      logger.error({ msg: 'Failed to create Supabase client', err });
      throw err;
    }
  })();
  return supabase;
};
