import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWork, WORKS } from "@/lib/works";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd, caseStudyJsonLd, caseStudyBreadcrumbJsonLd } from "@/components/jsonld";
import { CaseBreadcrumb } from "@/components/portfolio/case-breadcrumb";
import { CaseHero } from "@/components/portfolio/case-hero";
import { CaseSection } from "@/components/portfolio/case-section";
import { CapabilityGrid } from "@/components/portfolio/capability-grid";
import { StepsList } from "@/components/portfolio/steps-list";
import { TechStack } from "@/components/portfolio/tech-stack";
import { ValidationPanel } from "@/components/portfolio/validation-panel";
import { DemoPlayer } from "@/components/portfolio/demo-player";
import { ScreenshotsGallery } from "@/components/portfolio/screenshots-gallery";
import { ArchitectureFigure } from "@/components/portfolio/architecture-figure";
import { DocLinks } from "@/components/portfolio/doc-links";
import { RelatedWorks } from "@/components/portfolio/related-works";
import { CaseCta } from "@/components/portfolio/case-cta";

export function generateStaticParams() {
  return WORKS.map((work) => ({ slug: work.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return {};
  const description = work.tagline;
  const url = `https://zeneralabs.in/portfolio/${work.slug}`;
  return {
    title: `${work.title} | Zenera Labs Engineering Portfolio`,
    description,
    keywords: [...work.categories, ...work.industries, "Zenera Labs", "AI case study", "engineering portfolio"],
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: "Zenera Labs",
      title: `${work.title} — Zenera Labs Case Study`,
      description,
      url,
      images: [
        {
          url: work.screenshots[0]?.src
            ? `https://zeneralabs.in${work.screenshots[0].src}`
            : "https://zeneralabs.in/assets/og-image.jpg",
          width: 1600,
          height: 1000,
          alt: work.screenshots[0]?.alt ?? work.title,
        },
      ],
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${work.title} — Zenera Labs Case Study`,
      description,
      images: work.screenshots[0]?.src
        ? [`https://zeneralabs.in${work.screenshots[0].src}`]
        : ["https://zeneralabs.in/assets/og-image.jpg"],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  return (
    <>
      <main id="main">
        <section className="relative z-[2]">
          <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
            <div className="pt-[120px]">
              <CaseBreadcrumb title={work.title} />
            </div>
          </div>
        </section>

        <CaseHero work={work} />

        <div className="relative z-[2]">
          <CaseSection
            index="01"
            eyebrow="See It In Action"
            title="The system, up close"
            description="Real captures from the running system — the demo, screenshots and architecture come first, then the deep dive."
          >
            <div className="space-y-14">
              {work.demo ? (
                <div>
                  <h3 className="mb-5 font-heading text-lg font-bold text-foreground">Demo</h3>
                  <DemoPlayer work={work} />
                </div>
              ) : null}

              <div>
                <h3 className="mb-5 font-heading text-lg font-bold text-foreground">Screenshots</h3>
                <ScreenshotsGallery work={work} />
              </div>

              {work.architecture ? (
                <div>
                  <h3 className="mb-5 font-heading text-lg font-bold text-foreground">Architecture</h3>
                  <ArchitectureFigure work={work} />
                </div>
              ) : null}
            </div>
          </CaseSection>

          <CaseSection index="02" eyebrow="The Problem" title="Why this needed to be built">
            <div className="space-y-4 max-w-[720px]">
              {work.problem.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed text-pretty text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </CaseSection>

          <CaseSection index="03" eyebrow="The Zenera Solution" title="What we built, and how it changes the workflow">
            <div className="space-y-6 max-w-[720px]">
              <p className="text-lg leading-relaxed text-pretty text-foreground">
                {work.solutionIntro}
              </p>
              {work.solution.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed text-pretty text-muted-foreground">
                  {paragraph}
                </p>
              ))}
              {work.principles && work.principles.length > 0 ? (
                <div className="rounded-2xl border border-primary/25 bg-primary/[0.05] p-6">
                  <p className="mb-3 text-[11px] font-semibold tracking-[0.3em] text-primary uppercase">
                    Core design principle
                  </p>
                  <ul className="space-y-2.5">
                    {work.principles.map((principle) => (
                      <li key={principle} className="flex items-start gap-2.5 text-sm leading-relaxed text-pretty text-foreground">
                        <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        <span className="min-w-0">{principle}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </CaseSection>

          <CaseSection index="04" eyebrow="Key Capabilities" title="What it can do" description="A focused set of capabilities that define the system — no marketable filler, only what actually runs.">
            <CapabilityGrid work={work} />
          </CaseSection>

          <CaseSection index="05" eyebrow="How It Works" title="The end-to-end workflow" description="The system processing path, in order.">
            <StepsList work={work} />
          </CaseSection>

          <CaseSection index="06" eyebrow="Technology" title="Stack & tech choices">
            <TechStack work={work} />
          </CaseSection>

          <CaseSection index="07" eyebrow="Validation" title="Tested, verified and honestly scoped">
            <ValidationPanel work={work} />
          </CaseSection>

          {work.documentation ? (
            <CaseSection index="08" eyebrow="Documentation" title="Deep-dive references">
              <DocLinks work={work} />
            </CaseSection>
          ) : null}

          <CaseSection index="09" eyebrow="Future Extensions" title="Where this can go next" description="Realistic next steps we've scoped — not aspirational marketing copy.">
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {work.future.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-5 text-sm leading-relaxed text-pretty text-muted-foreground">
                  <span className="mt-1 text-primary" aria-hidden="true">→</span>
                  <span className="min-w-0">{item}</span>
                </li>
              ))}
            </ul>
          </CaseSection>

          <CaseCta work={work} />

          <CaseSection index="10" eyebrow="More From The Portfolio" title="Other systems we've built internally">
            <RelatedWorks slug={work.slug} />
          </CaseSection>
        </div>
      </main>
      <SiteFooter variant="home" />
      <JsonLd data={caseStudyJsonLd(work.slug, work.title, work.tagline)} />
      <JsonLd data={caseStudyBreadcrumbJsonLd(work.slug, work.title)} />
    </>
  );
}