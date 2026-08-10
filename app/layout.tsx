import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { Loader } from "@/components/loader";
import { CustomCursor } from "@/components/custom-cursor";
import { BgParticles } from "@/components/bg-particles";
import { ToastProvider } from "@/components/toast-provider";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { GeistPixelSquare, GeistPixelGrid, GeistPixelCircle, GeistPixelTriangle, GeistPixelLine } from 'geist/font/pixel';

import {
  JsonLd,
  orgJsonLd,
  localBusinessJsonLd,
  webSiteJsonLd,
} from "@/components/jsonld";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const description =
  "Zenera Labs is a Bangalore-based digital solutions agency founded by Puneeth Punacha. We build AI automation, full stack Flutter apps, web development, backend systems, and support 100+ final year engineering students with projects and research papers.";

export const metadata: Metadata = {
  metadataBase: new URL("https://zeneralabs.in"),
  title: "Zenera Labs | AI Automation, Web & App Development — Bangalore, India",
  description,
  keywords: [
    "Zenera Labs",
    "Puneeth Punacha",
    "AI automation Bangalore",
    "web development India",
    "Flutter app development",
    "final year project help",
    "IEEE research paper help",
    "ML engineer India",
    "software agency Bangalore",
    "Zenera Labs Bangalore",
    "digital solutions India",
  ],
  authors: [{ name: "Puneeth Punacha, Zenera Labs" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: { canonical: "https://zeneralabs.in/" },
  openGraph: {
    type: "website",
    siteName: "Zenera Labs",
    title: "Zenera Labs | AI Automation, Web & App Development — Bangalore",
    description:
      "We build AI automation, Flutter apps, web & backend systems for businesses. Also helping 100+ final year students with projects and research papers. Based in Bangalore, India.",
    url: "https://zeneralabs.in/",
    images: [
      {
        url: "https://zeneralabs.in/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zenera Labs — AI & Digital Solutions Agency, Bangalore",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenera Labs | AI Automation & Digital Solutions — Bangalore",
    description:
      "We build AI automation, Flutter apps, web & backend systems. Helping 100+ final year students with projects & research papers. Bangalore, India.",
    images: ["https://zeneralabs.in/assets/og-image.jpg"],
    creator: "@zeneralabs",
  },
  icons: {
    icon: "/assets/logo.png",
    shortcut: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
  other: {
    "geo.region": "IN-KA",
    "geo.placename": "Bangalore, Karnataka, India",
    "geo.position": "12.9716;77.5946",
    ICBM: "12.9716, 77.5946",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", GeistPixelSquare.className)}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="fixed top-[-100%] left-4 z-[10000] rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground no-underline transition-[top] duration-200 focus:top-4"
        >
          Skip to main content
        </a>
        <Loader />
        <CustomCursor />

        <div className="noise" aria-hidden="true" />
        <div className="pointer-events-none fixed top-[-200px] right-[-200px] z-0 size-[600px] rounded-full bg-primary/10 blur-[80px] animate-orb-1" aria-hidden="true" />
        <div className="pointer-events-none fixed bottom-[10%] left-[-150px] z-0 size-[400px] rounded-full bg-primary/10 blur-[80px] animate-orb-2" aria-hidden="true" />
        <div className="pointer-events-none fixed top-1/2 right-[20%] z-0 size-[300px] rounded-full bg-primary/10 blur-[80px] animate-orb-3" aria-hidden="true" />
        <div
          className="pointer-events-none fixed inset-0 z-0 [background-image:linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:60px_60px]"
          aria-hidden="true"
        />
        <BgParticles />

        <JsonLd data={orgJsonLd} />
        <JsonLd data={localBusinessJsonLd} />
        <JsonLd data={webSiteJsonLd} />

        <ToastProvider>
          <SiteHeader />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}