import { useEffect, useState } from 'react';
import { scrollConfig } from '@jpx/shared';

const { threshold, label } = scrollConfig;

export default function useScrolling(offset: number = threshold): boolean {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = (): void => {
      const scrollTop =
        globalThis.window?.scrollY ??
        globalThis.document?.documentElement.scrollTop ??
        0;

      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolling(scrollTop > offset);
          ticking = false;
        });
        ticking = true;
      }
    };

    globalThis.addEventListener(label, handleScroll);
    handleScroll(); // initial check

    return () => {
      globalThis.removeEventListener(label, handleScroll);
    };
  }, [offset]);

  return isScrolling;
}
