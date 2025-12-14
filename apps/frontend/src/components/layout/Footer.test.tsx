import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@jpx/shared', () => ({
  SiteSchema: {},
  siteJson: {},
  ContactSchema: {},
  contactJson: {},
  parseRequired: (_schema: any, _json: any, name?: string) => {
    if (name === 'Site')
      return {
        logos: [{ id: 'stagent', src: '/stagent.png', alt: { en: 'Stagent' } }],
        layout: { footer: { title: { en: 'Contact' } } },
      };
    if (name === 'Contact')
      return { name: 'John Doe', phone: '123', email: 'a@b.c' };
    return {};
  },
  errorIfMissing: (v: any) => v,
  warnIfMissing: (v: any) => v,
  sectionIds: { contact: 'contact' },
}));

vi.mock('../../hooks/useLocalized', () => ({
  default: () => (v: any) => (typeof v === 'string' ? v : (v?.en ?? '')),
}));

import Footer from './Footer';

describe('Footer', () => {
  it('renders contact info and stagent logo', () => {
    render(<Footer />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/stagent.png');

    expect(screen.getByText('Contact:')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('a@b.c')).toBeInTheDocument();
  });
});
