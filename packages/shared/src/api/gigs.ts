import type { SupabaseClient } from '@supabase/supabase-js';
import type { DbGig } from '../types';

export const fetchGigs = async (client: SupabaseClient): Promise<DbGig[]> => {
  const { data, error } = await client.from('gigs').select('*').order('date');
  if (error) throw error;
  return data ?? [];
};

export type NewGig = Omit<DbGig, 'id'>;

export const addGig = async (
  client: SupabaseClient,
  gig: NewGig
): Promise<DbGig[]> => {
  const { data, error } = await client.from('gigs').insert([gig]).select();

  if (error) throw error;
  return data ?? [];
};

export const updateGig = async (
  client: SupabaseClient,
  gig: DbGig
): Promise<DbGig[]> => {
  const { data, error } = await client
    .from('gigs')
    .update(gig)
    .eq('id', gig.id)
    .select();

  if (error) throw error;
  return data ?? [];
};

export const deleteGig = async (
  client: SupabaseClient,
  id: string
): Promise<void> => {
  const { error } = await client.from('gigs').delete().eq('id', id);
  if (error) throw error;
};
