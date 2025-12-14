import { makeClientDeleteEqSelectSingle } from '@jpx/shared/test';
import { describe, expect, it } from 'vitest';

import { deleteGig } from './deleteGig';

describe('deleteGig', () => {
  it('returns true when delete succeeded and data present', async () => {
    const uuid = '77777777-7777-4777-8777-777777777777';
    const client: any = makeClientDeleteEqSelectSingle({
      data: { id: uuid },
      error: null,
    });

    const res = await deleteGig(client, uuid);
    expect(res).toBe(true);
  });

  it('throws VALIDATION_ERROR for invalid id', async () => {
    const client: any = {};
    await expect(() => deleteGig(client, '' as any)).rejects.toThrow();
  });

  it('throws NOT_FOUND when data is null', async () => {
    const client: any = makeClientDeleteEqSelectSingle({
      data: null,
      error: null,
    });

    await expect(() =>
      deleteGig(client, '77777777-7777-4777-8777-777777777777')
    ).rejects.toThrow();
  });

  it('throws DB_ERROR when supabase returns error', async () => {
    const client: any = makeClientDeleteEqSelectSingle({
      data: null,
      error: { message: 'err' },
    });

    await expect(() =>
      deleteGig(client, '77777777-7777-4777-8777-777777777777')
    ).rejects.toThrow();
  });
});
