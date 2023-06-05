'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
export default function TopBtn() {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 200) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  // 컴포넌트를 로드하자마자 스크롤 위치를 계산해 스크롤업 버튼 display 확인
  useEffect(() => {
    handleScroll();
  }, []);

  // 스크롤이 일어날 때 현재 스크롤 위치를 계산해 스크롤업 버튼 display 확인
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.topBtnWrapper}>
      <button
        onClick={scrollToTop}
        style={showButton ? { display: 'block' } : { display: 'none' }}
      >
        위로
      </button>
    </div>
  );
}
