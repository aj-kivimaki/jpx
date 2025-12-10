import type { Session, SupabaseClient } from '@supabase/supabase-js';

import { AppError } from '../utils';

import { logger } from './logger';

type LoggableError =
  | AppError
  | (Error & { __logged?: boolean })
  | { __logged?: boolean };

export const logDbError = async (
  operation: string,
  err: unknown,
  ctx: Record<string, unknown> = {}
) => {
  const loggableErr = err as LoggableError;

  // Skip logging if already flagged
  if (loggableErr.__logged) return;

  // Mark as logged
  try {
    loggableErr.__logged = true;
  } catch {
    // ignore failures while setting the flag
  }

  // Try to enrich with active Supabase session
  try {
    const maybeSupabase = (globalThis as { supabase?: SupabaseClient })
      ?.supabase;
    const getSession = maybeSupabase?.auth?.getSession;

    if (typeof getSession === 'function') {
      try {
        const res = await getSession();
        const session: Session | null = res?.data?.session ?? null;
        const userId = session?.user?.id ?? null;

        logger.error({
          op: operation,
          err: loggableErr,
          session: userId ? { id: userId } : session,
          ...ctx,
        });
        return;
      } catch (error) {
        logger.warn({
          msg: 'Failed to enrich DB error with Supabase session',
          err: error,
        });
      }
    }

    // No session or enrichment failed
    logger.error({ op: operation, err: loggableErr, ...ctx });
  } catch (error) {
    try {
      logger.error({ op: operation, error });
    } catch {
      // silently give up
    }
  }
};
