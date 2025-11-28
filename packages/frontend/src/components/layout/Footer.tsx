import { useTranslation } from 'react-i18next';
import { contact, site } from 'shared/data';
import { sectionIds } from 'shared/config';
import type { SiteLogo } from 'shared/types/site';
import styles from './Footer.module.css';
import type { Language } from 'shared/types';

const Footer = () => {
  const { i18n } = useTranslation();
  const { logos, layout } = site;

  const lang = i18n.language as Language;
  const { logos, layout } = site;

  const stagentLogo = logos.find((logo: SiteLogo) => logo.id === 'stagent');
  const logoSrc = stagentLogo?.src ?? '';
  const logoAlt = stagentLogo?.alt?.[lang] ?? stagentLogo?.alt?.fi ?? '';

  const footerTitle = layout.footer.title[lang] ?? layout.footer.title.fi;
  const { name, phone, email } = contact;

  return (
    <div id={sectionIds.contact} className={styles.footer}>
      <div className={styles.stagentLogo}>
        <img src={logoSrc} alt={logoAlt} />
      </div>
      <div>
        <p>{footerTitle}:</p>
        <p>{name}</p>
        <p>{phone}</p>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default Footer;
