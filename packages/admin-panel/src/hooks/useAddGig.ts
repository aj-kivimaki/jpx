import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../clients/supabaseClient';
import type { GigForm } from 'shared';

type NewGig = Omit<GigForm, 'id'>;

export function useAddGig() {
  const queryClient = useQueryClient();

  return useMutation<GigForm[] | null, PostgrestError, NewGig>({
    mutationFn: async (newGig: NewGig) => {
      const { data, error } = await supabase.from('gigs').insert([newGig]);

      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['gigs'] }),
  });
}
