import { Reveal } from "@/components/reveal";
import type { PortfolioWork } from "@/lib/works";
import { ArrowUpRightIcon } from "@/components/icons";

export function DocLinks({ work }: { work: PortfolioWork }) {
  if (!work.documentation || work.documentation.links.length === 0) return null;

  return (
    <Reveal>
      <div className="rounded-2xl border border-border/70 bg-card p-6 md:p-7">
        <h3 className="font-heading text-base font-bold text-foreground">Documentation</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {work.documentation.intro}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {work.documentation.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-primary/25 bg-transparent px-3 py-2 text-[13px] font-medium text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {link.title}
                <ArrowUpRightIcon width={12} height={12} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}