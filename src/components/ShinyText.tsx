import { cn } from "@/lib/utils";
import React from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
}) => {
  return (
    <div
      className={cn(
        "inline-block bg-gradient-to-r from-foreground/60 via-foreground/90 to-foreground/60 bg-clip-text text-transparent dark:from-foreground/70 dark:via-foreground dark:to-foreground/70",
        !disabled && "animate-shine",
        className
      )}
      style={{
        backgroundSize: "200% 100%",
        backgroundPosition: "200% 0",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        ...(speed && ({ "--duration": `${speed}s` } as React.CSSProperties)),
      }}
    >
      {text}
    </div>
  );
};

export default ShinyText;
