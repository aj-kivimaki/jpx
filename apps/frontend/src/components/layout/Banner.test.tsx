import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { bannerFactory, useHooksFactory } from '../../test/utils';

vi.mock('@jpx/shared', () => bannerFactory());
vi.mock('../../hooks', () => useHooksFactory());

import Banner from './Banner';

describe('Banner', () => {
  it('renders image, alt text and adjectives', () => {
    render(<Banner />);

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/solo.jpg');
    expect(img).toHaveAttribute('alt', 'Solo EN');

    // adjectives from the banner section
    expect(screen.getByText('fast')).toBeInTheDocument();
    expect(screen.getByText('reliable')).toBeInTheDocument();
  });
});
