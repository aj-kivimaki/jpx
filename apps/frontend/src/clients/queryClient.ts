import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { logger, formatKey, type MutationWithKey } from '@jpx/shared';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err, query) => {
      logger.error('React Query - cache error', {
        error: err,
        queryKey: formatKey(query?.queryKey),
      });
    },
  }),

  mutationCache: new MutationCache({
    onError: (err, mutation) => {
      let mutationKey: unknown = undefined;

      // TS-safe property guard
      if (
        mutation &&
        typeof mutation === 'object' &&
        'options' in mutation &&
        mutation.options &&
        typeof mutation.options === 'object' &&
        'mutationKey' in mutation.options
      ) {
        mutationKey = (mutation as MutationWithKey).options?.mutationKey;
      }

      logger.error('React Query - mutation error', {
        error: err,
        mutationKey: formatKey(mutationKey),
      });
    },
  }),
});
