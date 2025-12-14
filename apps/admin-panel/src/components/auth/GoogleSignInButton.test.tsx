import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('@jpx/shared', () => ({
  googleSignIn: vi.fn(),
  logger: { error: vi.fn() },
}));

vi.mock('@jpx/ui', () => ({
  Spinner: () => <div data-testid="spinner">spin</div>,
}));

import { googleSignIn } from '@jpx/shared';
import type { SupabaseClient } from '@supabase/supabase-js';

import GoogleSignInButton from './GoogleSignInButton';

test('calls googleSignIn and shows spinner while loading', async () => {
  const client = {} as unknown as SupabaseClient;
  // make the mocked googleSignIn resolve after a short delay so loading state is visible
  (googleSignIn as any).mockImplementation(
    () => new Promise((res) => setTimeout(res, 20))
  );

  render(<GoogleSignInButton client={client} />);
  const btn = screen.getByRole('button');
  fireEvent.click(btn);

  await waitFor(() => expect(googleSignIn as any).toHaveBeenCalledWith(client));
  expect(screen.getByTestId('spinner')).toBeInTheDocument();
});
