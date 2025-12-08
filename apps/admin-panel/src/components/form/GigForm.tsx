import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import type { Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import LogoutButton from '../auth/LogoutButton';
import HookFormInput from './FormInput';
import HookFormSelect from './FormSelect';
import { supabase } from '../../clients/supabaseClient';
import { queryClient } from '../../clients/queryClient';
import {
  VALIDATED_KEYS,
  lineupQueryOptions,
  type GigInsert,
  GigInsertSchema,
  getGigById,
  createGig,
  updateGig,
} from '@jpx/shared';
import { useGigStore } from '../../store/gigStore';
import styles from './GigForm.module.css';
import { useEffect } from 'react';

const defaultValue: Partial<GigInsert> = { lineup_id: '' };

export default function GigForm() {
  const { selectedGigId, setSelectedGigId } = useGigStore();
  const isEditMode = Boolean(selectedGigId);

  const formResolver = zodResolver(
    GigInsertSchema
  ) as unknown as Resolver<GigInsert>;

  const {
    register,
    handleSubmit,
    formState: { errors: hookFormErrors },
    reset,
  } = useForm<GigInsert>({
    resolver: formResolver,
    defaultValues: defaultValue,
  });

  const {
    data: lineupOptions,
    isLoading,
    error: reactQueryError,
  } = useQuery(lineupQueryOptions(supabase));

  useEffect(() => {
    if (!selectedGigId) {
      reset();
      return;
    }

    const fetchGigAndResetForm = async () => {
      const data = await getGigById(supabase, selectedGigId);

      reset(data);
    };
    fetchGigAndResetForm();
  }, [selectedGigId, reset]);

  const addGigMutation = useMutation({
    mutationFn: (newGig: GigInsert) => createGig(supabase, newGig),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [VALIDATED_KEYS.GIGS] });
    },
  });

  const handleFormSubmit = async (data: GigInsert) => {
    try {
      if (isEditMode) {
        if (!selectedGigId) return;
        await updateGig(supabase, selectedGigId, data);
      } else {
        await addGigMutation.mutateAsync(data);
      }

      setSelectedGigId(null);
      reset();
      queryClient.invalidateQueries({ queryKey: [VALIDATED_KEYS.GIGS] });
    } catch (err: unknown) {
      alert(
        'Error saving gig: ' +
          (err instanceof Error ? err.message : String(err))
      );
    }
  };

  const handleCancelEdit = () => {
    setSelectedGigId(null);
    reset(defaultValue);
  };

  const handleFormError = (errors: Record<string, unknown>) =>
    console.log('[HookForm] validation errors on submit:', errors);

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
