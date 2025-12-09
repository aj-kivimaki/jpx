import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import LogoutButton from '../auth/LogoutButton';
import HookFormInput from './FormInput';
import HookFormSelect from './FormSelect';
import { supabase, queryClient } from '../../clients';
import {
  VALIDATED_KEYS,
  lineupQueryOptions,
  type GigInsert,
  GigInsertSchema,
  getGigById,
  createGig,
  updateGig,
  logger,
} from '@jpx/shared';
import { useGigStore } from '../../store';
import { useToastify } from '../../hooks/useToastify';
import { mapAppErrorToFormErrors } from '../../utils/mapAppErrorToFormErrors';
import { sanitizeGigInput } from '../../utils/sanitizeGigInput';
import styles from './GigForm.module.css';

type GigFormInput = z.input<typeof GigInsertSchema>;

const defaultValue: Partial<GigFormInput> = { lineup_id: '' };

export default function GigForm() {
  const { selectedGigId, setSelectedGigId } = useGigStore();
  const isEditMode = Boolean(selectedGigId);

  const rawResolver = zodResolver(GigInsertSchema);
  const formResolver: Resolver<GigFormInput> = (values, context, options) =>
    // delegate to the well-tested zod resolver but expose a form-typed signature
    // (we intentionally keep this thin wrapper to avoid an unsafe global cast)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (rawResolver as any)(values, context, options);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors: hookFormErrors },
    setError,
    reset,
  } = useForm<GigFormInput>({
    resolver: formResolver,
    defaultValues: defaultValue,
    shouldFocusError: true,
  });

  const { success: toastSuccess, error: toastError } = useToastify();

  const {
    data: lineupOptions,
    isLoading,
    error: reactQueryError,
  } = useQuery(lineupQueryOptions(supabase));

  useEffect(() => {
    if (reactQueryError) {
      logger.warn({
        msg: 'Failed to load lineup options',
        err: reactQueryError,
      });
    }
  }, [reactQueryError]);

  useEffect(() => {
    setFocus('date');
  }, [setFocus]);

  useEffect(() => {
    if (!selectedGigId) {
      reset();
      return;
    }

    const fetchGigAndResetForm = async () => {
      try {
        const data = await getGigById(supabase, selectedGigId);
        reset(data);
      } catch (err: unknown) {
        logger.error({
          msg: 'Failed to load gig for editing',
          err,
          gigId: selectedGigId,
        });
        toastError(
          err instanceof Error ? err.message : 'Virhe ladattaessa keikkaa'
        );
        setSelectedGigId(null);
      }
    };
    fetchGigAndResetForm();
  }, [selectedGigId, reset, setSelectedGigId, toastError]);

  const addGigMutation = useMutation({
    mutationFn: (newGig: GigInsert) => createGig(supabase, newGig),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [VALIDATED_KEYS.GIGS] });
    },
  });

  const handleFormSubmit = async (data: GigFormInput) => {
    try {
      // Parse/validate with the canonical schema to get the output shape
      const parsed = GigInsertSchema.parse(data);

      const sanitized = sanitizeGigInput(parsed);

      if (isEditMode) {
        if (!selectedGigId) return;
        await updateGig(supabase, selectedGigId, sanitized);
        toastSuccess('Keikka päivitetty');
      } else {
        await addGigMutation.mutateAsync(sanitized);
        toastSuccess('Keikka lisätty');
      }

      setSelectedGigId(null);
      reset(defaultValue);
      queryClient.invalidateQueries({ queryKey: [VALIDATED_KEYS.GIGS] });
    } catch (err: unknown) {
      const handled = mapAppErrorToFormErrors(err, setError, toastError);
      if (handled) return;

      // Fallback for unexpected errors
      logger.error({ msg: 'Gig form submit failed', err });
      toastError(err instanceof Error ? err.message : String(err));
    }
  };

  const handleCancelEdit = () => {
    setSelectedGigId(null);
    reset(defaultValue);
  };

  const handleFormError = (errors: Record<string, unknown>) =>
    logger.error({ msg: '[HookForm] validation errors on submit', errors });

  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <h1 className={styles.title}>J. Partynen</h1>
        <div className={styles.logout}>
          <LogoutButton />
        </div>
      </div>
      <form
        onSubmit={handleSubmit(handleFormSubmit, handleFormError)}
        className={styles.fields}
        noValidate
      >
        <h2 className={styles.formTitle}>
          {isEditMode ? 'Muokkaa keikkaa' : 'Lisää uusi keikka'}
        </h2>
        <HookFormInput
          label="Päivänmäärä"
          placeholder="valitse päivä"
          type="date"
          register={{ ...register('date') }}
          required={true}
          error={hookFormErrors.date?.message}
        />

        <HookFormInput
          label="Kellonaika"
          placeholder="lisää kellonaika"
          type="time"
          register={{ ...register('time') }}
          required={false}
          error={hookFormErrors.time?.message}
        />

        <HookFormSelect
          label="Kokoonpano"
          isLoading={isLoading}
          options={lineupOptions || []}
          register={{ ...register('lineup_id') }}
          required={true}
          disabled={isLoading || !!reactQueryError}
          reactQueryError={reactQueryError}
          hookFormError={hookFormErrors.lineup_id?.message}
        />

        <HookFormInput
          label="Keikkapaikka"
          placeholder="venue"
          register={{ ...register('venue') }}
          required={false}
          error={hookFormErrors.venue?.message}
        />

        <HookFormInput
          label="Paikkakunta"
          placeholder="pitäjä"
          register={{ ...register('city') }}
          required={false}
          error={hookFormErrors.city?.message}
        />

        <HookFormInput
          label="Huomioitavaa 🇫🇮"
          placeholder="Jos on jotain erityistä huomautettavaa..."
          type="textarea"
          register={{ ...register('notes_fi') }}
          required={false}
          error={hookFormErrors.notes_fi?.message}
        />

        <HookFormInput
          label="Huomioitavaa 🇬🇧"
          placeholder="...niin laita englanniksikin jotain!"
          type="textarea"
          register={{ ...register('notes_en') }}
          required={false}
          error={hookFormErrors.notes_en?.message}
        />

        <div className={styles.buttons}>
          <button type="submit" className={styles.button}>
            {isEditMode ? 'Tallenna muutokset' : 'Lisää keikka'}
          </button>

          {isEditMode && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className={styles.cancelButton}
            >
              Peruuta muokkaus
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
