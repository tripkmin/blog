import { useEffect, useState } from 'react';

export const useScrollTop = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>();

  useEffect(() => {
    function trackYOffset() {
      const currentYOffset = window.scrollY;
      if (currentYOffset > 50) {
        // 0이 아닐때
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    trackYOffset();

    window.addEventListener('scroll', trackYOffset);
    return () => {
      window.removeEventListener('scroll', trackYOffset);
    };
  }, []);

  return isScrolled;
};
