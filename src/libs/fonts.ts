import localFont from 'next/font/local';
import { JetBrains_Mono as FontMono } from 'next/font/google';

export const Pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
});

export const fontMono = FontMono({
  subsets: ['latin'],
  display: 'swap',
});
