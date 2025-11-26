import { useEffect, useState } from 'react';
import { scrollConfig } from 'shared/config/scroll';

const { threshold, label } = scrollConfig;

export default function useScrolling(offset: number = threshold): boolean {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrolling(scrollTop > offset);
    };

    window.addEventListener(label, handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener(label, handleScroll);
    };
  }, [offset]);

  return isScrolling;
}
