import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  applyThemeFactory,
  sharedSiteFactory,
  useLocalizedFactory,
} from '../../test/utils';

// Use centralized factories for mocks
vi.mock('../../utils', () => applyThemeFactory());
vi.mock('../../hooks/useLocalized', () => useLocalizedFactory());
vi.mock('@jpx/shared', () => sharedSiteFactory());
import { applyTheme as applyThemeMock } from '../../utils';

import ModeSwitcher from './ModeSwitcher';

describe('ModeSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.localStorage.setItem('theme', 'light');
  });

  it('renders next-theme label and toggles theme on click', async () => {
    render(<ModeSwitcher />);

    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    // initial theme is light => next label should be Dark
    expect(btn).toHaveTextContent('Dark');

    fireEvent.click(btn);

    // applyTheme should be called with the new theme
    expect(applyThemeMock).toHaveBeenCalledWith('dark');

    // After toggle, the next label should switch to Light
    expect(btn).toHaveTextContent('Light');
  });
});
