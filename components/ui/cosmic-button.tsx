"use client"

import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

export type CosmicButtonProps<E extends "a" | "button" = "a"> = {
  /** The HTML element to render as. @default "a" */
  as?: E
} & ComponentPropsWithoutRef<E>

/**
 * An animated button/link with a cosmic gradient border effect.
 * Renders as an anchor by default; use `as="button"` for button behavior.
 */
export function CosmicButton<E extends "a" | "button" = "a">({
  as,
  className,
  children,
  ...props
}: CosmicButtonProps<E>) {
  const Element = as ?? "a"
  const isAnchor = Element === "a"

  const baseClassName = cn(
    "group/cosmic relative inline-flex min-h-11 min-w-11 items-center justify-center gap-3 rounded-[15px] p-[3px] transition-transform",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    className
  )

  const content = (
    <>
      {/* Animated cosmic border - enlarges on hover */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[15px] transition-all duration-300 ease-out group-hover/cosmic:inset-[-3px] group-hover/cosmic:rounded-[15px]">
        <span className="absolute inset-[-200%] animate-cosmic-spin bg-[conic-gradient(from_0deg,#ff9ee6,#ffc2ec,#e8799a,#d946ef,#9333ea,#c026d3,#ff9ee6)] opacity-95" />
      </span>

      {/* Noise/texture overlay on the border - enlarges on hover */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[15px] opacity-45 mix-blend-soft-light transition-all duration-300 ease-out group-hover/cosmic:inset-[-3px] group-hover/cosmic:rounded-[15px] dark:opacity-60 dark:mix-blend-overlay">
        <span className="absolute inset-[-200%] animate-cosmic-spin-slow bg-[conic-gradient(from_180deg,#fbcfe8_0%,transparent_30%,#d946ef_50%,transparent_70%,#7e22ce_100%)]" />
      </span>

      {/* Theme-aware inner background */}
      <span className="relative z-10 flex w-full items-center justify-center gap-3 rounded-[12px] bg-card px-5 py-2.5 text-card-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.5),0_1px_1px_rgba(0,0,0,0.45),0_10px_28px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover/cosmic:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.6),0_2px_6px_rgba(0,0,0,0.55),0_14px_34px_rgba(0,0,0,0.42)] active:scale-[0.98]">
        <span className="inline-flex w-full items-center justify-center gap-3 font-medium text-base tracking-wide text-foreground whitespace-nowrap">
          {children ?? "Placeholder text"}
        </span>
      </span>
    </>
  )

  if (isAnchor) {
    const { href, rel, target, ...rest } =
      props as ComponentPropsWithoutRef<"a">
    return (
      <a
        className={baseClassName}
        href={href ?? "https://aisdkagents.com"}
        rel={rel ?? "noopener noreferrer"}
        target={target ?? "_blank"}
        {...rest}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      className={baseClassName}
      {...(props as ComponentPropsWithoutRef<"button">)}
    >
      {content}
    </button>
  )
}