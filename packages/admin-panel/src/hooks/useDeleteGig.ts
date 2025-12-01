import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../config/supabaseClient';

export function useDeleteGig() {
  const queryClient = useQueryClient();

  return useMutation<void, PostgrestError, string>({
    // The mutation function receives the gig ID to delete
    mutationFn: async (gigId: string) => {
      const { error } = await supabase.from('gigs').delete().eq('id', gigId);

      if (error) throw error;
    },
    onSuccess: () => {
      // Invalidate gigs query so the list updates
      queryClient.invalidateQueries({ queryKey: ['gigs'] });
    },
  });
}
