import styles from './FormInput.module.css';

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type?: 'text' | 'date' | 'time' | 'textarea';
  rows?: number;
  placeholder?: string;
  required: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  rows,
  placeholder,
  required,
}) => {
  if (required) {
    label = label + ' *';
  }
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows || 3}
          placeholder={placeholder}
          className={styles.textarea}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.input}
        />
      )}
    </div>
  );
};

export default FormInput;
