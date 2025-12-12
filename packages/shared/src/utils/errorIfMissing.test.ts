import { describe, expect, it } from 'vitest';

import { errorIfMissing } from './errorIfMissing';

describe('utils/errorIfMissing - required value guard', () => {
  it('returns the provided value when it is non-empty', () => {
    expect(errorIfMissing('ok', 'no')).toBe('ok');
  });

  it('throws an AppError when the value is undefined/null/empty', () => {
    expect(() => errorIfMissing(undefined, 'fail')).toThrow();
  });
});
