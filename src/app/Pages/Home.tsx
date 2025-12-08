'use client';

import GradientText from '@/components/GradientText';
import BlurFade from '@/components/magicui/blur-fade';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TextAnimate } from '@/components/ui/text-animate';
import { DATA } from '@/data/resume';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const BLUR_FADE_DELAY = 0.04;

export default function HomePage() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Fetch the PDF from public folder
      const response = await fetch(
        '/CHAMATH_DILSHAN_-_TRAINEE_SOFTWARE_ENGINEER.pdf'
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Chamath_Dilshan_-_Trainee_Software_Engineer.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      // Keep loader visible for a moment
      setTimeout(() => {
        setIsDownloading(false);
      }, 1000);
    }
  };

  return (
    <>
      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-end justify-around py-2 md:py-2 px-4 md:px-8 backdrop-blur-md bg-background/80 border-b border-border/40 transition-all duration-300">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/logo/Blogo.png"
            alt="Logo"
            className="h-10 sm:h-12 md:h-14 w-auto object-contain"
          />
        </div>

        {/* Contact Me Button */}
        <a
          href="/#contact"
          className="group relative min-w-[140px] sm:min-w-[160px] flex items-center justify-between rounded-full border border-[#3B3BF6] bg-[#1E1E1E] px-4 sm:px-5 py-2 text-sm sm:text-base text-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3B3BF6]/50 hover:shadow-[0_0_10px_#3B3BF6]"
        >
          <span className="flex-1 text-left pl-2 text-gray-200 transition-colors duration-300">
            Contact Me
          </span>

          {/* Telegram Icon Bubble */}
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full transition-all duration-300 ml-2 sm:ml-3 flex-shrink-0 bg-[#3B3BF6] group-hover:bg-[#5050ff] group-hover:translate-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="h-3.5 w-3.5 sm:h-4 sm:w-4"
            >
              <path d="M9.036 15.58l-.396 5.594c.566 0 .81-.244 1.102-.537l2.64-2.529 5.475 4.012c1.004.553 1.716.262 1.978-.929l3.584-16.8.002-.002c.32-1.495-.54-2.086-1.514-1.721L1.16 9.51c-1.447.553-1.426 1.345-.261 1.706l5.96 1.862 13.833-8.721L9.036 15.58z" />
            </svg>
          </div>
        </a>
      </nav>

      {/* Add padding top to account for fixed nav */}
      <div className="pt-16 md:pt-20">
        <div className="mx-auto w-full max-w-7xl space-y-12 md:space-y-8">
          {/* Hero Section */}
          <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-12 md:py-16">
            {/* Main Content */}
            <div className="text-center space-y-6 md:space-y-8 max-w-4xl mx-auto z-10">
              <BlurFade delay={BLUR_FADE_DELAY}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground dark:text-white leading-tight hero-slide-up">
                  Software Engineer <span style={{ color: '#3b3bed' }}>turned</span> Entrepreneur
                </h1>
              </BlurFade>

              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <div className="text-base sm:text-lg md:text-xl text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  <GradientText
                    colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                    animationSpeed={3}
                    showBorder={false}
                    className="inline"
                  >
                    Software Engineer turned Entrepreneur.
                  </GradientText>
                  <TextAnimate
                    animation="blurInUp"
                    by="word"
                    duration={1.5}
                    delay={0.2}
                    className="inline"
                  >
                    I love building things and helping people. Very active on
                  </TextAnimate>
                  {' '}
                  <a
                    href={DATA.contact.social.LinkedIn.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline transition-all inline-block"
                  >
                    <TextAnimate
                      animation="blurInUp"
                      by="word"
                      duration={0.3}
                      delay={1.7}
                      className="inline font-semibold"
                      segmentClassName="inline-block"
                      style={{ color: '#3b3bed' }}
                    >
                      LinkedIn
                    </TextAnimate>
                  </a>
                  .
                </div>
              </BlurFade>

              <BlurFade delay={BLUR_FADE_DELAY * 3}>
                <div className="flex justify-center hero-scale-in" style={{ animationDelay: '0.4s' }}>
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className={`group relative min-w-[180px] sm:min-w-[200px] flex items-center justify-between rounded-full border border-[#3B3BF6] bg-[#1E1E1E] px-4 sm:px-6 py-2 text-sm sm:text-base text-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3B3BF6]/50 ${
                      isDownloading
                        ? 'opacity-60 cursor-not-allowed'
                        : 'hover:shadow-[0_0_10px_#3B3BF6]'
                    }`}
                  >
                    {/* Left text or loader */}
                    {isDownloading ? (
                      <div className="flex items-center gap-2 mx-auto">
                        <Loader2 className="h-4 w-4 animate-spin text-[#3B3BF6]" />
                        <span>Downloading...</span>
                      </div>
                    ) : (
                      <span className="flex-1 text-left pl-2 text-gray-200 transition-colors duration-300">
                        Get Resume
                      </span>
                    )}

                    {/* Telegram Icon Bubble */}
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ml-3 flex-shrink-0 ${
                        isDownloading
                          ? 'bg-gray-600'
                          : 'bg-[#3B3BF6] group-hover:bg-[#5050ff] group-hover:translate-x-1'
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="white"
                        className="h-4 w-4"
                      >
                        <path d="M9.036 15.58l-.396 5.594c.566 0 .81-.244 1.102-.537l2.64-2.529 5.475 4.012c1.004.553 1.716.262 1.978-.929l3.584-16.8.002-.002c.32-1.495-.54-2.086-1.514-1.721L1.16 9.51c-1.447.553-1.426 1.345-.261 1.706l5.96 1.862 13.833-8.721L9.036 15.58z" />
                      </svg>
                    </div>
                  </button>
                </div>
              </BlurFade>
            </div>

            {/* 3D Perspective Image Gallery */}
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <div className="relative w-full max-w-6xl mx-auto mt-12 md:mt-16 perspective-1000">
                <div className="flex items-center justify-center gap-2 md:gap-4 transform-style-3d">
                  {/* Left side images */}
                  <div className="flex-shrink-0 w-16 sm:w-20 md:w-28 lg:w-32 xl:w-40 transform -rotate-y-45 hover:rotate-y-0 transition-transform duration-500 translate-y-12 md:translate-y-16">
                    <div className="relative aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                      <Avatar className="w-full h-full rounded-none">
                        <AvatarImage
                          src="https://i.pinimg.com/1200x/e9/d3/ae/e9d3ae26e7f10d29b5745b6964379b90.jpg"
                          alt="AI Technology"
                          className="object-cover"
                        />
                      </Avatar>
                    </div>
                  </div>

                  <div className="flex-shrink-0 w-20 sm:w-24 md:w-32 lg:w-36 xl:w-44 transform -rotate-y-30 hover:rotate-y-0 transition-transform duration-500 translate-y-6 md:translate-y-8">
                    <div className="relative aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                      <Avatar className="w-full h-full rounded-none">
                        <AvatarImage
                          src="https://i.pinimg.com/1200x/f8/c8/2f/f8c82f88701c7386baee79a92f712663.jpg"
                          alt="AI Technology"
                          className="object-cover"
                        />
                      </Avatar>
                    </div>
                  </div>

                  <div className="flex-shrink-0 w-24 sm:w-28 md:w-36 lg:w-40 xl:w-48 transform -rotate-y-15 hover:rotate-y-0 transition-transform duration-500 translate-y-2 md:translate-y-3">
                    <div className="relative aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                      <Avatar className="w-full h-full rounded-none">
                        <AvatarImage
                          src="https://i.pinimg.com/1200x/a1/44/69/a1446986aff6c88971723701eff5b7e7.jpg"
                          alt="AI Technology"
                          className="object-cover"
                        />
                      </Avatar>
                    </div>
                  </div>

                  {/* Center image - Main avatar - At the top of the curve */}
                  <div className="flex-shrink-0 w-28 sm:w-32 md:w-40 lg:w-48 xl:w-56 z-10">
                    <div className="relative aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 ring-4 ring-blue-500/50">
                      <Avatar className="w-full h-full rounded-none">
                        <AvatarImage
                          src={DATA.avatarUrl}
                          alt={DATA.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="text-4xl">{DATA.initials}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>

                  {/* Right side images */}
                  <div className="flex-shrink-0 w-24 sm:w-28 md:w-36 lg:w-40 xl:w-48 transform rotate-y-15 hover:rotate-y-0 transition-transform duration-500 translate-y-2 md:translate-y-3">
                    <div className="relative aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                      <Avatar className="w-full h-full rounded-none">
                        <AvatarImage
                          src="https://i.pinimg.com/1200x/e3/5e/3d/e35e3d0dc7d8dc1c12aaa09330216616.jpg"
                          alt="AI Technology"
                          className="object-cover"
                        />
                      </Avatar>
                    </div>
                  </div>

                  <div className="flex-shrink-0 w-20 sm:w-24 md:w-32 lg:w-36 xl:w-44 transform rotate-y-30 hover:rotate-y-0 transition-transform duration-500 translate-y-6 md:translate-y-8">
                    <div className="relative aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                      <Avatar className="w-full h-full rounded-none">
                        <AvatarImage
                          src="https://i.pinimg.com/736x/2c/d9/21/2cd9217482d89148fb501ca5a9718d1f.jpg"
                          alt="AI Technology"
                          className="object-cover"
                        />
                      </Avatar>
                    </div>
                  </div>

                  <div className="flex-shrink-0 w-16 sm:w-20 md:w-28 lg:w-32 xl:w-40 transform rotate-y-45 hover:rotate-y-0 transition-transform duration-500 translate-y-12 md:translate-y-16">
                    <div className="relative aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                      <Avatar className="w-full h-full rounded-none">
                        <AvatarImage
                          src="https://i.pinimg.com/1200x/5d/41/e3/5d41e3ebe5bc356f51801b906907f563.jpg"
                          alt="AI Technology"
                          className="object-cover"
                        />
                      </Avatar>
                    </div>
                  </div>
                </div>
              </div>
            </BlurFade>

            {/* Secondary Section */}
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <div className="text-center space-y-4 md:space-y-6 max-w-4xl mx-auto mt-16 md:mt-20 z-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground dark:text-white">
                  Building <span style={{ color: '#3b3bed' }}>Digital Solutions</span> That Make an Impact
                </h2>
                <div className="text-base sm:text-lg md:text-xl text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  <TextAnimate
                    animation="blurInUp"
                    by="word"
                    duration={1.5}
                    delay={0.3}
                    className="inline"
                  >
                    From concept to deployment, I craft scalable applications that solve real-world problems. Let's turn your
                  </TextAnimate>
                  {' '}
                  <TextAnimate
                    animation="blurInUp"
                    by="word"
                    duration={0.3}
                    delay={1.8}
                    className="inline font-semibold"
                    segmentClassName="inline-block"
                    style={{ color: '#3b3bed' }}
                  >
                    ideas
                  </TextAnimate>
                  {' '}
                  <TextAnimate
                    animation="blurInUp"
                    by="word"
                    duration={0.3}
                    delay={2.0}
                    className="inline"
                  >
                    into
                  </TextAnimate>
                  {' '}
                  <TextAnimate
                    animation="blurInUp"
                    by="word"
                    duration={0.3}
                    delay={2.2}
                    className="inline font-semibold"
                    segmentClassName="inline-block"
                    style={{ color: '#3b3bed' }}
                  >
                    powerful
                  </TextAnimate>
                  {' '}
                  <TextAnimate
                    animation="blurInUp"
                    by="word"
                    duration={0.5}
                    delay={2.4}
                    className="inline"
                  >
                    digital experiences.
                  </TextAnimate>
                </div>
              </div>
            </BlurFade>
          </section>

          {/* About Me Section */}
          <ScrollReveal direction="up" delay={0.2}>
            <section id="about" className="w-full py-12 md:py-24">
              <BlurFade delay={BLUR_FADE_DELAY * 6}>
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-4 md:space-y-6">
                    <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm font-semibold">
                      About Me
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                      Who I Am
                    </h2>
                    <div className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed max-w-5xl mx-auto">
                      <TextAnimate
                        animation="blurInUp"
                        by="word"
                        duration={1}
                        delay={0.0}
                        className="inline"
                        once={true}
                      >
                        I'm currently a
                      </TextAnimate>
                      {' '}
                      <TextAnimate
                        animation="blurInUp"
                        by="word"
                        duration={0.3}
                        delay={0.2}
                        className="inline font-semibold"
                        style={{ color: '#3b3bed' }}
                        once={true}
                      >
                        Trainee Software Engineer
                      </TextAnimate>
                      {' '}
                      <TextAnimate
                        animation="blurInUp"
                        by="word"
                        duration={1}
                        delay={0.2}
                        className="inline"
                        once={true}
                      >
                        at IJSE, where I'm honing my skills in full-stack development and building scalable web applications. Right now, I'm pursuing a BSc (Hons) in Computer Science while working on real-world projects that solve actual problems. I've built everything from expense tracking mobile apps to utility monitoring platforms for Sri Lanka, and I love the challenge of turning complex requirements into clean, user-friendly solutions.
                      </TextAnimate>
                    </div>
                  </div>
                </div>
              </BlurFade>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
