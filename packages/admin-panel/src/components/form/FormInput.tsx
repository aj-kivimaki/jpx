import type { HTMLInputTypeAttribute } from 'react';
import styles from './FormInput.module.css';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps {
  label: string;
  name: string;
  register: UseFormRegisterReturn;
  type?: HTMLInputTypeAttribute;
  rows?: number;
  placeholder?: string;
  required: boolean;
  error?: string;
}

const FormInput = ({
  label,
  name,
  register,
  type = 'text',
  rows,
  placeholder,
  required,
  error,
}: FormInputProps) => {
  if (required) {
    label = label + ' *';
  }
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      {error && <p>{error}</p>}
      {type === 'textarea' ? (
        <textarea
          {...register}
          id={name}
          name={name}
          rows={rows || 3}
          placeholder={placeholder}
          className={styles.textarea}
        />
      ) : (
        <input
          {...register}
          placeholder={placeholder}
          type={type}
          className={styles.input}
          required={required}
        />
      )}
    </div>
  );
};

export default FormInput;
