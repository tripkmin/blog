'use client';

import styles from './page.module.css';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { DarkmodeIcon, LightmodeIcon } from '@/styles/svgIcons';

export default function ThemeBtn({
  theme,
  setTheme,
}: {
  theme: string | undefined;
  setTheme: Dispatch<SetStateAction<string | undefined>>;
}) {
  // const cookieTheme = `; ${document.cookie}`?.split(`; theme=`).pop()?.split(';')[0];

  const themeHandler = () => {
    if (theme === 'dark') {
      setTheme('light');
      document.cookie = `theme=light; Max-Age=${3600 * 24 * 400}; Path=/`;
      document.body.dataset.theme = 'light';
    } else {
      setTheme('dark');
      document.cookie = `theme=dark; Max-Age=${3600 * 24 * 400}; Path=/`;
      document.body.dataset.theme = 'dark';
    }
  };

  return (
    <button className={styles.themeToggleBtn} onClick={themeHandler}>
      {theme === 'dark' ? (
        <DarkmodeIcon width={16} height={16} color="#74b3e9" />
      ) : (
        <LightmodeIcon width={16} height={16} color="#fc941d" />
      )}
    </button>
  );
}
