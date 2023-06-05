'use client';

import Link from 'next/link';
import './globals.css';
import localFont from 'next/font/local';
import { Inter as FontSans, JetBrains_Mono as FontMono } from 'next/font/google';
import Image from 'next/image';
import styles from './page.module.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect, useLayoutEffect, useState } from 'react';
// import { cookies } from 'next/headers';

export const metadata = {
  title: 'kmlog',
  description: '이근민의 개발 블로그입니다.',
};

export const Pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
});

export const fontSans = FontSans({
  subsets: ['latin'],
  display: 'swap',
});

export const fontMono = FontMono({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // const [theme, setTheme] = useState<string>();

  // 왜 deps에는 window 객체를 못 찾는다고 나오지?
  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme === 'light' || localTheme === null) {
      document.body.dataset.theme = 'light';
    } else {
      document.body.dataset.theme = 'dark';
    }
  }, [window?.localStorage.getItem('theme')]);
  // }, [window?.localStorage.getItem('theme')]);

  return (
    <html lang="ko">
      <body
        className={Pretendard.className}
        // data-theme={theme}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
