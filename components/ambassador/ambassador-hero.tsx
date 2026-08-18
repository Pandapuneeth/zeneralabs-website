import { Reveal } from "@/components/reveal";
import { CosmicButton } from "@/components/ui/cosmic-button";
import { SITE } from "@/lib/site";
import { WhatsAppIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const STATS = [
  { num: "20–30%", label: "Commission per project" },
  { num: "7 days", label: "Payout after payment" },
  { num: "₹0", label: "Cost to join" },
  { num: "∞", label: "Earning potential" },
] as const;

export function AmbassadorHero() {
  return (
    <section className="relative z-[2] pt-[130px] pb-[60px]">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal
              className="mb-3 inline-block text-[11px] font-semibold tracking-[0.4em] text-primary uppercase"
              as="span"
            >
              Student Ambassador Program
            </Reveal>
            <Reveal as="h1" className="font-heading text-4xl font-extrabold tracking-tight text-balance leading-[1.08] mb-5 md:text-6xl" delay={0.1}>
              Get paid to refer.
              <br />
              <span className="bg-linear-to-r from-primary via-primary to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-grad-shift">
                Real commission.
              </span>
            </Reveal>
            <Reveal as="p" className="max-w-[520px] leading-relaxed text-muted-foreground" delay={0.2}>
              Know someone who needs a website, app, AI automation, or final year project help?
              Bring them to Zenera Labs and earn <strong className="text-foreground">20%–30% commission</strong> on
              every project you refer — whether you&apos;re a student, freelancer, or just well connected.
            </Reveal>
            <Reveal delay={0.3} className="mt-8 flex flex-col gap-4 sm:flex-row">
              <CosmicButton href={SITE.whatsapp} target="_blank" rel="noopener">
                Become an Ambassador
              </CosmicButton>
              <a
                href="mailto:zeneralabs@gmail.com"
                className={cn(
                  "inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border px-6 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground",
                )}
              >
                Email Us
              </a>
            </Reveal>
            <Reveal delay={0.4} className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
                  <div className="font-heading text-2xl font-extrabold text-primary">{s.num}</div>
                  <div className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal delay={0.2} className="relative hidden lg:block">
            <div className="relative overflow-hidden rounded-[28px] border border-primary/25 bg-linear-to-br from-primary/15 via-card to-card p-8 shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--primary)_50%,transparent)]">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-bold tracking-wide text-primary uppercase">
                <WhatsAppIcon width={12} height={12} />
                Referral Card
              </div>
              <p className="font-heading text-2xl font-extrabold leading-snug text-balance">
                “Referred 2 projects. Earned ₹7,500 without writing a line of code.”
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                — Zenera Campus Ambassador, Class of 2026
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5 text-center">
                <div>
                  <div className="font-heading text-xl font-extrabold text-primary">30%</div>
                  <div className="text-[11px] text-muted-foreground">Top Rate</div>
                </div>
                <div>
                  <div className="font-heading text-xl font-extrabold text-primary">100+</div>
                  <div className="text-[11px] text-muted-foreground">Projects</div>
                </div>
                <div>
                  <div className="font-heading text-xl font-extrabold text-primary">24/7</div>
                  <div className="text-[11px] text-muted-foreground">Support</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
