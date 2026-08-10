"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { NAV_LINKS, SITE } from "@/lib/site";
import { ArrowUpRightIcon, WhatsAppIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const isContact = pathname === "/contact";
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
    if (isContact) return;
    const ids = ["impact", "services", "team"];
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
  }, [isContact]);

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
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-[100] flex h-[70px] items-center justify-between px-6 transition-colors duration-300 md:px-12",
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
              link.label === "Contact" ? isContact : activeSection === link.href.slice(1);
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
      </header>

      <div
        className={cn(
          "fixed top-[70px] right-0 left-0 z-[99] flex-col gap-1 overscroll-contain border-b border-border px-8 py-6 backdrop-blur-2xl",
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