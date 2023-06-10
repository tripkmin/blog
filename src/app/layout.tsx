import '@/styles/globals.css';
import '@/styles/utils.css';
import '@/styles/code.css';
import Navbar from './Navbar';
import Footer from './Footer';
import GrainFilter from './GrainFilter';
import { Pretendard } from '@/libs/fonts';
import ThemeProvider from '@/components/ThemeProvider';

export const metadata = {
  title: 'minoff',
  description: '이근민의 개발 블로그입니다.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={Pretendard.className}>
        <ThemeProvider attribute="data-theme">
          <GrainFilter />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
