"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import * as React from "react";

export const ModeToggle = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>((props, ref) => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Button clicked! Current theme:", theme);
    const newTheme = theme === "dark" ? "light" : "dark";
    console.log("Setting theme to:", newTheme);
    setTheme(newTheme);
  };

  if (!mounted) {
    return (
      <Button
        ref={ref}
        variant="ghost"
        type="button"
        size="icon"
        className="px-2"
        {...props}
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }

  return (
    <Button
      ref={ref}
      variant="ghost"
      type="button"
      size="icon"
      className="px-2"
      onClick={handleToggle}
      aria-label="Toggle theme"
      {...props}
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] text-neutral-800 dark:hidden dark:text-neutral-200" />
      <MoonIcon className="hidden h-[1.2rem] w-[1.2rem] text-neutral-800 dark:block dark:text-neutral-200" />
    </Button>
  );
});

ModeToggle.displayName = "ModeToggle";
