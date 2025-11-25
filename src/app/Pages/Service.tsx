import { HackathonCard } from '@/components/hackathon-card';
import BlurFade from '@/components/magicui/blur-fade';
import { FollowerPointerCard } from '@/components/ui/following-pointer';
import { DATA } from '@/data/resume';

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
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-y-16 gap-x-10 md:grid-cols-2 md:gap-y-16 md:gap-x-12 xl:grid-cols-3">
            {DATA.services.map((service, id) => (
              <div key={service.title} className="h-full mb-3">
                <BlurFade
                  delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                  className="h-full"
                >
                  <FollowerPointerCard
                    title={
                      <div className="flex items-center gap-2 text-base font-semibold">
                        <span className="inline-flex size-2 rounded-full bg-primary" />
                        {service.title}
                      </div>
                    }
                    className="h-full"
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
              </div>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
