import { describe, expect, it } from 'vitest';

import { GigInsertSchema } from './insert.schema';

describe('schemas/db/gigs - GigInsertSchema validation', () => {
  it('parses valid insert payload and converts empty strings to null', () => {
    const payload = {
      date: '2025-12-15',
      venue: '',
      city: '',
      notes_fi: '',
      notes_en: '',
      time: '',
      lineup_id: 'band',
    } as any;

    const parsed = GigInsertSchema.parse(payload);
    expect(parsed.date).toBe('2025-12-15');
    expect(parsed.venue).toBeNull();
    expect(parsed.city).toBeNull();
    expect(parsed.notes_fi).toBeNull();
    expect(parsed.notes_en).toBeNull();
    expect(parsed.time).toBeNull();
  });

  it('throws when required fields are missing', () => {
    const payload = { venue: 'x' } as any;
    expect(() => GigInsertSchema.parse(payload)).toThrow();
  });
});
