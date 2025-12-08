'use client';

import { Icons } from '@/components/icons';
import { DATA } from '@/data/resume';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type FooterLink = {
  name: string;
  href: string;
  external?: boolean;
};

export default function Footer() {
  const socialLinks = [
    { name: 'X', icon: Icons.x, href: DATA.contact.social.X?.url || '#' },
    {
      name: 'GitHub',
      icon: Icons.github,
      href: DATA.contact.social.GitHub.url,
    },
    {
      name: 'LinkedIn',
      icon: Icons.linkedin,
      href: DATA.contact.social.LinkedIn.url,
    },
    {
      name: 'Youtube',
      icon: Icons.youtube,
      href: DATA.contact.social.Youtube?.url || '#',
    },
    { name: 'Email', icon: Icons.email, href: `mailto:${DATA.contact.email}` },
  ];

  const exploreLinks: FooterLink[] = [
    { name: 'Features', href: '/#' },
    { name: 'Projects', href: '/#projects' },
    { name: 'About', href: '/#about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/#contact' },
  ];

  const companyLinks: FooterLink[] = [
    { name: 'About', href: '/#about' },
    { name: 'Careers', href: '/#' },
    {
      name: 'LinkedIn',
      href: DATA.contact.social.LinkedIn.url,
      external: true,
    },
    { name: 'Blog', href: '/blog' },
  ];

  const supportLinks: FooterLink[] = [
    { name: 'Contact', href: '/#contact' },
    { name: 'Status', href: '/#' },
    { name: 'Documentation', href: '/#' },
    { name: 'FAQ', href: '/#' },
  ];

  const linkSections = [
    { title: 'Explore', links: exploreLinks },
    { title: 'Company', links: companyLinks },
    { title: 'Support', links: supportLinks },
  ];

  const legalLinks = [
    { name: 'Terms of Service', href: '/#' },
    { name: 'Privacy Policy', href: '/#' },
    { name: "Parent's Guide", href: '/#' },
    { name: 'Accessibility', href: '/#' },
    { name: 'Manage Cookies', href: '/#' },
  ];

  const contactDetails = [
    {
      label: 'Email',
      value: DATA.contact.email,
      href: `mailto:${DATA.contact.email}`,
    },
    {
      label: 'Phone',
      value: DATA.contact.tel,
      href: `tel:${DATA.contact.tel}`,
    },
    { label: 'Location', value: DATA.location, href: DATA.locationLink },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full mt-24 border-t border-white/10 bg-background/95 text-sm">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="container mx-auto px-6 py-16 space-y-12">
        <div className="flex flex-col gap-4 text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 text-foreground/80">
            <Icons.globe className="h-4 w-4" />
            <span>English</span>
          </div>
                    <div className="flex items-center gap-2 text-foreground/80">
            <Icons.mapPin className="h-4 w-4" />
            <span>{DATA.location}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-y border-white/10 py-6 text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/60">
            Follow me on ❤️
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-foreground transition hover:border-[#070edf] hover:text-[#070edf] dark:hover:border-[#00b3ff] dark:hover:text-[#00b3ff]"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_auto_auto_auto] lg:justify-end">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 text-foreground">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3B3BF6] text-lg font-bold text-white shadow-[0_0_15px_#3B3BF6]">
                {DATA.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div>
                <p className="text-base font-semibold">{DATA.name}</p>
                <p className="text-xs text-muted-foreground">{DATA.detail}</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">{DATA.description}</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              {contactDetails.map((item) => (
                <div key={item.label} className="flex gap-2">
                  <span className="w-20 text-foreground/70">{item.label}</span>
                  <Link
                    href={item.href || '#'}
                    target={
                      item.href?.startsWith('http') ? '_blank' : undefined
                    }
                    rel={
                      item.href?.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className="text-foreground/90 transition hover:text-[#070edf] dark:hover:text-[#00b3ff]"
                  >
                    {item.value}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-start-2 lg:col-end-5 grid grid-cols-3 gap-8 lg:gap-12">
            {linkSections.map((section) => (
              <div key={section.title} className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground/70">
                  {section.title}
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="transition hover:text-[#070edf] dark:hover:text-[#00b3ff]"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 border-t border-white/10 pt-6 text-muted-foreground">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-foreground/80">
              © {new Date().getFullYear()} {DATA.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="transition hover:text-[#070edf] dark:hover:text-[#00b3ff]"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="text-xs leading-relaxed text-foreground/60">
            <p>
              Chamath Dilshan Portfolio · Crafted with Next.js, Tailwind CSS &
              Magic UI.
            </p>
            <p>Business Inquiries: {DATA.contact.email}</p>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={scrollToTop}
            className={cn(
              'group relative w-full md:w-1/2 lg:w-1/3 flex items-center justify-between rounded-full border border-[#3B3BF6] bg-[#1E1E1E] px-4 py-3 text-sm text-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3B3BF6]/50 hover:shadow-[0_0_10px_#3B3BF6]'
            )}
          >
            <span className="pl-2 transition-colors duration-300 text-gray-200">
              Back to Top
            </span>

            {/* Arrow Up Icon Bubble */}
            <div className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#3B3BF6] transition-all duration-300 group-hover:bg-[#5050ff] group-hover:-translate-y-1">
              <Icons.arrowUp className="h-4 w-4 text-white" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
