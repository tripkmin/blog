import '@/styles/globals.css';
import '@/styles/utils.css';
import '@/styles/code.css';
import localFont from 'next/font/local';
import { JetBrains_Mono as FontMono } from 'next/font/google';
import Navbar from './Navbar';
import Footer from './Footer';
import { cookies } from 'next/headers';
import GrainFilter from './GrainFilter';

export const metadata = {
  title: 'minoff',
  description: '이근민의 개발 블로그입니다.',
};

export const Pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
});

// export const fontSans = FontSans({
//   subsets: ['latin'],
//   display: 'swap',
// });

export const fontMono = FontMono({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookiesStore = cookies();
  const theme = cookiesStore.get('theme')?.value;
  const bodyTheme = theme === 'dark' ? 'dark' : 'light';

  return (
    <html lang="ko">
      <body className={Pretendard.className} data-theme={bodyTheme}>
        <GrainFilter />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
