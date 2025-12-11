import { AppError, logger, makeError } from '@jpx/shared';

import { supabase } from '../clients';
import { parsedEnv as env } from '../config/env';

type HighlightSDK = {
  init?: (opts?: unknown) => void;
  captureException?: (err: unknown, opts?: unknown) => void;
  recordIssue?: (issue: unknown) => void;
  log?: (level: string, payload?: unknown) => void;
};

let highlight: HighlightSDK | null = null;

/**
 * Initialize optional Highlight monitoring and global error handlers.
 */
export async function initMonitoring() {
  const projectId = (env as Record<string, string | undefined>)
    .VITE_HIGHLIGHT_PROJECT_ID;
  if (!projectId) return;

  try {
    const pkgName = '@highlight-run/browser';
    const mod = await import(/* @vite-ignore */ pkgName);
    const maybeDefault = mod && (mod as { default?: unknown }).default;
    highlight = (maybeDefault as HighlightSDK) ?? (mod as HighlightSDK);

    if (highlight?.init) {
      try {
        highlight.init({ projectID: projectId });
      } catch {
        try {
          highlight.init(projectId);
        } catch {
          logger.warn('Highlight init failed (init(projectId) variant)', {
            projectId,
          });
        }
      }
    }
  } catch (error) {
    logger.warn('Highlight SDK not initialized', { error, projectId });
  }

  // Global JS error handler
  globalThis.addEventListener('error', (ev) => {
    try {
      const reported = ev.error;
      if (reported instanceof Error) captureError(reported);
      else captureError(new Error(ev.message));
    } catch (error) {
      logger.error({ msg: 'Error handling window.onerror', err: error });
    }
  });

  // Global unhandled promise rejection
  globalThis.addEventListener('unhandledrejection', (ev) => {
    try {
      const reason = ev.reason;
      if (reason instanceof Error) captureError(reason);
      else
        captureError(
          new Error(String(reason ?? 'Unhandled Promise Rejection'))
        );
    } catch (error) {
      logger.error({ msg: 'Error handling unhandledrejection', err: error });
    }
  });
}

/**
 * Centralized error capture
 * - Converts any JS error into AppError
 * - Prevents duplicate logging via `__logged` marker
 * - Sends to Highlight/SDK or fallback ingestion
 */
export function captureError(err: unknown, context?: Record<string, unknown>) {
  let appErr: AppError;

  if (err instanceof AppError) {
    appErr = err;
  } else if (err instanceof Error) {
    appErr = makeError(err.message || 'Error', 'UNKNOWN', {
      stack: err.stack,
      ...context,
    });
  } else {
    const msg =
      typeof err === 'string' ? err : (JSON.stringify(err) ?? 'Unknown error');
    appErr = makeError(msg, 'UNKNOWN', context);
  }

  // Skip duplicate logging
  if (!appErr.__logged) {
    logger.error(appErr);
    appErr.__logged = true;
  }

  // Attach session info from Supabase if available
  supabase?.auth
    ?.getSession?.()
    .then((res) => {
      const session = res?.data?.session ?? null;
      sendToHighlight(appErr, { session });
    })
    .catch((err) => {
      logger.warn({
        msg: 'Failed to get Supabase session for error capture',
        err,
      });
      sendToHighlight(appErr);
    });
}

/**
 * Send error to external monitoring (Highlight or fallback ingestion)
 */
function sendToHighlight(err: AppError, extra?: Record<string, unknown>) {
  if (highlight) {
    try {
      if (typeof highlight.captureException === 'function') {
        highlight.captureException(err, {
          metadata: { code: err.code, details: err.details, ...extra },
        });
        return;
      }
      if (typeof highlight.recordIssue === 'function') {
        highlight.recordIssue({
          title: err.message,
          metadata: { code: err.code, details: err.details, ...extra },
        });
        return;
      }
      if (typeof highlight.log === 'function') {
        highlight.log('error', {
          message: err.message,
          code: err.code,
          details: err.details,
          ...extra,
        });
        return;
      }
    } catch (e) {
      logger.warn({ msg: 'Failed to send error to Highlight SDK', err: e });
    }
  }

  // Fallback: POST to ingestion URL if provided
  const url = (env as Record<string, string | undefined>)
    .VITE_CLIENT_ERROR_INGEST_URL;
  if (url) {
    try {
      void fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: err.message,
          code: err.code,
          details: err.details,
          extra,
        }),
      });
    } catch (e) {
      logger.warn({ msg: 'Failed to POST to client error ingest URL', err: e });
    }
  }
}
