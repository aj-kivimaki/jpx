import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { PostgrestError, SupabaseClient } from '@supabase/supabase-js';

/**
 * Generic hook to insert rows into a Supabase table using react-query.
 *
 * TRow: the type of the row stored in the table (result returned by Supabase)
 * TVariables: the shape of the payload passed to `mutate` (defaults to Partial<TRow>)
 */

export const useSupabaseAdd = <TRow = unknown, TVariables = Partial<TRow>>(
  client: SupabaseClient,
  tableName: string
) => {
  const queryClient = useQueryClient();

  return useMutation<TRow[] | null, PostgrestError, TVariables>({
    mutationFn: async (payload: TVariables) => {
      const { data, error } = await client
        .from(tableName)
        .insert([payload as unknown]);

      if (error) throw error;
      return data as TRow[] | null;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [tableName] }),
  });
};
