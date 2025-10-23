"use client";

import { useEffect, useRef } from "react";

interface SplineViewerProps {
  url: string;
  className?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": {
        url: string;
        class?: string;
        style?: React.CSSProperties;
      };
    }
  }
}

export function SplineViewer({ url, className }: SplineViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the Spline viewer script
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://unpkg.com/@splinetool/viewer@1.10.82/build/spline-viewer.js";
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div ref={viewerRef} className={className}>
      <spline-viewer url={url} />
    </div>
  );
}
