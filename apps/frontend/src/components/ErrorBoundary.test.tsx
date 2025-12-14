import type { ReactElement } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('../clients/monitoring', () => ({ captureError: vi.fn() }));

import { captureError } from '../clients/monitoring';

import ErrorBoundary from './ErrorBoundary';

function Thrower(): ReactElement {
  throw new Error('boom');
}

describe('ErrorBoundary', () => {
  it('catches errors from children and calls captureError', () => {
    render(
      <ErrorBoundary>
        <Thrower />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeTruthy();
    expect(captureError).toHaveBeenCalled();
  });
});
