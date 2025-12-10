import { useEffect } from 'react';
import { getGigById, logger } from '@jpx/shared';
import { supabase } from '../../clients';
import { useGigStore } from '../../store';
import { useToastify } from '../../hooks/useToastify';
import type { UseFormReturn } from 'react-hook-form';
import type { GigFormInput } from './useGigFormState';

export function useGigLoader(form: UseFormReturn<GigFormInput>) {
  const { selectedGigId, setSelectedGigId } = useGigStore();
  const { error: toastError } = useToastify();

  useEffect(() => {
    if (!selectedGigId) {
      form.reset();
      return;
    }

    let cancelled = false;

    getGigById(supabase, selectedGigId)
      .then((data) => {
        if (!cancelled) form.reset(data);
      })
      .catch((err) => {
        logger.error({
          msg: 'Failed to load gig for editing',
          err,
          gigId: selectedGigId,
        });

        toastError(
          err instanceof Error ? err.message : 'Virhe ladattaessa keikkaa'
        );

        setSelectedGigId(null);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedGigId, setSelectedGigId, form, toastError]);

  return {
    isEditMode: Boolean(selectedGigId),
    selectedGigId,
    setSelectedGigId,
  };
}
