import type { UseFormRegisterReturn } from 'react-hook-form';
import type { DbLineupOption } from '@jpx/shared';

import styles from './FormSelect.module.css';

interface FormSelectProps {
  label: string;
  options: DbLineupOption[];
  register: UseFormRegisterReturn;
  required: boolean;
  hookFormError?: string;
  reactQueryError?: Error | null;
  disabled?: boolean;
  isLoading?: boolean;
  cypress?: string;
}

const FormSelect = ({
  label,
  options,
  register,
  required,
  hookFormError,
  reactQueryError,
  disabled,
  isLoading,
  cypress,
}: FormSelectProps) => {
  const displayLabel = required ? `${label} *` : label;

  let placeholder;

  if (isLoading) {
    placeholder = 'Ladataan vaihtoehtoja…';
  } else if (reactQueryError) {
    placeholder = 'Virhe ladattaessa';
  } else {
    placeholder = 'Valitse kokoonpano';
  }

  const isDisabled = disabled || isLoading || !!reactQueryError;
  const errorMessage =
    hookFormError ||
    (reactQueryError ? 'Vaihtoehtojen lataus epäonnistui' : undefined);

  const id = `${register.name}-select`;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        <span className={errorMessage ? styles.error : undefined}>
          {errorMessage || displayLabel}
        </span>
      </label>

      <select
        id={id}
        className={styles.select}
        {...register}
        disabled={isDisabled}
        data-cy={cypress}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>

        {!isLoading &&
          !reactQueryError &&
          options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name_fi}
            </option>
          ))}
      </select>
    </div>
  );
};

export default FormSelect;
