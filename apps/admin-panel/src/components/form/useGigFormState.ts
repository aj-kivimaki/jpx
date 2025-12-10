import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { useQuery } from '@tanstack/react-query';

import { GigInsertSchema, lineupQueryOptions, logger } from '@jpx/shared';

import { supabase } from '../../clients';
import { useToastify } from '../../hooks/useToastify';

export type GigFormInput = z.input<typeof GigInsertSchema>;

export function useGigFormState() {
  const { success: toastSuccess, error: toastError } = useToastify();

  const form = useForm<GigFormInput>({
    resolver: zodResolver(GigInsertSchema),
    defaultValues: { lineup_id: '' },
  });

  const { setFocus } = form;

  const {
    data: lineupOptions,
    isLoading,
    error: reactQueryError,
  } = useQuery(lineupQueryOptions(supabase));

  // Log fetch errors
  useEffect(() => {
    if (reactQueryError) {
      logger.warn({
        msg: 'Failed to load lineup options',
        err: reactQueryError,
      });
    }
  }, [reactQueryError]);

  // Autofocus date field on mount
  useEffect(() => {
    setFocus('date');
  }, [setFocus]);

  return {
    form,
    toastSuccess,
    toastError,
    lineupOptions: lineupOptions || [],
    isLoading,
    reactQueryError,
  };
}
