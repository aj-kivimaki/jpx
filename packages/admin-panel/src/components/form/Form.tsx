import { useState, type ChangeEvent, type FormEvent } from 'react';
import FormField from './FormInput';
import SelectField from './FormSelect';
import styles from './Form.module.css';
import LogoutButton from '../auth/LogoutButton';
import { lineupOptions } from 'shared';

const initialFormData = {
  id: '',
  date: '',
  time: '',
  lineup: '',
  venue: '',
  city: '',
  notes: '',
};

const Form = () => {
  const [formData] = useState(initialFormData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log('Field changed:', name, value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
  };

  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <h1 className={styles.title}>J. Partynen</h1>
        <div className={styles.logout}>
          <LogoutButton />
        </div>
      </div>
      <form onSubmit={handleSubmit} className={styles.fields}>
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
          options={lineupOptions}
          required={true}
        />
        <FormField
          label="Keikkapaikka"
          name="venue"
          placeholder="...eli venue"
          value={formData.venue}
          onChange={handleChange}
          required={false}
        />
        <FormField
          label="Kaupunki"
          name="city"
          placeholder="...tai kunta"
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
      </form>
    </div>
  );
};

export default Form;
