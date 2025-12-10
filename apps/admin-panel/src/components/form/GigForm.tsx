import LogoutButton from '../auth/LogoutButton';
import HookFormInput from './FormInput';
import HookFormSelect from './FormSelect';

import styles from './GigForm.module.css';

import { useGigFormState } from './useGigFormState';
import { useGigLoader } from './useGigLoader';
import { useGigSubmit } from './useGigSubmit';

export default function GigForm() {
  const {
    form,
    toastSuccess,
    toastError,
    lineupOptions,
    isLoading,
    reactQueryError,
  } = useGigFormState();

  const { isEditMode, selectedGigId, setSelectedGigId } = useGigLoader(form);

  const { submit, onError } = useGigSubmit(form, {
    isEditMode,
    selectedGigId,
    setSelectedGigId,
    toastSuccess,
    toastError,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const cancelEdit = () => {
    setSelectedGigId(null);
    reset({ lineup_id: '' });
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
        onSubmit={handleSubmit(submit, onError)}
        className={styles.fields}
        noValidate
      >
        <h2 className={styles.formTitle}>
          {isEditMode ? 'Muokkaa keikkaa' : 'Lisää uusi keikka'}
        </h2>

        <HookFormInput
          label="Päivänmäärä"
          type="date"
          placeholder="valitse päivä"
          register={register('date')}
          required
          error={errors.date?.message}
        />

        <HookFormInput
          label="Kellonaika"
          type="time"
          placeholder="lisää kellonaika"
          register={register('time')}
          error={errors.time?.message}
          required={false}
        />

        <HookFormSelect
          label="Kokoonpano"
          register={register('lineup_id')}
          options={lineupOptions}
          isLoading={isLoading}
          reactQueryError={reactQueryError}
          hookFormError={errors.lineup_id?.message}
          required
          disabled={isLoading || !!reactQueryError}
        />

        <HookFormInput
          label="Keikkapaikka"
          placeholder="venue"
          register={register('venue')}
          error={errors.venue?.message}
          required={false}
        />

        <HookFormInput
          label="Paikkakunta"
          placeholder="pitäjä"
          register={register('city')}
          error={errors.city?.message}
          required={false}
        />

        <HookFormInput
          label="Huomioitavaa 🇫🇮"
          type="textarea"
          placeholder="Jos on jotain erityistä huomautettavaa..."
          register={register('notes_fi')}
          error={errors.notes_fi?.message}
          required={false}
        />

        <HookFormInput
          label="Huomioitavaa 🇬🇧"
          type="textarea"
          placeholder="...niin laita englanniksikin jotain!"
          register={register('notes_en')}
          error={errors.notes_en?.message}
          required={false}
        />

        <div className={styles.buttons}>
          <button type="submit" className={styles.button}>
            {isEditMode ? 'Tallenna muutokset' : 'Lisää keikka'}
          </button>

          {isEditMode && (
            <button
              type="button"
              className={styles.cancelButton}
              onClick={cancelEdit}
            >
              Peruuta muokkaus
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
