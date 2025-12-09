import { env, makeError, AppError, logger } from '@jpx/shared';
import { supabase } from '../clients';

type HighlightSDK = {
  init?: (opts?: unknown) => void;
  captureException?: (err: unknown, opts?: unknown) => void;
  recordIssue?: (issue: unknown) => void;
  log?: (level: string, payload?: unknown) => void;
};

let highlight: HighlightSDK | null = null;

export async function initMonitoring() {
  const projectId = (env as Record<string, string | undefined>)
    .VITE_HIGHLIGHT_PROJECT_ID;
  if (!projectId) return;

  try {
    const pkgName = '@highlight-run/browser';
    // Vite cannot statically analyze dynamic import variables; explicitly
    // ignore analysis for this optional runtime import so the dev server
    // doesn't warn when the SDK is not installed.
    const mod = await import(/* @vite-ignore */ pkgName);
    // highlight run exports may be default or named
    const maybeDefault = mod && (mod as { default?: unknown }).default;
    highlight = (maybeDefault as HighlightSDK) ?? (mod as HighlightSDK);
    if (highlight?.init) {
      // best-effort init; SDKs differ in option names
      try {
        highlight.init({ projectID: projectId });
      } catch {
        try {
          highlight.init(projectId);
        } catch {
          // ignore init failure but log for diagnostics
          logger.warn('Highlight init failed (init(projectId) variant)', {
            projectId,
          });
        }
      }
    }
  } catch (error) {
    // SDK not installed or failed to load — that's fine; we'll fallback
    logger.warn('Highlight SDK not initialized', { error, projectId });
  }

  // Global error handlers — normalize errors through captureError
  globalThis.addEventListener('error', (ev) => {
    try {
      // Event may contain .error (Error) or message
      const errorEvent = ev;
      const reported = errorEvent.error;
      if (reported instanceof Error) {
        captureError(reported);
      } else {
        captureError(new Error(errorEvent.message));
      }
    } catch (error) {
      logger.error({ msg: 'Error handling window.onerror', err: error });
    }
  });

  globalThis.addEventListener('unhandledrejection', (ev) => {
    try {
      const pre = ev;
      const reason = pre.reason;
      if (reason instanceof Error) {
        captureError(reason);
      } else {
        captureError(
          new Error(String(reason ?? 'Unhandled Promise Rejection'))
        );
      }
    } catch (error) {
      logger.error({ msg: 'Error handling unhandledrejection', err: error });
    }
  });
}

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
    let msg: string;

    if (err instanceof Error) {
      msg = err.message;
    } else if (typeof err === 'string') {
      msg = err;
    } else {
      try {
        msg = JSON.stringify(err) ?? 'Unknown error';
      } catch {
        msg = 'Unknown error';
      }
    }

    appErr = makeError(msg, 'UNKNOWN', context);
  }

  // Attach session info from supabase if available
  supabase?.auth
    ?.getSession?.()
    .then((res) => {
      const result = res as { data?: { session?: unknown } } | undefined;
      const session = result?.data?.session ?? null;
      sendToHighlight(appErr, { session });
    })
    .catch((err) => {
      logger.warn({
        msg: 'Failed to get supabase session for error capture',
        err,
      });
      sendToHighlight(appErr);
    });

  // Also keep local visibility
  logger.error(appErr);
}

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
    } catch (err) {
      logger.warn({
        msg: 'Failed when attempting to send error to Highlight SDK',
        err,
      });
    }
  }

  // Fallback: send to a configurable ingestion URL if provided
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
      // log fallback ingestion failures
      logger.warn({ msg: 'Failed to POST to client error ingest URL', err: e });
    }
  }
}
