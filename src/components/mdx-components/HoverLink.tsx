'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { allPosts } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { notFound } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { fontMono } from '@/libs/fonts';
import Link from 'next/link';
import CustomLink from './CustomLink';
import Pre from './Pre';
import { CloseIcon, OpenInFullIcon, OpenInNewIcon } from '@/styles/svgIcons';
import YoutubeDummy from './YoutubeDummy';

interface Props {
  title: string;
  children: ReactNode;
}

export default function HoverLink({ title, children }: Props) {
  const router = useRouter();
  const [isShowing, setIsShowing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const [transformValue, setTransformValue] = useState('0px');

  // 현재는 post에 있는 것만 뽑아서 쓴다는 가정하에 코드를 짜놨음.
  const currentPost = allPosts.find(post => post._raw.flattenedPath === `post/${title}`);
  const MDXLayout = useMDXComponent(currentPost ? currentPost.body.code : '');
  const components = {
    pre: Pre,
    YoutubeComponent: YoutubeDummy,
    a: CustomLink,
    HoverLink: HoverLink,
  };

  useEffect(() => {
    if (isHovered && spanRef.current) {
      const rect = spanRef.current.getBoundingClientRect();
      const hoverBoxWidth = 400;
      let width;
      let rectRight;
      let rectLeft;
      if (window.innerWidth > 768) {
        width = 768;
        rectRight = rect.right - (window.innerWidth - 768) / 2;
        rectLeft = rect.left - (window.innerWidth - 768) / 2;
      } else {
        width = window.innerWidth;
        rectRight = rect.right;
        rectLeft = rect.left;
      }

      const rightSpace = width - rectRight;
      const leftSpace = rectLeft;

      if (rightSpace > hoverBoxWidth) {
        setTransformValue(`${rectLeft}px`);
      } else if (leftSpace > hoverBoxWidth) {
        setTransformValue(`${rectRight - hoverBoxWidth - 25}px`);
      } else {
        setTransformValue(`${rectLeft / 26}px`);
      }
    }
  }, [isHovered]);

  if (!currentPost) {
    return notFound();
  }

  // const MDXLayout = useMDXComponent(currentPost.body.code);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    setIsHovered(true);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsShowing(true);
      hoverTimeoutRef.current = null;
    }, 500);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    setIsHovered(false);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsShowing(false);
      hoverTimeoutRef.current = null;
    }, 500);
  };

  return (
    <>
      <span
        ref={spanRef}
        style={{ position: 'relative' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <Link className="hover-link" href={`/post/${title}`}>
          {children}
        </Link>
        {isShowing ? (
          <div
            className={`hover-box-wrapper`}
            style={{ transform: `translateX(${transformValue})` }}>
            <div className="hover-link-header">
              <div className="hover-link-title-wrapper">
                <strong>{currentPost.title}</strong>
              </div>
              <div className="hover-link-btn-wrapper">
                <button
                  className="rect-btn"
                  onClick={() => {
                    router.push(`/post/${title}`);
                  }}>
                  <OpenInFullIcon width={16} />
                </button>
                <button
                  className="rect-btn"
                  onClick={() => {
                    setIsShowing(false);
                  }}>
                  <CloseIcon width={16} />
                </button>
              </div>
            </div>
            <div
              className="hover-box"
              // ref={hoverBoxRef}
            >
              <MDXLayout className={fontMono.className} components={components} />
            </div>
          </div>
        ) : null}
      </span>
      <button
        className="hover-link-btn rect-btn"
        onClick={() => {
          setIsShowing(true);
        }}>
        <OpenInNewIcon width={20} />
      </button>
    </>
  );
}
