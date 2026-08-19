import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { WorksGrid } from "@/components/portfolio/works-grid";
import { JsonLd, portfolioPageJsonLd, portfolioBreadcrumbJsonLd } from "@/components/jsonld";

export const metadata: Metadata = {
  title: "Zenera Labs Engineering Portfolio | Case Studies — AI, Analytics & Security",
  description:
    "Internally developed systems demonstrating Zenera Labs capabilities in AI automation, analytics, cybersecurity and intelligent software — case studies with demos, architecture and validation.",
  keywords: [
    "Zenera Labs portfolio",
    "Zenera Labs case studies",
    "AI agents portfolio",
    "AI automation projects",
    "multi-agent research system",
    "AI data analyst",
    "security log anomaly detection",
    "Zenera Labs engineering",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://zeneralabs.in/portfolio" },
  openGraph: {
    type: "website",
    siteName: "Zenera Labs",
    title: "Zenera Labs Engineering Portfolio",
    description:
      "Internally developed systems in AI automation, analytics, cybersecurity and intelligent software.",
    url: "https://zeneralabs.in/portfolio",
    images: [
      {
        url: "https://zeneralabs.in/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zenera Labs — Engineering Portfolio",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenera Labs Engineering Portfolio",
    description:
      "Internally developed systems in AI automation, analytics, cybersecurity and intelligent software.",
    images: ["https://zeneralabs.in/assets/og-image.jpg"],
  },
};

export default function PortfolioPage() {
  return (
    <>
      <main id="main">
        <section className="relative z-[2] pt-[150px] pb-12 md:pt-[170px]">
          <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
            <Reveal className="mb-4">
              <div className="flex flex-wrap gap-2">
                <Badge className="h-6 items-center gap-2 rounded-full bg-primary/10 px-3 text-[11px] font-bold tracking-[0.14em] text-primary uppercase">
                  Zenera Labs Engineering Portfolio
                </Badge>
              </div>
            </Reveal>
            <Reveal as="h1" className="font-heading text-4xl font-extrabold tracking-tight text-balance leading-[1.05] md:text-6xl" delay={0.1}>
              We build what we
              <br />
              <span className="bg-linear-to-r from-primary via-primary to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-grad-shift">
                ship for ourselves.
              </span>
            </Reveal>
            <Reveal as="p" className="mt-6 max-w-[640px] text-balance text-lg leading-relaxed text-muted-foreground" delay={0.2}>
              Internally developed systems demonstrating our capabilities in AI automation, analytics,
              cybersecurity and intelligent software. Not client projects — our own engineering, built
              end to end by the Zenera Labs team.
            </Reveal>
          </div>
        </section>

        <div className="relative z-[2] pb-24 md:pb-28">
          <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
            <WorksGrid />
          </div>
        </div>
      </main>
      <JsonLd data={portfolioPageJsonLd} />
      <JsonLd data={portfolioBreadcrumbJsonLd} />
    </>
  );
}