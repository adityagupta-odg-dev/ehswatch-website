"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

const GRID_SIZE = 40;

const GridPattern = ({ id, stroke }: { id: string; stroke: string }) => (
  <svg className="w-full h-full">
    <defs>
      <pattern
        id={id}
        width={GRID_SIZE}
        height={GRID_SIZE}
        patternUnits="userSpaceOnUse"
      >
        <path
          d={`M ${GRID_SIZE} 0 L 0 0 0 ${GRID_SIZE}`}
          fill="none"
          stroke={stroke}
          strokeWidth="1"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
);

interface Cell {
  col: number;
  row: number;
  opacity: number;
  phase: "in" | "out";
  speed: number;
  maxOpacity: number;
}

export default function InfiniteGridBg({
  onMouseMove,
}: {
  onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const maskImage = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
    onMouseMove?.(e);
  };

  const handleMouseLeave = () => {
    mouseX.set(-9999);
    mouseY.set(-9999);
  };

  // Square fill animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const cells: Cell[] = [];
    let raf: number;
    let spawnTimer = 0;
    const MAX_CELLS = 5;

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new cells at random intervals
      spawnTimer++;
      const spawnInterval = 8 + Math.random() * 12;
      if (spawnTimer >= spawnInterval && cells.length < MAX_CELLS) {
        spawnTimer = 0;
        const cols = Math.floor(canvas.width / GRID_SIZE);
        const rows = Math.floor(canvas.height / GRID_SIZE);
        const burst = 1;
        for (let b = 0; b < burst && cells.length < MAX_CELLS; b++) {
          cells.push({
            col: Math.floor(Math.random() * cols),
            row: Math.floor(Math.random() * rows),
            opacity: 0,
            phase: "in",
            speed: 0.005 + Math.random() * 0.004,
            maxOpacity: 0.22 + Math.random() * 0.18,
          });
        }
      }

      // Update and draw
      for (let i = cells.length - 1; i >= 0; i--) {
        const cell = cells[i];

        if (cell.phase === "in") {
          cell.opacity += cell.speed;
          if (cell.opacity >= cell.maxOpacity) {
            cell.opacity = cell.maxOpacity;
            cell.phase = "out";
          }
        } else {
          cell.opacity -= cell.speed * 0.6;
          if (cell.opacity <= 0) {
            cells.splice(i, 1);
            continue;
          }
        }

        ctx.fillStyle = `rgba(21,94,239,${cell.opacity.toFixed(3)})`;
        ctx.fillRect(
          cell.col * GRID_SIZE + 1,
          cell.row * GRID_SIZE + 1,
          GRID_SIZE - 1,
          GRID_SIZE - 1
        );
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      className="absolute inset-0 bg-white overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Base grid — static, subtle */}
      <div className="absolute inset-0 z-0 opacity-[0.40]">
        <GridPattern id="grid-base" stroke="#5a8fc7" />
      </div>

      {/* Square fill animation canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Hover-revealed grid — #155EEF */}
      <motion.div
        className="absolute inset-0 z-[2] opacity-[0.85]"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern id="grid-hover" stroke="#155EEF" />
      </motion.div>
    </div>
  );
}
