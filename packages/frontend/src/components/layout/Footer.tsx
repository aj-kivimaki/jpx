import styles from './Footer.module.css';
import contact from 'shared/data/contact.json';
import { logos, layout } from 'shared/data/site.json';
import { sectionIds } from 'shared/config/sectionIds';

const Footer = () => {
  return (
    <div id={sectionIds.contact} className={styles.footer}>
      <div className={styles.stagentLogo}>
        <img src={logos.stagent.src} alt={logos.stagent.alt} />
      </div>
      <div>
        <p>{layout.footer.title}:</p>
        <p>{contact.booking.name}</p>
        <p>{contact.booking.phone}</p>
        <p>{contact.booking.email}</p>
      </div>
    </div>
  );
};

export default Footer;
