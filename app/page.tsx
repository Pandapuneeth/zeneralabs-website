import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
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
        <Marquee />
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