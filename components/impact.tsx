import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { IMPACT_STATS } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import { cn } from "@/lib/utils";

export function Impact() {
  return (
    <section id="impact" className="relative z-[2] scroll-mt-[86px] py-24 md:py-28">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <Reveal
          className="mb-3 inline-block text-[11px] font-semibold tracking-[0.4em] text-primary uppercase"
          as="span"
        >
          Our Impact
        </Reveal>
        <Reveal as="h2" className="font-heading text-4xl font-extrabold tracking-tight text-balance mb-4 md:text-5xl">
          Numbers that speak
        </Reveal>
        <Reveal as="p" className="max-w-[520px] leading-relaxed text-muted-foreground">
          Every project is treated like our own.
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {IMPACT_STATS.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.1}
              className="group/card relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 transition-colors duration-300 hover:border-primary/25"
            >
              <span className="mb-4 block text-3xl" aria-hidden="true">{stat.emoji}</span>
              <div className="mb-2 flex items-baseline gap-0.5">
                <span className="font-heading text-5xl font-extrabold leading-none text-primary tabular-nums">
                  <CountUp target={stat.target} />
                </span>
                {stat.plus && <span className="font-heading text-3xl font-extrabold text-primary">+</span>}
              </div>
              <div className="font-heading text-sm font-bold">{stat.label}</div>
              <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground">{stat.desc}</p>
            </Reveal>
          ))}

          <Reveal delay={0.5} className="flex flex-col items-start justify-center rounded-2xl border border-primary/25 bg-linear-to-br from-primary/15 to-primary/5 p-7">
            <p className="font-heading mb-5 text-lg leading-relaxed font-bold">
              Ready to be our next success story?
            </p>
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "sm" }), "h-10 rounded-lg px-5 text-sm")}
            >
              Let&apos;s Talk →
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}