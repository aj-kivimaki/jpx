import type { SupabaseClient } from '@supabase/supabase-js';

import { logDbError } from '../../../../logger';
import { GigModelSchema } from '../../../../schemas';
import { type DbGig, type PaginationResult } from '../../../../types';
import { makeError } from '../../../../utils';

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
  try {
    if (typeof page === 'number') {
      // Paginated fetch
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
        throw makeError(error.message, 'DB_ERROR', error);
      }

      const parsed = GigModelSchema.array().safeParse(data ?? []);
      if (!parsed.success) {
        throw makeError(
          'Invalid gig page data',
          'VALIDATION_ERROR',
          parsed.error
        );
      }

      const totalItems = typeof count === 'number' ? count : parsed.data.length;
      const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

      return {
        data: parsed.data,
        page,
        pageSize,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      };
    }

    // fetch all gigs
    const { data, error } = await client
      .from('gigs')
      .select('*, lineup:lineup_options(id, name_en, name_fi)')
      .order('date');

    if (error) {
      logDbError('fetchGigs.list', error);
      throw makeError(error.message, 'DB_ERROR', error);
    }

    const parsed = GigModelSchema.array().safeParse(data ?? []);
    if (!parsed.success)
      throw makeError('Invalid gig list data', 'UNKNOWN', parsed.error);

    return parsed.data;
  } catch (err: unknown) {
    // Ensure all errors are logged centrally
    logDbError('fetchGigs.unknown', err);
    throw err instanceof Error
      ? err
      : makeError('Unknown error fetching gigs', 'UNKNOWN', err);
  }
}
