import { TextLoop } from "@/components/core/text-loop";
import BlurFade from "@/components/magicui/blur-fade";

import BlurFadeText from "@/components/magicui/blur-fade-text";
import { AuroraText } from "@/components/ui/aurora-text";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import { Avatar } from "@radix-ui/react-avatar";

const BLUR_FADE_DELAY = 0.04;

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-2xl lg:max-w-4xl xl:max-w-6xl space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-8">
        <div className="flex-col flex flex-1 space-y-3 md:space-y-4">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter text-foreground dark:text-white">
              <span>Hi,&nbsp;</span>
              <AuroraText className="inline">
                {`I'm ${DATA.name.split(" ").slice(0, 1)}`}
              </AuroraText>
              <span> 👋&nbsp;</span>
            </div>
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
        </div>
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="flex justify-center md:justify-end">
            <Avatar className="size-20 md:size-24 lg:size-28">
              <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
              <AvatarFallback>{DATA.initials}</AvatarFallback>
            </Avatar>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
