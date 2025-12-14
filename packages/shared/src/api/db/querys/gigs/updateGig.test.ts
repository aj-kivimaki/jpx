import { describe, expect, it } from 'vitest';

import { makeClientUpdateEqSelectSingle } from '../../../../test';

import { updateGig } from './updateGig';

const updatedGig = {
  id: '33333333-3333-4333-8333-333333333333',
  date: '2025-12-13',
  venue: null,
  city: null,
  notes_fi: null,
  notes_en: null,
  time: null,
  lineup_id: 'duo',
};

// factory moved to shared test utils

describe('updateGig', () => {
  it('updates and returns gig when DB returns valid data', async () => {
    const client: any = makeClientUpdateEqSelectSingle({
      data: updatedGig,
      error: null,
    });

    const res = await updateGig(
      client,
      '33333333-3333-4333-8333-333333333333',
      {
        date: '2025-12-13',
        lineup_id: 'duo',
        venue: null,
        city: null,
        notes_fi: null,
        notes_en: null,
        time: null,
      } as any
    );
    expect(res).toEqual(updatedGig);
  });

  it('throws VALIDATION_ERROR for invalid id', async () => {
    // invalid id type
    const client: any = {};
    await expect(() =>
      updateGig(client, '' as any, { venue: 'x' } as any)
    ).rejects.toThrow();
  });

  it('throws NOT_FOUND when data is missing', async () => {
    const client: any = makeClientUpdateEqSelectSingle({
      data: null,
      error: null,
    });

    await expect(() =>
      updateGig(client, '00000000-0000-0000-0000-000000000002', {
        venue: 'x',
      } as any)
    ).rejects.toThrow();
  });

  it('throws DB_ERROR when supabase returns error', async () => {
    const client: any = makeClientUpdateEqSelectSingle({
      data: null,
      error: { message: 'boom' },
    });

    await expect(() =>
      updateGig(client, '00000000-0000-0000-0000-000000000002', {
        venue: 'x',
      } as any)
    ).rejects.toThrow();
  });
});
