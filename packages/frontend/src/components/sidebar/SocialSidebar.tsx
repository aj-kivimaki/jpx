import { FaInstagram, FaFacebook, FaYoutube, FaSpotify } from 'react-icons/fa';
import styles from './SocialSidebar.module.css';
import { social } from 'shared/data';

const SocialSidebar = () => {
  return (
    <div className={styles.socialSidebar}>
      {social.map((link) => (
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
          {/* Shop link here - FaCartShopping from 'react-icons/fa6' */}
        </a>
      ))}
    </div>
  );
};

export default SocialSidebar;
