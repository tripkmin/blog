import styles from './page.module.css';
import Link from 'next/link';
import { GithubIcon, LogoIcon } from '@/styles/svgIcons';

export default function Footer() {
  return (
    <footer>
      <div>
        <p>© 2023 minoff blog Powered by Next.js, Vercel</p>
        {/* <LogoIcon width={100} height={100} /> */}

        <Link className="round-btn" href="https://github.com/tripkmin">
          <GithubIcon width={16} height={16} color="#797979" />
        </Link>
      </div>
    </footer>
  );
}
