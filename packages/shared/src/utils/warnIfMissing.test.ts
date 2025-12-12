import { describe, expect, it } from 'vitest';

import { warnIfMissing } from './warnIfMissing';

describe('utils/warnIfMissing - non-fatal missing-value handler', () => {
  it('returns the value when it is present (no warning needed)', () => {
    expect(warnIfMissing('val', 'msg')).toBe('val');
  });

  it('logs a warning and returns undefined for missing/empty values', () => {
    expect(warnIfMissing(undefined, 'msg')).toBeUndefined();
  });
});
