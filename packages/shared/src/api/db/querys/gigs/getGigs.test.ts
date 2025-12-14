import { describe, expect, it } from 'vitest';

import { makeClientOrderAsync, makeClientOrderRange } from '../../../../test';

import { fetchGigs } from './getGigs';

const sampleGigs = [
  {
    id: '88888888-8888-4888-8888-888888888888',
    date: '2025-12-01',
    lineup_id: 'solo',
    venue: null,
    city: null,
    notes_fi: null,
    notes_en: null,
    time: null,
  },
];

// factories moved to shared test utils

describe('fetchGigs', () => {
  it('returns paginated result when page provided', async () => {
    const client: any = makeClientOrderRange({
      data: sampleGigs,
      error: null,
      count: 10,
    });

    const res = await fetchGigs(client, 1, 5);
    expect((res as any).data).toEqual(sampleGigs);
    expect((res as any).totalItems).toBe(10);
  });

  it('returns list when no page provided', async () => {
    const client: any = makeClientOrderAsync({
      data: sampleGigs,
      error: null,
    }) as any;

    const res = await fetchGigs(client);
    expect(res).toEqual(sampleGigs);
  });

  it('throws DB_ERROR when error returned', async () => {
    const client: any = makeClientOrderRange({
      data: null,
      error: { message: 'boom' },
    });

    await expect(() => fetchGigs(client, 1, 5)).rejects.toThrow();
  });
});
