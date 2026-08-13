import { Reveal } from "@/components/reveal";
import { CosmicButton } from "@/components/ui/cosmic-button";
import { SITE } from "@/lib/site";
import { WhatsAppIcon, MailIcon } from "@/components/icons";

export function AmbassadorCta() {
  return (
    <section className="relative z-[2] py-12 pb-24">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <Reveal className="flex flex-col items-center justify-between gap-10 rounded-[32px] border border-primary/25 bg-linear-to-br from-primary/10 via-primary/5 to-background p-9 text-center md:flex-row md:p-14 md:text-left">
          <div className="max-w-[420px]">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-balance leading-tight mb-3 md:text-4xl">
              Turn your network into
              <br />
              <span className="bg-linear-to-r from-primary via-primary to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-grad-shift">
                income.
              </span>
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Join the Zenera Labs Ambassador Program today. It&apos;s free to join, easy to share,
              and pays real commission on every project you refer.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <CosmicButton href={SITE.whatsapp} target="_blank" rel="noopener" className="w-full">
              <WhatsAppIcon width={18} height={18} />
              Apply on WhatsApp
            </CosmicButton>
            <a
              href={`mailto:ambassador@zeneralabs.in`}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border px-6 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
            >
              <MailIcon width={16} height={16} />
              ambassador@zeneralabs.in
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
