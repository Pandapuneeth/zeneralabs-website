import { Reveal } from "@/components/reveal";
import type { PortfolioWork } from "@/lib/works";

export function CapabilityGrid({ work }: { work: PortfolioWork }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {work.capabilities.map((cap, i) => (
        <Reveal
          key={cap.title}
          delay={Math.min(i * 0.05, 0.25)}
          className="h-full"
        >
          <div className="flex h-full flex-col rounded-2xl border border-border/70 bg-card p-6 transition-colors duration-300 hover:border-primary/35">
            <span className="mb-4 inline-flex size-9 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 font-heading text-sm font-bold text-primary tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-pretty font-heading text-base font-bold text-foreground">
              {cap.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">
              {cap.desc}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}