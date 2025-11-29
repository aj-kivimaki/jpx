import { useTranslation } from 'react-i18next';
import ModeSwitcher from '../ModeSwitcher';
import LanguageSwitcher from '../LanguageSwitcher';
import { site, getLang } from 'shared';
import styles from './SettingsModal.module.css';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const SettingsModal = ({ open, onClose }: SettingsModalProps) => {
  const { i18n } = useTranslation();

  if (!open) return null;

  const lang = getLang(i18n);
  const { sections } = site;

  const modalSection = sections.find((s) => s.id === 'modal');

  const stopPropagation = (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => e.stopPropagation();

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      onKeyDown={onClose}
      role="presentation"
    >
      <div
        className={styles.modal}
        onClick={stopPropagation}
        onKeyDown={stopPropagation}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-modal-title"
      >
        <h2 className={styles.title} id="settings-modal-title">
          {modalSection?.title[lang]}
        </h2>

        <div className={styles.section}>
          <label className={styles.label}>
            {modalSection?.theme.label[lang]}
          </label>
          <ModeSwitcher />
        </div>

        <div className={styles.section}>
          <label className={styles.label}>{modalSection?.language[lang]}</label>
          <LanguageSwitcher />
        </div>

        <button
          className={styles.closeBtn}
          onClick={onClose}
          onKeyDown={onClose}
        >
          {modalSection?.close[lang]}
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
