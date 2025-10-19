"use client";

import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  duration?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  duration = 40,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
      style={{
        gap: "1rem",
        contain: "layout style paint",
        willChange: "transform",
        backfaceVisibility: "hidden",
        transform: "translateZ(0)",
      }}
    >
      {Array(Math.max(1, Math.min(repeat, 6)))
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around", {
              "flex-row": !vertical,
              "flex-col": vertical,
            })}
            style={{
              gap: "1rem",
              willChange: "transform",
              backfaceVisibility: "hidden",
              animation: `${
                vertical ? "marqueeVertical" : "marqueeHorizontal"
              } ${duration}s linear infinite`,
              animationDirection: reverse ? "reverse" : "normal",
              animationPlayState: "running",
            }}
            onMouseEnter={(e) => {
              if (pauseOnHover) {
                e.currentTarget.style.animationPlayState = "paused";
              }
            }}
            onMouseLeave={(e) => {
              if (pauseOnHover) {
                e.currentTarget.style.animationPlayState = "running";
              }
            }}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
