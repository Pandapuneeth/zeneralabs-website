import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { HERO_TRUST, SITE } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { WhatsAppIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { AnimatedGradient } from "@/components/ui/animated-gradient";

export function Hero() {
  return (
    <section id="hero" className="relative z-[2] flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-[118px] pb-20 text-center">
      <AnimatedGradient
        config={{ preset: "Aurora" }}
        noise={{ opacity: 0.8, scale: 1.2 }}
        className="-z-10"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-background/45"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_75%_60%_at_50%_48%,rgba(5,5,5,0.7),transparent_75%)]"
        aria-hidden="true"
      />
      <Reveal>
        <Badge className="h-7 gap-2 rounded-full border-primary/25 bg-primary/15 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-primary">
          <span className="size-[4px] shrink-0 rounded-full bg-primary animate-pulse-dot" aria-hidden="true" />
          Available for projects — India &amp; Remote
        </Badge>
      </Reveal>

      <h1 className="font-heading text-5xl leading-none font-extrabold tracking-tight text-balance mb-6 sm:text-6xl lg:text-[6.5rem] mt-6">
        <Reveal as="span" delay={0.1} className="block">
          We Build
        </Reveal>
        <Reveal
          as="span"
          delay={0.25}
          className="block bg-linear-to-r from-primary via-primary to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-grad-shift [filter:drop-shadow(0_0_16px_rgba(0,0,0,0.6))]"
        >
          AI-Powered
        </Reveal>
        <Reveal as="span" delay={0.4} className="block">
          Solutions
        </Reveal>
      </h1>

      <Reveal as="p" delay={0.55} className="max-w-[480px] leading-relaxed text-muted-foreground mb-10">
        Automation &middot; Scalable Systems &middot; Full Stack Development
        <br />
        For Businesses &amp; Final Year Students
      </Reveal>

      <Reveal delay={0.7} className="flex flex-wrap justify-center gap-3.5 mb-14">
        <Link
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener"
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-11 rounded-lg px-6 text-sm hover:shadow-[0_10px_32px_color-mix(in_oklab,var(--primary)_40%,transparent)]",
          )}
        >
          <WhatsAppIcon width={18} height={18} />
          Free Consultation
        </Link>
        <Link
          href="#services"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 rounded-lg px-6 text-sm")}
        >
          Explore Services
        </Link>
      </Reveal>

      <Reveal delay={0.85} className="mb-[72px] w-full">
        <div className="flex flex-wrap items-center justify-center gap-y-6">
          {HERO_TRUST.map((item, i) => (
            <div key={item.label} className="flex items-center gap-7">
              <div className="flex flex-col items-center gap-0.5">
                <span className="font-heading text-[26px] font-extrabold text-primary tabular-nums">
                  {item.num}
                </span>
                <span className="text-xs tracking-wide text-muted-foreground">{item.label}</span>
              </div>
              {i < HERO_TRUST.length - 1 && <div className="h-8 w-px bg-border" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </Reveal>

      <div className="flex flex-col items-center gap-2 text-[11px] tracking-[0.3em] text-muted-foreground" aria-hidden="true">
        <div className="flex h-[34px] w-[22px] justify-center rounded-[11px] border-[1.5px] border-muted-foreground/70 pt-1.5">
          <div className="size-[3px] rounded-full bg-muted-foreground/70 animate-wheel" />
        </div>
        <span>Scroll</span>
      </div>
    </section>
  );
}