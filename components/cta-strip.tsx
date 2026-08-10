import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export function CtaStrip() {
  return (
    <section className="relative z-[2] py-20">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <Reveal className="flex flex-col items-start justify-between gap-10 rounded-3xl border border-primary/25 bg-linear-to-br from-primary/10 via-primary/5 to-primary/5 p-9 md:flex-row md:items-center md:p-14">
          <div className="max-w-[400px]">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-balance leading-tight mb-3 md:text-4xl">
              Got a project in mind?
              <br />
              <span className="bg-linear-to-r from-primary via-primary to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-grad-shift">
                Let&apos;s make it happen.
              </span>
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Whether it&apos;s an idea on a napkin or a detailed brief — we&apos;re ready to
              build with you.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 rounded-xl px-8 text-base hover:shadow-[0_10px_32px_color-mix(in_oklab,var(--primary)_40%,transparent)]",
              )}
            >
              Get In Touch
              <ArrowRightIcon width={18} height={18} />
            </Link>
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
              WhatsApp Us
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}