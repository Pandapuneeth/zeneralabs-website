import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { TeamMemberCard } from "@/components/team-member-card";
import { TeamDepartments } from "@/components/team-departments";
import { TEAM } from "@/lib/site";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd, teamBreadcrumbJsonLd } from "@/components/jsonld";

export const metadata: Metadata = {
  title: "Our Team | Zenera Labs",
  description:
    "Meet the people behind Zenera Labs — our founders and the engineers, AI builders and growth team driving intelligent technology.",
  keywords: ["Zenera Labs team", "AI engineers", "ML engineers", "founders", "Zenera Labs"],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://zeneralabs.in/team" },
  openGraph: {
    type: "website",
    siteName: "Zenera Labs",
    title: "Our Team — Zenera Labs",
    description: "Founders and builders creating real-world impact with intelligent technology.",
    url: "https://zeneralabs.in/team",
    images: [{ url: "https://zeneralabs.in/assets/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Team — Zenera Labs",
    description: "Founders and builders creating real-world impact with intelligent technology.",
    images: ["https://zeneralabs.in/assets/og-image.jpg"],
  },
};

export default function TeamPage() {
  const founders = TEAM.filter((m) => m.badge === "Founder" || m.badge === "Co-Founder");
  const members = TEAM.filter((m) => !m.badge);

  return (
    <>
      <main id="main">
        <section className="relative z-[2] pt-[150px] pb-16 md:pb-24">
          <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
            <Reveal
              className="mb-3 inline-block text-[11px] font-semibold tracking-[0.4em] text-primary uppercase"
              as="span"
            >
              The People
            </Reveal>
            <Reveal as="h1" className="font-heading text-4xl font-extrabold tracking-tight text-balance mb-4 md:text-6xl">
              Meet the Team
            </Reveal>
            <Reveal as="p" className="max-w-[560px] leading-relaxed text-muted-foreground">
              Engineers, designers, and builders who actually give a damn about the craft.
            </Reveal>
          </div>
        </section>

        <section className="relative z-[2] pb-20 md:pb-28">
          <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
            <Reveal className="mb-8 flex items-center gap-3">
              <span className="font-heading text-[11px] font-bold tracking-[0.4em] text-primary/50 uppercase">Founders</span>
              <span className="h-px flex-1 bg-primary/20" aria-hidden="true" />
            </Reveal>
            <div className="flex flex-wrap justify-center gap-5">
              {founders.map((member, i) => (
                <Reveal
                  key={member.name}
                  delay={Math.min(i * 0.1, 0.3)}
                  className="w-full max-w-[300px] sm:w-[300px]"
                >
                  <TeamMemberCard member={member} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-[2] pb-28">
          <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
            <Reveal className="mb-8 flex items-center gap-3">
              <span className="font-heading text-[11px] font-bold tracking-[0.4em] text-primary/50 uppercase">Departments</span>
              <span className="h-px flex-1 bg-primary/20" aria-hidden="true" />
            </Reveal>

            <div className="space-y-4">
              <TeamDepartments members={members} />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter variant="home" />
      <JsonLd data={teamBreadcrumbJsonLd} />
    </>
  );
}
