"use client";

import { basePath } from "@/lib/basePath";

export default function ProductHero() {
  return (
    <section
      className="relative overflow-hidden flex items-center justify-center px-4 sm:px-6 pt-[90px] sm:pt-[110px] md:pt-[130px] pb-[50px] sm:pb-[60px] md:pb-[80px] lg:min-h-[62vh]"
      style={{
        background: "linear-gradient(to bottom, white 0%, white 85%, rgba(248, 250, 252, 0.5) 100%)"
      }}
    >
      {/* Simple animated grid background */}
      <style>{`
        .grid-container {
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        @keyframes gridBoxFill {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
        }
        
        .grid-box {
          position: absolute;
          width: 48px;
          height: 48px;
        }
      `}</style>

      {/* Static grid background with animated squares */}
      <div className="absolute inset-0 overflow-hidden grid-container pointer-events-none">
        {/* More animated filled grid boxes - extended to right side */}
        {Array.from({ length: 200 }, (_, i) => {
          // Use deterministic logic instead of Math.random() to avoid hydration mismatch
          const shouldAnimate = (i * 7 + i * 3) % 17 === 0; // Deterministic pattern ~12% of boxes
          const colorVariant = i % 4;
          const colors = ['#EFF6FF', '#DBEAFE', '#BFDBFE', '#93C5FD'];
          const animationDelay = (i * 0.3) % 12; // Deterministic delay up to 12 seconds
          const animationDuration = 4 + ((i * 2) % 6); // Deterministic duration 4-10 seconds
          const row = Math.floor(i / 20); // 20 columns for full width coverage
          const col = i % 20;
          
          return shouldAnimate ? (
            <div
              key={`grid-box-${i}`}
              className="grid-box"
              style={{
                left: `${col * 50 + 1}px`,
                top: `${row * 50 + 1}px`,
                backgroundColor: colors[colorVariant],
                animation: `gridBoxFill ${animationDuration}s ease-in-out infinite`,
                animationDelay: `${animationDelay}s`,
              }}
            />
          ) : null;
        })}
        
        {/* Gradient overlay to blend with next section */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.8) 70%, white 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-[760px] w-full mx-auto text-center flex flex-col items-center gap-5 md:gap-6">
        <h1
          className="font-[family-name:var(--font-gothic-a1)] font-bold text-[34px] sm:text-[48px] md:text-[60px] leading-[1.5] sm:leading-[1.06] text-gray-900 tracking-[-0.03em] animate-hero-rise"
          style={{ animationDelay: "80ms" }}
        >
          One Platform.
          <br />
          <span style={{ color: "#1d4ed8" }}>Every EHSQ Process.</span>
        </h1>
        <p
          className="font-[family-name:var(--font-dm-sans)] text-[15px] sm:text-[17px] md:text-[18px] leading-[1.75] max-w-[490px] animate-hero-rise text-gray-700"
          style={{ animationDelay: "200ms" }}
        >
          From field incidents to board‑level dashboards — all connected, all in real time.
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2 px-8 py-[11px] rounded-full font-[family-name:var(--font-dm-sans)] font-medium text-[15px] text-white hover:opacity-90 transition-all duration-200 animate-hero-rise hover:shadow-lg"
          style={{
            animationDelay: "320ms",
            backgroundImage: "linear-gradient(102.8deg, #ffa964 0.12%, #ff8e37 34.34%, #ff7812 50.27%, #ff6d00 119.92%)",
            boxShadow: "0 4px 24px rgba(249,115,22,0.35)",
          }}
        >
          Book a Demo
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
