import { z } from 'zod';

const queryConstants = {
  QUERY_STALE_TIME_MS: 1000 * 60 * 5, // 5 minutes
  QUERY_REFETCH_TIMES: 2,
  QUERY_KEY_GIGS: ['gigs'] as const,
};

const QueryConfigSchema = z.object({
  QUERY_STALE_TIME_MS: z
    .number()
    .int()
    .nonnegative()
    .describe('milliseconds before query is considered stale'),
  QUERY_REFETCH_TIMES: z
    .number()
    .int()
    .nonnegative()
    .describe('number of retry attempts for failed queries'),
  QUERY_KEY_GIGS: z.tuple([z.literal('gigs')]),
});

const parsed = QueryConfigSchema.parse(queryConstants);

export const QUERY_STALE_TIME_MS: number = parsed.QUERY_STALE_TIME_MS;
export const QUERY_REFETCH_TIMES: number = parsed.QUERY_REFETCH_TIMES;
export const QUERY_KEY_GIGS = parsed.QUERY_KEY_GIGS;

export type QueryConfig = z.infer<typeof QueryConfigSchema>;
