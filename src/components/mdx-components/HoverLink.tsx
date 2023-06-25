import { ReactNode } from 'react';
import { allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import HoverLinkEl from './HoverLinkEl';

interface Props {
  title: string;
  children: ReactNode;
}

export default function HoverLink({ title, children }: Props) {
  const HoverPost = allPosts.find(post => post._raw.flattenedPath === `post/${title}`);

  // HoverPost.title
  if (!HoverPost) {
    return notFound();
  }

  return (
    <HoverLinkEl HoverPost={HoverPost.body.code} title={title}>
      {children}
    </HoverLinkEl>
  );
}
