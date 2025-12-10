import { queryClient, supabase } from '../../clients';
import { VALIDATED_KEYS, createGig, updateGig, logger } from '@jpx/shared';

import { sanitizeGigInput } from '../../utils/sanitizeGigInput';
import { mapAppErrorToFormErrors } from '../../utils/mapAppErrorToFormErrors';

import type { UseFormReturn } from 'react-hook-form';
import type { GigFormInput } from './useGigFormState';

interface UseGigSubmitOptions {
  isEditMode: boolean;
  selectedGigId: string | null;
  setSelectedGigId: (id: string | null) => void;
  toastSuccess: (msg: string) => void;
  toastError: (msg: string) => void;
}

export function useGigSubmit(
  form: UseFormReturn<GigFormInput>,
  opts: UseGigSubmitOptions
) {
  const {
    isEditMode,
    selectedGigId,
    setSelectedGigId,
    toastSuccess,
    toastError,
  } = opts;

  /**
   * Handles form submission for creating or updating a gig
   */
  const submit = async (data: GigFormInput) => {
    try {
      // Data is already validated via zodResolver
      const sanitized = sanitizeGigInput(data);

      if (isEditMode) {
        if (!selectedGigId) return;

        await updateGig(supabase, selectedGigId, sanitized);
        toastSuccess('Keikka päivitetty');
      } else {
        await createGig(supabase, sanitized);
        toastSuccess('Keikka lisätty');
      }

      // Reset form and selected gig state
      setSelectedGigId(null);
      form.reset({ lineup_id: '' });

      // Invalidate GIGS cache to refresh list
      queryClient.invalidateQueries({ queryKey: [VALIDATED_KEYS.GIGS] });
    } catch (err: unknown) {
      // Map app errors to form fields or show toast
      const handled = mapAppErrorToFormErrors(err, form.setError, toastError);
      if (handled) return;

      // Log and show toast for unhandled errors
      logger.error({ msg: 'Gig form submit failed', err });
      toastError(err instanceof Error ? err.message : String(err));
    }
  };

  /**
   * Logs validation errors reported by React Hook Form
   */
  const onError = (errors: Record<string, unknown>) => {
    logger.error({ msg: '[HookForm] validation errors on submit', errors });
  };

  return { submit, onError };
}
