import {
  contact,
  site,
  sectionIds,
  type SiteLogo,
  makeError,
  logger,
} from '@jpx/shared';
import useLocalized from '../../hooks/useLocalized';
import styles from './Footer.module.css';

const Footer = () => {
  const { logos: siteLogos, layout: siteLayout } = site;
  const { name, phone, email } = contact;

  const localize = useLocalized();

  const stagentLogo = siteLogos.find((logo: SiteLogo) => logo.id === 'stagent');
  if (!stagentLogo) {
    const err = makeError(
      'Stagent logo not found in site configuration',
      'NOT_FOUND'
    );
    err.__logged = true;
    logger.error(err);
  }

  const logoSrc = stagentLogo?.src ?? '';
  const logoAlt = localize(stagentLogo?.alt);
  if (!logoAlt) {
    const err = makeError('Alt text missing for Stagent logo', 'NOT_FOUND');
    err.__logged = true;
    logger.warn(err);
  }

  const footerTitle = localize(siteLayout.footer.title);

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
