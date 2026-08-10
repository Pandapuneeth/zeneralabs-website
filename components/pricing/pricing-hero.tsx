import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export function PricingHero() {
  return (
    <section className="relative z-[2] pt-[130px] pb-[72px]">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <Reveal
          className="mb-3 inline-block text-[11px] font-semibold tracking-[0.4em] text-primary uppercase"
          as="span"
        >
          Pricing — 2026
        </Reveal>
        <Reveal as="h1" className="font-heading text-4xl font-extrabold tracking-tight text-balance leading-[1.1] mb-4 md:text-6xl">
          What will it cost to build{" "}
          <span className="bg-linear-to-r from-primary via-primary to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-grad-shift">
            your idea?
          </span>
        </Reveal>
        <Reveal as="p" className="max-w-[560px] leading-relaxed text-muted-foreground" delay={0.2}>
          Tell us what you&apos;re building. We&apos;ll give you a realistic starting estimate — without
          selling you features you don&apos;t need.
        </Reveal>
        <Reveal as="p" className="mt-3 text-[13px] text-foreground/50" delay={0.3}>
          Prices are starting points. Final pricing depends on your actual requirements.
        </Reveal>
        <Reveal delay={0.35} className="mt-5">
          <Badge className="h-8 rounded-full border-primary/25 bg-primary/10 px-4 text-[12px] font-medium text-primary">
            <span className="size-[5px] shrink-0 rounded-full bg-primary" aria-hidden="true" />
            Fair pricing. Real engineering. No unnecessary upselling.
          </Badge>
        </Reveal>
        <Reveal delay={0.4} className="mt-8 flex flex-wrap gap-3.5">
          <a
            href="#estimator"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 rounded-xl px-8 text-base hover:shadow-[0_10px_32px_color-mix(in_oklab,var(--primary)_40%,transparent)]",
            )}
          >
            Get My Estimate
            <ArrowRightIcon width={18} height={18} />
          </a>
          <Link
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 rounded-lg border-green-500/30 px-6 text-sm text-green-500 hover:border-green-500/40 hover:bg-green-500/10 hover:text-green-500",
            )}
          >
            <WhatsAppIcon width={18} height={18} />
            Talk to Zenera
          </Link>
        </Reveal>
      </div>
    </section>
  );
}