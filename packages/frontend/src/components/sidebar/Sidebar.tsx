import { useState } from 'react';
import { FaInstagram, FaFacebook, FaYoutube, FaSpotify } from 'react-icons/fa';
import { CiSettings } from 'react-icons/ci';
import { social } from 'shared/data';
import styles from './Sidebar.module.css';
import SettingsModal from '../modal/SettingsModal';

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div className={styles.sidebar}>
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
      <div className={styles.divider} />
      <button
        className={styles.options}
        aria-label="Options"
        onClick={() => setIsModalOpen(true)}
      >
        <CiSettings />
      </button>
      {/* Modal */}
      <SettingsModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Sidebar;
