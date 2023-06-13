'use client';

import { useScrollTop } from '@/hooks/useScrollTop';
import { UpIcon } from '@/styles/svgIcons';
import { scrollToTop } from '@/utils/util';
export default function TopBtn() {
  const isScrolled = useScrollTop();

  return (
    <button
      className={`round-btn fixed-btn ${
        isScrolled ? 'visible controllable' : 'invisible uncontrollable'
      }`}
      onClick={scrollToTop}
    >
      <UpIcon width={16} />
    </button>
  );
}
