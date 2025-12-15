import { formatPhoneNumber } from './formatPhoneNumber';

describe('utils/formatPhoneNumber', () => {
  it('returns short phones unchanged', () => {
    expect(formatPhoneNumber('123')).toBe('123');
    expect(formatPhoneNumber('1234')).toBe('1234');
  });

  it('formats numbers with double zero at positions 3-4 using 4- split', () => {
    expect(formatPhoneNumber('3510012345')).toBe('351-0012345');
    expect(formatPhoneNumber('0010012345')).toBe('001-0012345');
  });

  it('formats numbers without double zero at positions 3-4 using 3- split', () => {
    expect(formatPhoneNumber('3591234567')).toBe('359-1234567');
    expect(formatPhoneNumber('123456')).toBe('123-456');
  });

  it('handles exactly 5 characters properly', () => {
    expect(formatPhoneNumber('12000')).toBe('1200-0');
    expect(formatPhoneNumber('12001')).toBe('1200-1');
  });
});
