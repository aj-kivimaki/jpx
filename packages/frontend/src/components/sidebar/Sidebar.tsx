import { lazy, useState } from 'react';
import { FaInstagram, FaFacebook, FaYoutube, FaSpotify } from 'react-icons/fa';
import { CiSettings } from 'react-icons/ci';
import { social } from 'shared';
import styles from './Sidebar.module.css';
import { FaCartShopping } from 'react-icons/fa6';

const SettingsModal = lazy(() => import('../modal/SettingsModal'));

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
          {link.key === 'shop' && <FaCartShopping />}
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
