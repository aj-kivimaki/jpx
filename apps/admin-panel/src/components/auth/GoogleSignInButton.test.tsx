import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
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

  // controllable promise so we can resolve it before test exit
  let resolver: (() => void) | null = null;
  const p = new Promise<void>((res) => {
    resolver = res;
  });
  (googleSignIn as any).mockImplementation(() => p);

  render(<GoogleSignInButton client={client} />);
  const btn = screen.getByRole('button');

  await act(async () => {
    fireEvent.click(btn);
    await waitFor(() =>
      expect(googleSignIn as any).toHaveBeenCalledWith(client)
    );
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    // resolve the mocked sign-in and await it so no state updates run before act finishes
    resolver!();
    await p;
  });
});
