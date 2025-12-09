import { makeError } from '../../../../utils';
import { logDbError } from '../../../../logger';
import { GigInsertSchema, GigModelSchema } from '../../../../schemas';
import { type GigInsert, type DbGig } from '../../../../types';
import type { SupabaseClient } from '@supabase/supabase-js';

export const createGig = async (
  client: SupabaseClient,
  gig: GigInsert
): Promise<DbGig> => {
  const parsed = GigInsertSchema.safeParse(gig); // validate input
  if (!parsed.success)
    throw makeError('Invalid gig input', 'VALIDATION_ERROR', parsed.error);

  const { data, error } = await client
    .from('gigs')
    .insert([parsed.data])
    .select('*, lineup:lineup_options(id, name_en, name_fi)')
    .single();

  if (error) {
    logDbError('createGig', error, { input: parsed.data });
    throw makeError(error.message, 'DB_ERROR', error);
  }

  const output = GigModelSchema.safeParse(data);
  if (!output.success)
    throw makeError(
      'Database returned invalid gig data',
      'UNKNOWN',
      output.error
    );

  return output.data;
};
