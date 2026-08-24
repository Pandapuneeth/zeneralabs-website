import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/site";

export function SiteFooter({ variant = "home" }: { variant?: "home" | "contact" }) {
  const contactLinks = [
    { label: SITE.email, href: `mailto:${SITE.email}` },
    { label: SITE.phoneDisplay, href: `tel:+91${SITE.phoneDisplay.replace(/\s/g, "").slice(1)}` },
    { label: "WhatsApp ↗", href: SITE.whatsapp, external: true },
  ];

  return (
    <footer className="relative z-[2] border-t border-border">
      <div className="mx-auto w-full max-w-[1100px] px-6 pt-10 pb-7 md:px-12">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/logo.png"
                alt=""
                className="size-8 rounded-lg border border-primary/25 bg-primary/10 object-contain"
                width={32}
                height={32}
              />
              <div>
                <span className="font-heading block text-sm font-extrabold tracking-[0.3em] text-primary">
                  ZENERA LABS
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{SITE.tagline}</span>
              </div>
            </div>

            <span className="mt-4 block text-xs text-muted-foreground">
              Part of the Arcady Groups Pvt Ltd
            </span>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/parent company.png"
              alt="Arcady Groups Pvt Ltd"
              className="mt-2 h-32 w-auto object-contain md:h-40"
            />
          </div>

          {variant === "home" && (
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
          <div className="flex flex-col gap-2">
            {contactLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener" } : {})}
                className="rounded text-[13px] text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            {variant === "contact" && (
              <>
                <Link
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener"
                  className="rounded text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  LinkedIn ↗
                </Link>
                <Link
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener"
                  className="rounded text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  Instagram ↗
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-5">
          <p className="text-xs text-foreground/30">
            © 2026 {SITE.name}. All rights reserved. Built with ♥ in India.
          </p>
          {variant === "home" && (
            <p className="text-xs text-primary/30">Designed &amp; developed by {SITE.name}</p>
          )}
        </div>
      </div>
    </footer>
  );
}