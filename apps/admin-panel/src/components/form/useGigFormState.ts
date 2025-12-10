import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GigInsertSchema, lineupQueryOptions, logger } from '@jpx/shared';
import { useQuery } from '@tanstack/react-query';
import type { z } from 'zod';

import { supabase } from '../../clients';
import { useToastify } from '../../hooks/useToastify';

export type GigFormInput = z.input<typeof GigInsertSchema>;

export function useGigFormState() {
  const { success: toastSuccess, error: toastError } = useToastify();
  const toastErrorRef = useRef(toastError);

  useEffect(() => {
    toastErrorRef.current = toastError;
  }, [toastError]);

  const form = useForm<GigFormInput>({
    resolver: zodResolver(GigInsertSchema),
    defaultValues: { lineup_id: '' },
  });

  const { setFocus } = form;

  const { data, isLoading, error } = useQuery(lineupQueryOptions(supabase));

  useEffect(() => {
    if (error) {
      logger.warn({
        msg: 'Failed to load lineup options',
        err: error,
      });
      toastErrorRef.current('Keikkakokoonpanojen lataus epäonnistui');
    }
  }, [error]);

  useEffect(() => {
    setFocus('date');
  }, [setFocus]);

  return {
    form,
    toastSuccess,
    toastError,
    lineupOptions: data ?? [],
    isLoading,
    reactQueryError: error,
  };
}
