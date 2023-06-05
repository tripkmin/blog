'use client';
import Image from 'next/image';
import styles from './page.module.css';
import { useState } from 'react';

export default function ThemeBtn() {
  return (
    <button className={styles.themeToggleBtn} onClick={() => {}}>
      <Image src="/icon/lightmode.svg" alt="theme toggle btn" width={16} height={16} />
    </button>
  );
}
