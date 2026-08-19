import type { PortfolioWork } from "@/lib/works";

export function StepsList({ work }: { work: PortfolioWork }) {
  return (
    <ol className="relative space-y-px">
      {work.workflow.map((step, i) => (
        <li key={step.title} className="relative">
          <div className="flex items-start gap-5 rounded-2xl border border-border/70 bg-card p-5 transition-colors duration-300 hover:border-primary/35 md:p-6">
            <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 font-heading text-sm font-bold text-primary tabular-nums">
              {i + 1}
            </span>
            <div className="min-w-0">
              <h3 className="font-heading text-base font-bold text-foreground">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-pretty text-muted-foreground">
                {step.desc}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}