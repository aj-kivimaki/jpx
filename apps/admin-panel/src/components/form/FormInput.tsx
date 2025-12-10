import type { HTMLInputTypeAttribute } from 'react';
import styles from './FormInput.module.css';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps {
  label: string;
  register: UseFormRegisterReturn;
  type?: HTMLInputTypeAttribute;
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

  // Derive a stable id from the registered field name when available
  const registeredName = (register as unknown as { name?: string }).name;
  const id = registeredName
    ? `${String(registeredName)}-input`
    : `${displayLabel.replace(/\s+/g, '-')}-input`;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <p>{displayLabel}</p>
        )}
      </label>

      {type === 'textarea' ? (
        <textarea
          {...register}
          id={id}
          rows={rows || 3}
          placeholder={placeholder}
          className={styles.textarea}
          defaultValue={''}
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
