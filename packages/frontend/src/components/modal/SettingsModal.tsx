import { useTranslation } from 'react-i18next';
import ModeSwitcher from '../ModeSwitcher';
import LanguageSwitcher from '../LanguageSwitcher';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { site, getLang } from 'shared';
import styles from './SettingsModal.module.css';
import { useRef } from 'react';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const SettingsModal = ({ open, onClose }: SettingsModalProps) => {
  const { i18n } = useTranslation();
  const lang = getLang(i18n);
  // dialog element -> use HTMLDialogElement for correct typing
  const modalRef = useRef<HTMLDialogElement | null>(null);

  // Call the focus-trap hook unconditionally to follow the Rules of Hooks.
  // HTMLDialogElement is an HTMLElement; cast to satisfy the hook's RefObject<HTMLElement> parameter
  useFocusTrap(modalRef as React.RefObject<HTMLElement>, onClose);

  if (!open) return null;

  const modalSection = site.sections.find((s) => s.id === 'modal');
  if (!modalSection) return null;

  // No click-stop propagation needed because the overlay background is a
  // separate sibling element (a button). Clicks inside the modal won't reach
  // the background button.

  return (
    <div className={styles.overlayWrapper}>
      <button
        type="button"
        className={styles.overlayBackground}
        onClick={onClose}
        aria-label="Close settings"
      />

      <dialog
        className={styles.modal}
        ref={modalRef}
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

        <button className={styles.closeBtn} onClick={onClose}>
          {modalSection?.close[lang]}
        </button>
      </dialog>
    </div>
  );
};

export default SettingsModal;
