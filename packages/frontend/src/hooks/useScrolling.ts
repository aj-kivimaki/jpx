import { useEffect, useState } from 'react';
import { scrollConfig } from 'shared';

const { threshold, label } = scrollConfig;

export default function useScrolling(offset: number = threshold): boolean {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrolling(scrollTop > offset);
    };

    globalThis.addEventListener(label, handleScroll);
    handleScroll();

    return () => {
      globalThis.removeEventListener(label, handleScroll);
    };
  }, [offset]);

  return isScrolling;
}
