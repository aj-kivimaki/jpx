import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock shared parsing and warnings
vi.mock('@jpx/shared', () => ({
  parseGigDates: (g: any) => ({
    ...g,
    formattedDate: g.formattedDate ?? '2025-12-14',
    dateTimeDate: g.dateTimeDate ?? '2025-12-14',
    weekdayAbbrev: g.weekdayAbbrev ?? 'Su',
  }),
  warnIfMissing: () => {},
}));

// Mock localization hook
vi.mock('../../hooks/useLocalized', () => ({
  default: () => (val: any) => {
    if (typeof val === 'string') return val;
    return val?.en ?? '';
  },
}));

// Mock GigCard from @jpx/ui to render identifiable DOM
vi.mock('@jpx/ui', () => ({
  GigCard: ({ id, lineup }: any) => (
    <div data-testid={`gig-${id}`}>{lineup}</div>
  ),
}));

import GigsTable from './GigsTable';

describe('GigsTable', () => {
  it('renders GigCard items with localized lineup', () => {
    const gigs = [
      {
        id: 'a',
        lineup: { name_en: 'Band EN', name_fi: 'Band FI' },
        date: '2025-12-14',
      },
      { id: 'b', lineup: { name_en: 'Other EN' }, date: '2025-12-15' },
    ];

    render(<GigsTable gigs={gigs as any} />);

    expect(screen.getByTestId('gig-a')).toHaveTextContent('Band EN');
    expect(screen.getByTestId('gig-b')).toHaveTextContent('Other EN');
  });
});
