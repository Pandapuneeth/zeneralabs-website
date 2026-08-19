import { Reveal } from "@/components/reveal";
import type { PortfolioWork } from "@/lib/works";

export function ValidationPanel({ work }: { work: PortfolioWork }) {
  const { validation } = work;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Reveal className="h-full">
        <div className="flex h-full flex-col rounded-2xl border border-border/70 bg-card p-6 md:p-7">
          <h3 className="font-heading text-base font-bold text-foreground">Validation & tests</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{validation.summary}</p>
          <ul className="mt-4 space-y-2.5">
            {validation.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span className="min-w-0">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="h-full">
        <div className="flex h-full flex-col rounded-2xl border border-border/70 bg-card p-6 md:p-7">
          <h3 className="font-heading text-base font-bold text-foreground">Security & hardening</h3>
          <ul className="mt-4 space-y-2.5">
            {validation.security.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-primary/60" aria-hidden="true" />
                <span className="min-w-0">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={0.15} className="h-full lg:col-span-2">
        <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/[0.04] p-6 md:p-7">
          <h3 className="font-heading text-base font-bold text-foreground">
            Honest limitations
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {work.title} is an internally developed engineering prototype. We state limitations rather than overclaim production readiness.
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-2.5 md:grid-cols-2">
            {validation.limitations.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-amber-500/70" aria-hidden="true" />
                <span className="min-w-0">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}