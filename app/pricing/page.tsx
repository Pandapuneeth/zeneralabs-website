import type { Metadata } from "next";
import { PricingHero } from "@/components/pricing/pricing-hero";
import { AnniversaryOffers } from "@/components/pricing/anniversary-offers";
import { PricingEstimator } from "@/components/pricing/pricing-estimator";
import { PricingTable } from "@/components/pricing/pricing-table";
import { PricingExclusions } from "@/components/pricing/pricing-exclusions";
import { CtaStrip } from "@/components/cta-strip";
import { SiteFooter } from "@/components/site-footer";
import {
  JsonLd,
  pricingPageJsonLd,
  pricingBreadcrumbJsonLd,
} from "@/components/jsonld";

export const metadata: Metadata = {
  title: "Pricing & Estimates | Zenera Labs — Websites, Apps & AI",
  description:
    "Transparent starting prices for websites, mobile apps, AI & ML, automation and student projects. Get a fast estimate from Zenera Labs — fair pricing, real engineering, no unnecessary upselling.",
  keywords: [
    "Zenera Labs pricing",
    "website development cost India",
    "Flutter app development price",
    "AI chatbot cost",
    "final year project price help",
    "starting price website Bangalore",
    "pricing estimator",
    "zenera labs price list",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://zeneralabs.in/pricing" },
  openGraph: {
    type: "website",
    siteName: "Zenera Labs",
    title: "What will it cost to build your idea? — Zenera Labs Pricing",
    description:
      "Websites from ₹2,999, student projects from ₹1,999, mini projects from ₹999. Get a realistic starting estimate from Zenera Labs.",
    url: "https://zeneralabs.in/pricing",
    images: [
      {
        url: "https://zeneralabs.in/assets/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenera Labs Pricing — Websites, Apps & AI",
    description:
      "Fair pricing. Real engineering. No unnecessary upselling. Get a fast estimate for your project.",
    images: ["https://zeneralabs.in/assets/og-image.jpg"],
  },
};

export default function PricingPage() {
  return (
    <>
      <main id="main">
        <PricingHero />
        <AnniversaryOffers />
        <PricingEstimator />
        <PricingTable />
        <PricingExclusions />
        <CtaStrip />
      </main>
      <SiteFooter variant="home" />
      <JsonLd data={pricingPageJsonLd} />
      <JsonLd data={pricingBreadcrumbJsonLd} />
    </>
  );
}