import { ReactNode } from 'react';
import styles from '@/styles/contents.module.css';

interface UnderLineProps extends React.HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export default function UnderLine({ children }: UnderLineProps) {
  return <u className={styles.underLine}>{children}</u>;
}
