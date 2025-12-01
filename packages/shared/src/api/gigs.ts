import type { SupabaseClient } from '@supabase/supabase-js';
import type { GigForm } from '../schemas';

export const fetchGigs = async (client: SupabaseClient): Promise<GigForm[]> => {
  const { data, error } = await client.from('gigs').select('*').order('date');
  if (error) throw error;
  return data;
};

type NewGig = Omit<GigForm, 'id'>;

export const addGig = async (
  client: SupabaseClient,
  gig: NewGig
): Promise<GigForm[] | null> => {
  const { data, error } = await client.from('gigs').insert([gig]).select();

  if (error) throw error;
  return data;
};

export const updateGig = async (
  client: SupabaseClient,
  gig: GigForm
): Promise<GigForm[] | null> => {
  const { data, error } = await client
    .from('gigs')
    .update(gig)
    .eq('id', gig.id)
    .select();

  if (error) throw error;
  return data;
};

export const deleteGig = async (
  client: SupabaseClient,
  id: string
): Promise<void> => {
  const { error } = await client.from('gigs').delete().eq('id', id);
  if (error) throw error;
};
