import { Reveal } from "@/components/reveal";

const VALUES = [
  "Initiative",
  "Communication",
  "Research ability",
  "Creativity",
  "Consistency",
  "Willingness to learn",
] as const;

const EXPOSURE = [
  "B2B lead generation",
  "Business development",
  "Sales & client acquisition",
  "LinkedIn & email outreach",
  "Marketing for a technology company",
  "AI & software product positioning",
  "Real-world startup operations",
] as const;

export function HiringAbout() {
  return (
    <section className="relative z-[2] py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="mb-3 flex items-center gap-3">
              <span className="font-heading text-[11px] font-bold tracking-[0.4em] text-primary/50 uppercase">02</span>
              <span className="h-px w-10 bg-primary/30" aria-hidden="true" />
              <span className="text-[11px] font-semibold tracking-[0.4em] text-primary uppercase">Who We&apos;re Looking For</span>
            </div>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-balance md:text-4xl">
              We value skills, not just degrees.
            </h2>
            <p className="mt-4 mb-6 leading-relaxed text-muted-foreground">
              We value <strong className="text-foreground">initiative, communication, research ability,
              creativity, consistency, and willingness to learn</strong> more than a fancy degree.
            </p>
            <ul className="flex flex-wrap gap-2">
              {VALUES.map((value) => (
                <li
                  key={value}
                  className="rounded-lg border border-primary/25 bg-primary/[0.05] px-3 py-2 text-[13px] font-medium text-primary"
                >
                  {value}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border/70 bg-card p-6 md:p-7">
              <p className="mb-4 text-[11px] font-semibold tracking-[0.3em] text-primary uppercase">
                Hands-on exposure
              </p>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {EXPOSURE.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-pretty text-foreground">
                    <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span className="min-w-0">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-5 rounded-xl border border-border/70 bg-background/40 p-4 text-sm leading-relaxed text-muted-foreground">
              This is <strong className="text-foreground">not</strong> a &ldquo;make a few posts and collect a
              certificate&rdquo; internship. You&apos;ll be working on real Zenera Labs growth operations and
              contributing directly to how we acquire and work with clients.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}