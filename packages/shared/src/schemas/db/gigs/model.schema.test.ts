import { describe, expect, it } from 'vitest';

import { GigModelSchema } from './model.schema';

describe('schemas/db/gigs - GigModelSchema validation', () => {
  it('parses a valid gig model object including nullable fields', () => {
    const model = {
      id: '11111111-1111-4111-8111-111111111111',
      date: '2025-12-12',
      lineup_id: 'solo',
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
