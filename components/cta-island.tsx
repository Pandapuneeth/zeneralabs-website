"use client";

import { useEffect } from "react";
import { WhatsAppIcon, MailIcon } from "@/components/icons";
import { SITE } from "@/lib/site";
import {
  DynamicContainer,
  DynamicDescription,
  DynamicDiv,
  DynamicIsland,
  DynamicIslandProvider,
  DynamicTitle,
  useDynamicIslandSize,
  useScheduledAnimations,
} from "@/components/ui/dynamic-island";

function IslandContent() {
  const { state, setSize } = useDynamicIslandSize();
  const isOpen = state.size === "medium";

  useScheduledAnimations([
    { size: "compact", delay: 500 },
    { size: "compactLong", delay: 1200 },
    { size: "medium", delay: 2400 },
    { size: "compact", delay: 4200 },
  ]);

  useEffect(() => {
    const onClose = () => setSize("compact");
    window.addEventListener("island:open", ((e: CustomEvent) => {
      if (e.detail !== "cta") onClose();
    }) as EventListener);
    return () => window.removeEventListener("island:open", onClose as EventListener);
  }, [setSize]);

  useEffect(() => {
    if (!isOpen) return;

    const onDocClick = (event: MouseEvent) => {
      const target = event.target as Node | null;
      const island = document.getElementById("cta-island");
      if (island && target && island.contains(target)) return;
      setSize("compact");
    };

    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [isOpen, setSize]);

  const toggle = (event: React.MouseEvent<HTMLDivElement>) => {
    if (state.isAnimating) return;
    if ((event.target as HTMLElement | null)?.closest("a")) return;
    if (!isOpen) {
      window.dispatchEvent(new CustomEvent("island:open", { detail: "cta" }));
    }
    setSize(isOpen ? "compact" : "medium");
  };

  return (
    <DynamicIsland
      id="cta-island"
      containerClassName="justify-start"
      style={{ pointerEvents: "auto", cursor: "pointer" }}
      onClick={toggle}
    >
      {isOpen ? (
        <DynamicContainer className="flex h-full w-full flex-col px-3 pb-4 pt-6 text-left sm:px-5">
          <DynamicTitle className="text-lg font-black tracking-tight text-white sm:text-xl">
            Let&apos;s build your project
          </DynamicTitle>
          <DynamicDescription className="mt-1 text-[11px] leading-5 text-white/60 sm:text-xs">
            Free consultation — we reply within 24 hours.
          </DynamicDescription>
          <DynamicDiv className="mt-auto flex flex-col gap-2">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
            >
              <WhatsAppIcon width={16} height={16} />
              Chat on WhatsApp
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex h-10 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <MailIcon width={16} height={16} />
              {SITE.email}
            </a>
          </DynamicDiv>
        </DynamicContainer>
      ) : (
        <DynamicContainer className="flex h-full w-full items-center justify-center">
          <div className="flex w-full items-center justify-between px-3 sm:px-5">
            <DynamicDescription className="flex items-center gap-1.5 text-[10px] font-medium tracking-wide text-white sm:gap-2 sm:text-xs">
              <WhatsAppIcon width={13} height={13} className="sm:hidden" />
              <WhatsAppIcon width={15} height={15} className="hidden sm:block" />
              <span className="sm:hidden">Projects</span>
              <span className="hidden sm:inline">Available for projects</span>
            </DynamicDescription>
            <DynamicDescription className="text-[10px] font-bold tracking-wide text-white sm:text-xs">
              <span className="sm:hidden">India</span>
              <span className="hidden sm:inline">India &amp; Remote</span>
            </DynamicDescription>
          </div>
        </DynamicContainer>
      )}
    </DynamicIsland>
  );
}

export function CtaIsland() {
  return (
    <div className="pointer-events-none fixed bottom-6 left-4 z-[60] h-[260px] w-[130px] sm:left-6 sm:w-[371px]">
      <DynamicIslandProvider initialSize="compact">
        <IslandContent />
      </DynamicIslandProvider>
    </div>
  );
}
