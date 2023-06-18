'use client';

import styles from '@/styles/PostDetail.module.css';
import { useEffect, useRef, useState } from 'react';
import { ExpandMoreIcon } from '@/styles/svgIcons';
import { marginReturn } from '@/utils/util';

interface heading {
  level: number;
  text: string;
  slug: string;
}

interface AsideProps {
  headings: heading[];
  params: { slug: string };
  title: string;
}

export default function PostSubHeader({ headings, params, title }: AsideProps) {
  const [isTocOpen, setIsTocOpen] = useState(false);
  let anchorPositions: number[] = [];
  const [headingBold, setHeadingBold] = useState<boolean[]>([]);

  // 게시글 안의 Heading들의 위치를 찾아 anchorPositions에 넣어주는 훅
  useEffect(() => {
    function calculateAnchorPositions() {
      const anchor = document.querySelectorAll('.anchor');
      let anchorLocation = [];

      if (!anchor) return;

      for (let i = 0; i < anchor.length; i++) {
        // 각 anchor들의 절대 위치를 계산해서 anchorLocation에 삽입함
        // ex:) [50, 170, 310, 690]
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

  // 현재 Viewbox 상단에서 95px 밑 지점을 기준으로 보고 있는 anchor의 위치를 계산해서 headingBold에 삽입
  // ex: 현재 3번째 헤딩을 보고 있는 경우 [false, false, true, false]
  useEffect(() => {
    const handleScroll = () => {
      const currentYOffset = window.scrollY;
      const boldMapping = headings.map(() => false);

      for (let i = 0; i < headings.length; i++) {
        if (
          anchorPositions[i] - 95 - currentYOffset < 0 &&
          // 만약 i + 1가 anchorPosition의 총 길이보다 길다면 || 뒤의 평가를 수행하지 않고 바로 true를 뱉어냄.
          // 만약 i + 1가 anchorPosition의 총 길이보다 짧다면 || 뒤의 평가를 수행함.
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

  const activeHeadingIndex = headingBold.findIndex(el => el);
  const activeHeadingText =
    activeHeadingIndex !== -1 ? headings[activeHeadingIndex].text : '목차';

  const clickRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (clickRef.current && !clickRef.current.contains(event.target as Node)) {
        setIsTocOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const onHashChanged = () => {
      setIsTocOpen(false);
    };

    window.addEventListener('hashchange', onHashChanged);

    return () => {
      window.removeEventListener('hashchange', onHashChanged);
    };
  }, []);

  return (
    <div className={styles.subHeaderWrapper} ref={clickRef}>
      <div className={styles.subHeader}>
        <strong>{activeHeadingText}</strong>
        <button
          type="button"
          className="plain-btn"
          onClick={() => {
            setIsTocOpen(prev => !prev);
          }}
        >
          <ExpandMoreIcon width={24} />
        </button>
      </div>
      <div
        className={
          isTocOpen
            ? `${styles.tocShow} ${styles.subHeaderToc}`
            : `${styles.tocHidden} ${styles.subHeaderToc}`
        }
        // ref={clickRef}
      >
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
      </div>
    </div>
  );
}
