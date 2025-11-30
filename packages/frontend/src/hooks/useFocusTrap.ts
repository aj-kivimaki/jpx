import { useEffect, type RefObject } from 'react';

/**
 * Hook: useFocusTrap
 *
 * Traps keyboard focus within a container (typically a modal or dialog) and
 * closes the container when the Escape key is pressed. On mount the hook
 * focuses the first focusable element inside the container.
 *
 * SSR / safety: DOM access is guarded by checking `containerRef.current`, so
 * the hook is safe to import in environments where `document` may be absent.
 *
 * Usage:
 * const ref = useRef<HTMLElement | null>(null);
 * useFocusTrap(ref, () => setOpen(false));
 *
 * @param containerRef - RefObject pointing to the container element
 * @param onClose - Callback invoked when Escape is pressed (should hide/close)
 */
export const useFocusTrap = (
  containerRef: RefObject<HTMLElement>,
  onClose: () => void
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;

      const focusableEls = containerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusableEls[0];
      const last = focusableEls[focusableEls.length - 1];

      // Escape closes the modal
      if (e.key === 'Escape') onClose();

      // Focus trap
      if (e.key === 'Tab' && focusableEls.length > 0) {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [containerRef, onClose]);

  // Focus first element on mount
  useEffect(() => {
    const firstFocusable = containerRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();
  }, [containerRef]);
};
