"use client";

import { TextLoop } from "@/components/core/text-loop";
import BlurFade from "@/components/magicui/blur-fade";

import BlurFadeText from "@/components/magicui/blur-fade-text";
import ShinyText from "@/components/ShinyText";
import { AuroraText } from "@/components/ui/aurora-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import { Badge } from "@/components/ui/badge";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import { DATA } from "@/data/resume";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";

const BLUR_FADE_DELAY = 0.04;

export default function HomePage() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Fetch the PDF from public folder
      const response = await fetch(
        "/CHAMATH_DILSHAN_-_TRAINEE_SOFTWARE_ENGINEER.pdf"
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Chamath_Dilshan_-_Trainee_Software_Engineer.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      // Keep loader visible for a moment
      setTimeout(() => {
        setIsDownloading(false);
      }, 1000);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl lg:max-w-4xl xl:max-w-6xl space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-8">
        <div className="flex-col flex flex-1 space-y-3 md:space-y-4">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <FollowerPointerCard
              title={
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    Passionate Software Engineer
                  </span>
                </div>
              }
            >
              <div className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter text-foreground dark:text-white">
                <span>Hi,&nbsp;</span>
                <AuroraText className="inline">
                  {`I'm ${DATA.name.split(" ").slice(0, 1)}`}
                </AuroraText>
                <span> 👋&nbsp;</span>
              </div>
            </FollowerPointerCard>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="inline-flex flex-wrap whitespace-pre-wrap text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium tracking-tight text-muted-foreground dark:text-white h-[4rem] sm:h-[4.5rem] lg:h-auto">
              I'm Specialist On{"  "}
              <TextLoop
                className="overflow-y-clip"
                transition={{
                  type: "spring",
                  stiffness: 900,
                  damping: 80,
                  mass: 10,
                }}
                variants={{
                  initial: {
                    y: 20,
                    rotateX: 90,
                    opacity: 0,
                    filter: "blur(4px)",
                  },
                  animate: {
                    y: 0,
                    rotateX: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                  },
                  exit: {
                    y: -20,
                    rotateX: -90,
                    opacity: 0,
                    filter: "blur(4px)",
                  },
                }}
              >
                <span className="text-[#48dbfb]">UI / UX Design</span>
                <span className="text-[#48dbfb]">Product Design</span>
                <span className="text-[#48dbfb]">Frontend Development</span>
                <span className="text-[#48dbfb]">Backend Development</span>
                <span className="text-[#48dbfb]">Cloud Engineering</span>
              </TextLoop>
            </div>
          </BlurFade>
          <BlurFadeText
            className="pt-2 md:pt-3 text-sm md:text-base lg:text-md text-muted-foreground max-w-full"
            delay={BLUR_FADE_DELAY}
            text={DATA.description}
          />
          <div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <div className="pt-2 md:pt-3 flex items-center justify-between">
                <Badge
                  variant="secondary"
                  className="rounded-full bg-muted/50 px-2.5 py-1 text-[10px] md:text-xs uppercase tracking-wider text-foreground/70 backdrop-blur"
                >
                  Inspiration
                </Badge>
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="group relative px-3 py-1.5 text-xs md:text-sm rounded-full border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-all disabled:opacity-50 overflow-hidden"
                >
                  {/* Simple shimmer overlay */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

                  {isDownloading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-primary relative z-10" />
                  ) : (
                    <span className="flex items-center gap-1.5 text-foreground font-medium whitespace-nowrap relative z-10">
                      <Download className="h-3.5 w-3.5" />
                      Get Resume
                    </span>
                  )}
                </button>
              </div>
              <div className="mt-3">
                <AvatarCircles
                  numPeople={12}
                  avatarUrls={[
                    {
                      imageUrl: "https://github.com/gaearon.png",
                      profileUrl: "https://github.com/gaearon",
                    },
                    {
                      imageUrl: "https://github.com/yyx990803.png",
                      profileUrl: "https://github.com/yyx990803",
                    },
                    {
                      imageUrl: "https://github.com/sindresorhus.png",
                      profileUrl: "https://github.com/sindresorhus",
                    },
                    {
                      imageUrl: "https://github.com/rauchg.png",
                      profileUrl: "https://github.com/rauchg",
                    },
                    {
                      imageUrl: "https://github.com/shadcn.png",
                      profileUrl: "https://github.com/shadcn",
                    },
                    {
                      imageUrl: "https://github.com/kentcdodds.png",
                      profileUrl: "https://github.com/kentcdodds",
                    },
                    {
                      imageUrl: "https://github.com/t3dotgg.png",
                      profileUrl: "https://github.com/t3dotgg",
                    },
                  ]}
                />
              </div>
            </BlurFade>
            {/* Get Resume Button */}
            <BlurFade delay={BLUR_FADE_DELAY}>
              <div className="mt-4">
                <ShinyText
                  text="✨ Available for opportunities"
                  disabled={false}
                  speed={2}
                  className="text-base md:text-lg font-medium"
                />
              </div>
            </BlurFade>
          </div>
        </div>

        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="flex justify-center md:justify-end">
            <FollowerPointerCard
              title={
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{DATA.name}</span>
                </div>
              }
            >
              <Avatar className="size-20 md:size-24 lg:size-28">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </FollowerPointerCard>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
