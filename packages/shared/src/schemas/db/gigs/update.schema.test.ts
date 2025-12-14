import { describe, expect, it } from 'vitest';

import { GigUpdateSchema } from './update.schema';

describe('schemas/db/gigs - GigUpdateSchema validation', () => {
  it('parses valid update payload and converts empty strings to null', () => {
    const payload = {
      date: '2025-12-16',
      venue: '',
      city: '',
      notes_fi: '',
      notes_en: '',
      time: '',
      lineup_id: 'duo',
    } as any;

    const parsed = GigUpdateSchema.parse(payload);
    expect(parsed.date).toBe('2025-12-16');
    expect(parsed.venue).toBeNull();
    expect(parsed.city).toBeNull();
    expect(parsed.notes_fi).toBeNull();
    expect(parsed.notes_en).toBeNull();
    expect(parsed.time).toBeNull();
  });

  it('throws when lineup_id is missing or empty', () => {
    const payload = { date: '2025-12-16' } as any;
    expect(() => GigUpdateSchema.parse(payload)).toThrow();
  });
});
