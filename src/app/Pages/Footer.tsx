"use client";

import { Icons } from "@/components/icons";
import { SplineViewer } from "@/components/spline-viewer";
import { DATA } from "@/data/resume";
import Link from "next/link";

function Footer() {
  const footerLinks = {
    product: [
      { name: "Features", href: "/#" },
      { name: "Security", href: "/#" },
      { name: "Projects", href: "/#projects" },
      { name: "Blog", href: "/blog" },
    ],
    platform: [
      { name: "Developer API", href: "/#" },
      { name: "Partners", href: "/#" },
      { name: "About", href: "/#about" },
    ],
    support: [
      { name: "Contact", href: "/#contact" },
      { name: "Documentation", href: "/#" },
      { name: "Status", href: "/#" },
    ],
    company: [
      { name: "About", href: "/#about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/#" },
      { name: "LinkedIn", href: DATA.contact.social.LinkedIn.url },
    ],
  };

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

  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
          {/* Left Side: Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Logo and brand */}
            <div className="col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">
                    {DATA.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <span className="font-bold text-xl">{DATA.name}</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs">
                {DATA.description}
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-semibold text-sm mb-3">Product</h3>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="font-semibold text-sm mb-3">Platform</h3>
              <ul className="space-y-2">
                {footerLinks.platform.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-semibold text-sm mb-3">Support</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold text-sm mb-3">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side: 3D Spline Model */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-md h-[400px] rounded-2xl overflow-hidden border border-border/50">
              <SplineViewer
                url="https://prod.spline.design/00E9pW80VTSL0try/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>
              © {new Date().getFullYear()} {DATA.name}
            </span>
            <Link href="/#" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/#" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/#" className="hover:text-foreground transition-colors">
              Security
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.name}
                >
                  <IconComponent className="h-5 w-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
