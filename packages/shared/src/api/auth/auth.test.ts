import { describe, expect, it, vi } from 'vitest';

import { googleSignIn, signOut } from './auth';

describe('api/auth - Supabase auth helpers (googleSignIn, signOut)', () => {
  it('googleSignIn resolves when Supabase returns no error', async () => {
    const client: any = {
      auth: {
        signInWithOAuth: vi.fn().mockResolvedValue({ error: null }),
      },
    };

    await expect(googleSignIn(client)).resolves.toBeUndefined();
  });

  it('googleSignIn throws and logs when Supabase returns an error', async () => {
    const client: any = {
      auth: {
        signInWithOAuth: vi
          .fn()
          .mockResolvedValue({ error: { message: 'bad' } }),
      },
    };

    await expect(googleSignIn(client)).rejects.toThrow();
  });

  it('signOut resolves when Supabase returns no error', async () => {
    const client: any = {
      auth: { signOut: vi.fn().mockResolvedValue({ error: null }) },
    };
    await expect(signOut(client)).resolves.toBeUndefined();
  });

  it('signOut throws and logs when Supabase returns an error', async () => {
    const client: any = {
      auth: { signOut: vi.fn().mockResolvedValue({ error: { msg: 'x' } }) },
    };
    await expect(signOut(client)).rejects.toThrow();
  });
});
