import { env, makeError, AppError } from '@jpx/shared';
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
    const mod = await import(pkgName);
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
          // ignore init failure
        }
      }
    }
  } catch (error) {
    // SDK not installed or failed to load — that's fine; we'll fallback
    console.warn('Highlight SDK not initialized', error);
  }

  // Global error handlers — normalize errors through captureError
  globalThis.addEventListener('error', (ev) => {
    try {
      // Event may contain .error (Error) or message
      const errorEvent = ev;
      const err =
        (errorEvent.error as unknown) ?? new Error(errorEvent.message);
      captureError(err);
    } catch (error) {
      console.error('Error handling window.onerror', error);
    }
  });

  globalThis.addEventListener('unhandledrejection', (ev) => {
    try {
      const pre = ev;
      const reason = pre.reason as unknown;
      captureError(reason ?? new Error('Unhandled Promise Rejection'));
    } catch (error) {
      console.error('Error handling unhandledrejection', error);
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
    .catch(() => sendToHighlight(appErr));

  // Also keep local visibility
  console.error(appErr);
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
    } catch {
      // ignore
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
    } catch {
      // ignore
    }
  }
}
