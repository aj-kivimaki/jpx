import { useEffect, useRef } from 'react';
import { getGigById, logger } from '@jpx/shared';
import { supabase } from '../../clients';
import { useGigStore } from '../../store';
import { useToastify } from '../../hooks/useToastify';
import type { UseFormReturn } from 'react-hook-form';
import type { GigFormInput } from './useGigFormState';

export function useGigLoader(form: UseFormReturn<GigFormInput>) {
  const { selectedGigId, setSelectedGigId } = useGigStore();
  const { error: toastError } = useToastify();
  const toastErrorRef = useRef(toastError);

  const { reset } = form;

  useEffect(() => {
    toastErrorRef.current = toastError;
  }, [toastError]);

  useEffect(() => {
    if (!selectedGigId) {
      reset();
      return;
    }

    let cancelled = false;

    getGigById(supabase, selectedGigId)
      .then((data) => {
        if (!cancelled) reset(data);
      })
      .catch((err) => {
        logger.error({
          msg: 'Failed to load gig for editing',
          err,
          gigId: selectedGigId,
        });

        toastErrorRef.current(
          err instanceof Error ? err.message : 'Virhe ladattaessa keikkaa'
        );

        setSelectedGigId(null);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedGigId, setSelectedGigId, reset]);

  return {
    isEditMode: Boolean(selectedGigId),
    selectedGigId,
    setSelectedGigId,
  };
}
