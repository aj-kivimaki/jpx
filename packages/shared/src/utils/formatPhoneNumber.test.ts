import { describe, expect, it } from 'vitest';

import { formatPhoneNumber } from './formatPhoneNumber';

describe('utils/formatPhoneNumber', () => {
  const cases: [string, string][] = [
    ['0501234567', '050-1234567'],
    ['0400123456', '0400-123456'],
    ['0451234567', '045-1234567'],
  ];

  it.each(cases)('formats "%s" as "%s"', (input, expected) => {
    expect(formatPhoneNumber(input)).toBe(expected);
  });
});
