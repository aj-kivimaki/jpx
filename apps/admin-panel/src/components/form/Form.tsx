import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import LogoutButton from '../auth/LogoutButton';
import HookFormInput from './FormInput';
import HookFormSelect from './FormSelect';
import { supabase } from '../../clients/supabaseClient';
import { queryClient } from '../../clients/queryClient';
import {
  DbGigSchema,
  addGig,
  VALIDATED_KEYS,
  lineupQueryOptions,
  type NewGig,
  fetchGigById,
  type UpdateGig,
  updateGig,
} from '@jpx/shared';
import { useGigStore } from '../../store/gigStore';
import styles from './Form.module.css';
import { useEffect } from 'react';

const defaultValue = { lineup_id: '' };

export default function AddGig() {
  const {
    register,
    handleSubmit,
    formState: { errors: hookFormErrors },
    reset,
  } = useForm<NewGig>({
    resolver: zodResolver(DbGigSchema.omit({ id: true, lineup: true })),
    defaultValues: defaultValue,
  });

  const {
    data: lineupOptions,
    isLoading,
    error: reactQueryError,
  } = useQuery(lineupQueryOptions(supabase));

  const { selectedGigId, setSelectedGigId } = useGigStore();
  const isEditMode = Boolean(selectedGigId);

  useEffect(() => {
    if (!selectedGigId) {
      reset();
      return;
    }

    const fetchGigAndResetForm = async () => {
      const data = await fetchGigById(supabase, selectedGigId);

      reset(data);
    };
    fetchGigAndResetForm();
  }, [selectedGigId, reset]);

  const addGigMutation = useMutation({
    mutationFn: (newGig: NewGig) => addGig(supabase, newGig),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [VALIDATED_KEYS.GIGS] });
    },
  });

  const handleFormSubmit = async (data: NewGig) => {
    try {
      if (isEditMode) {
        const payload = { ...data, id: selectedGigId } as UpdateGig;
        await updateGig(supabase, payload);
      } else {
        await addGigMutation.mutateAsync(data);
      }

      setSelectedGigId(null);
      reset();
      queryClient.invalidateQueries({ queryKey: ['gigs'] });
    } catch (err: unknown) {
      console.error(err);
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
          name="date"
          placeholder="valitse päivä"
          type="date"
          register={{ ...register('date') }}
          required={true}
          error={hookFormErrors.date?.message}
        />

        <HookFormInput
          label="Kellonaika"
          name="time"
          placeholder="lisää kellonaika"
          type="time"
          register={{ ...register('time') }}
          required={false}
          error={hookFormErrors.time?.message}
        />

        <HookFormSelect
          label="Kokoonpano"
          name="lineup_id"
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
          name="venuen nimi"
          placeholder="venue"
          register={{ ...register('venue') }}
          required={false}
          error={hookFormErrors.venue?.message}
        />

        <HookFormInput
          label="Paikkakunta"
          name="city"
          placeholder="pitäjä"
          register={{ ...register('city') }}
          required={false}
          error={hookFormErrors.city?.message}
        />

        <HookFormInput
          label="Huomioitavaa 🇫🇮"
          name="notes_fi"
          placeholder="Jos on jotain erityistä huomautettavaa..."
          type="textarea"
          register={{ ...register('notes_fi') }}
          required={false}
          error={hookFormErrors.notes_fi?.message}
        />

        <HookFormInput
          label="Huomioitavaa 🇬🇧"
          name="notes_en"
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
