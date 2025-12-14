import { describe, expect, it } from 'vitest';

import { makeClientEqOrder } from '../../../../test';

import { fetchLineupOptions } from './lineupOptions';

describe('fetchLineupOptions', () => {
  it('returns parsed lineup options when data valid', async () => {
    const client: any = makeClientEqOrder({
      data: [
        {
          id: '11111111-1111-4111-8111-111111111111',
          name_fi: 'A',
          name_en: 'A',
        },
      ],
      error: null,
    });

    const res = await fetchLineupOptions(client);
    expect(res).toEqual([
      {
        id: '11111111-1111-4111-8111-111111111111',
        name_fi: 'A',
        name_en: 'A',
      },
    ]);
  });

  it('returns empty array when data is null', async () => {
    const client: any = makeClientEqOrder({ data: null, error: null });

    const res = await fetchLineupOptions(client);
    expect(res).toEqual([]);
  });

  it('throws DB_ERROR when supabase returns error', async () => {
    const client: any = makeClientEqOrder({
      data: null,
      error: { message: 'boom' },
    });

    await expect(() => fetchLineupOptions(client)).rejects.toThrow();
  });
});
