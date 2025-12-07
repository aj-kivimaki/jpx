import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import LogoutButton from '../auth/LogoutButton';
import HookFormInput from './FormInput';
import HookFormSelect from './FormSelect';
import { supabase } from '../../clients/supabaseClient';
import { queryClient } from '../../clients/queryClient';
import {
  DbGigSchema,
  fetchLineupOptions,
  addGig,
  QUERY_KEY_GIGS,
  type NewGig,
} from '@jpx/shared';
import styles from './Form.module.css';
import { useEffect, useState } from 'react';
import { type DbLineupOption } from '@jpx/shared';

export default function AddGig() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewGig>({
    resolver: zodResolver(
      DbGigSchema.omit({
        id: true,
        lineup_en: true,
        lineup_fi: true,
        lineup: true,
      })
    ),
    defaultValues: { lineup_id: '' },
  });

  const [lineupOptions, setLineupOptions] = useState<DbLineupOption[]>([]);

  useEffect(() => {
    (async () => {
      const lineup = await fetchLineupOptions(supabase);
      setLineupOptions(lineup);
    })();
  }, []);

  const addGigMutation = useMutation({
    mutationFn: (newGig: NewGig) => addGig(supabase, newGig),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_GIGS });
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
          error={errors.date?.message}
        />

        <HookFormInput
          label="Kellonaika"
          name="time"
          type="time"
          register={{ ...register('time') }}
          required={false}
          error={errors.time?.message}
        />

        <HookFormSelect
          label="Kokoonpano"
          name="lineup_id"
          options={lineupOptions}
          register={{ ...register('lineup_id') }}
          required={true}
          error={errors.lineup_id?.message}
        />

        <HookFormInput
          label="Keikkapaikka"
          name="venuen nimi"
          placeholder="venue"
          register={{ ...register('venue') }}
          required={false}
          error={errors.venue?.message}
        />

        <HookFormInput
          label="Paikkakunta"
          name="city"
          placeholder="pitäjä"
          register={{ ...register('city') }}
          required={false}
          error={errors.city?.message}
        />

        <HookFormInput
          label="Huomioitavaa 🇫🇮"
          name="notes_fi"
          placeholder="jos on jotain erityistä sanottavaa"
          type="textarea"
          register={{ ...register('notes_fi') }}
          required={false}
          error={errors.notes_fi?.message}
        />

        <HookFormInput
          label="Huomioitavaa 🇬🇧"
          name="notes_en"
          placeholder="... ja laita englanniksikin jotain"
          type="textarea"
          register={{ ...register('notes_en') }}
          required={false}
          error={errors.notes_en?.message}
        />

        <button type="submit" className={styles.button}>
          Tallenna
        </button>
      </form>
    </div>
  );
}
