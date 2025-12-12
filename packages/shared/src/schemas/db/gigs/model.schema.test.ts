import { describe, expect, it } from 'vitest';

import { GigModelSchema } from './model.schema';

describe('schemas/db/gigs - GigModelSchema validation', () => {
  it('parses a valid gig model object including nullable fields', () => {
    const model = {
      id: '00000000-0000-0000-0000-000000000000',
      date: '2025-12-12',
      lineup_id: 'lineup-1',
      venue: null,
      city: null,
      notes_fi: null,
      notes_en: null,
      time: null,
    };
    expect(() => GigModelSchema.parse(model)).not.toThrow();
  });

  it('rejects a model missing required `id`', () => {
    const model = {
      date: '2025-12-12',
      lineup_id: 'lineup-1',
    } as any;

    expect(() => GigModelSchema.parse(model)).toThrow();
  });
});
