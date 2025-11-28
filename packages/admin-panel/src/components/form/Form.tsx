import { useState } from 'react';
import FormField from './FormInput';
import SelectField from './FormSelect';
import styles from './Form.module.css';
import LogoutButton from '../auth/LogoutButton';
import { lineupOptions } from 'shared/schemas';

const lineupOptionsWithPlaceholder = ['Valitse kokoonpano', ...lineupOptions];

const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    lineup: 'Valitse kokoonpano',
    venue: '',
    city: '',
    notes: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <h1 className={styles.title}>J. Partynen</h1>
        <button className={styles.logout}>
          <LogoutButton />
        </button>
      </div>
      <div className={styles.fields}>
        <FormField
          label="Päivänmäärä"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required={true}
        />
        <FormField
          label="Kellonaika"
          name="time"
          type="time"
          value={formData.time}
          onChange={handleChange}
          required={true}
        />
        <SelectField
          label="Kokoonpano"
          name="lineup"
          value={formData.lineup}
          onChange={handleChange}
          options={lineupOptionsWithPlaceholder}
          required={true}
        />
        <FormField
          label="Keikkapaikka"
          name="venue"
          placeholder="ei pakollinen"
          value={formData.venue}
          onChange={handleChange}
          required={false}
        />
        <FormField
          label="Kaupunki"
          name="city"
          placeholder="ei pakollinen"
          value={formData.city}
          onChange={handleChange}
          required={false}
        />
        <FormField
          label="Huomioitavaa"
          name="notes"
          value={formData.notes}
          placeholder='esim. "Yksityistilaisuus"'
          onChange={handleChange}
          required={false}
        />
        <button type="submit" className={styles.button}>
          Lisää keikka
        </button>
      </div>
    </form>
  );
};

export default Form;
