import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { ContactInfo } from "@/components/contact-info";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { BackArrowIcon } from "@/components/icons";
import { CutoutCard, cutoutCardSurfaceShadowClassName } from "@/components/ui/cutout-card";
import { cn } from "@/lib/utils";
import { JsonLd, contactPageJsonLd, contactBreadcrumbJsonLd } from "@/components/jsonld";

export const metadata: Metadata = {
  title: "Contact Zenera Labs | Get a Free Quote — AI, Web & App Development Bangalore",
  description:
    "Contact Zenera Labs for AI automation, web development, Flutter apps, backend systems, AutoCAD design, or final year project support. WhatsApp: +91 80733 78278. Email: zeneralabs@gmail.com. Bangalore, India.",
  keywords: [
    "contact Zenera Labs",
    "Zenera Labs quote",
    "hire AI developer Bangalore",
    "final year project help contact",
    "IEEE paper help India",
    "Puneeth Punacha contact",
    "zeneralabs@gmail.com",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://zeneralabs.in/contact.html" },
  openGraph: {
    type: "website",
    siteName: "Zenera Labs",
    title: "Contact Zenera Labs | Free Consultation — Bangalore",
    description:
      "Get in touch with Zenera Labs for AI, web, app dev, or final year project support. WhatsApp +91 80733 78278. Based in Bangalore.",
    url: "https://zeneralabs.in/contact.html",
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
    title: "Contact Zenera Labs | Free Consultation",
    description: "AI, web, apps, final year projects. WhatsApp +91 80733 78278. Bangalore, India.",
    images: ["https://zeneralabs.in/assets/og-image.jpg"],
  },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const params = await searchParams;
  const initialService = typeof params.service === "string" ? params.service : "";

  return (
    <>
      <main id="main">
        <section className="relative z-[2] pt-[130px] pb-[60px]">
          <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
            <Reveal className="mb-6">
              <Link href="/" className="inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground">
                <BackArrowIcon />
                Back to Home
              </Link>
            </Reveal>
            <Reveal
              className="mb-3 inline-block text-[11px] font-semibold tracking-[0.4em] text-primary uppercase"
              as="span"
            >
              Get In Touch
            </Reveal>
            <Reveal as="h1" className="font-heading text-4xl font-extrabold tracking-tight text-balance leading-[1.1] mb-4 md:text-6xl" delay={0.2}>
              Let&apos;s build something
              <br />
              <span className="bg-linear-to-r from-primary via-primary to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-grad-shift">
                extraordinary.
              </span>
            </Reveal>
            <Reveal as="p" className="leading-relaxed text-muted-foreground" delay={0.3}>
              Tell us what you need. We&apos;ll tell you how we can make it happen.
            </Reveal>
          </div>
        </section>

        <div className="relative z-[2] pb-[100px]">
          <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
            <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[1fr_380px]">
              <CutoutCard className={cn(cutoutCardSurfaceShadowClassName, "rounded-[28px] bg-card p-7 sm:p-8 md:p-10")}>
                <div className="mb-9">
                  <h2 className="font-heading text-2xl font-bold mb-2">Send us a message</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    We&apos;ll get back to you within a few hours. For faster response, WhatsApp us
                    directly.
                  </p>
                </div>
                <ContactForm initialService={initialService} />
              </CutoutCard>
              <ContactInfo />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter variant="contact" />
      <JsonLd data={contactPageJsonLd} />
      <JsonLd data={contactBreadcrumbJsonLd} />
    </>
  );
}