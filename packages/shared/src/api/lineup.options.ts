import type { SupabaseClient } from '@supabase/supabase-js';
import type { DbLineupOption } from '../types/config/lineup.options';

export const fetchLineupOptions = async (
  client: SupabaseClient
): Promise<DbLineupOption[]> => {
  const { data, error } = await client
    .from('lineup_options')
    .select('id, name_fi, name_en')
    .eq('active', true)
    .order('sort_order');

  if (error) throw error;
  return (data ?? []) as DbLineupOption[];
};
