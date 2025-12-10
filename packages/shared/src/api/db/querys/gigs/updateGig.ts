import type { SupabaseClient } from '@supabase/supabase-js';

import { logDbError } from '../../../../logger';
import {
  GigIdSchema,
  GigModelSchema,
  GigUpdateSchema,
} from '../../../../schemas';
import type { DbGig, GigId, GigUpdate } from '../../../../types';
import { makeError } from '../../../../utils';

export const updateGig = async (
  client: SupabaseClient,
  id: GigId,
  update: GigUpdate
): Promise<DbGig> => {
  const safeId = GigIdSchema.safeParse(id);
  const parsed = GigUpdateSchema.safeParse(update);

  if (!safeId.success)
    throw makeError('Invalid gig ID', 'VALIDATION_ERROR', safeId.error);
  if (!parsed.success)
    throw makeError('Invalid gig update', 'VALIDATION_ERROR', parsed.error);

  const { data, error } = await client
    .from('gigs')
    .update(parsed.data)
    .eq('id', safeId.data)
    .select('*, lineup:lineup_options(id, name_en, name_fi)')
    .single();

  if (error) {
    logDbError('updateGig', error, {
      id: safeId.data,
      update: parsed.data,
    });
    throw makeError(error.message, 'DB_ERROR', error);
  }
  if (!data) throw makeError('Gig not found', 'NOT_FOUND');

  const output = GigModelSchema.safeParse(data);
  if (!output.success)
    throw makeError(
      'Database returned invalid gig data',
      'UNKNOWN',
      output.error
    );

  return output.data;
};
