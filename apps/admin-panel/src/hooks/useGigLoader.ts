import { useEffect, useRef, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { getGigById, logger } from '@jpx/shared';

import { supabase } from '../clients';
import { useGigStore } from '../store';
import { toastify } from '../utils';

import type { GigFormInput } from './useGigFormState';

export function useGigLoader(form: UseFormReturn<GigFormInput>) {
  const { selectedGigId, setSelectedGigId } = useGigStore();
  const { error: toastError } = toastify;
  const toastErrorRef = useRef(toastError);

  const { reset } = form;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    toastErrorRef.current = toastError;
  }, [toastError]);

  useEffect(() => {
    if (!selectedGigId) {
      reset();
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    (async () => {
      try {
        const data = await getGigById(supabase, selectedGigId);
        if (!cancelled) reset(data);
      } catch (err) {
        logger.error({
          msg: 'Failed to load gig for editing',
          err,
          gigId: selectedGigId,
        });
        toastErrorRef.current(
          err instanceof Error ? err.message : 'Virhe ladattaessa keikkaa'
        );
        setSelectedGigId(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [selectedGigId, setSelectedGigId, reset]);

  return {
    isEditMode: Boolean(selectedGigId),
    loading,
    selectedGigId,
    setSelectedGigId,
  };
}
