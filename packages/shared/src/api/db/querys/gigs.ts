import type { SupabaseClient } from '@supabase/supabase-js';
import type { DbGig, NewGig, UpdateGig } from '../../../types';

export const fetchGigs = async (client: SupabaseClient): Promise<DbGig[]> => {
  const { data, error } = await client
    .from('gigs')
    .select('*, lineup:lineup_options(name_en, name_fi)')
    .order('date');

  if (error) throw error;
  return data ?? [];
};

export const fetchGigById = async (
  client: SupabaseClient,
  id: string
): Promise<DbGig> => {
  const { data, error } = await client
    .from('gigs')
    .select('*, lineup:lineup_options(name_en, name_fi)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data ?? {};
};

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
  gig: UpdateGig
): Promise<DbGig[]> => {
  if (!gig.id) throw new Error('updateGig requires an `id` field');
  const { id, ...updateFields } = gig as unknown as { id: string } & Record<
    string,
    unknown
  >;

  const { data, error } = await client
    .from('gigs')
    .update(updateFields)
    .eq('id', id)
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
