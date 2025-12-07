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
} from '@jpx/shared';
import styles from './Form.module.css';

export default function AddGig() {
  const {
    register,
    handleSubmit,
    formState: { errors: hookFormErrors },
    reset,
  } = useForm<NewGig>({
    resolver: zodResolver(DbGigSchema.omit({ id: true, lineup: true })),
    defaultValues: { lineup_id: '' },
  });

  const {
    data: lineupOptions,
    isLoading,
    error: reactQueryError,
  } = useQuery(lineupQueryOptions(supabase));

  const addGigMutation = useMutation({
    mutationFn: (newGig: NewGig) => addGig(supabase, newGig),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [VALIDATED_KEYS.GIGS] });
    },

    onError: (error) => {
      console.error('Failed to add gig:', error);
    },
  });

  const handleFormSubmit = async (data: NewGig) => {
    const payload = {
      date: data.date,
      time: data.time || null,
      venue: data.venue || null,
      city: data.city || null,
      notes_fi: data.notes_fi || null,
      notes_en: data.notes_en || null,
      lineup_id: data.lineup_id,
    };

    try {
      await addGigMutation.mutateAsync(payload);
      reset();
    } catch (err) {
      console.error('[HookForm] addGig failed', err);
    }
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
        <HookFormInput
          label="Päivänmäärä"
          name="date"
          type="date"
          register={{ ...register('date') }}
          required={true}
          error={hookFormErrors.date?.message}
        />

        <HookFormInput
          label="Kellonaika"
          name="time"
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

        <button type="submit" className={styles.button}>
          Tallenna
        </button>
      </form>
    </div>
  );
}
