import { describe, expect, it } from 'vitest';

import { formatKey } from './react-query';

describe('utils/react-query.formatKey - safe key formatting for react-query', () => {
  it('returns primitive string keys unchanged', () => {
    expect(formatKey('abc')).toBe('abc');
  });

  it('returns array keys unchanged (keeps reference)', () => {
    const arr = [1, 2];
    expect(formatKey(arr)).toBe(arr);
  });

  it('stringifies plain objects into stable string keys', () => {
    const obj = { a: 1 };
    expect(formatKey(obj)).toBe(JSON.stringify(obj));
  });

  it('returns the original value if JSON.stringify throws (circular structures)', () => {
    const a: any = {};
    a.self = a; // circular
    expect(formatKey(a)).toBe(a);
  });
});
