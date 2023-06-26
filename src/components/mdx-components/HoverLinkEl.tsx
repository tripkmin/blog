'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { useRouter } from 'next/navigation';
import { fontMono } from '@/libs/fonts';
import Link from 'next/link';
import CustomLink from './CustomLink';
import Pre from './Pre';
import { CloseIcon, OpenInFullIcon, OpenInNewIcon } from '@/styles/svgIcons';
import YoutubeDummy from './YoutubeDummy';
import HoverLinkDummy from './HoverLinkDummy';
import Code from './Code';
import UnderLine from './UnderLine';
import Alert from './Alert';
import FigCaption from './FigCaption';

interface Props {
  title: any;
  HoverPost?: any;
  children: ReactNode;
}

export default function HoverLinkEl({ HoverPost, children, title }: Props) {
  const router = useRouter();
  const [isShowing, setIsShowing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [transformValue, setTransformValue] = useState('0px');
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  const components = {
    pre: Pre,
    YoutubeComponent: YoutubeDummy,
    a: CustomLink,
    HoverLink: HoverLinkDummy,
    code: Code,
    u: UnderLine,
    Alert: Alert,
    Cap: FigCaption,
  };

  const MDXLayout = useMDXComponent(HoverPost);

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

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (spanRef.current && !spanRef.current.contains(e.target as Node)) {
        setIsShowing(false);
        setIsHovered(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [spanRef]);

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
                {/* <strong>{title}</strong> */}
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
            <div className="hover-box">
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
