import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { ArrowUpRightIcon, WhatsAppIcon } from "@/components/icons";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { PortfolioWork } from "@/lib/works";

export function CaseCta({ work }: { work: PortfolioWork }) {
  return (
    <section className="relative z-[2] py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-10 rounded-3xl border border-primary/25 bg-linear-to-br from-primary/10 via-primary/5 to-primary/5 p-9 md:flex-row md:items-center md:p-14">
            <div className="max-w-[480px]">
              <h2 className="font-heading text-3xl font-extrabold tracking-tight text-balance leading-tight md:text-4xl">
                Have a similar workflow?
                <br />
                <span className="bg-linear-to-r from-primary via-primary to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-grad-shift">
                  Zenera Labs can build a custom version for your business.
                </span>
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                This is one of {`${work.owner}'s`} internally developed systems. Tell us about
                your requirement and we&apos;ll scope a tailored build around it.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <Link
                href={`/contact?service=${encodeURIComponent(work.quoteService)}`}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 rounded-xl px-8 text-base shadow-[0_10px_32px_color-mix(in_oklab,var(--primary)_30%,transparent)]",
                )}
              >
                Request Something Similar
                <ArrowUpRightIcon width={18} height={18} />
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}