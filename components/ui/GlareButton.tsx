"use client";

import { useRef, ReactNode } from "react";

interface GlareButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function GlareButton({ children, className = "", href, onClick, style }: GlareButtonProps) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const glareRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const btn = btnRef.current;
    const glare = glareRef.current;
    if (!btn || !glare) return;
    const rect = btn.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    glare.style.left = `${x - 30}%`;
    glare.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    if (glareRef.current) glareRef.current.style.opacity = "0";
  };

  return (
    <a
      ref={btnRef}
      href={href ?? "#"}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden inline-flex items-center justify-center ${className}`}
      style={style}
    >
      {/* Glare streak */}
      <span
        ref={glareRef}
        aria-hidden
        style={{
          position: "absolute",
          top: "-10%",
          width: "60%",
          height: "120%",
          background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.38) 50%, transparent 80%)",
          transform: "skewX(-18deg)",
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 220ms ease",
          borderRadius: "50%",
          zIndex: 1,
        }}
      />
      <span className="relative z-[2]">{children}</span>
    </a>
  );
}
