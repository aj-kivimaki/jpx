import { AppError, makeError } from './errors';

export interface PaginationResult<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Wraps any data-fetching function to provide pagination
 * @param fetchFn Function that returns an array of items
 * @param page Page number (1-indexed)
 * @param pageSize Number of items per page
 */
export async function withPagination<T>(
  fetchFn: () => Promise<T[]>,
  page: number = 1,
  pageSize: number = 5
): Promise<PaginationResult<T>> {
  try {
    const allData = await fetchFn();

    if (!Array.isArray(allData)) {
      throw makeError('fetchFn did not return an array', 'DB_ERROR', allData);
    }

    const totalItems = allData.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    const paginatedData = allData.slice(from, to);

    return {
      data: paginatedData,
      page,
      pageSize,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw makeError('Failed to paginate data', 'UNKNOWN', err);
  }
}
