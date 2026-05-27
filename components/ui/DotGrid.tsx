"use client";

import { useEffect, useRef } from "react";

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  maxSpeed?: number;
  resistance?: number;
  returnDuration?: number;
  className?: string;
}

interface Dot {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseOpacity: number;   // random per-dot resting opacity
  pulseOffset: number;   // random phase for idle breathing
  size: number;          // slight size variation per dot
}

function hexToRgb(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

// Smooth ease-out for proximity — feels soft not harsh
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 2.5);
}

export default function DotGrid({
  dotSize = 3,
  gap = 18,
  baseColor = "#82a2c2",
  activeColor = "#1d5bbf",
  proximity = 160,
  speedTrigger = 80,
  shockRadius = 220,
  shockStrength = 4,
  maxSpeed = 2000,
  returnDuration = 1.8,
  className,
}: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const baseRgb   = hexToRgb(baseColor);
    const activeRgb = hexToRgb(activeColor);

    let dots: Dot[] = [];
    let mouse = { x: -9999, y: -9999, lastX: -9999, lastY: -9999, lastT: 0 };
    let raf: number;
    let frame = 0;

    const omega   = 3 / returnDuration;
    const springK = (omega * omega) / (60 * 60);
    const damping = (2 * omega) / 60;
    const maxVpx  = maxSpeed / 60;

    function buildDots(w: number, h: number) {
      dots = [];
      const step = dotSize + gap;
      // offset cols/rows slightly so dots don't start right at the edge
      const offsetX = (w % step) / 2;
      const offsetY = (h % step) / 2;
      const cols = Math.ceil(w / step) + 1;
      const rows = Math.ceil(h / step) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = offsetX + c * step;
          const oy = offsetY + r * step;
          dots.push({
            ox, oy, x: ox, y: oy, vx: 0, vy: 0,
            // organic variation: opacity 0.22–0.55, size 0.75–1.15x
            baseOpacity: 0.22 + Math.random() * 0.33,
            pulseOffset: Math.random() * Math.PI * 2,
            size: dotSize * (0.75 + Math.random() * 0.4),
          });
        }
      }
    }

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      canvas!.width  = parent.offsetWidth;
      canvas!.height = parent.offsetHeight;
      buildDots(canvas!.width, canvas!.height);
    }

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    function tick() {
      frame++;
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      const r2 = proximity * proximity;

      for (const d of dots) {
        // Spring return
        d.vx += (d.ox - d.x) * springK;
        d.vy += (d.oy - d.y) * springK;
        d.vx *= (1 - damping);
        d.vy *= (1 - damping);

        const spd = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
        if (spd > maxVpx) { d.vx = (d.vx / spd) * maxVpx; d.vy = (d.vy / spd) * maxVpx; }

        d.x += d.vx;
        d.y += d.vy;

        // Proximity to mouse (smooth ease-out)
        const mdx = mouse.x - d.x;
        const mdy = mouse.y - d.y;
        const md2 = mdx * mdx + mdy * mdy;
        const raw = md2 < r2 ? 1 - Math.sqrt(md2) / proximity : 0;
        const t   = easeOut(raw);

        // Idle breathing: very slow, subtle ±0.06 opacity oscillation
        const breathe = Math.sin(frame * 0.008 + d.pulseOffset) * 0.06;
        const baseOp  = Math.min(1, d.baseOpacity + breathe);

        // When hovered: opacity rises to 1, size grows slightly
        const opacity  = baseOp + (1 - baseOp) * t;
        const drawSize = d.size * (1 + t * 0.5);

        // Colour: lerp from base to active
        let fillStyle: string;
        if (t > 0) {
          const { r: br, g: bg, b: bb } = baseRgb;
          const { r: ar, g: ag, b: ab } = activeRgb;
          fillStyle = `rgba(${Math.round(br + (ar - br) * t)},${Math.round(bg + (ag - bg) * t)},${Math.round(bb + (ab - bb) * t)},${opacity.toFixed(3)})`;
        } else {
          fillStyle = `rgba(${baseRgb.r},${baseRgb.g},${baseRgb.b},${opacity.toFixed(3)})`;
        }

        ctx!.beginPath();
        ctx!.arc(d.x, d.y, drawSize / 2, 0, Math.PI * 2);
        ctx!.fillStyle = fillStyle;
        ctx!.fill();
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const now  = performance.now();
      const x    = e.clientX - rect.left;
      const y    = e.clientY - rect.top;
      const dt   = now - mouse.lastT || 16;

      const vx    = ((x - mouse.lastX) / dt) * 16;
      const vy    = ((y - mouse.lastY) / dt) * 16;
      const speed = Math.sqrt(vx * vx + vy * vy);

      if (speed > speedTrigger) {
        const sr2 = shockRadius * shockRadius;
        for (const d of dots) {
          const dx = d.ox - x;
          const dy = d.oy - y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < sr2 && dist2 > 0) {
            const dist  = Math.sqrt(dist2);
            const force = (1 - dist / shockRadius) * shockStrength;
            d.vx += (dx / dist) * force;
            d.vy += (dy / dist) * force;
          }
        }
      }

      mouse = { x, y, lastX: x, lastY: y, lastT: now };
    }

    function onMouseLeave() { mouse.x = -9999; mouse.y = -9999; }

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [dotSize, gap, baseColor, activeColor, proximity, speedTrigger, shockRadius, shockStrength, maxSpeed, returnDuration]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
    />
  );
}
