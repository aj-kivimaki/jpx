import type { SupabaseClient } from '@supabase/supabase-js';
import { makeError } from '../../utils';
import { logger } from '../../logger';

export const googleSignIn = async (client: SupabaseClient): Promise<void> => {
  const { error } = await client.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) {
    logger.warn('googleSignIn failed', {
      error,
      provider: 'google',
    });
    throw makeError('Error logging in', 'AUTH_ERROR', error);
  }
};

export const signOut = async (client: SupabaseClient): Promise<void> => {
  const { error } = await client.auth.signOut();

  if (error) {
    logger.warn('signOut failed', { error });
    throw makeError('Error signing out', 'AUTH_ERROR', error);
  }
};
