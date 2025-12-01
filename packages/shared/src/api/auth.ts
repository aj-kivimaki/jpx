import type { SupabaseClient } from '@supabase/supabase-js';

export const sendMagicLink = async (
  client: SupabaseClient,
  email: string
): Promise<void> => {
  const { error } = await client.auth.signInWithOtp({ email });

  if (error) throw error;
};

export const signOut = async (client: SupabaseClient): Promise<void> => {
  const { error } = await client.auth.signOut();
  if (error) throw error;
};
