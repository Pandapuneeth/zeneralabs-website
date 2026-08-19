import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { WorksGrid } from "@/components/portfolio/works-grid";
import { ArrowUpRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export function HomeWorkSection() {
  return (
    <section id="work" className="relative z-[2] scroll-mt-[126px] py-24 md:py-28">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <Reveal
          className="mb-3 inline-block text-[11px] font-semibold tracking-[0.4em] text-primary uppercase"
          as="span"
        >
          Zenera Labs Engineering Portfolio
        </Reveal>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal as="h2" className="font-heading text-4xl font-extrabold tracking-tight text-balance mb-0 md:text-5xl">
            Selected AI Solutions
          </Reveal>
          <Reveal as="p" className="max-w-[420px] leading-relaxed text-muted-foreground" delay={0.1}>
            Internally developed systems that prove what we can build — AI automation, analytics,
            cybersecurity and intelligent software.
          </Reveal>
        </div>

        <div className="mt-14">
          <WorksGrid />
        </div>

        <Reveal className="mt-10">
          <Link
            href="/portfolio"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "h-11 rounded-xl px-7 text-sm font-semibold",
            )}
          >
            View the full portfolio
            <ArrowUpRightIcon width={16} height={16} data-icon="inline-end" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}