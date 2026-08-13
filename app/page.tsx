import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { TextLoop } from "@/components/text-loop";
import { Impact } from "@/components/impact";
import { Services } from "@/components/services";
import { Team } from "@/components/team";
import { CtaStrip } from "@/components/cta-strip";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd, homeBreadcrumbJsonLd } from "@/components/jsonld";

export const metadata: Metadata = {
  title: "Zenera Labs | AI Automation, Web & App Development — Bangalore, India",
  alternates: { canonical: "https://zeneralabs.in/" },
};

export default function HomePage() {
  return (
    <>
      <main id="main">
        <Hero />
        <div className="relative z-[2] border-y border-border bg-white/[0.015]" aria-hidden="true">
          <TextLoop
            text="AI Automation ✦ Web Development ✦ Flutter Apps ✦ Backend Systems ✦ Final Year Projects"
            shape="wave"
            speed={90}
            separator=""
            curviness={50}
            fontSize={46}
            fontWeight={800}
            letterSpacing={6}
            uppercase
            color="var(--foreground)"
            ribbon
            ribbonColor="var(--primary)"
            ribbonWidth={86}
            pauseOnHover
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[120px] bg-linear-to-r from-background to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-[120px] bg-linear-to-l from-background to-transparent" aria-hidden="true" />
        </div>
        <Impact />
        <Services />
        <Team />
        <CtaStrip />
      </main>
      <SiteFooter variant="home" />
      <JsonLd data={homeBreadcrumbJsonLd} />
    </>
  );
}