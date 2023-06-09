'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { UpIcon } from '@/styles/svgIcons';
import { scrollToTop } from '@/app/util';
import { useScrollTop } from '@/hooks/useScrollTop';

type heading = {
  level: number;
  text: string;
  slug: string;
};

type AsideProps = {
  headings: heading[];
  params: { slug: string };
  title: string;
};

export default function Aside({ headings, params, title }: AsideProps) {
  const isScrolled = useScrollTop();
  const marginReturn = (level: number) => {
    switch (level) {
      case 1:
        // 가장 상위 헤더이므로 마진을 주지 않음
        break;
      case 2:
        return { marginLeft: '10px' };
      case 3:
        return { marginLeft: '20px' };
      case 4:
      case 5:
      case 6:
        return { marginLeft: '30px' };
    }
  };

  let anchorPositions: number[] = [];
  const [headingBold, setHeadingBold] = useState<boolean[]>([]);

  useEffect(() => {
    function calculateAnchorPositions() {
      const anchor = document.querySelectorAll('.anchor');
      let anchorLocation = [];

      if (!anchor) return;

      for (let i = 0; i < anchor.length; i++) {
        anchorLocation.push(anchor[i].getBoundingClientRect().top + window.scrollY);
      }

      anchorPositions = anchorLocation;
    }

    calculateAnchorPositions();

    window.addEventListener('scroll', calculateAnchorPositions);

    return () => {
      window.removeEventListener('scroll', calculateAnchorPositions);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentYOffset = window.scrollY;
      const boldMapping = headings.map(() => false);

      for (let i = 0; i < headings.length; i++) {
        if (
          anchorPositions[i] - 95 - currentYOffset < 0 &&
          (i + 1 >= anchorPositions.length ||
            anchorPositions[i + 1] - 95 - currentYOffset >= 0)
        ) {
          boldMapping[i] = true;
          break;
        }
      }

      setHeadingBold(boldMapping);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);

  return (
    <>
      <aside className={styles.tocWrapper}>
        <div className={styles.toc}>
          <h3>{title}</h3>
          {headings.map((heading: heading, idx) => {
            return (
              <div key={`#${heading.slug}`} style={marginReturn(heading.level)}>
                <a
                  href={`${params.slug}#${heading.slug}`}
                  className={headingBold[idx] ? styles.tocBold : undefined}
                >
                  {heading.text}
                </a>
              </div>
            );
          })}
          <div className={styles.tocFooter}>
            <button className="round-btn" onClick={scrollToTop}>
              <UpIcon width="16px" />
            </button>
          </div>
        </div>
      </aside>
      <button
        className={`round-btn fixed-btn ${isScrolled ? 'visible' : 'invisible'}`}
        onClick={scrollToTop}
      >
        <UpIcon width={16} />
      </button>
    </>
  );
}
