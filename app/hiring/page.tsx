import type { Metadata } from "next";
import { HiringHero } from "@/components/hiring/hiring-hero";
import { HiringRoles } from "@/components/hiring/hiring-roles";
import { HiringAbout } from "@/components/hiring/hiring-about";
import { HiringApply } from "@/components/hiring/hiring-apply";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd, hiringJsonLd, hiringBreadcrumbJsonLd } from "@/components/jsonld";

export const metadata: Metadata = {
  title: "We're Hiring — Growth, Business Development & Marketing Team | Zenera Labs",
  description:
    "Zenera Labs is expanding. Join our Growth, Business Development & Marketing team — Growth/Business Development Lead, Lead Generation, Sales Outreach and Marketing & Content internships. Real operations, real startup exposure. Remote/hybrid.",
  keywords: [
    "Zenera Labs hiring",
    "business development intern",
    "lead generation internship",
    "sales development internship",
    "marketing internship tech company",
    "B2B sales internship India",
    "growth internship startup",
    "AI company jobs India",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://zeneralabs.in/hiring" },
  openGraph: {
    type: "website",
    siteName: "Zenera Labs",
    title: "We're Hiring — Build Zenera Labs' Growth Engine",
    description:
      "Growth/Business Development Lead, Lead Generation, Sales Outreach and Marketing internships at Zenera Labs. Real operations. Remote/hybrid.",
    url: "https://zeneralabs.in/hiring",
    images: [{ url: "https://zeneralabs.in/assets/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "We're Hiring — Zenera Labs Growth Team",
    description: "Growth, Business Development & Marketing roles. Real operations, real exposure.",
    images: ["https://zeneralabs.in/assets/og-image.jpg"],
  },
};

export default function HiringPage() {
  return (
    <>
      <main id="main">
        <HiringHero />
        <HiringRoles />
        <HiringAbout />
        <HiringApply />
      </main>
      <SiteFooter variant="home" />
      <JsonLd data={hiringJsonLd} />
      <JsonLd data={hiringBreadcrumbJsonLd} />
    </>
  );
}