import { useTranslation } from 'react-i18next';
import ModeSwitcher from '../ModeSwitcher';
import LanguageSwitcher from '../LanguageSwitcher';
import { type Language, site } from 'shared';
import styles from './SettingsModal.module.css';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const SettingsModal = ({ open, onClose }: SettingsModalProps) => {
  const { i18n } = useTranslation();

  if (!open) return null;

  const lang = i18n.language as Language;
  const { sections } = site;

  const modalSection = sections.find((s) => s.id === 'modal');

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) =>
    e.stopPropagation();

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={stopPropagation}>
        <h2 className={styles.title}>{modalSection?.title[lang]}</h2>

        <div className={styles.section}>
          <label className={styles.label}>{modalSection?.theme[lang]}</label>
          <ModeSwitcher />
        </div>

        <div className={styles.section}>
          <label className={styles.label}>{modalSection?.language[lang]}</label>
          <LanguageSwitcher />
        </div>

        <button className={styles.closeBtn} onClick={onClose}>
          {modalSection?.close[lang]}
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
