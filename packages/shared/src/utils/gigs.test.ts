import { describe, expect, it } from 'vitest';

import { parseGigDates } from './gigs';

describe('utils/gigs.parseGigDates - date/time parsing and formatting for gig records', () => {
  it('parses valid ISO date and HH:mm:ss time and returns formatted strings plus weekday', () => {
    const gig = {
      id: '00000000-0000-0000-0000-000000000000',
      date: '2025-12-12',
      time: '20:30:00',
      lineup_id: 'lineup-1',
    } as any;

    const parsed = parseGigDates(gig);
    expect(parsed.formattedDate).toBe('12.12.');
    expect(parsed.formattedTime).toBe('20:30');
    expect(parsed.weekdayAbbrev).toBeDefined();
  });

  it('returns undefined formatted fields when date/time are missing', () => {
    const gig = {
      id: '00000000-0000-0000-0000-000000000000',
      lineup_id: 'lineup-1',
    } as any;

    const parsed = parseGigDates(gig);
    expect(parsed.formattedDate).toBeUndefined();
    expect(parsed.formattedTime).toBeUndefined();
    expect(parsed.weekdayAbbrev).toBeUndefined();
  });
});
