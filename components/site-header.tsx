"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NAV_LINKS, SITE } from "@/lib/site";
import { ArrowUpRightIcon, WhatsAppIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const isContact = pathname === "/contact";
  const isPricing = pathname === "/pricing";
  const isAmbassador = pathname === "/ambassador";
  const isHiring = pathname === "/hiring";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isContact || isPricing || isAmbassador || isHiring) return;
    const ids = ["work", "impact", "services", "team"];
    const onScroll = () => {
      let current = "";
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 160) current = id;
      });
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    }, [isContact, isPricing, isAmbassador, isHiring]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
    const frame = requestAnimationFrame(() => {
      html.style.scrollBehavior = previous;
    });
    return () => {
      cancelAnimationFrame(frame);
      html.style.scrollBehavior = previous;
    };
  }, [pathname]);

  const resolveHref = (href: string) =>
    href.startsWith("#") && pathname !== "/" ? `/${href}` : href;

  const cta =
    isContact ?
      {
        href: SITE.whatsapp,
        label: "WhatsApp Us",
        external: true,
        icon: <WhatsAppIcon width={12} height={12} />,
      }
    : {
        href: "/contact",
        label: "Get a Quote",
        external: false,
        icon: <ArrowUpRightIcon width={12} height={12} />,
      };

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-[100] flex flex-col">
        <div className="relative flex h-12 items-center justify-center gap-3 bg-primary px-10 text-primary-foreground md:gap-4">
          <Badge className="hidden h-6 items-center gap-2 rounded-full border-primary-foreground/25 bg-primary-foreground/10 px-3 text-[10px] font-bold tracking-[0.18em] text-primary-foreground uppercase sm:inline-flex">
            <span
              className="size-[5px] shrink-0 rounded-full bg-primary-foreground animate-pulse-dot"
              aria-hidden="true"
            />
            Zenera Turns 1
          </Badge>
          <p className="min-w-0 truncate text-[12px] font-medium text-primary-foreground/95 md:text-[13px]">
            Anniversary starting prices are live.
          </p>
          <Link
            href="/pricing"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "h-8 shrink-0 rounded-full bg-primary-foreground px-4 text-[12px] font-bold text-primary hover:bg-primary-foreground/90",
            )}
          >
            See Pricing
            <ArrowUpRightIcon width={12} height={12} />
          </Link>
        </div>

        <div
          className={cn(
            "flex h-[70px] items-center justify-between px-6 transition-colors duration-300 md:px-12",
            scrolled && "border-b border-border bg-background/90 backdrop-blur-2xl",
          )}
        >
          <Link href="/" className="flex items-center gap-2.5 rounded-lg" aria-label="Zenera Labs — Home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo.png" alt="" className="size-9 rounded-lg border border-primary/25 bg-primary/10 object-contain" width={36} height={36} />
            <span className="font-heading text-sm font-extrabold tracking-[0.3em] text-primary">ZENERA LABS</span>
          </Link>

          <nav id="desktop-nav" aria-label="Primary" className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.label === "Contact"
                  ? isContact
                  : link.label === "Pricing"
                    ? isPricing
: link.label === "Ambassador"
                    ? isAmbassador
                    : link.label === "Hiring"
                      ? isHiring
                      : activeSection === link.href.slice(1);
              return (
                <Link
                  key={link.label}
                  href={resolveHref(link.href)}
                  className={cn(
                    "relative rounded text-sm font-medium text-muted-foreground transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:text-foreground hover:after:w-full",
                    isActive && "text-foreground after:w-full",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href={cta.href}
              {...(cta.external ? { target: "_blank", rel: "noopener" } : {})}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "h-9 rounded-lg border-primary/25 px-4 text-[13px] text-primary",
              )}
            >
              {cta.label}
              {cta.icon}
            </Link>
          </nav>

          <button
            type="button"
            className="flex cursor-pointer flex-col gap-1 rounded-md p-1 md:hidden"
            id="hamburger"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className={cn("block h-[1.5px] w-[22px] rounded bg-foreground transition-transform duration-300", mobileOpen && "translate-y-[6.5px] rotate-45")} />
            <span className={cn("block h-[1.5px] w-[22px] rounded bg-foreground transition-opacity duration-300", mobileOpen && "opacity-0")} />
            <span className={cn("block h-[1.5px] w-[22px] rounded bg-foreground transition-transform duration-300", mobileOpen && "-translate-y-[6.5px] -rotate-45")} />
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed top-[118px] right-0 left-0 z-[99] flex-col gap-1 overscroll-contain border-b border-border bg-background/95 px-8 py-6 backdrop-blur-2xl",
          mobileOpen ? "flex" : "hidden",
        )}
        id="mobile-nav"
        aria-hidden={!mobileOpen}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={resolveHref(link.href)}
            onClick={() => setMobileOpen(false)}
            className="rounded py-3 text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href={cta.href}
          onClick={() => setMobileOpen(false)}
          {...(cta.external ? { target: "_blank", rel: "noopener" } : {})}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-2 h-10 rounded-lg border-primary/25 text-[13px] text-primary")}
        >
          {cta.label} →
        </Link>
      </div>
    </>
  );
}