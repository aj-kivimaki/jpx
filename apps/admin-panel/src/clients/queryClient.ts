import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { logger } from '@jpx/shared';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err: unknown, query) => {
      try {
        logger.error('React Query - cache error', {
          error: err,
          queryKey: query?.queryKey?.toString?.() ?? query?.queryKey,
        });
      } catch {
        logger.error('React Query - cache error', err);
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (err: unknown, mutation) => {
      try {
        logger.error('React Query - mutation error', {
          error: err,
          mutationKey: (
            mutation as unknown as { options?: { mutationKey?: unknown } }
          )?.options?.mutationKey,
        });
      } catch {
        logger.error('React Query - mutation error', err);
      }
    },
  }),
});
