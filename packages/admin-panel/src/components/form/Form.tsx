import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import LogoutButton from '../auth/LogoutButton';
import HookFormInput from './FormInput';
import HookFormSelect from './FormSelect';
import { supabase } from '../../config/supabaseClient';
import { type GigForm, GigFormSchema, lineupOptions } from 'shared';
import styles from './Form.module.css';

export default function GigForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<GigForm>({
    resolver: zodResolver(GigFormSchema),
  });

  const handleFormSubmit = async (data: GigForm) => {
    const { error } = await supabase
      .from('gigs') // replace with your table name
      .insert([data]); // insert expects an array of objects

    if (error) {
      console.error('Error inserting data:', error.message);
    } else {
      alert('Event saved successfully!');
      reset(); // reset form
    }

    console.log('[HookForm] formData (object):', data);
  };

  const handleFormError = (errors: Record<string, unknown>) => {
    console.log('[HookForm] validation errors on submit:', errors);
  };

  const handleSubmitButtonClick = () => {
    console.log(
      '[HookForm] submit button clicked at',
      new Date().toISOString()
    );
    try {
      console.log('[HookForm] getValues():', getValues());
    } catch (e) {
      console.warn('[HookForm] getValues() failed', e);
    }
  };

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

        <button
          type="submit"
          className={styles.button}
          onClick={handleSubmitButtonClick}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
