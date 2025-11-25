import { FaInstagram, FaFacebook, FaYoutube, FaSpotify } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import styles from './SocialSidebar.module.css';

const SocialSidebar = () => {
  return (
    <div className={styles.socialSidebar}>
      <a
        href="https://www.instagram.com/j.partynen"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Avaa J. Partysen Instagram"
      >
        <FaInstagram />
      </a>
      <a
        href="https://www.facebook.com/jpartynen"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Avaa J. Partysen Facebook"
      >
        <FaFacebook />
      </a>
      <a
        href="https://www.youtube.com/@jpartynen"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Avaa J. Partysen YouTube"
      >
        <FaYoutube />
      </a>
      <a
        href="https://open.spotify.com/artist/5ZAj9VTFP2pdBWtWRLDNIL"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Avaa J. Partysen Spotify"
      >
        <FaSpotify />
      </a>
      <a
        href="#shop"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Avaa J. Partysen kauppa"
      >
        <FaCartShopping />
      </a>
    </div>
  );
};

export default SocialSidebar;
