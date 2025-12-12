import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { parseOptional, parseOptionalArray, parseRequired } from './validator';

describe('utils/validator - parsing helpers using zod schemas', () => {
  it('parseRequired() returns the parsed value for valid input', () => {
    const schema = z.string();
    expect(parseRequired(schema, 'ok', 'name')).toBe('ok');
  });

  it('parseRequired() throws a descriptive Error for invalid input', () => {
    const schema = z.string();
    expect(() => parseRequired(schema, 123, 'name')).toThrow();
  });

  it('parseOptional() returns undefined instead of throwing for invalid input', () => {
    const schema = z.string();
    expect(parseOptional(schema, 123, 'msg')).toBeUndefined();
  });

  it('parseOptionalArray() validates each item and filters out invalid entries', () => {
    const schema = z.string();
    const arr = ['a', 2, 'b'];
    const res = parseOptionalArray(schema, arr, 'msg');
    expect(res).toEqual(['a', 'b']);
  });
});
