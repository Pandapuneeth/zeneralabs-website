import { Reveal } from "@/components/reveal";
import { CutoutCard, cutoutCardSurfaceShadowClassName } from "@/components/ui/cutout-card";
import { Badge } from "@/components/ui/badge";
import { AMBASSADOR_TIERS } from "@/lib/ambassador";
import { cn } from "@/lib/utils";
import { CheckIcon } from "./ambassador-icons";

export function AmbassadorTiers() {
  return (
    <section className="relative z-[2] py-20 md:py-24">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <Reveal className="mb-3 inline-block text-[11px] font-semibold tracking-[0.4em] text-primary uppercase" as="span">
          Commission Tiers
        </Reveal>
        <Reveal as="h2" className="font-heading text-3xl font-extrabold tracking-tight text-balance mb-4 md:text-5xl">
          The more you refer, the more you earn
        </Reveal>
        <Reveal as="p" className="max-w-[520px] leading-relaxed text-muted-foreground">
          Everyone starts at 20% and climbs up to 30% as the value you refer grows. No caps, no
          hidden terms.
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {AMBASSADOR_TIERS.map((tier, i) => (
            <Reveal key={tier.tier} delay={i * 0.1} className="h-full flex">
              <CutoutCard
                className={cn(
                  cutoutCardSurfaceShadowClassName,
                  "relative flex h-full w-full flex-col overflow-hidden rounded-[28px] border bg-card p-7",
                  tier.highlight && "border-primary/40 bg-linear-to-b from-primary/12 to-card md:-translate-y-3",
                )}
              >
                {tier.highlight && (
                  <Badge className="absolute top-5 right-5 rounded-full bg-primary text-primary-foreground hover:bg-primary">
                    Most Popular
                  </Badge>
                )}
                <div className="mb-6">
                  <h3 className="font-heading text-lg font-bold text-foreground">{tier.tier}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{tier.threshold}</p>
                </div>
                <div className="mb-6 flex items-end gap-1">
                  <span className={cn("font-heading text-6xl font-extrabold leading-none tabular-nums", tier.highlight ? "text-primary" : "text-foreground")}>
                    Up to {tier.label}
                  </span>
                  <span className="mb-1 text-sm text-muted-foreground">commission</span>
                </div>
                <ul className="mb-8 flex flex-col gap-3">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-muted-foreground">
                      <span className="mt-0.5 text-primary">
                        <CheckIcon />
                      </span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </CutoutCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
