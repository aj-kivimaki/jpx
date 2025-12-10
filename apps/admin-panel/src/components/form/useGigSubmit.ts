import { queryClient, supabase } from '../../clients';
import { VALIDATED_KEYS, createGig, updateGig, logger } from '@jpx/shared';

import { sanitizeGigInput } from '../../utils/sanitizeGigInput';
import { mapAppErrorToFormErrors } from '../../utils/mapAppErrorToFormErrors';

import type { UseFormReturn } from 'react-hook-form';
import type { GigFormInput } from './useGigFormState';

export function useGigSubmit(
  form: UseFormReturn<GigFormInput>,
  opts: {
    isEditMode: boolean;
    selectedGigId: string | null;
    setSelectedGigId: (id: string | null) => void;
    toastSuccess: (msg: string) => void;
    toastError: (msg: string) => void;
  }
) {
  const {
    isEditMode,
    selectedGigId,
    setSelectedGigId,
    toastSuccess,
    toastError,
  } = opts;

  const submit = async (data: GigFormInput) => {
    try {
      // Data is already validated by zodResolver
      const sanitized = sanitizeGigInput(data);

      if (isEditMode) {
        if (!selectedGigId) return;

        await updateGig(supabase, selectedGigId, sanitized);
        toastSuccess('Keikka päivitetty');
      } else {
        await createGig(supabase, sanitized);
        toastSuccess('Keikka lisätty');
      }

      setSelectedGigId(null);
      form.reset({ lineup_id: '' });

      queryClient.invalidateQueries({ queryKey: [VALIDATED_KEYS.GIGS] });
    } catch (err: unknown) {
      const handled = mapAppErrorToFormErrors(err, form.setError, toastError);
      if (handled) return;

      logger.error({ msg: 'Gig form submit failed', err });
      toastError(err instanceof Error ? err.message : String(err));
    }
  };

  const onError = (errors: Record<string, unknown>) => {
    logger.error({ msg: '[HookForm] validation errors on submit', errors });
  };

  return { submit, onError };
}
