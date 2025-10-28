import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaSpotify,
  FaShopify,
} from 'react-icons/fa';
import styles from './SocialSidebar.module.css';

const SocialSidebar = () => {
  return (
    <div className={styles.socialSidebar}>
      <a
        href="https://www.instagram.com/j.partynen"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram />
      </a>
      <a
        href="https://www.facebook.com/jpartynen"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebook />
      </a>
      <a
        href="https://www.youtube.com/@jpartynen"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaYoutube />
      </a>
      <a
        href="https://open.spotify.com/artist/5ZAj9VTFP2pdBWtWRLDNIL"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaSpotify />
      </a>
      <a href="#shop" target="_blank" rel="noopener noreferrer">
        <FaShopify />
      </a>
    </div>
  );
};

export default SocialSidebar;
