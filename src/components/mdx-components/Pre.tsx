'use client';

import { CheckIcon, ClipboardIcon } from '@/styles/svgIcons';
import { ReactNode, useRef, useState } from 'react';

interface Props {
  children?: ReactNode;
}

export default function Pre({ children }: Props) {
  const textInput = useRef<HTMLDivElement>(null);
  const timeoutRef: { current: NodeJS.Timeout | null } = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const onEnter = () => {
    setHovered(true);
  };

  const onExit = () => {
    setHovered(false);
    setCopied(false);
  };

  const onCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(textInput.current?.textContent as string);

    const timeoutId = setTimeout(() => {
      setCopied(false);
    }, 2000);

    clearTimeout(timeoutRef.current as NodeJS.Timeout);
    timeoutRef.current = timeoutId;
  };

  return (
    <div
      ref={textInput}
      onMouseEnter={onEnter}
      onMouseLeave={onExit}
      className="pre-wrapper"
    >
      {hovered && (
        <button
          aria-label="Copy code"
          type="button"
          className="round-btn copy-btn"
          onClick={onCopy}
        >
          {copied ? (
            <CheckIcon width="16px" style={{ color: '#ccc' }} />
          ) : (
            <ClipboardIcon width="16px" style={{ color: '#ccc' }} />
          )}
        </button>
      )}
      <pre>{children}</pre>
    </div>
  );
}
