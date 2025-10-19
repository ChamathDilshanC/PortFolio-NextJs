"use client";

/* eslint-disable @next/next/no-img-element */
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

const skills = [
  {
    name: "Java",
    category: "Backend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    color: "from-orange-500 to-red-600",
  },
  {
    name: "JavaScript",
    category: "Frontend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "from-yellow-400 to-yellow-600",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "React",
    category: "Frontend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "from-cyan-400 to-blue-500",
  },
  {
    name: "Next.js",
    category: "Frontend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    color: "from-gray-700 to-gray-900",
  },
  {
    name: "Node.js",
    category: "Backend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "from-green-500 to-green-700",
  },
  {
    name: "Python",
    category: "Backend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    color: "from-blue-400 to-yellow-500",
  },
  {
    name: "Express.js",
    category: "Backend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    color: "from-gray-600 to-gray-800",
  },
  {
    name: "Spring Boot",
    category: "Backend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    color: "from-green-500 to-green-600",
  },
  {
    name: "MongoDB",
    category: "Database",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    color: "from-green-600 to-green-800",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    color: "from-blue-600 to-blue-800",
  },
  {
    name: "MySQL",
    category: "Database",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    color: "from-blue-500 to-orange-500",
  },
  {
    name: "Redis",
    category: "Database",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    color: "from-red-500 to-red-700",
  },
  {
    name: "Docker",
    category: "DevOps",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    color: "from-blue-400 to-blue-600",
  },
  {
    name: "Kubernetes",
    category: "DevOps",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    color: "from-blue-500 to-purple-600",
  },
  {
    name: "AWS",
    category: "Cloud",
    icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    color: "from-orange-400 to-orange-600",
  },
  {
    name: "Git",
    category: "Tools",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "from-orange-500 to-red-500",
  },
  {
    name: "VS Code",
    category: "Tools",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "Tailwind",
    category: "Frontend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    color: "from-cyan-400 to-blue-500",
  },
  {
    name: "GraphQL",
    category: "API",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
    color: "from-pink-500 to-purple-600",
  },
];

const firstRow = skills.slice(0, 5);
const secondRow = skills.slice(5, 10);
const thirdRow = skills.slice(10, 15);
const fourthRow = skills.slice(15, 20);

const SkillCard = ({
  icon,
  name,
  category,
  color,
}: {
  icon: string;
  name: string;
  category: string;
  color: string;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Preload the image regardless of visibility state
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
    img.src = icon;

    // Cleanup
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [icon]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    console.warn(`Failed to load icon for ${name}`);
  }, [name]);

  return (
    <figure
      className={cn(
        "skill-card group relative h-36 w-28 cursor-pointer overflow-hidden rounded-2xl p-4 transition-all duration-300 ease-out hover:scale-105 hover:-rotate-1",
        // Modern glassmorphism effect with better performance
        "backdrop-blur-sm bg-white/10 border border-white/20 shadow-lg will-change-transform",
        // Dark mode styles
        "dark:bg-black/20 dark:border-white/10",
        // Smooth hover glow effect
        "hover:shadow-xl hover:shadow-purple-500/20 hover:bg-white/15 dark:hover:bg-black/25"
      )}
      style={{
        // CSS containment for better performance
        contain: "layout style paint",
        // Hardware acceleration
        transform: "translateZ(0)",
      }}
    >
      {/* Optimized gradient overlay */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300 ease-out bg-gradient-to-br",
          color
        )}
        style={{
          willChange: "opacity",
          backfaceVisibility: "hidden",
        }}
      />

      {/* Optimized icon glow background */}
      <div
        className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-transparent group-hover:scale-105 transition-transform duration-200 ease-out"
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      />

      <div className="relative flex flex-col items-center justify-center h-full gap-2">
        <div className="relative">
          {!imageError ? (
            <img
              className={cn(
                "w-10 h-10 object-contain drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-200 ease-out relative z-10",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              width="40"
              height="40"
              alt={`${name} icon`}
              src={icon}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="eager" // Change from lazy to eager for BlurFade compatibility
              decoding="async"
              style={{
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
                // Force image to be visible regardless of parent opacity
                isolation: "isolate",
              }}
            />
          ) : (
            // Fallback icon when image fails to load
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-bold text-sm">
              {name.charAt(0)}
            </div>
          )}

          {/* Loading skeleton - visible until image loads */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 w-10 h-10 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse" />
          )}
        </div>

        <figcaption className="text-xs font-semibold text-center leading-tight group-hover:text-white transition-colors duration-200 ease-out">
          {name}
        </figcaption>

        <div
          className={cn(
            "px-2 py-1 rounded-full text-[10px] font-medium text-center bg-gradient-to-r opacity-80 group-hover:opacity-100 transition-opacity duration-200 ease-out",
            color,
            "text-white"
          )}
          style={{
            willChange: "opacity",
            backfaceVisibility: "hidden",
          }}
        >
          {category}
        </div>
      </div>

      {/* Optimized animated border */}
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out -z-10"
        style={{
          willChange: "opacity",
          backfaceVisibility: "hidden",
        }}
      />
    </figure>
  );
};
export function Marquee3D() {
  return (
    <div
      className="marquee-container relative flex h-96 w-full flex-row items-center justify-center gap-6 overflow-hidden [perspective:1000px]"
      style={{
        // CSS containment for better performance and crash prevention
        contain: "layout style paint",
        // Hardware acceleration
        transform: "translateZ(0)",
        // Smooth rendering
        backfaceVisibility: "hidden",
        // Ensure compatibility with BlurFade
        isolation: "isolate",
      }}
    >
      <div
        className="flex flex-row items-center gap-6 transform-gpu"
        style={{
          transform:
            "translateX(-50px) translateY(0px) translateZ(-150px) rotateX(15deg) rotateY(-8deg) rotateZ(15deg)",
          // Performance optimizations
          willChange: "transform",
          backfaceVisibility: "hidden",
          // Smoother animations
          transformStyle: "preserve-3d",
        }}
      >
        <Marquee
          pauseOnHover
          vertical
          className="marquee-item [--duration:30s] hover:[--duration:45s] transition-all duration-300 ease-linear"
          repeat={3}
        >
          {firstRow.map((skill) => (
            <SkillCard key={`first-${skill.name}`} {...skill} />
          ))}
        </Marquee>
        <Marquee
          reverse
          pauseOnHover
          className="marquee-item [--duration:28s] hover:[--duration:42s] transition-all duration-300 ease-linear"
          vertical
          repeat={3}
        >
          {secondRow.map((skill) => (
            <SkillCard key={`second-${skill.name}`} {...skill} />
          ))}
        </Marquee>
        <Marquee
          pauseOnHover
          className="marquee-item [--duration:32s] hover:[--duration:48s] transition-all duration-300 ease-linear"
          vertical
          repeat={3}
        >
          {thirdRow.map((skill) => (
            <SkillCard key={`third-${skill.name}`} {...skill} />
          ))}
        </Marquee>
        <Marquee
          reverse
          pauseOnHover
          className="marquee-item [--duration:29s] hover:[--duration:44s] transition-all duration-300 ease-linear"
          vertical
          repeat={3}
        >
          {fourthRow.map((skill) => (
            <SkillCard key={`fourth-${skill.name}`} {...skill} />
          ))}
        </Marquee>
      </div>

      {/* Optimized fade effects with better performance */}
      <div
        className="fade-overlay pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white via-white/80 to-transparent dark:from-background dark:via-background"
        style={{
          willChange: "opacity",
          backfaceVisibility: "hidden",
        }}
      />
      <div
        className="fade-overlay pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-background dark:via-background"
        style={{
          willChange: "opacity",
          backfaceVisibility: "hidden",
        }}
      />

      {/* Optimized subtle side fades */}
      <div
        className="fade-overlay pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white/60 to-transparent dark:from-background"
        style={{
          willChange: "opacity",
          backfaceVisibility: "hidden",
        }}
      />
      <div
        className="fade-overlay pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white/60 to-transparent dark:from-background"
        style={{
          willChange: "opacity",
          backfaceVisibility: "hidden",
        }}
      />
    </div>
  );
}
