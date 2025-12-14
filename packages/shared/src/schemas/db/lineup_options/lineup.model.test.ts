import { describe, expect, it } from 'vitest';

import { LineupModelSchema } from './lineup.model';

describe('schemas/db/lineup_options - LineupModelSchema validation', () => {
  it('parses a valid lineup model object', () => {
    const model = {
      id: 'solo',
      name_en: 'Solo',
      name_fi: 'Soolo',
    };

    expect(() => LineupModelSchema.parse(model)).not.toThrow();
  });

  it('rejects a model missing required fields', () => {
    const model = { id: 'x' } as any;
    expect(() => LineupModelSchema.parse(model)).toThrow();
  });
});
