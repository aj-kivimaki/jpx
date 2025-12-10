import { AppError, logger } from '@jpx/shared';
import type { UseFormSetError, Path } from 'react-hook-form';

type ZodIssue = {
  path?: Array<string | number>;
  message?: string;
};

type ZodErrorLike = {
  issues?: ZodIssue[];
};

/**
 * Maps AppError to form field errors or shows toast messages
 * @returns true if the error was handled, false otherwise
 */
export function mapAppErrorToFormErrors<
  TFormValues extends Record<string, unknown>,
>(
  error: unknown,
  setError?: UseFormSetError<TFormValues>,
  toast?: (message: string) => void
): boolean {
  if (!(error instanceof AppError)) return false;

  const { code, details, message } = error;

  switch (code) {
    case 'VALIDATION_ERROR':
      logger.warn('Server validation error', details);
      handleValidationError(
        details as ZodErrorLike | undefined,
        setError,
        toast
      );
      return true;

    case 'NOT_FOUND':
      toast?.('Pyydetty resurssi ei löytynyt');
      return true;

    default:
      toast?.(message || 'Palvelinvirhe');
      logger.error('AppError handled', error as AppError);
      return true;
  }
}

/* ------------------ Helpers ------------------ */

/**
 * Maps server validation issues to react-hook-form field errors
 */
function handleValidationError<TFormValues extends Record<string, unknown>>(
  details: ZodErrorLike | undefined,
  setError?: UseFormSetError<TFormValues>,
  toast?: (message: string) => void
) {
  const issues = details?.issues ?? [];

  if (!issues.length || typeof setError !== 'function') {
    toast?.('Virheellinen pyyntö. Tarkista syötteet.');
    return;
  }

  for (const issue of issues) {
    const field =
      Array.isArray(issue.path) && issue.path.length
        ? (String(issue.path[0]) as Path<TFormValues>)
        : null;

    if (!field) continue;

    setError(field, {
      type: 'server',
      message: issue.message,
    });
  }

  toast?.('Ole hyvä ja korjaa lomakkeen virheet.');
}
