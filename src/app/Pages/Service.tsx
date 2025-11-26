import BlurFade from '@/components/magicui/blur-fade';
import { DATA } from '@/data/resume';
import Image from 'next/image';
import Link from 'next/link';

const BLUR_FADE_DELAY = 0.04;

export default function ServicePage() {
  return (
    <section id="services" className="w-full py-16 bg-transparent">
      <div className="container mx-auto px-4">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Services
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                What I Do
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-3xl mx-auto">
                I offer a comprehensive range of development services to bring
                your ideas to life. From responsive web applications to scalable
                cloud solutions, I leverage cutting-edge technologies to deliver
                high-quality, performant solutions tailored to your needs.
              </p>
            </div>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {DATA.services.map((service, id) => (
            <BlurFade
              key={service.title}
              delay={BLUR_FADE_DELAY * 14 + id * 0.05}
            >
              <Link
                href={service.links[0]?.href || '/#contact'}
                className="group block"
              >
                <div className="relative h-[320px] overflow-hidden rounded-3xl transition-transform duration-300 group-hover:scale-[1.02]">
                  {/* Image */}
                  <div className="relative h-full w-full">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="mb-2 text-sm font-medium uppercase tracking-wide text-white/80">
                      {service.category}
                    </p>
                    <h3 className="text-xl font-bold mb-4">{service.title}</h3>

                    {/* Button */}
                    <button className="w-full rounded-full bg-white/20 backdrop-blur-md py-3 px-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/30 border border-white/10">
                      Learn More
                    </button>
                  </div>
                </div>
              </Link>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
