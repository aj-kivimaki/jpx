import { makeError } from '../../../../utils';
import { logDbError } from '../../../../logger';
import { GigIdSchema, GigModelSchema } from '../../../../schemas';
import type { DbGig, GigId } from '../../../../types';
import type { SupabaseClient } from '@supabase/supabase-js';

export const getGigById = async (
  client: SupabaseClient,
  id: GigId
): Promise<DbGig> => {
  const safeId = GigIdSchema.safeParse(id);
  if (!safeId.success) {
    // only throw, no separate log
    throw makeError('Invalid gig ID', 'VALIDATION_ERROR', safeId.error);
  }

  const { data, error } = await client
    .from('gigs')
    .select('*, lineup:lineup_options(id, name_en, name_fi)')
    .eq('id', safeId.data)
    .single();

  if (error) {
    logDbError('getGigById', error, { id: safeId.data });
    throw makeError(error.message, 'DB_ERROR', error);
  }
  if (!data) {
    throw makeError('Gig not found', 'NOT_FOUND');
  }

  const output = GigModelSchema.safeParse(data);
  if (!output.success) {
    logDbError('getGigById.parse', output.error, { id: safeId.data });
    throw makeError('Invalid gig data', 'UNKNOWN', output.error);
  }

  return output.data;
};
