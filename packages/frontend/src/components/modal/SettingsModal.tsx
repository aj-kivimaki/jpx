import ModeSwitcher from '../ModeSwitcher';
import LanguageSwitcher from '../LanguageSwitcher';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { site } from 'shared';
import styles from './SettingsModal.module.css';
import { useRef } from 'react';
import useLocalized from '../../hooks/useLocalized';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const SettingsModal = ({ open, onClose }: SettingsModalProps) => {
  const localize = useLocalized();
  // div element -> use HTMLDivElement for correct typing
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Call the focus-trap hook unconditionally to follow the Rules of Hooks.
  // HTMLDivElement is an HTMLElement; cast to satisfy the hook's RefObject<HTMLElement> parameter
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

      <div
        className={styles.modal}
        ref={modalRef}
        aria-modal="true"
        aria-labelledby="settings-modal-title"
      >
        <h2 className={styles.title} id="settings-modal-title">
          {localize(modalSection?.title)}
        </h2>

        <div className={styles.section}>
          <label className={styles.label}>
            {localize(modalSection?.theme.label)}
          </label>
          <ModeSwitcher />
        </div>

        <div className={styles.section}>
          <label className={styles.label}>
            {localize(modalSection?.language)}
          </label>
          <LanguageSwitcher />
        </div>

        <button className={styles.closeBtn} onClick={onClose}>
          {localize(modalSection?.close)}
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
