import type { UseFormRegisterReturn } from 'react-hook-form';
import styles from './FormSelect.module.css';
import type { DbLineupOption } from '@jpx/shared';

interface FormSelectProps {
  label: string;
  name: string;
  options: DbLineupOption[];
  register: UseFormRegisterReturn;
  required: boolean;
  error?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  options,
  register,
  required,
  error,
}) => {
  if (required) {
    label = label + ' *';
  }

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      {error && <p>{error}</p>}
      <select id={name} className={styles.select} {...register}>
        <option value="" disabled hidden>
          Valitse kokoonpano
        </option>

        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name_fi}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
