import type { PortfolioWork } from "@/lib/works";

export function TechStack({ work }: { work: PortfolioWork }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/80 bg-card">
      <div className="grid grid-cols-1 divide-y divide-border/70 md:grid-cols-2 md:divide-y-0 md:divide-x">
        {work.technology.map((layer, i) => (
          <dl key={layer.layer} className={i % 2 === 1 ? "md:border-l md:border-border/70" : ""}>
            <div className="flex flex-col gap-2 p-5">
              <dt className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
                {layer.layer}
              </dt>
              <dd className="text-sm leading-relaxed text-pretty text-muted-foreground">
                {layer.items.join(", ")}
              </dd>
            </div>
          </dl>
        ))}
      </div>
    </div>
  );
}