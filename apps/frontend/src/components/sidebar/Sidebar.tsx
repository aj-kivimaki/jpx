import { useRef } from 'react';
import { CiSettings } from 'react-icons/ci';
import { FaFacebook, FaInstagram, FaSpotify, FaYoutube } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { siteJson, SiteSchema, socialJson, SocialSchema } from '@jpx/shared';

import useLocalized from '../../hooks/useLocalized';
import { errorIfMissing, parseRequired } from '../../utils';
import LanguageSwitcher from '../language/LanguageSwitcher';
import ModeSwitcher from '../theme/ModeSwitcher';

import styles from './Sidebar.module.css';

const Sidebar = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const localize = useLocalized();

  const { sections } = parseRequired(SiteSchema, siteJson, 'Site');
  const social = parseRequired(SocialSchema, socialJson, 'Social Links');

  const modalSection = errorIfMissing(
    sections.find((s) => s.id === 'modal'),
    'Modal section'
  );

  const openModal = () => {
    if (dialogRef.current) dialogRef.current.showModal();
  };

  const closeModal = () => {
    if (dialogRef.current) dialogRef.current.close();
  };

  return (
    <aside className={styles.sidebar}>
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
        <h2 className={styles.title}>{localize(modalSection.title)}</h2>

        <div className={styles.modalContent}>
          <div className={styles.section}>
            <h2 className={styles.label}>
              {localize(modalSection.theme.label)}
            </h2>
            <ModeSwitcher />
          </div>
          <div className={styles.section}>
            <h2 className={styles.label}>{localize(modalSection.language)}</h2>
            <LanguageSwitcher />
          </div>
        </div>
        <button className={styles.closeButton} onClick={closeModal}>
          <IoMdCloseCircleOutline />
        </button>
      </dialog>
    </aside>
  );
};

export default Sidebar;
