import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../styles/marquee-optimizations.css";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Chamath Dilshan - Full Stack Developer & UI/UX Designer",
    template: "%s | Chamath Dilshan",
  },
  description:
    "Innovative Full Stack Developer specializing in React, Next.js, and modern web technologies. Creating exceptional digital experiences with cutting-edge UI/UX design and robust backend solutions.",
  applicationName: "Chamath Dilshan Portfolio",
  authors: [
    {
      name: "Chamath Dilshan",
      url: "https://chamathdilshan.dev",
    },
  ],
  creator: "Chamath Dilshan",
  publisher: "Chamath Dilshan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://chamathdilshan.dev"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      en: "/en",
    },
  },
  keywords: [
    "Chamath Dilshan",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "UI/UX Designer",
    "React Developer",
    "Next.js Expert",
    "TypeScript Developer",
    "JavaScript Developer",
    "Web Developer",
    "Software Engineer",
    "Portfolio",
    "Web Applications",
    "Modern Web Development",
    "Responsive Design",
    "API Development",
    "Database Design",
    "Open Source",
    "GitHub",
    "Tailwind CSS",
    "Node.js",
    "MongoDB",
    "Figma",
    "Adobe XD",
    "E-commerce Development",
    "CMS Development",
    "Workflow Automation",
  ],
  classification: "Technology, Web Development, Software Engineering",
  category: "portfolio",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chamathdilshan.dev",
    siteName: "Chamath Dilshan - Portfolio",
    title: "Chamath Dilshan - Full Stack Developer & UI/UX Designer",
    description:
      "Innovative Full Stack Developer specializing in React, Next.js, and modern web technologies. Creating exceptional digital experiences with cutting-edge UI/UX design.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chamath Dilshan - Full Stack Developer & UI/UX Designer",
        type: "image/jpeg",
      },
      {
        url: "/og-image-square.jpg",
        width: 400,
        height: 400,
        alt: "Chamath Dilshan Profile",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ChamathDilshan",
    creator: "@ChamathDilshan",
    title: "Chamath Dilshan - Full Stack Developer & UI/UX Designer",
    description:
      "Innovative Full Stack Developer specializing in React, Next.js, and modern web technologies. Creating exceptional digital experiences.",
    images: {
      url: "/twitter-image.jpg",
      alt: "Chamath Dilshan - Full Stack Developer",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      me: ["your@email.com", "https://chamathdilshan.dev"],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased py-12 sm:py-24 px-6",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            {children}
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
