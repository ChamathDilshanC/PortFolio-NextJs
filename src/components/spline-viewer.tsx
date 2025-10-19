"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

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
        onload?: () => void;
      };
    }
  }
}

export function SplineViewer({ url, className }: SplineViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.querySelector(
      'script[src="https://unpkg.com/@splinetool/viewer@1.10.82/build/spline-viewer.js"]'
    );

    if (existingScript) {
      setIsScriptLoaded(true);
      return;
    }

    // Load the Spline viewer script if not already loaded
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://unpkg.com/@splinetool/viewer@1.10.82/build/spline-viewer.js";
    script.onload = () => {
      setIsScriptLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      // Don't remove script on unmount as it might be needed by other instances
    };
  }, [url]);

  useEffect(() => {
    if (!isScriptLoaded || !viewerRef.current) return;

    // Listen for the spline viewer load event
    const viewer = viewerRef.current.querySelector("spline-viewer");
    if (viewer) {
      const handleLoad = () => {
        setIsLoading(false);
      };

      // Shorter timeout since we're preloading
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      viewer.addEventListener("load", handleLoad);

      return () => {
        viewer.removeEventListener("load", handleLoad);
        clearTimeout(timer);
      };
    }
  }, [isScriptLoaded]);

  return (
    <div ref={viewerRef} className={`relative ${className}`}>
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading 3D Scene...</p>
          </div>
        </div>
      )}
      
      {/* Spline Viewer */}
      <spline-viewer url={url} class="w-full h-full" />
    </div>
  );
}
