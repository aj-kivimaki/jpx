import { logger } from './logger';

/**
 * Standardized DB error logger.
 *
 * Logs immediately, then attempts to enrich the log with a Supabase session
 * if a global `supabase` client is available at runtime.
 *
 * @param operation - short operation name (e.g. 'createGig')
 * @param err - caught error or error payload
 * @param ctx - optional contextual metadata to include
 */
export const logDbError = (
  operation: string,
  err: unknown,
  ctx: Record<string, unknown> = {}
) => {
  // Immediate log for visibility
  logger.error({ op: operation, err, ...ctx });

  // Best-effort: if a global Supabase client exists, try to fetch session
  // and log an enriched entry. This is intentionally non-blocking.
  try {
    type MaybeSupabase = { auth?: { getSession?: () => Promise<unknown> } };
    const maybeSupabase = (
      globalThis as unknown as { supabase?: MaybeSupabase }
    ).supabase;
    const getter = maybeSupabase?.auth?.getSession;
    if (typeof getter === 'function') {
      void getter()
        .then((res: unknown) => {
          try {
            // Attach session (if present) to an additional error log
            // Keep payload small — include user id if available
            const session =
              (
                res as unknown as {
                  data?: { session?: { user?: { id?: string } } };
                }
              )?.data?.session ?? null;
            const userId = session?.user?.id ?? null;
            logger.error({
              op: operation,
              err,
              session: userId ? { id: userId } : session,
              ...ctx,
            });
          } catch (e) {
            logger.warn({
              msg: 'Failed to enrich DB error with session',
              err: e,
            });
          }
        })
        .catch((e: unknown) => {
          logger.warn({
            msg: 'Failed to get supabase session for DB error',
            err: e,
          });
        });
    }
  } catch (e) {
    // Never throw from the logger helper
    logger.warn({ msg: 'Unexpected error in logDbError enrichment', err: e });
  }
};

export default logDbError;
