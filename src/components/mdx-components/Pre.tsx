'use client';

import { fontMono } from '@/libs/fonts';
import { CheckIcon, ClipboardIcon } from '@/styles/svgIcons';
import { ReactNode, useRef, useState } from 'react';

interface PreProps extends React.HTMLProps<HTMLPreElement> {
  children?: ReactNode;
}

export default function Pre({ children, ...props }: PreProps) {
  const textInput = useRef<HTMLDivElement>(null);
  const timeoutRef: { current: NodeJS.Timeout | null } = useRef(null);
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(textInput.current?.textContent as string);

    const timeoutId = setTimeout(() => {
      setCopied(false);
    }, 1000);

    clearTimeout(timeoutRef.current as NodeJS.Timeout);
    timeoutRef.current = timeoutId;
  };

  return (
    <div ref={textInput} className={`pre-wrapper ${fontMono.className}`}>
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
      <pre {...props}>{children}</pre>
    </div>
  );
}
