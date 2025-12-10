import type { HTMLInputTypeAttribute } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

import styles from './FormInput.module.css';

interface FormInputProps {
  label: string;
  register: UseFormRegisterReturn;
  type?: HTMLInputTypeAttribute | 'textarea';
  rows?: number;
  placeholder?: string;
  required: boolean;
  error?: string;
}

const FormInput = ({
  label,
  register,
  type = 'text',
  rows,
  placeholder,
  required,
  error,
}: FormInputProps) => {
  const displayLabel = required ? `${label} *` : label;
  const id = `${register.name}-input`;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        <span className={error ? styles.error : undefined}>
          {error || displayLabel}
        </span>
      </label>

      {type === 'textarea' ? (
        <textarea
          {...register}
          id={id}
          rows={rows || 3}
          placeholder={placeholder}
          className={styles.textarea}
          required={required}
        />
      ) : (
        <input
          {...register}
          id={id}
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
