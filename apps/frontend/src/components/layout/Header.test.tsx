import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock shared data
vi.mock('@jpx/shared', () => ({
  SiteSchema: {},
  siteJson: {},
  NavSchema: {},
  navJson: {},
  UISchema: {},
  uiJson: {},
  parseRequired: (_schema: any, _json: any, name?: string) => {
    if (name === 'Site')
      return {
        layout: { header: { title: { en: 'My Site' } } },
        logos: [{ id: 'jpx', src: '/jpx.png', alt: { en: 'JPX Logo' } }],
      };
    if (name === 'Nav') return [{ id: 'home', label: 'Home' }];
    if (name === 'UI')
      return { mobileMenuOpenIcon: 'open', mobileMenuClosedIcon: 'closed' };
    return {};
  },
  errorIfMissing: (v: any) => v,
  warnIfMissing: (v: any) => v,
  sectionIds: { top: 'top' },
}));

// Mock hooks
vi.mock('../../hooks/useLocalized', () => ({
  default: () => (val: any) =>
    typeof val === 'string' ? val : (val?.en ?? ''),
}));
vi.mock('../../hooks/useScrolling', () => ({ default: () => false }));

import Header from './Header';

describe('Header', () => {
  it('renders logo and title and scrolls to top on title click', () => {
    // prepare target element
    const target = document.createElement('div');
    target.id = 'top';
    document.body.appendChild(target);
    target.scrollIntoView = vi.fn();

    render(<Header />);

    const titleBtn = screen.getByRole('button', { name: /My Site/i });
    expect(titleBtn).toBeInTheDocument();

    fireEvent.click(titleBtn);
    expect(target.scrollIntoView).toHaveBeenCalled();
  });
});
