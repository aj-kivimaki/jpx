import { makeClientWithSingle } from '@jpx/shared/test';
import { describe, expect, it } from 'vitest';

import { createGig } from './createGig';

const validGig = {
  id: '11111111-1111-4111-8111-111111111111',
  date: '2025-12-12',
  lineup_id: 'band',
  venue: 'Venue',
  city: 'City',
  notes_fi: null,
  notes_en: null,
  time: '20:30:00',
};

describe('createGig', () => {
  it('creates a gig when DB returns valid data', async () => {
    const client: any = makeClientWithSingle({ data: validGig, error: null });

    const res = await createGig(client, {
      date: '2025-12-12',
      lineup_id: 'band',
      venue: null,
      city: null,
      notes_fi: null,
      notes_en: null,
      time: null,
    } as any);

    expect(res).toEqual(validGig);
  });

  it('throws validation error for invalid input', async () => {
    const client: any = makeClientWithSingle({ data: null, error: null });
    await expect(() =>
      createGig(client, { bad: 'input' } as any)
    ).rejects.toThrow();
  });

  it('throws DB error when supabase returns error', async () => {
    const client: any = makeClientWithSingle({
      data: null,
      error: { message: 'db error' },
    });
    await expect(() =>
      createGig(client, { date: '2025-12-12', lineup_id: 'lineup-1' } as any)
    ).rejects.toThrow();
  });
});
