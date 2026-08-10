"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { CheckIcon } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";
import {
  COMPLEXITY_OPTIONS,
  ESTIMATOR_ADDONS,
  ESTIMATOR_ASSUMPTIONS,
  PRICER_CATEGORIES,
} from "@/lib/pricing";
import {
  AiIcon,
  ArrowRightIcon,
  AutomationIcon,
  BackendIcon,
  CodeIcon,
  FlutterIcon,
  StudentIcon,
  WebIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

function fmt(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function round(n: number) {
  if (n >= 100000) return Math.round(n / 1000) * 1000;
  if (n >= 10000) return Math.round(n / 500) * 500;
  return Math.round(n / 250) * 250;
}

type IconType = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const EST_CATEGORY_ICONS: Record<string, IconType> = {
  web: WebIcon,
  app: BackendIcon,
  mobile: FlutterIcon,
  ai: AiIcon,
  automation: AutomationIcon,
  student: StudentIcon,
  mini: CodeIcon,
};

export function PricingEstimator() {
  const [category, setCategory] = useState<string>(PRICER_CATEGORIES[0].id);
  const [complex, setComplex] = useState<(typeof COMPLEXITY_OPTIONS)[number]["id"]>(
    COMPLEXITY_OPTIONS[1].id,
  );
  const [addons, setAddons] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  const selected = PRICER_CATEGORIES.find((c) => c.id === category) ?? PRICER_CATEGORIES[0];
  const complexity = COMPLEXITY_OPTIONS.find((c) => c.id === complex) ?? COMPLEXITY_OPTIONS[1];
  const addonLabels = ESTIMATOR_ADDONS.filter((a) => addons.includes(a.id));
  const SelectedIcon = EST_CATEGORY_ICONS[selected.id];

  const { low, high } = useMemo(() => {
    const extra = addons.reduce((sum, id) => {
      const addon = ESTIMATOR_ADDONS.find((a) => a.id === id);
      return sum + (addon?.pct ?? 0);
    }, 0);
    const mid = selected.base * complexity.mult * (1 + extra);
    return { low: round(mid), high: round(mid * 1.5) };
  }, [selected, complexity, addons]);

  const openQuoteRequest = () => {
    const message = [
      "Hi Zenera Labs! I just used the pricing estimator on your site.",
      "",
      `• Project type: ${selected.label} (${selected.example})`,
      `• Complexity: ${complexity.label}`,
      addonLabels.length ? `• Add-ons: ${addonLabels.map((a) => a.label).join(", ")}` : "• Add-ons: none",
      `• Estimated range: ${fmt(low)} – ${fmt(high)}`,
      description.trim() ? `\n• Project details:\n${description.trim()}` : "",
    ].join("\n");
    window.open(`${SITE.whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const toggleAddon = (id: string) =>
    setAddons((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));

  return (
    <section
      id="estimator"
      className="relative z-[2] scroll-mt-[126px] py-20 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <Reveal
          className="mb-3 inline-block text-[11px] font-semibold tracking-[0.4em] text-primary uppercase"
          as="span"
        >
          Pricing Estimator
        </Reveal>
        <Reveal as="h2" className="font-heading text-3xl font-extrabold tracking-tight text-balance mb-3 md:text-4xl">
          Get a fast estimate
        </Reveal>
        <Reveal as="p" className="max-w-[520px] leading-relaxed text-muted-foreground">
          Answer four quick questions. Your estimate updates instantly — no sign-up, no spam.
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
          <Reveal className="rounded-[20px] border border-border bg-card p-7 md:p-8">
            <fieldset>
              <legend className="mb-3 flex items-center gap-2 text-[15px] font-semibold">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary/15 font-heading text-[12px] font-bold text-primary">
                  1
                </span>
                What are you building?
              </legend>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {PRICER_CATEGORIES.map((cat) => {
                  const Icon = EST_CATEGORY_ICONS[cat.id];
                  const isSelected = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setCategory(cat.id)}
                      className={cn(
                        "flex h-12 items-center gap-2.5 rounded-xl border px-3.5 text-left text-[13px] font-medium transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
                        isSelected
                          ? "border-primary/40 bg-primary/15 text-foreground"
                          : "border-border bg-background/40 text-muted-foreground hover:border-primary/25 hover:text-foreground",
                      )}
                    >
                      <Icon size={18} className={cn(isSelected ? "text-primary" : "text-muted-foreground")} />
                      <span className="min-w-0 flex-1 truncate">{cat.label}</span>
                      <span className={cn("text-[11px] tabular-nums", isSelected ? "text-primary" : "text-foreground/40")}>
                        {fmt(cat.base)}+
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="mt-8">
              <legend className="mb-3 flex items-center gap-2 text-[15px] font-semibold">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary/15 font-heading text-[12px] font-bold text-primary">
                  2
                </span>
                How complex is it?
              </legend>
              <div className="grid grid-cols-3 gap-2">
                {COMPLEXITY_OPTIONS.map((opt) => {
                  const isSelected = complex === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setComplex(opt.id)}
                      className={cn(
                        "h-11 rounded-xl border px-3 text-[13px] font-medium capitalize transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
                        isSelected
                          ? "border-primary/40 bg-primary/15 text-foreground"
                          : "border-border bg-background/40 text-muted-foreground hover:border-primary/25 hover:text-foreground",
                      )}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="mt-8">
              <legend className="mb-3 flex items-center gap-2 text-[15px] font-semibold">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary/15 font-heading text-[12px] font-bold text-primary">
                  3
                </span>
                Add-ons
                <span className="text-[12px] font-normal text-foreground/40">(optional)</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {ESTIMATOR_ADDONS.map((addon) => {
                  const isSelected = addons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => toggleAddon(addon.id)}
                      className={cn(
                        "flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-[12px] font-medium transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
                        isSelected
                          ? "border-primary/40 bg-primary/15 text-foreground"
                          : "border-border bg-background/40 text-muted-foreground hover:border-primary/25 hover:text-foreground",
                      )}
                    >
                      {addons.includes(addon.id) && <CheckIcon size={12} weight="bold" className="text-primary" />}
                      {addon.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </Reveal>

          <Reveal delay={0.15} className="lg:sticky lg:top-[136px] lg:self-start">
            <div className="flex flex-col rounded-[20px] border border-primary/25 bg-linear-to-br from-primary/10 via-primary/5 to-primary/5 p-7 md:p-8">
              <span className="text-[11px] font-semibold tracking-[0.3em] text-primary uppercase">
                Estimated range
              </span>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="font-heading text-3xl leading-none font-extrabold text-primary tabular-nums md:text-4xl">
                  {fmt(low)}
                </span>
                <span className="text-xl font-bold text-foreground/50">–</span>
                <span className="font-heading text-3xl leading-none font-extrabold tabular-nums md:text-4xl">
                  {fmt(high)}
                </span>
              </div>
              <p className="mt-2 text-[12px] text-foreground/50">
                Indicative range — always a ballpark, never a final quote.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <Badge className="h-7 gap-1.5 rounded-full border-primary/25 bg-primary/15 px-3 text-[11px] font-medium text-primary">
                  <SelectedIcon size={14} />
                  {selected.label}
                </Badge>
                <Badge variant="outline" className="h-7 rounded-full border-border bg-background/40 px-3 text-[11px] capitalize">
                  {complexity.label}
                </Badge>
                <Badge variant="outline" className="h-7 rounded-full border-border bg-background/40 px-3 text-[11px]">
                  {addonLabels.length ? `${addonLabels.length} add-on${addonLabels.length > 1 ? "s" : ""}` : "No add-ons"}
                </Badge>
              </div>

              <div className="mt-5 rounded-xl border border-border/70 bg-background/40 p-4">
                <p className="mb-2 text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  What this assumes
                </p>
                <ul className="space-y-1.5">
                  {ESTIMATOR_ASSUMPTIONS.map((assumption) => (
                    <li key={assumption} className="flex items-start gap-2 text-[12px] leading-relaxed text-muted-foreground">
                      <CheckIcon size={13} weight="bold" className="mt-0.5 shrink-0 text-primary" />
                      {assumption}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5">
                <label htmlFor="estimate-notes" className="mb-2 block text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                  Tell us more <span className="normal-case tracking-normal text-foreground/40">(optional)</span>
                </label>
                <Textarea
                  id="estimate-notes"
                  rows={3}
                  maxLength={600}
                  placeholder="Describe your project, timeline and any specific requirements..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[78px] rounded-xl border-border bg-background/40 text-[13px] placeholder:text-foreground/25 focus-visible:border-primary/30 focus-visible:ring-primary/10"
                />
              </div>

              <Button onClick={openQuoteRequest} className="h-12 w-full rounded-xl text-[15px] font-semibold">
                Get an Exact Quote
                <ArrowRightIcon width={18} height={18} />
              </Button>
              <Link
                href={`/contact?service=${encodeURIComponent(selected.contactService)}`}
                className="mt-3 text-center text-[13px] text-muted-foreground transition-colors hover:text-foreground"
              >
                Prefer the form? <span className="text-primary hover:underline">Use the contact form →</span>
              </Link>
              <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] text-foreground/40">
                <WhatsAppIcon width={12} height={12} />
                Requests open WhatsApp — a human replies fast.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}