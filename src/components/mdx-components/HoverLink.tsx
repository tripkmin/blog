import { ReactNode } from 'react';
import { allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import HoverLinkEl from './HoverLinkEl';
import { getBaseName } from '@/utils/util';

interface Props {
  title: string;
  children: ReactNode;
}

export default function HoverLink({ title, children }: Props) {
  const HoverPost = allPosts.find(post => post._raw.flattenedPath === `post/${title}`);

  if (!HoverPost) {
    return notFound();
  }

  return (
    <HoverLinkEl
      HoverPost={HoverPost.body.code}
      title={HoverPost.title}
      sourceFileName={getBaseName(HoverPost._raw.sourceFileName)}>
      {children}
    </HoverLinkEl>
  );
}
