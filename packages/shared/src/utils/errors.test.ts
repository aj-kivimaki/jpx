import { describe, expect, it } from 'vitest';

import { AppError, makeError } from './errors';

describe('utils/errors - AppError and makeError factory', () => {
  it('makeError() returns an AppError instance with the given message, code and details', () => {
    const err = makeError('msg', 'UNKNOWN', { x: 1 });
    expect(err).toBeInstanceOf(AppError);
    expect(err.message).toBe('msg');
    expect(err.code).toBe('UNKNOWN');
    expect(err.details).toEqual({ x: 1 });
  });
});
