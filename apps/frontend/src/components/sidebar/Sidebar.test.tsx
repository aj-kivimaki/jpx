import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useHooksFactory } from '../../test/utils';

// Mock shared site/social data
vi.mock('@jpx/shared', () => ({
  parseRequired: (_schema: any, _json: any, name?: string) => {
    if (name === 'Social Links') return [];
    return {
      sections: [
        {
          id: 'modal',
          title: { en: 'Modal' },
          theme: { label: { en: 'Theme' } },
          language: { en: 'Language' },
        },
      ],
    };
  },
  errorIfMissing: (v: any) => v,
  warnIfMissing: (v: any) => v,
  siteJson: {},
  SiteSchema: {},
  socialJson: [],
  SocialSchema: {},
}));

// Mock hooks (useLocalized, useLocalizedArray)
vi.mock('../../hooks', () => useHooksFactory());

// Mock ModeSwitcher and LanguageSwitcher to simple placeholders
vi.mock('../theme/ModeSwitcher', () => ({
  default: () => <div data-testid="modeswitch" />,
}));
vi.mock('../language/LanguageSwitcher', () => ({
  default: () => <div data-testid="langswitch" />,
}));

import Sidebar from './Sidebar';

describe('Sidebar', () => {
  it('renders options button and modal content', () => {
    // ensure dialog methods exist in this jsdom environment, then spy on them
    if (!(window.HTMLDialogElement.prototype as any).showModal) {
      (window.HTMLDialogElement.prototype as any).showModal = function () {};
    }
    if (!(window.HTMLDialogElement.prototype as any).close) {
      (window.HTMLDialogElement.prototype as any).close = function () {};
    }
    const show = vi
      .spyOn(window.HTMLDialogElement.prototype, 'showModal')
      .mockImplementation(() => {});
    const close = vi
      .spyOn(window.HTMLDialogElement.prototype, 'close')
      .mockImplementation(() => {});

    const { container } = render(<Sidebar />);

    const optionsBtn = screen.getByRole('button', { name: /options/i });
    expect(optionsBtn).toBeInTheDocument();

    fireEvent.click(optionsBtn);
    expect(show).toHaveBeenCalled();
    const closeBtn = container.querySelector('dialog button');
    // close button exists (icon-only) — trigger close
    expect(closeBtn).toBeTruthy();
    if (closeBtn) fireEvent.click(closeBtn);
    expect(close).toHaveBeenCalled();

    show.mockRestore();
    close.mockRestore();
  });
});
