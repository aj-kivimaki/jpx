import type { SupabaseClient } from '@supabase/supabase-js';
import { type DbGig, type PaginationResult } from '../../../../types';
import { GigModelSchema } from '../../../../schemas';
import { makeError } from '../../../../utils';
import { logDbError } from '../../../../logger';

// Overloads: fetch all gigs, or fetch a page of gigs
export function fetchGigs(client: SupabaseClient): Promise<DbGig[]>;
export function fetchGigs(
  client: SupabaseClient,
  page: number,
  pageSize?: number
): Promise<PaginationResult<DbGig>>;

export async function fetchGigs(
  client: SupabaseClient,
  page?: number,
  pageSize: number = 5
): Promise<DbGig[] | PaginationResult<DbGig>> {
  if (typeof page === 'number') {
    // server-side paginated fetch
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await client
      .from('gigs')
      .select('*, lineup:lineup_options(id, name_en, name_fi)', {
        count: 'exact',
      })
      .order('date')
      .range(from, to);

    if (error) {
      logDbError('fetchGigs.paginated', error, { page, pageSize });
      throw makeError(error.message, 'DB_ERROR');
    }

    const output = GigModelSchema.array().safeParse(data ?? []);
    if (!output.success)
      throw makeError('Invalid gig page data', 'UNKNOWN', output.error);

    const totalItems = typeof count === 'number' ? count : output.data.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    const result: PaginationResult<DbGig> = {
      data: output.data,
      page,
      pageSize,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };

    return result;
  }

  // fetch all gigs
  const { data, error } = await client
    .from('gigs')
    .select('*, lineup:lineup_options(id, name_en, name_fi)')
    .order('date');

  if (error) {
    logDbError('fetchGigs.list', error);
    throw makeError(error.message, 'DB_ERROR');
  }

  const output = GigModelSchema.array().safeParse(data ?? []);
  if (!output.success)
    throw makeError('Invalid gig list data', 'UNKNOWN', output.error);

  return output.data;
}
