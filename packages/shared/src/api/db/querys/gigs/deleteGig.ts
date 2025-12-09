import { makeError } from '../../../../utils';
import { logDbError } from '../../../../logger';
import { GigIdSchema } from '../../../../schemas';
import type { GigId } from '../../../../types';
import type { SupabaseClient } from '@supabase/supabase-js';

export const deleteGig = async (
  client: SupabaseClient,
  id: GigId
): Promise<boolean> => {
  const safeId = GigIdSchema.safeParse(id);

  if (!safeId.success)
    throw makeError('Invalid gig ID', 'VALIDATION_ERROR', safeId.error);

  const { data, error } = await client
    .from('gigs')
    .delete()
    .eq('id', safeId.data)
    .select()
    .single();

  if (error) {
    logDbError('deleteGig', error, { id: safeId.data });
    throw makeError(error.message, 'DB_ERROR');
  }
  if (!data) throw makeError('Gig not found', 'NOT_FOUND');

  return true;
};
