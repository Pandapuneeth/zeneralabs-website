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
import { PRICING_CATEGORIES } from "@/lib/pricing";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

type IconType = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

function InfoIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={cn("text-primary shrink-0", className)}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" strokeLinecap="round" />
      <circle cx="12" cy="8" r="0.5" fill="currentColor" />
    </svg>
  );
}

const CATEGORY_ICONS: Record<string, IconType> = {
  web: WebIcon,
  mobile: FlutterIcon,
  ai: AiIcon,
  automation: AutomationIcon,
  student: StudentIcon,
  design: DesignIcon,
};

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const fromPrice = (tiers: { price: string }[]) => {
  const numbers = tiers
    .map((tier) => Number(tier.price.replace(/[^0-9]/g, "")))
    .filter((n) => Number.isFinite(n) && n > 0);
  return numbers.length ? Math.min(...numbers) : 0;
};

const TOTAL_PACKAGES = PRICING_CATEGORIES.reduce(
  (total, category) => total + category.tiers.length,
  0,
);

export function PricingTable() {
  const [active, setActive] = useState(PRICING_CATEGORIES[0].id);
  const activeCategory =
    PRICING_CATEGORIES.find((category) => category.id === active) ?? PRICING_CATEGORIES[0];
  const ActiveIcon = CATEGORY_ICONS[activeCategory.id];

  return (
    <section id="catalog" className="relative z-[2] scroll-mt-[126px] py-20 md:py-24">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <Reveal className="mb-3 inline-block text-[11px] font-semibold tracking-[0.4em] text-primary uppercase" as="span">
          Services &amp; Packages
        </Reveal>
        <Reveal as="h2" className="font-heading text-3xl font-extrabold tracking-tight text-balance mb-3 md:text-4xl">
          Our full starting prices
        </Reveal>
        <Reveal as="p" className="max-w-[560px] leading-relaxed text-muted-foreground">
          {PRICING_CATEGORIES.length} categories · {TOTAL_PACKAGES} packages. Pick a category to see
          every package.
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            role="group"
            aria-label="Pricing categories"
          >
            {PRICING_CATEGORIES.map((category) => {
              const Icon = CATEGORY_ICONS[category.id];
              const isActive = active === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(category.id)}
                  className={cn(
                    "group flex cursor-pointer flex-col gap-3 rounded-2xl border p-5 text-left transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none",
                    isActive
                      ? "border-primary/50 bg-primary/10 ring-1 ring-primary/20"
                      : "border-border bg-card hover:-translate-y-0.5 hover:border-primary/30",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-xl border transition-colors",
                        isActive
                          ? "border-primary/40 bg-primary/20 text-primary"
                          : "border-border bg-background/40 text-primary",
                      )}
                    >
                      <Icon size={20} />
                    </span>
                    <span className="font-heading text-lg font-extrabold text-primary tabular-nums whitespace-nowrap">
                      from {inr(fromPrice(category.tiers))}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading text-[15px] font-bold">{category.label}</h3>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
                      {category.blurb}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "text-[11px] font-semibold tracking-wide uppercase transition-colors",
                      isActive ? "text-primary" : "text-foreground/35 group-hover:text-primary/70",
                    )}
                    aria-hidden="true"
                  >
                    {isActive ? "Viewing ·" : "View"} {category.tiers.length} packages
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-5">
          <div
            className="rounded-[20px] border border-border bg-card p-5 md:p-6"
            aria-live="polite"
            aria-label={`${activeCategory.label} packages`}
          >
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5">
              <div className="flex items-center gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/15 text-primary">
                  <ActiveIcon size={22} />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-bold">{activeCategory.label}</h3>
                  <p className="text-[12px] text-muted-foreground">
                    {activeCategory.tiers.length} packages · starting from{" "}
                    {inr(fromPrice(activeCategory.tiers))}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {activeCategory.tiers.map((tier) => (
                <div
                  key={tier.name}
                  className="flex flex-col justify-between rounded-xl border border-border bg-background/40 p-5 transition-colors hover:border-primary/25"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-heading text-[15px] font-bold">{tier.name}</h4>
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

            {activeCategory.id === "student" && (
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-border bg-background/40 px-4 py-3.5">
                <InfoIcon size={16} className="mt-0.5 shrink-0" />
                <p className="text-[13px] leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">Academic integrity:</span> student
                  services are positioned as development support, mentoring, documentation,
                  explanation and implementation assistance. Students remain responsible for their
                  own academic submissions and institution requirements.
                </p>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal as="p" className="mt-8 text-center text-[12px] text-foreground/40" delay={0.3}>
          * Anniversary campaign pricing. Marked &quot;starting at&quot; — never a promise of unlimited
          features.
        </Reveal>
      </div>
    </section>
  );
}