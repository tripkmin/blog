import { fontMono } from '@/libs/fonts';
import { ReactNode } from 'react';
import styles from '@/styles/contents.module.css';

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export default function Code({ children, ...props }: CodeProps) {
  const noProps = Object.keys(props).length === 0;

  if (noProps) {
    return (
      <code className={`${fontMono.className} ${styles.inlineCode}`}>{children}</code>
    );
  }

  return (
    <code className={`${fontMono.className} ${styles.inlineCode}`} {...props}>
      {children}
    </code>
  );
}
