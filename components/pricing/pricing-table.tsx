"use client";

import { useState } from "react";
import type { ComponentType, SVGProps } from "react";
import {
  AiIcon,
  AutomationIcon,
  DesignIcon,
  FlutterIcon,
  StudentIcon,
  WebIcon,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PRICING_CATEGORIES } from "@/lib/pricing";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

type IconType = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const CATEGORY_ICONS: Record<string, IconType> = {
  web: WebIcon,
  mobile: FlutterIcon,
  ai: AiIcon,
  automation: AutomationIcon,
  student: StudentIcon,
  design: DesignIcon,
};

export function PricingTable() {
  const [active, setActive] = useState(PRICING_CATEGORIES[0].id);
  const activeCategory =
    PRICING_CATEGORIES.find((c) => c.id === active) ?? PRICING_CATEGORIES[0];
  const ActiveIcon = CATEGORY_ICONS[activeCategory.id];

  return (
    <section id="catalog" className="relative z-[2] scroll-mt-[126px] py-20 md:py-24">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <Reveal
          className="mb-3 inline-block text-[11px] font-semibold tracking-[0.4em] text-primary uppercase"
          as="span"
        >
          Services &amp; Packages
        </Reveal>
        <Reveal as="h2" className="font-heading text-3xl font-extrabold tracking-tight text-balance mb-3 md:text-4xl">
          Our full starting prices
        </Reveal>
        <Reveal as="p" className="max-w-[560px] leading-relaxed text-muted-foreground">
          Starting prices by category. Use the estimator above for a smarter ballpark, then let&apos;s
          lock an exact quote together.
        </Reveal>

        <Reveal delay={0.15} className="mt-10">
          <Tabs value={active} onValueChange={(value) => setActive(String(value))} className="group/tabs gap-0">
            <TabsList className="h-auto w-full justify-start gap-1 overflow-x-auto rounded-xl border border-border bg-muted/40 p-1.5">
              {PRICING_CATEGORIES.map((category) => {
                const Icon = CATEGORY_ICONS[category.id];
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="h-9 shrink-0 gap-2 rounded-lg px-3 text-[13px] font-semibold focus-visible:rounded-lg"
                  >
                    <Icon size={16} />
                    {category.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value={active} className="mt-8">
              <p className="mb-5 flex items-center gap-2.5 text-sm text-muted-foreground">
                <ActiveIcon size={18} className="text-primary" />
                {activeCategory.blurb}
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {activeCategory.tiers.map((tier) => (
                  <div
                    key={tier.name}
                    className="flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/25"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-heading text-[15px] font-bold">{tier.name}</h3>
                        {tier.anniversary && (
                          <Badge className="h-5 shrink-0 rounded-full border-primary/25 bg-primary/15 px-2.5 text-[9px] font-bold tracking-[0.14em] text-primary uppercase">
                            Anniv. price
                          </Badge>
                        )}
                      </div>
                      <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground">
                        {tier.note}
                      </p>
                    </div>
                    <span className="mt-5 font-heading text-2xl font-extrabold text-primary tabular-nums">
                      {tier.price}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Reveal>

        <Reveal as="p" className={cn("mt-8 text-center text-[12px] text-foreground/40")} delay={0.2}>
          * Anniversary campaign pricing. Marked &quot;starting at&quot; — never a promise of unlimited
          features.
        </Reveal>
      </div>
    </section>
  );
}