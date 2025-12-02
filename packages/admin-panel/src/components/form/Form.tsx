import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import LogoutButton from '../auth/LogoutButton';
import HookFormInput from './FormInput';
import HookFormSelect from './FormSelect';
import { supabase } from '../../config/supabaseClient';
import { queryClient } from '../../config/queryClient';
import { type GigForm, GigFormSchema, lineupOptions, addGig } from 'shared';
import styles from './Form.module.css';

type NewGig = Omit<GigForm, 'id'>;

export default function GigForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewGig>({
    resolver: zodResolver(GigFormSchema.omit({ id: true })),
  });

  const addGigMutation = useMutation({
    mutationFn: (newGig: NewGig) => addGig(supabase, newGig),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gigs'] });
    },

    onError: (error) => {
      console.error('Failed to add gig:', error);
    },
  });

  const handleFormSubmit = async (data: NewGig) => {
    const payload = {
      date: data.date,
      time: data.time || null,
      lineup_fi: data.lineup_fi,
      lineup_en: data.lineup_en,
      venue: data.venue || null,
      city: data.city || null,
      notes_fi: data.notes_fi || null,
      notes_en: data.notes_en || null,
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
          label="Kokoonpano (FI)"
          name="lineup_fi"
          options={lineupOptions}
          register={{ ...register('lineup_fi') }}
          required={true}
          error={errors.lineup_fi?.message}
        />

        <HookFormSelect
          label="Kokoonpano (EN)"
          name="lineup_en"
          options={lineupOptions}
          register={{ ...register('lineup_en') }}
          required={true}
          error={errors.lineup_en?.message}
        />

        <HookFormInput
          label="Keikkapaikka"
          name="venue"
          register={{ ...register('venue') }}
          required={false}
          error={errors.venue?.message}
        />

        <HookFormInput
          label="Kaupunki"
          name="city"
          register={{ ...register('city') }}
          required={false}
          error={errors.city?.message}
        />

        <HookFormInput
          label="Huomioitavaa (FI)"
          name="notes_fi"
          type="textarea"
          register={{ ...register('notes_fi') }}
          required={false}
          error={errors.notes_fi?.message}
        />

        <HookFormInput
          label="Huomioitavaa (EN)"
          name="notes_en"
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
