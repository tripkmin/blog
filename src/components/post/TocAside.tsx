'use client';

import { useEffect, useState } from 'react';
import styles from '@/styles/PostDetail.module.css';
import { UpIcon } from '@/styles/svgIcons';
import { scrollToTop } from '@/utils/util';

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

export default function TocAside({ headings, params, title }: AsideProps) {
  const marginReturn = (level: number) => {
    switch (level) {
      case 1:
      case 2:
        // h1, h2에는 마진을 반환하지 않습니다.
        break;
      case 3:
        return { marginLeft: '10px' };
      case 4:
      case 5:
      case 6:
        return { marginLeft: '20px' };
      default:
        // 그 이외의 값에는 전부 마진을 반환하지 않습니다.
        break;
    }
  };

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
    </>
  );
}
