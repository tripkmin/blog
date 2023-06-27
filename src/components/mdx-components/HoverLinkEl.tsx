'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fontMono } from '@/libs/fonts';
import Link from 'next/link';
import { CloseIcon, OpenInFullIcon, OpenInNewIcon } from '@/styles/svgIcons';
import { HoverComponents, useMDXLayout } from '.';
import useDebounce from '@/hooks/useDebounce';

interface Props {
  HoverPost?: any;
  title: any;
  sourceFileName: string;
  children: ReactNode;
}

export default function HoverLinkEl({
  HoverPost,
  title,
  sourceFileName,
  children,
}: Props) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const debouncedIsHovered = useDebounce(isHovered, 300);
  const [transformValue, setTransformValue] = useState('0px');
  const spanRef = useRef<HTMLSpanElement>(null);
  const MDXLayout = useMDXLayout(HoverPost);

  // HoverLinkBox가 나타나는 좌표를 계산해 반영함.
  useEffect(() => {
    if (isHovered && spanRef.current) {
      const rect = spanRef.current.getBoundingClientRect();
      const hoverBoxWidth = 400;
      const contentAreaWidth = 768;
      let width;
      let rectRight;
      let rectLeft;
      if (window.innerWidth > contentAreaWidth) {
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
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (spanRef.current && !spanRef.current.contains(e.target as Node)) {
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
        <Link className="hover-link" href={`/post/${sourceFileName}`}>
          {children}
        </Link>
        {debouncedIsHovered ? (
          <div
            className={`hover-box-wrapper`}
            style={{ transform: `translateX(${transformValue})` }}>
            <div className="hover-link-header">
              <div className="hover-link-title-wrapper">
                <strong>{title}</strong>
              </div>
              <div className="hover-link-btn-wrapper">
                <button
                  className="rect-btn"
                  onClick={() => {
                    router.push(`/post/${sourceFileName}`);
                  }}>
                  <OpenInFullIcon width={16} />
                </button>
                <button
                  className="rect-btn"
                  onClick={() => {
                    setIsHovered(false);
                  }}>
                  <CloseIcon width={16} />
                </button>
              </div>
            </div>
            <div className="hover-box">
              <MDXLayout className={fontMono.className} components={HoverComponents} />
            </div>
          </div>
        ) : null}
      </span>
      <button
        className="hover-link-btn rect-btn"
        onClick={() => {
          setIsHovered(true);
        }}>
        <OpenInNewIcon width={20} />
      </button>
    </>
  );
}
