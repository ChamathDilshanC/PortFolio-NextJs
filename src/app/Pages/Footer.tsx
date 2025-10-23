"use client";

import { Icons } from "@/components/icons";
import { SplineViewer } from "@/components/spline-viewer";
import { DATA } from "@/data/resume";
import Link from "next/link";

export default function Footer() {
  const socialLinks = [
    { name: "X", icon: Icons.x, href: DATA.contact.social.X?.url || "#" },
    {
      name: "GitHub",
      icon: Icons.github,
      href: DATA.contact.social.GitHub.url,
    },
    {
      name: "LinkedIn",
      icon: Icons.linkedin,
      href: DATA.contact.social.LinkedIn.url,
    },
    { name: "Email", icon: Icons.email, href: `mailto:${DATA.contact.email}` },
  ];

  const footerLinks = [
    { name: "Features", href: "/#" },
    { name: "Projects", href: "/#projects" },
    { name: "About", href: "/#about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <footer className="relative w-full mt-16 border-t border-[#3B3BF6]/30 bg-background/90 backdrop-blur-lg">
      {/* top gradient line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#3B3BF6] to-transparent animate-pulse" />

      <div className="container mx-auto px-6 py-16 flex flex-col gap-12 lg:flex-row lg:justify-between">
        {/* LEFT SECTION */}
        <div className="flex flex-col space-y-4 max-w-md">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-[#3B3BF6] flex items-center justify-center shadow-[0_0_10px_#3B3BF6]">
              <span className="text-white font-bold text-lg">
                {DATA.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <span className="font-bold text-xl text-foreground">
              {DATA.name}
            </span>
          </Link>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {DATA.description}
          </p>

          {/* social icons */}
          <div className="flex items-center gap-4 pt-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="group p-2 rounded-full border border-[#3B3BF6]/20 hover:border-[#3B3BF6]/50 transition-all duration-300 hover:shadow-[0_0_10px_#3B3BF6]"
                >
                  <Icon className="h-4 w-4 text-muted-foreground group-hover:text-[#3B3BF6] transition-colors duration-300" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* CENTER LINKS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
          <div>
            <h3 className="font-semibold text-foreground mb-3">Explore</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-[#3B3BF6] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#about"
                  className="text-muted-foreground hover:text-[#3B3BF6]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-muted-foreground hover:text-[#3B3BF6]"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href={DATA.contact.social.LinkedIn.url}
                  target="_blank"
                  className="text-muted-foreground hover:text-[#3B3BF6]"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-[#3B3BF6]"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#contact"
                  className="text-muted-foreground hover:text-[#3B3BF6]"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-muted-foreground hover:text-[#3B3BF6]"
                >
                  Status
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-muted-foreground hover:text-[#3B3BF6]"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT: 3D MODEL */}
        <div className="hidden lg:flex items-center justify-center w-full max-w-sm rounded-2xl border border-[#3B3BF6]/20 bg-background/30 shadow-[0_0_15px_#3B3BF6]/10">
          <SplineViewer
            url="https://prod.spline.design/00E9pW80VTSL0try/scene.splinecode"
            className="w-full h-[300px] rounded-2xl"
          />
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-[#3B3BF6]/20 py-6">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between">
          <p>
            © {new Date().getFullYear()} {DATA.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-3 md:mt-0">
            <Link href="/#" className="hover:text-[#3B3BF6] transition-colors">
              Terms
            </Link>
            <Link href="/#" className="hover:text-[#3B3BF6] transition-colors">
              Privacy
            </Link>
            <Link href="/#" className="hover:text-[#3B3BF6] transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
