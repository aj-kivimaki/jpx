import { AppError } from '@jpx/shared';
import type { UseFormSetError, Path } from 'react-hook-form';

type ZodIssue = {
  path?: Array<string | number>;
  message?: string;
};

type ZodErrorLike = {
  issues?: ZodIssue[];
};

/**
 * Maps AppError validation details to react-hook-form setError
 * and optionally shows a toast message.
 * Returns true if the error was handled.
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

  // Handle validation errors
  if (code === 'VALIDATION_ERROR') {
    const issues = (details as ZodErrorLike | undefined)?.issues ?? [];

    if (!issues.length || typeof setError !== 'function') {
      toast?.('Virheellinen pyyntö. Tarkista syötteet.');
      return true;
    }

    for (const issue of issues) {
      const field =
        Array.isArray(issue.path) && issue.path.length
          ? String(issue.path[0])
          : null;

      if (!field) continue;
      if (!(field in ({} as TFormValues))) continue;

      setError(field as Path<TFormValues>, {
        type: 'server',
        message: issue.message,
      });
    }

    toast?.('Ole hyvä ja korjaa lomakkeen virheet.');
    return true;
  }

  // Handle "not found" errors
  if (code === 'NOT_FOUND') {
    toast?.('Pyydetty resurssi ei löytynyt');
    return true;
  }

  // Default fallback for other errors
  toast?.(message || 'Palvelinvirhe');
  return true;
}
