import { HackathonCard } from "@/components/hackathon-card";
import { Marquee3D } from "@/components/magicui/3DMarquee";
import BlurFade from "@/components/magicui/blur-fade";
import { ResumeCard } from "@/components/resume-card";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import { Highlighter } from "@/components/ui/highlighter";
import { DATA } from "@/data/resume";
import { Aboutpage } from "./Pages/About";
import ContactPage from "./Pages/contact";
import Footer from "./Pages/Footer";
import HomePage from "./Pages/Home";
import ProjectPage from "./Pages/Project";
const BLUR_FADE_DELAY = 0.06;

export default function Page() {
  return (
    <>
      <main className="flex flex-col min-h-[100dvh] space-y-10 w-full sm:w-1/2 mx-auto px-4 sm:px-6 lg:px-8">
        <section id="hero">
          <HomePage />
        </section>
        <section id="about">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">About Me</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
              <p>
                {DATA.summary.parts.intro}
                <span className="dark:text-white">
                  <Highlighter action="highlight" color="#48dbfb">
                    {DATA.summary.parts.role}
                  </Highlighter>
                </span>
                {DATA.summary.parts.middle}
                {DATA.summary.parts.education}

                {DATA.summary.parts.outro}
              </p>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            {/* Terminal About Section */}
            <div className="not-prose mt-6">
              <Aboutpage />
            </div>
          </BlurFade>
        </section>
        <section id="work">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <h1 className="text-xl font-bold">Work Experience</h1>
            </BlurFade>
            {DATA.work.map((work, id) => (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * 6 + id * 0.05}
              >
                <ResumeCard
                  key={work.company}
                  logoUrl={work.logoUrl}
                  altText={work.company}
                  title={work.company}
                  subtitle={work.title}
                  href={work.href}
                  badges={work.badges}
                  period={`${work.start} - ${work.end ?? "Present"}`}
                  description={work.description}
                />
              </BlurFade>
            ))}
          </div>
        </section>
        <section id="education">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 7}>
              <h1 className="text-xl font-bold">Education</h1>
            </BlurFade>
            {DATA.education.map((education, id) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + id * 0.05}
              >
                <ResumeCard
                  key={education.school}
                  href={education.href}
                  logoUrl={education.logoUrl}
                  altText={education.school}
                  title={education.school}
                  subtitle={education.degree}
                  period={`${education.start} - ${education.end}`}
                />
              </BlurFade>
            ))}
          </div>
        </section>
        <section id="skills">
          <div className="flex min-h-0 flex-col gap-y-8">
            <BlurFade delay={BLUR_FADE_DELAY * 11}>
              <div className="flex flex-col items-center justify-center space-y-6 text-center">
                <div className="space-y-4">
                  <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                    My Expertise
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Skills & Technologies
                  </h2>
                  <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    I&apos;ve mastered a diverse range of technologies and
                    frameworks, from frontend development to backend systems.
                    Here are the tools I use to bring ideas to life.
                  </p>
                </div>
              </div>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 11}>
              <div
                className="mt-8 animate-in fade-in slide-in-from-bottom-6 duration-500 ease-out"
                style={{
                  animationDelay: `${BLUR_FADE_DELAY * 9 * 1000}ms`,
                  animationFillMode: "both",
                }}
              >
                <Marquee3D />
              </div>
            </BlurFade>
          </div>
        </section>
        <section id="projects">
          <ProjectPage />
        </section>
        <section id="services">
          <div className="space-y-12 w-full py-12">
            <BlurFade delay={BLUR_FADE_DELAY * 13}>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                    Services
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    What I Do
                  </h2>
                  <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    I offer a comprehensive range of development services to
                    bring your ideas to life. From responsive web applications
                    to scalable cloud solutions, I leverage cutting-edge
                    technologies to deliver high-quality, performant solutions
                    tailored to your needs.
                  </p>
                </div>
              </div>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 14}>
              <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
                {DATA.services.map((service, id) => (
                  <BlurFade
                    key={service.title}
                    delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                  >
                    <FollowerPointerCard
                      title={
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{service.title}</span>
                        </div>
                      }
                    >
                      <HackathonCard
                        title={service.title}
                        description={service.description}
                        location={service.category}
                        dates={service.technologies}
                        image={service.image}
                        links={service.links}
                      />
                    </FollowerPointerCard>
                  </BlurFade>
                ))}
              </ul>
            </BlurFade>
          </div>
        </section>
        <section id="contact">
          <ContactPage />
        </section>
      </main>
      <Footer />
    </>
  );
}
