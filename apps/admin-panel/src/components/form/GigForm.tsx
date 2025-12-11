import { Spinner } from '@jpx/ui';

import { useGigFormState, useGigLoader, useGigSubmit } from '../../hooks';
import { LogoutButton } from '../auth';

import HookFormInput from './FormInput';
import HookFormSelect from './FormSelect';
import styles from './GigForm.module.css';

export default function GigForm() {
  const {
    form,
    toastSuccess,
    toastError,
    lineupOptions,
    isLoading,
    reactQueryError,
  } = useGigFormState();

  const {
    isEditMode,
    loading: isLoaderLoading,
    selectedGigId,
    setSelectedGigId,
  } = useGigLoader(form);

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

  // Disable the entire form while the loader is fetching
  const isFormDisabled = isLoaderLoading || isLoading;

  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <h1 className={styles.title}>J. Partynen</h1>
        <LogoutButton />
      </div>

      {isLoaderLoading && <Spinner />}

      <form
        onSubmit={handleSubmit(submit, onError)}
        className={styles.fields}
        noValidate
      >
        <fieldset disabled={isFormDisabled}>
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
            required={false}
            error={errors.time?.message}
          />

          <HookFormSelect
            label="Kokoonpano"
            register={register('lineup_id')}
            options={lineupOptions}
            isLoading={isLoading}
            reactQueryError={reactQueryError}
            hookFormError={errors.lineup_id?.message}
            required
            disabled={isFormDisabled || !!reactQueryError}
          />

          <HookFormInput
            label="Keikkapaikka"
            placeholder="venue"
            register={register('venue')}
            required={false}
            error={errors.venue?.message}
          />

          <HookFormInput
            label="Paikkakunta"
            placeholder="pitäjä"
            register={register('city')}
            required={false}
            error={errors.city?.message}
          />

          <HookFormInput
            label="Huomioitavaa 🇫🇮"
            type="textarea"
            placeholder="Jos on jotain erityistä huomautettavaa..."
            register={register('notes_fi')}
            required={false}
            error={errors.notes_fi?.message}
          />

          <HookFormInput
            label="Huomioitavaa 🇬🇧"
            type="textarea"
            placeholder="...niin laita englanniksikin jotain!"
            register={register('notes_en')}
            required={false}
            error={errors.notes_en?.message}
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
        </fieldset>
      </form>
    </div>
  );
}
