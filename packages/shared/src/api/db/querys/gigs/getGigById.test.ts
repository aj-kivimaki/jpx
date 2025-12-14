import { describe, expect, it } from 'vitest';

import { makeClientSelectEqSingle } from '../../../../test';

import { getGigById } from './getGigById';

const validGig = {
  id: '55555555-5555-4555-8555-555555555555',
  date: '2025-12-14',
  lineup_id: 'band',
  venue: 'V',
  city: 'C',
  notes_fi: null,
  notes_en: null,
  time: null,
};

describe('getGigById', () => {
  it('returns gig when DB returns valid data', async () => {
    const client: any = makeClientSelectEqSingle({
      data: validGig,
      error: null,
    });

    const res = await getGigById(client, validGig.id);
    expect(res).toEqual(validGig);
  });

  it('throws VALIDATION_ERROR for invalid id', async () => {
    const client: any = {};
    await expect(() => getGigById(client, '' as any)).rejects.toThrow();
  });

  it('throws NOT_FOUND when no data', async () => {
    const client: any = makeClientSelectEqSingle({ data: null, error: null });

    await expect(() => getGigById(client, validGig.id)).rejects.toThrow();
  });

  it('throws DB_ERROR when supabase returns error', async () => {
    const client: any = makeClientSelectEqSingle({
      data: null,
      error: { message: 'oops' },
    });

    await expect(() => getGigById(client, validGig.id)).rejects.toThrow();
  });
});
