'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { cookies } from 'next/headers';
import { MouseEvent, useEffect, useState } from 'react';
import {
  CalendarIcon,
  DarkmodeIcon,
  LightmodeIcon,
  LogoIcon,
  MenuIcon,
} from '@/styles/svgIcons';

export default function Navbar() {
  const pathname = usePathname();
  const upperPath = pathname.split('/')[1];

  const [themeMode, setThemeMode] = useState(localStorage.getItem('theme'));
  const [isScrolled, setIsScrolled] = useState<boolean>();
  const [isMobileWidth, setIsMobileWidth] = useState<boolean>();
  const [isOpen, setIsOpen] = useState<boolean>();

  const themeModeHandle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
  };

  // 쿠키, 서버 사이드에서 받아올 때 바로 된다는 장점. 로컬 스토리지를 이용해서도 하던데 이거 13 버전에서 어떻게 적용하지?
  useEffect(() => {
    if (themeMode === 'light' || themeMode === null) {
      window.localStorage.setItem('theme', 'light');
      document.body.dataset.theme = 'light';
    } else {
      window.localStorage.setItem('theme', 'dark');
      document.body.dataset.theme = 'dark';
    }
  }, [themeMode]);

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

  useEffect(() => {
    function trackWidth() {
      const currentWidth = window.innerWidth;
      if (currentWidth < 700) {
        // 0이 아닐때
        setIsMobileWidth(true);
      } else {
        setIsMobileWidth(false);
      }
    }

    trackWidth();

    window.addEventListener('resize', trackWidth);

    return () => {
      window.removeEventListener('resize', trackWidth);
    };
  }, []);

  const isClickOuter = (e: MouseEvent<HTMLDivElement>) => {
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // 전역에서 쓰지 않을 것들은 page.moudle.css로 빼든지 할 것.
  // 아니면 styles 폴더 잡아서 아예 컴포넌트화 시키고 그걸 빼는 방식으로 가든가 할 것.
  return (
    <>
      <header>
        {isMobileWidth ? (
          <>
            <nav className={`${isScrolled ? 'header-border' : ''}`}>
              <Link href="/">
                <LogoIcon color={themeMode === 'dark' ? '#fff' : '#222'} />
              </Link>
              <div
                className={styles.menuIconWrapper}
                onClick={() => {
                  setIsOpen(prev => !prev);
                }}
              >
                <MenuIcon width={24} />
              </div>
            </nav>
          </>
        ) : (
          <>
            <nav className={`${isScrolled ? 'header-border' : ''}`}>
              <Link href="/">
                <LogoIcon color={themeMode === 'dark' ? '#fff' : '#222'} />
              </Link>

              <div className={styles.categoryWrapper}>
                <h3>
                  <Link href="/" className={upperPath === '' ? styles.currentPage : ''}>
                    홈
                  </Link>
                </h3>
                <h3>
                  <Link
                    href="/project"
                    className={upperPath === 'project' ? styles.currentPage : ''}
                  >
                    프로젝트
                  </Link>
                </h3>
                <h3>
                  <Link
                    href="/post"
                    className={upperPath === 'post' ? styles.currentPage : ''}
                  >
                    포스트
                  </Link>
                </h3>
                <h3>
                  <Link
                    href="/about"
                    className={upperPath === 'about' ? styles.currentPage : ''}
                  >
                    소개
                  </Link>
                </h3>
                <div className={styles.verticalBorder}></div>

                <button className={styles.themeToggleBtn} onClick={themeModeHandle}>
                  {themeMode === 'dark' ? (
                    <DarkmodeIcon width={16} height={16} color="#74b3e9" />
                  ) : (
                    <LightmodeIcon width={16} height={16} color="#fc941d" />
                  )}
                </button>
              </div>
            </nav>
          </>
        )}
      </header>
      {isMobileWidth ? (
        <>
          <div
            className={`${styles.mobileCategoryBack} ${isOpen ? styles.blurOn : ''}`}
            onClick={isClickOuter}
          ></div>
          <div className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
            <div className={styles.mobileCategoryWrapper}>
              <h3>
                <Link href="/" className={upperPath === '' ? styles.currentPage : ''}>
                  홈
                </Link>
              </h3>
              <h3>
                <Link
                  href="/project"
                  className={upperPath === 'project' ? styles.currentPage : ''}
                >
                  프로젝트
                </Link>
              </h3>
              <h3>
                <Link
                  href="/post"
                  className={upperPath === 'post' ? styles.currentPage : ''}
                >
                  포스트
                </Link>
              </h3>
              <h3>
                <Link
                  href="/about"
                  className={upperPath === 'about' ? styles.currentPage : ''}
                >
                  소개
                </Link>
              </h3>
            </div>
            <div className={styles.mobileBtnWrapper}>
              <button className={styles.themeToggleBtn} onClick={themeModeHandle}>
                {themeMode === 'dark' ? (
                  <DarkmodeIcon width={16} height={16} color="#74b3e9" />
                ) : (
                  <LightmodeIcon width={16} height={16} color="#fc941d" />
                )}
              </button>
            </div>
          </div>
        </>
      ) : undefined}
    </>
  );
}
