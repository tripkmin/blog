'use client';

import styles from './page.module.css';
import { DarkmodeIcon, LightmodeIcon } from '@/styles/svgIcons';
import { useTheme } from 'next-themes';

export default function ThemeBtn() {
  const { theme, setTheme } = useTheme();
  const themeHandler = () => {
    theme == 'dark' ? setTheme('light') : setTheme('dark');
  };

  return (
    <>
      <button
        className={`${styles.themeToggleBtn} ${styles.lightmodeBtn}`}
        onClick={themeHandler}
      >
        <LightmodeIcon width={16} height={16} color="#fc941d" />
      </button>
      <button
        className={`${styles.themeToggleBtn} ${styles.darkmodeBtn}`}
        onClick={themeHandler}
      >
        <DarkmodeIcon width={16} height={16} color="#74b3e9" />
      </button>
    </>
  );
}
