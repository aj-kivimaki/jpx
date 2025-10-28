import { useEffect, useState } from 'react';

/**
 * Custom hook to detect if the user has scrolled past a certain offset.
 * @param offset - Number of pixels to scroll before returning true (default: 10)
 * @returns boolean - True if scrolled past the offset
 */
export default function useIsScrolling(offset: number = 10): boolean {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrolling(scrollTop > offset);
    };

    window.addEventListener('scroll', handleScroll);
    // Check once on mount (in case page loads mid-scroll)
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [offset]);

  return isScrolling;
}
