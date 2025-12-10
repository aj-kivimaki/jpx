import { logger } from './logger';
import type { SupabaseClient, Session } from '@supabase/supabase-js';

/**
 * Logs a database-related error with optional contextual metadata.
 *
 * Performs an immediate log of the error and context, then attempts to enrich
 * the log with the current Supabase user session if a global `supabase` client
 * is available. Enrichment is non-blocking and will not throw.
 *
 * @param operation - Short identifier for the operation where the error occurred (e.g., 'createGig').
 * @param err - The caught error object or error payload.
 * @param ctx - Optional additional metadata to include in the log (e.g., page number, input data).
 */
export const logDbError = async (
  operation: string,
  err: unknown,
  ctx: Record<string, unknown> = {}
) => {
  // Immediate log
  logger.error({ op: operation, err, ...ctx });

  try {
    const maybeSupabase = (globalThis as { supabase?: SupabaseClient })
      ?.supabase;
    const getSession = maybeSupabase?.auth?.getSession;

    if (typeof getSession !== 'function') return;

    const res = await getSession();
    const session: Session | null = res?.data?.session ?? null;
    const userId = session?.user?.id ?? null;

    logger.error({
      op: operation,
      err,
      session: userId ? { id: userId } : session,
      ...ctx,
    });
  } catch (sessionErr) {
    logger.warn({
      msg: 'Failed to enrich DB error with Supabase session',
      err: sessionErr,
    });
  }
};

export default logDbError;
