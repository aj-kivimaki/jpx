import React, { useState } from 'react';
import FormField from './formComponents/FormField';
import SelectField from './formComponents/SelectField';
import styles from './Form.module.css';

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

  const lineupOptions = ['Valitse kokoonpano', 'SOOLO', 'DUO', 'TRIO', 'BÄNDI'];

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.header}>J. Partynen</h1>
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
          options={lineupOptions}
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
