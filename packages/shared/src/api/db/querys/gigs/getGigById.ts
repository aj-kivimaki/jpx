import { makeError } from '../../../../utils';
import { GigIdSchema, GigModelSchema } from '../../../../schemas';
import type { DbGig, GigId } from '../../../../types';
import type { SupabaseClient } from '@supabase/supabase-js';

export const getGigById = async (
  client: SupabaseClient,
  id: GigId
): Promise<DbGig> => {
  const safeId = GigIdSchema.safeParse(id);

  if (!safeId.success)
    throw makeError('Invalid gig ID', 'VALIDATION_ERROR', safeId.error);

  const { data, error } = await client
    .from('gigs')
    .select('*, lineup:lineup_options(id, name_en, name_fi)')
    .eq('id', safeId.data)
    .single();

  if (error) throw makeError(error.message, 'DB_ERROR');
  if (!data) throw makeError('Gig not found', 'NOT_FOUND');

  const output = GigModelSchema.safeParse(data);
  if (!output.success)
    throw makeError('Invalid gig data', 'UNKNOWN', output.error);

  return output.data;
};
