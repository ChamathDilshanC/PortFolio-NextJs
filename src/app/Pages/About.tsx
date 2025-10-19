"use client";

import { FollowerPointerCard } from "@/components/ui/following-pointer";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal";
import { useEffect, useState } from "react";

export function Aboutpage() {
  const [key, setKey] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "💡 Want to know more about me?",
    "🚀 Explore my technical journey",
    "⚡ See what I'm passionate about",
    "🎯 Discover my skills & expertise",
    "💻 Check out my development stack",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setKey((prev) => prev + 1);
    }, 13000);

    return () => clearTimeout(timer);
  }, [key]);

  useEffect(() => {
    const messageTimer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(messageTimer);
  }, [messages.length]);

  return (
    <div className="w-full max-w-2xl mx-auto my-8">
      <FollowerPointerCard
        title={
          <div className="flex items-center gap-2">
            <span className="font-semibold">{messages[messageIndex]}</span>
          </div>
        }
      >
        <Terminal
          key={key}
          className="w-full max-w-2xl min-h-[420px] [&_pre]:min-h-[320px] [&_code]:min-h-[320px]"
        >
          <TypingAnimation delay={0}>&gt; clear</TypingAnimation>

          <TypingAnimation delay={1000}>&gt; whoami</TypingAnimation>

          <AnimatedSpan delay={1800} className="text-cyan-400">
            Chamath Dilshan - Full Stack Engineer
          </AnimatedSpan>

          <TypingAnimation delay={2600}>&gt; ls skills/</TypingAnimation>

          <AnimatedSpan delay={3400} className="text-blue-500">
            frontend/ backend/ database/ devops/ mobile/
          </AnimatedSpan>

          <TypingAnimation delay={4200}>
            &gt; cat skills/frontend/stack.json
          </TypingAnimation>

          <AnimatedSpan delay={5000} className="text-yellow-500">
            {
              '{ "frameworks @ Libraries": ["React", "Next.js", "TypeScript", "React Native"] }'
            }
          </AnimatedSpan>

          <TypingAnimation delay={5800}>
            &gt; git log --oneline --graph
          </TypingAnimation>

          <AnimatedSpan delay={6600} className="text-green-500">
            * 🚀 Deployed scalable web applications
          </AnimatedSpan>

          <AnimatedSpan delay={7400} className="text-green-500">
            * 📱 Built responsive mobile interfaces
          </AnimatedSpan>

          <AnimatedSpan delay={8200} className="text-green-500">
            * ⚡ Optimized performance by 40%
          </AnimatedSpan>

          <TypingAnimation delay={9000}>&gt; echo $PASSION</TypingAnimation>

          <AnimatedSpan delay={9800} className="text-purple-400">
            " • Clean Code • Innovation • Problem Solving "
          </AnimatedSpan>

          <TypingAnimation delay={10600}>&gt; ./connect.sh</TypingAnimation>

          <AnimatedSpan delay={11400} className="text-green-400">
            ✨ Ready to collaborate on your next project!
          </AnimatedSpan>
        </Terminal>
      </FollowerPointerCard>
    </div>
  );
}
