import type { UseFormRegisterReturn } from 'react-hook-form';
import styles from './FormSelect.module.css';
import type { DbLineupOption } from '@jpx/shared';

interface FormSelectProps {
  label: string;
  options: DbLineupOption[];
  register: UseFormRegisterReturn;
  required: boolean;
  hookFormError?: string;
  reactQueryError?: Error | null;
  disabled?: boolean;
  isLoading?: boolean;
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  options,
  register,
  required,
  hookFormError,
  reactQueryError,
  disabled,
  isLoading,
}) => {
  const displayLabel = required ? `${label} *` : label;

  let placeholder = 'Valitse kokoonpano';
  if (isLoading) placeholder = 'Ladataan vaihtoehtoja…';
  else if (reactQueryError) placeholder = 'Virhe ladattaessa';

  const isDisabled = disabled || isLoading || !!reactQueryError;
  const errorMessage =
    hookFormError ||
    (reactQueryError ? 'Vaihtoehtojen lataus epäonnistui' : undefined);

  const id = `${register.name}-select`;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {errorMessage ? (
          <p className={styles.error}>{errorMessage}</p>
        ) : (
          <p>{displayLabel}</p>
        )}
      </label>

      <select
        id={id}
        className={styles.select}
        {...register}
        disabled={isDisabled}
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
