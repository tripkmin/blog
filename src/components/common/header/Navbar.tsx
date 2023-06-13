'use client';

import Link from 'next/link';
import styles from '@/styles/Navbar.module.css';
import { usePathname } from 'next/navigation';
import { MouseEvent, useEffect, useState } from 'react';
import { LogoIcon, MenuIcon } from '@/styles/svgIcons';
import ThemeBtn from './ThemeBtn';
import { useScrollTop } from '@/hooks/useScrollTop';

export default function Navbar() {
  const pathname = usePathname();
  const upperPath = pathname.split('/')[1];

  const [theme, setTheme] = useState<string>();
  const [isMobileWidth, setIsMobileWidth] = useState<boolean>();
  const [isOpen, setIsOpen] = useState<boolean>();
  const isScrolled = useScrollTop();

  useEffect(() => {
    function trackWidth() {
      const currentWidth = window.innerWidth;
      if (currentWidth < 700) {
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

  useEffect(() => {
    const theme = `; ${document.cookie}`.split(`; theme=`).pop()?.split(';')[0];
    if (theme === 'light' || theme === '') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  });

  return (
    <>
      <header>
        <nav className={`${isScrolled ? 'header-border' : ''}`}>
          <Link href="/">
            <LogoIcon width={60} color={theme === 'dark' ? '#fff' : '#222'} />
          </Link>
          <div
            className={styles.menuIconWrapper}
            onClick={() => {
              setIsOpen(prev => !prev);
            }}
          >
            <MenuIcon width={24} />
          </div>
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

            <ThemeBtn />
          </div>
        </nav>
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
              <ThemeBtn />
            </div>
          </div>
        </>
      ) : undefined}
    </>
  );
}
