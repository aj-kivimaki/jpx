import { PostgrestError, SupabaseClient } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSupabaseDelete = (
  client: SupabaseClient,
  tableName: string
) => {
  const queryClient = useQueryClient();

  return useMutation<void, PostgrestError, string>({
    // The mutation function receives the gig ID to delete
    mutationFn: async (gigId: string) => {
      const { error } = await client.from(tableName).delete().eq('id', gigId);

      if (error) throw error;
    },
    onSuccess: () => {
      // Invalidate gigs query so the list updates
      queryClient.invalidateQueries({ queryKey: [tableName] });
    },
  });
};
