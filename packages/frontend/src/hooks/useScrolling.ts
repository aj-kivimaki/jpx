import { useEffect, useState } from 'react';

export default function useScrolling(offset: number = 1): boolean {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrolling(scrollTop > offset);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [offset]);

  return isScrolling;
}
