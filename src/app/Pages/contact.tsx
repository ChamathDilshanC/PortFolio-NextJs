import ContactForm from "@/components/contact-email";
import BlurFade from "@/components/magicui/blur-fade";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export default function ContactPage() {
  return (
    <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
      <BlurFade delay={BLUR_FADE_DELAY * 16}>
        <div className="space-y-3">
          <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
            Contact
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Get in Touch
          </h2>
          <p className="mx-auto max-w-[1000px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Want to chat? Just shoot me a dm{" "}
            <Link
              href="https://www.linkedin.com/messaging/thread/new/?recipient=ACoAAEqxIWIBXz3SIVryG2iqUnRgIsC2Edx6Mwk"
              className="text-blue-500 hover:underline"
            >
              with a direct question on LinkedIn
            </Link>{" "}
            and I&apos;ll respond whenever I can. You can also use the form
            below to send me a message directly.
          </p>
        </div>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 17}>
        <ContactForm />
      </BlurFade>
    </div>
  );
}
