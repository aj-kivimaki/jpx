import type { SupabaseClient } from '@supabase/supabase-js';
import type { DbLineupOption } from '../../../../types';
import { makeError } from '../../../../utils';
import { LineupModelSchema } from '../../../../schemas';

export const fetchLineupOptions = async (
  client: SupabaseClient
): Promise<DbLineupOption[]> => {
  const { data, error } = await client
    .from('lineup_options')
    .select('id, name_fi, name_en')
    .eq('active', true)
    .order('sort_order');

  if (error) throw makeError(error.message, 'DB_ERROR', error);
  if (!data) return [];

  const output = LineupModelSchema.array().safeParse(data);
  if (!output.success)
    throw makeError('Invalid lineup options data', 'UNKNOWN', output.error);

  return output.data;
};
