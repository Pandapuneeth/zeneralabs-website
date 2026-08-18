"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { Slider } from "@/components/ui/slider";
import { CutoutCard, cutoutCardSurfaceShadowClassName } from "@/components/ui/cutout-card";
import { commissionFor } from "@/lib/ambassador";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@/components/icons";

const PRESETS = [50000, 100000, 200000, 300000, 500000] as const;

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function AmbassadorCalculator() {
  const [value, setValue] = useState(25000);
  const { rate, commission } = commissionFor(value);

  return (
    <section className="relative z-[2] py-20 md:py-24">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <Reveal className="mb-3 inline-block text-[11px] font-semibold tracking-[0.4em] text-primary uppercase" as="span">
          Commission Calculator
        </Reveal>
        <Reveal as="h2" className="font-heading text-3xl font-extrabold tracking-tight text-balance mb-4 md:text-5xl">
          See what you could earn
        </Reveal>
        <Reveal as="p" className="max-w-[560px] leading-relaxed text-muted-foreground">
          Drag to set a project value, or tap a preset. Your commission rate updates automatically
          as you cross tier thresholds.
        </Reveal>

        <Reveal delay={0.15} className="mt-14">
          <CutoutCard
            className={cn(
              cutoutCardSurfaceShadowClassName,
              "mx-auto max-w-3xl overflow-hidden rounded-[28px] border border-border bg-card p-7 md:p-10",
            )}
          >
            <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Your Commission Rate
                </p>
                <div className="mt-1 font-heading text-7xl font-extrabold leading-none text-primary tabular-nums">
                  {rate}%
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {value >= 250000
                    ? "Gold — 30% on every referred project"
                    : value >= 80000
                      ? "Silver — 25% on every referred project"
                      : "Bronze — 20% on every referred project"}
                </p>
              </div>
              <div className="rounded-2xl border border-primary/25 bg-primary/10 p-6 sm:text-right">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  You earn per project
                </p>
                <div className="mt-1 font-heading text-4xl font-extrabold text-primary tabular-nums md:text-5xl">
                  {formatINR(commission)}
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">Project value</span>
                <span className="font-heading font-bold text-primary tabular-nums">{formatINR(value)}</span>
              </div>
              <Slider
                value={[value]}
                min={10000}
                max={500000}
                step={5000}
                onValueChange={(v) => setValue(Array.isArray(v) ? v[0] : v)}
                className="rounded-full [&_[data-slot=slider-track]]:rounded-full [&_[data-slot=slider-range]]:rounded-full [&_[data-slot=slider-thumb]]:rounded-full [&_[data-slot=slider-thumb]]:bg-primary"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setValue(p)}
                    className={cn(
                      "h-9 rounded-full border px-4 text-[13px] transition-colors",
                      value === p
                        ? "border-primary/40 bg-primary/15 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground",
                    )}
                  >
                    {formatINR(p)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-background/40 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Refer 3 projects like this a year</p>
                  <p className="text-xs text-muted-foreground">
                    and you could earn approximately
                  </p>
                </div>
                <span className="font-heading text-2xl font-extrabold text-primary tabular-nums">
                  {formatINR(commission * 3)}
                  <span className="text-sm font-normal text-muted-foreground"> / year</span>
                </span>
              </div>
            </div>

            <a
              href="mailto:zeneralabs@gmail.com"
              className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Start earning <ArrowRightIcon width={16} height={16} />
            </a>
          </CutoutCard>
        </Reveal>
      </div>
    </section>
  );
}
