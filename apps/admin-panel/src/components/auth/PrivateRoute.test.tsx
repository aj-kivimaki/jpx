import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('../../clients', () => ({
  supabase: {
    auth: {
      getSession: vi
        .fn()
        .mockResolvedValue({ data: { session: { user: { id: '1' } } } }),
    },
  },
}));

vi.mock('@jpx/ui', () => ({
  Spinner: () => <div data-testid="spinner" />,
}));

import PrivateRoute from './PrivateRoute';

test('renders children when user is logged in', async () => {
  render(
    <PrivateRoute>
      <div>Secret</div>
    </PrivateRoute>
  );

  await waitFor(() => expect(screen.getByText('Secret')).toBeInTheDocument());
});
