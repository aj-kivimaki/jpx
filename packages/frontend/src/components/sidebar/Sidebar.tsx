import { useRef } from 'react';
import { site, social } from 'shared';
import { FaInstagram, FaFacebook, FaYoutube, FaSpotify } from 'react-icons/fa';
import { CiSettings } from 'react-icons/ci';
import { FaCartShopping } from 'react-icons/fa6';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import styles from './Sidebar.module.css';
import LanguageSwitcher from '../LanguageSwitcher';
import useLocalized from '../../hooks/useLocalized';
import ModeSwitcher from '../ModeSwitcher';

// const SettingsModal = lazy(() => import('../modal/SettingsModal'));

const Sidebar = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const localize = useLocalized();

  const modalSection = site.sections.find((s) => s.id === 'modal');

  const openModal = () => {
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

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
        onClick={openModal}
      >
        <CiSettings />
      </button>
      {/* Modal */}
      <dialog ref={dialogRef} closedby="any">
        <h2 className={styles.title}>{localize(modalSection?.title)}</h2>

        <div className={styles.modalContent}>
          <div className={styles.section}>
            <h2 className={styles.label}>
              {localize(modalSection?.theme.label)}
            </h2>
            <ModeSwitcher />
          </div>
          <div className={styles.section}>
            <h2 className={styles.label}>{localize(modalSection?.language)}</h2>
            <LanguageSwitcher />
          </div>
        </div>
        <button className={styles.closeButton} onClick={closeModal}>
          <IoMdCloseCircleOutline />
        </button>
      </dialog>
    </div>
  );
};

export default Sidebar;
