"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

type Props = ImageProps & {
  fallbackLabel?: string;
};

export default function SafeImage({ fallbackLabel = "Add image", alt, ...rest }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-line bg-surface2 p-2 text-center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-muted">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted">{fallbackLabel}</span>
      </div>
    );
  }

  return <Image {...rest} alt={alt} onError={() => setFailed(true)} />;
}