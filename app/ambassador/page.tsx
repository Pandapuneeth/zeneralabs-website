import type { Metadata } from "next";
import { AmbassadorHero } from "@/components/ambassador/ambassador-hero";
import { AmbassadorTiers } from "@/components/ambassador/ambassador-tiers";
import { AmbassadorSteps } from "@/components/ambassador/ambassador-steps";
import { AmbassadorCalculator } from "@/components/ambassador/ambassador-calculator";
import { AmbassadorFaq } from "@/components/ambassador/ambassador-faq";
import { AmbassadorCta } from "@/components/ambassador/ambassador-cta";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd, ambassadorJsonLd } from "@/components/jsonld";

export const metadata: Metadata = {
  title: "Student Ambassador Program | Earn 20–30% Commission — Zenera Labs",
  description:
    "Join the Zenera Labs Student Ambassador Program. Refer clients and earn 20–30% commission on every project — no technical work needed. Free to join, paid fast.",
  keywords: [
    "Zenera Labs ambassador",
    "student ambassador program India",
    "earn commission referrals",
    "college ambassador program",
    "referral program web development",
    "make money as student India",
    "campus ambassador Bangalore",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://zeneralabs.in/ambassador" },
  openGraph: {
    type: "website",
    siteName: "Zenera Labs",
    title: "Student Ambassador Program — Earn 20–30% Commission | Zenera Labs",
    description:
      "Refer clients to Zenera Labs and earn commission on every project. No technical work needed. Free to join.",
    url: "https://zeneralabs.in/ambassador",
    images: [{ url: "https://zeneralabs.in/assets/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Ambassador Program | Zenera Labs",
    description: "Refer clients, earn 20–30% commission. No technical work needed.",
    images: ["https://zeneralabs.in/assets/og-image.jpg"],
  },
};

export default function AmbassadorPage() {
  return (
    <>
      <main id="main">
        <AmbassadorHero />
        <AmbassadorTiers />
        <AmbassadorSteps />
        <AmbassadorCalculator />
        <AmbassadorFaq />
        <AmbassadorCta />
      </main>
      <SiteFooter variant="home" />
      <JsonLd data={ambassadorJsonLd} />
    </>
  );
}
