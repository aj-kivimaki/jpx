import { FaInstagram, FaFacebook, FaYoutube, FaSpotify } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import styles from './SocialSidebar.module.css';
import { socialLinks } from 'shared/data';

const SocialSidebar = () => {
  return (
    <div className={styles.socialSidebar}>
      {socialLinks.map((link) => (
        <a
          key={link.key}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.aria}
        >
          {link.key === 'instagram' && <FaInstagram />}
          {link.key === 'facebook' && <FaFacebook />}
          {link.key === 'youtube' && <FaYoutube />}
          {link.key === 'spotify' && <FaSpotify />}
          {link.key === 'shop' && <FaCartShopping />}
        </a>
      ))}
    </div>
  );
};

export default SocialSidebar;
