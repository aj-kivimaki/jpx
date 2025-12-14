import { describe, expect, it, vi } from 'vitest';

import { gigsInfiniteOptions, gigsQueryOptions } from './gigs';

// Mock the fetchGigs function imported by the module under test
vi.mock('../querys', () => ({
  fetchGigs: vi.fn(),
}));

import { VALIDATED_KEYS } from '../../../schemas';
import { fetchGigs } from '../querys';

describe('gigsQueryOptions', () => {
  it('builds a query option and calls fetchGigs', async () => {
    (fetchGigs as any).mockResolvedValueOnce([{ id: '1' }]);

    const client: any = {};
    const opts: any = gigsQueryOptions(client, 2, 10);

    expect(opts.queryKey[0]).toBe(VALIDATED_KEYS.GIGS);
    const res = await opts.queryFn();
    expect(res).toEqual([{ id: '1' }]);
    expect(fetchGigs).toHaveBeenCalledWith(client, 2, 10);
  });
});

describe('gigsInfiniteOptions', () => {
  it('uses pageParam and returns next page param when hasNextPage', async () => {
    const client: any = {};
    const opts: any = gigsInfiniteOptions(client, 5);

    (fetchGigs as any).mockResolvedValueOnce({
      page: 1,
      hasNextPage: true,
      data: [],
    });

    const res = await opts.queryFn({ pageParam: 1 } as any);
    expect(res).toEqual({ page: 1, hasNextPage: true, data: [] });
    expect(opts.getNextPageParam({ page: 1, hasNextPage: true } as any)).toBe(
      2
    );
    expect(
      opts.getNextPageParam({ page: 2, hasNextPage: false } as any)
    ).toBeUndefined();
  });
});
