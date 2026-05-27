"use client";

import { useInView } from "@/hooks/useInView";
import type { ReactNode } from "react";

type RevealVariant = "fade-up" | "fade" | "scale" | "blur-up" | "slide-left" | "slide-right" | "fade-in" | "soft-up";

interface RevealProps {
  children: ReactNode;
  /** Delay in ms */
  delay?: number;
  /** Duration in ms (default 700) */
  duration?: number;
  /** Animation style */
  variant?: RevealVariant;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}

/**
 * Wraps children in a section that animates into view on scroll.
 * Subtle, GPU-friendly transitions only — no third-party deps.
 */
export default function Reveal({
  children,
  delay = 0,
  duration = 700,
  variant = "fade-up",
  className = "",
  as: Component = "div",
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  const initial: Record<RevealVariant, string> = {
    "fade-up": "opacity-0 translate-y-6",
    fade: "opacity-0",
    scale: "opacity-0 scale-95",
    "blur-up": "opacity-0 translate-y-4 blur-md",
    "slide-left": "opacity-0 -translate-x-8",
    "slide-right": "opacity-0 translate-x-8",
    "fade-in": "opacity-0",
    "soft-up": "opacity-0 translate-y-3",
  };
  const enter = "opacity-100 translate-y-0 translate-x-0 scale-100 blur-0";

  // Animations disabled — always render visible immediately
  return (
    <Component
      // @ts-expect-error – ref typed as div ref but works for all element types
      ref={ref}
      className={className}
    >
      {children}
    </Component>
  );
}
