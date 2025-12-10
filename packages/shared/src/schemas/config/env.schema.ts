import { z } from 'zod';
import { makeError } from '../../utils';
import { logger } from '../../logger';

export const EnvSchema = z.object({
  VITE_SUPABASE_URL: z.string().url().describe('Supabase project URL'),
  VITE_SUPABASE_ANON_KEY: z
    .string()
    .min(1)
    .describe('Supabase anon key is required'),
});

const rawEnv = (import.meta as unknown as { env: unknown }).env as Record<
  string,
  unknown
>;

export const env = (() => {
  try {
    return EnvSchema.parse(rawEnv);
  } catch (err) {
    // Log the error details for easier debugging
    logger.error({
      msg: 'Environment variable validation failed',
      error: err,
    });

    // Wrap Zod errors in AppError for consistency
    throw makeError(
      'Invalid environment variables',
      'VALIDATION_ERROR',
      err instanceof Error
        ? { stack: err.stack, details: err }
        : { details: err }
    );
  }
})();
