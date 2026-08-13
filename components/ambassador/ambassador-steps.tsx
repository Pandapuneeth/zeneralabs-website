import { Reveal } from "@/components/reveal";
import { CutoutCard, cutoutCardSurfaceShadowClassName } from "@/components/ui/cutout-card";
import { AMBASSADOR_STEPS } from "@/lib/ambassador";
import { cn } from "@/lib/utils";

export function AmbassadorSteps() {
  return (
    <section className="relative z-[2] py-20 md:py-24">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <Reveal className="mb-3 inline-block text-[11px] font-semibold tracking-[0.4em] text-primary uppercase" as="span">
          How It Works
        </Reveal>
        <Reveal as="h2" className="font-heading text-3xl font-extrabold tracking-tight text-balance mb-4 md:text-5xl">
          Start earning in three simple steps
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {AMBASSADOR_STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.1} className="h-full flex">
              <CutoutCard
                className={cn(
                  cutoutCardSurfaceShadowClassName,
                  "relative flex h-full w-full flex-col overflow-hidden rounded-[28px] border border-border bg-card p-7",
                )}
              >
                <span className="absolute -top-4 -right-2 font-heading text-[88px] leading-none font-extrabold text-primary/10 select-none">
                  {step.num}
                </span>
                <div className="relative">
                  <div className="mb-4 flex size-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/15 text-primary font-heading font-bold">
                    {step.num}
                  </div>
                  <h3 className="font-heading mb-2 text-lg font-bold text-foreground">{step.title}</h3>
                  <p className="leading-relaxed text-[13px] text-muted-foreground">{step.desc}</p>
                </div>
              </CutoutCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
