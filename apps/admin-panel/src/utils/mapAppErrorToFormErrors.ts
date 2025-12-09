import { AppError } from '@jpx/shared';
import type { UseFormSetError, Path } from 'react-hook-form';

type ZodIssue = {
  path?: Array<string | number>;
  message?: string;
};

type ZodErrorLike = {
  issues?: ZodIssue[];
};

export function mapAppErrorToFormErrors<
  TFormValues extends Record<string, unknown>,
>(
  error: unknown,
  setError?: UseFormSetError<TFormValues>,
  toast?: (message: string) => void
): boolean {
  if (!(error instanceof AppError)) return false;

  const { code, details, message } = error;

  if (code === 'VALIDATION_ERROR') {
    handleValidationError(details as ZodErrorLike | undefined, setError, toast);
    return true;
  }

  if (code === 'NOT_FOUND') {
    toast?.('Pyydetty resurssi ei löytynyt');
    return true;
  }

  toast?.(message || 'Palvelinvirhe');
  return true;
}

/* ------------------ Helpers ------------------ */

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

    // field existence check simplified; avoids needless in-object test
    setError(field, {
      type: 'server',
      message: issue.message,
    });
  }

  toast?.('Ole hyvä ja korjaa lomakkeen virheet.');
}
