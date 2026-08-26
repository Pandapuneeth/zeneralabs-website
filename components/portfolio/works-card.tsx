import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { PortfolioWork } from "@/lib/works";
import { ArrowUpRightIcon } from "@/components/icons";

export function WorksCard({ work }: { work: PortfolioWork }) {
  const cover = work.screenshots[0];

  return (
    <Link
      href={`/portfolio/${work.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-card text-card-foreground transition-[box-shadow,border-color] duration-500 hover:border-primary/40 hover:shadow-[0_16px_48px_-16px_color-mix(in_oklab,var(--primary)_35%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border/60">
        {cover ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cover.src}
              alt={cover.alt}
              width={1600}
              height={1000}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/30 via-transparent to-transparent" aria-hidden="true" />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(120%_120%_at_0%_0%,color-mix(in_oklab,var(--primary)_22%,transparent),transparent_60%)] p-6">
            <span className="font-heading text-lg font-bold tracking-tight text-balance text-foreground/80">
              {work.title}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {work.categories.slice(0, 3).map((cat) => (
            <Badge
              key={cat}
              variant="outline"
              className="h-6 rounded-full border-primary/25 bg-transparent px-2.5 text-[11px] font-medium text-primary"
            >
              {cat}
            </Badge>
          ))}
        </div>

        <h3 className="font-heading text-xl font-bold tracking-tight text-balance text-foreground">
          {work.title}
        </h3>
        <p className="mt-2 line-clamp-2 min-w-0 text-sm leading-relaxed text-muted-foreground">
          {work.tagline}
        </p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <p className="min-w-0 truncate text-[11px] font-medium tracking-wide text-muted-foreground/80 uppercase">
            {work.owner} · Engineering Portfolio
          </p>
          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary">
            View case study
            <ArrowUpRightIcon width={14} height={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}