import { contact, site } from 'shared/data';
import { sectionIds, type SiteLogo } from 'shared';
import useLocalized from '../../hooks/useLocalized';
import styles from './Footer.module.css';

const Footer = () => {
  const { logos: siteLogos, layout: siteLayout } = site;
  const { name, phone, email } = contact;

  const localize = useLocalized();

  const stagentLogo = siteLogos.find((logo: SiteLogo) => logo.id === 'stagent');
  const logoSrc = stagentLogo?.src ?? '';
  const logoAlt = localize(stagentLogo?.alt);

  const footerTitle = localize(siteLayout.footer.title);
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
