import { describe, it, expect } from 'vitest';
import formatText from './formatText';

describe('formatText', () => {
  it('trims and collapses spaces', () => {
    expect(formatText('  Hello   world  ')).toBe('Hello world');
  });

  it('replaces newlines and tabs with single spaces', () => {
    expect(formatText('Line1\nLine2\t  Line3')).toBe('Line1 Line2 Line3');
  });

  it('returns empty string for null/undefined', () => {
    expect(formatText(null)).toBe('');
    expect(formatText(undefined)).toBe('');
  });

  it('coerces non-string inputs', () => {
    expect(formatText(123)).toBe('123');
    expect(formatText(true)).toBe('true');
    expect(formatText({ toString: () => 'x  y' })).toBe('x y');
  });

  it('handles only-whitespace input', () => {
    expect(formatText('    ')).toBe('');
    expect(formatText('\n\t')).toBe('');
  });
});
