import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PortfolioWork } from "@/lib/works";
import { ArrowUpRightIcon, WhatsAppIcon } from "@/components/icons";
import { SITE } from "@/lib/site";

export function CaseHero({ work }: { work: PortfolioWork }) {
  const cover = work.screenshots[0];

  return (
    <section className="relative z-[2] pt-[150px] pb-16 md:pb-24">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge className="h-6 items-center gap-2 rounded-full bg-primary/10 px-3 text-[11px] font-bold tracking-[0.14em] text-primary uppercase">
                Zenera Labs Engineering Portfolio
              </Badge>
              <Badge
                variant="outline"
                className="h-6 rounded-full border-primary/25 bg-transparent px-3 text-[11px] font-medium text-muted-foreground"
              >
                {work.status}
              </Badge>
            </div>

            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-balance leading-[1.05] md:text-6xl">
              {work.title}
            </h1>

            <p className="mt-5 max-w-[520px] text-balance text-lg leading-relaxed text-muted-foreground">
              {work.tagline}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {work.categories.map((cat) => (
                <Badge
                  key={cat}
                  variant="outline"
                  className="h-6 rounded-full border-primary/25 bg-transparent px-2.5 text-[11px] font-medium text-primary"
                >
                  {cat}
                </Badge>
              ))}
            </div>

            <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="inline-flex size-2 rounded-full bg-primary" aria-hidden="true" />
              Built by <span className="font-medium text-foreground">{work.owner}</span> · {work.ownerRole}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={`/contact?service=${encodeURIComponent(work.quoteService)}`}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 rounded-xl px-7 text-sm hover:shadow-[0_10px_32px_color-mix(in_oklab,var(--primary)_40%,transparent)]",
                )}
              >
                Request Something Similar
                <ArrowUpRightIcon width={16} height={16} />
              </Link>
              <Link
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 rounded-lg border-green-500/30 px-6 text-sm text-green-500 hover:border-green-500/40 hover:bg-green-500/10 hover:text-green-500",
                )}
              >
                <WhatsAppIcon width={16} height={16} />
                Talk to Zenera Labs
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card shadow-[0_16px_48px_-16px_color-mix(in_oklab,var(--primary)_30%,transparent)]">
            {cover ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cover.src}
                  alt={cover.alt}
                  width={1600}
                  height={1000}
                  className="aspect-[16/10] h-auto w-full object-cover object-top"
                />
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-border/40" aria-hidden="true" />
              </>
            ) : (
              <div className="flex aspect-[16/10] w-full items-center justify-center bg-[radial-gradient(120%_120%_at_0%_0%,color-mix(in_oklab,var(--primary)_22%,transparent),transparent_60%)] p-8">
                <span className="font-heading text-2xl font-bold tracking-tight text-balance text-foreground/80">
                  {work.title}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}