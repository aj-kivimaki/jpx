import {
  contactJson,
  ContactSchema,
  errorIfMissing,
  parseRequired,
  sectionIds,
  siteJson,
  type SiteLogo,
  SiteSchema,
  warnIfMissing,
} from '@jpx/shared';

import useLocalized from '../../hooks/useLocalized';

import styles from './Footer.module.css';

const Footer = () => {
  const localize = useLocalized();

  const { logos: siteLogos, layout: siteLayout } = parseRequired(
    SiteSchema,
    siteJson,
    'Site'
  );
  const { name, phone, email } = parseRequired(
    ContactSchema,
    contactJson,
    'Contact'
  );

  const stagentLogo = errorIfMissing(
    siteLogos.find((logo: SiteLogo) => logo.id === 'stagent'),
    'Stagent logo not found in site configuration'
  );
  const logoSrc = errorIfMissing(
    stagentLogo.src,
    'Stagent logo source is required but missing'
  );

  const logoAlt = localize(
    warnIfMissing(stagentLogo.alt, 'Alt text missing for Stagent logo') ?? {
      fi: '',
      en: '',
    }
  );
  const footerTitle = localize(
    warnIfMissing(siteLayout.footer.title, 'Footer title missing') ?? {
      fi: '',
      en: '',
    }
  );

  return (
    <footer id={sectionIds.contact} className={styles.footer}>
      <div className={styles.stagentLogo}>
        <img src={logoSrc} alt={logoAlt} />
      </div>
      <div>
        <p>{footerTitle}:</p>
        <p>{name}</p>
        <p>{phone}</p>
        <p>{email}</p>
      </div>
    </footer>
  );
};

export default Footer;
