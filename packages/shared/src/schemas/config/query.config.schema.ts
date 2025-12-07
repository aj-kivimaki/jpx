import { z } from 'zod';

const STALE_TIME_MS = 1000 * 60 * 5; // 5 minutes
const REFETCH_TIMES = 2;
const QUERY_KEYS = {
  GIGS: 'gigs',
  LINEUP_OPTIONS: 'lineup_options',
} as const;

export const QueryConfigSchema = z.object({
  STALE_TIME_MS: z.number().int().nonnegative(),
  REFETCH_TIMES: z.number().int().nonnegative(),

  KEYS: z.object({
    GIGS: z.literal(QUERY_KEYS.GIGS),
    LINEUP_OPTIONS: z.literal(QUERY_KEYS.LINEUP_OPTIONS),
  }),
});

const parsed = QueryConfigSchema.parse({
  STALE_TIME_MS,
  REFETCH_TIMES,
  KEYS: QUERY_KEYS,
});

export const {
  STALE_TIME_MS: QUERY_STALE_TIME_MS,
  REFETCH_TIMES: QUERY_REFETCH_TIMES,
  KEYS: VALIDATED_KEYS,
} = parsed;
