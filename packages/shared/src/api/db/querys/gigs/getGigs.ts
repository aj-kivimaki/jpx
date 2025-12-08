import type { SupabaseClient } from '@supabase/supabase-js';
import type { DbGig } from '../../../../types';
import { GigModelSchema } from '../../../../schemas';
import { makeError } from '../../../../utils';

export const fetchGigs = async (client: SupabaseClient): Promise<DbGig[]> => {
  const { data, error } = await client
    .from('gigs')
    .select('*, lineup:lineup_options(id, name_en, name_fi)')
    .order('date');

  if (error) throw makeError(error.message, 'DB_ERROR');

  const output = GigModelSchema.array().safeParse(data);
  if (!output.success)
    throw makeError('Invalid gig list data', 'UNKNOWN', output.error);

  return output.data;
};
