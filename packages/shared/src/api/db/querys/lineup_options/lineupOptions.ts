import type { SupabaseClient } from '@supabase/supabase-js';
import type { DbLineupOption } from '../../../../types';
import { makeError } from '../../../../utils';
import { logDbError } from '../../../../logger';
import { LineupModelSchema } from '../../../../schemas';

export const fetchLineupOptions = async (
  client: SupabaseClient
): Promise<DbLineupOption[]> => {
  const { data, error } = await client
    .from('lineup_options')
    .select('id, name_fi, name_en')
    .eq('active', true)
    .order('sort_order');

  if (error) {
    logDbError('fetchLineupOptions', error, { query: { active: true } });
    throw makeError(error.message, 'DB_ERROR', error);
  }
  if (!data) return [];

  const output = LineupModelSchema.array().safeParse(data);
  if (!output.success) {
    logDbError('fetchLineupOptions.parse', output.error);
    throw makeError('Invalid lineup options data', 'UNKNOWN', output.error);
  }

  return output.data;
};
