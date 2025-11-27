import React from 'react';
import styles from './Footer.module.css';
import contact from 'shared/data/contact.json';
import { logos, layout } from 'shared/data/site.json';
import { sectionIds } from 'shared/config/sectionIds';
import { useTranslation } from 'react-i18next';

interface Logo {
  id: string;
  src: string;
  alt: { [lang: string]: string };
}

interface FooterLayout {
  header: {
    title: { [lang: string]: string };
  };
  footer: {
    title: { [lang: string]: string };
  };
}

interface ContactInfo {
  booking: {
    name: string;
    phone: string;
    email: string;
  };
}

const Footer: React.FC = () => {
  const { i18n } = useTranslation();

  // Get Stagent logo
  const stagentLogo = (logos as Logo[]).find((logo) => logo.id === 'stagent');
  const logoSrc = stagentLogo?.src ?? '';
  const logoAlt =
    stagentLogo?.alt?.[i18n.language] ?? stagentLogo?.alt?.['fi'] ?? '';

  const footerTitle =
    (layout as FooterLayout).footer.title[i18n.language] ??
    (layout as FooterLayout).footer.title['fi'];

  const booking: ContactInfo['booking'] = contact.booking;

  return (
    <div id={sectionIds.contact} className={styles.footer}>
      <div className={styles.stagentLogo}>
        <img src={logoSrc} alt={logoAlt} />
      </div>
      <div>
        <p>{footerTitle}:</p>
        <p>{booking.name}</p>
        <p>{booking.phone}</p>
        <p>{booking.email}</p>
      </div>
    </div>
  );
};

export default Footer;
