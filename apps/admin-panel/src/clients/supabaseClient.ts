import { createSupabaseClient } from '@jpx/shared';

import { parsedEnv } from '../config/env';

export const supabase = createSupabaseClient(
  parsedEnv.VITE_SUPABASE_URL,
  parsedEnv.VITE_SUPABASE_ANON_KEY
);
