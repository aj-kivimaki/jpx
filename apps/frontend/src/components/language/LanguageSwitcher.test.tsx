import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  changeLanguageMock,
  reactI18nextFactoryWithSharedMock,
  uiFactory,
} from '../../test/utils';

// Use centralized factories for mocks
vi.mock('@jpx/shared', () => uiFactory());
vi.mock('react-i18next', () => reactI18nextFactoryWithSharedMock('fi'));

import LanguageSwitcher from './LanguageSwitcher';

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows button label for current language and toggles on click', () => {
    render(<LanguageSwitcher />);

    const btn = screen.getByRole('button', { name: /toggle language/i });
    expect(btn).toBeInTheDocument();
    // language is 'fi' -> button should show english label
    expect(btn).toHaveTextContent('English');

    fireEvent.click(btn);

    expect(changeLanguageMock).toHaveBeenCalledWith('en');
  });
});
