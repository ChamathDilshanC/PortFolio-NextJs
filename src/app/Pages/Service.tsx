import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export default function ServicePage() {
  return (
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
                I offer a comprehensive range of development services to bring
                your ideas to life. From responsive web applications to scalable
                cloud solutions, I leverage cutting-edge technologies to deliver
                high-quality, performant solutions tailored to your needs.
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
  );
}
