import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  title: any;
  children: ReactNode;
}

export default function HoverLinkDummy({ title, children }: Props) {
  return (
    <Link className="hover-link" href={`/post/${title}`}>
      {children}
    </Link>
  );
}
