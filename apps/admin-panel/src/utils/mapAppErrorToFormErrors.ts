import { AppError } from '@jpx/shared';
import type { UseFormSetError, Path } from 'react-hook-form';

// Minimal typed shape for a Zod-like validation error used in AppError.details
type ZodIssue = {
  path?: Array<string | number>;
  message?: string;
};

type ZodErrorLike = {
  issues?: ZodIssue[];
};

// Generic helper to map AppError validation details to react-hook-form setError
// and show a toast message. Returns true if the error was handled.
export function mapAppErrorToFormErrors<
  TFormValues extends Record<string, unknown>,
>(
  err: unknown,
  setError?: UseFormSetError<TFormValues>,
  toast?: (message: string) => void
): boolean {
  if (!(err instanceof AppError)) return false;

  const { code, details, message } = err;

  if (code === 'VALIDATION_ERROR') {
    // ZodError-like shape: { issues: [{ path: [field], message }] }
    const det = details as ZodErrorLike | undefined;

    if (Array.isArray(det?.issues) && typeof setError === 'function') {
      for (const issue of det.issues) {
        const path =
          Array.isArray(issue.path) && issue.path.length
            ? String(issue.path[0])
            : undefined;
        if (!path) continue;
        try {
          // cast to any because issue.path field might not be a key of TFormValues
          setError(path as Path<TFormValues>, {
            type: 'server',
            message: issue.message,
          });
        } catch {
          // ignore setError failures
        }
      }
      toast?.('Ole hyvä ja korjaa lomakkeen virheet.');
      return true;
    }

    toast?.('Virheellinen pyyntö. Tarkista syötteet.');
    return true;
  }

  if (code === 'NOT_FOUND') {
    toast?.('Pyydetty resurssi ei löytynyt');
    return true;
  }

  toast?.(message || 'Palvelinvirhe');
  return true;
}
