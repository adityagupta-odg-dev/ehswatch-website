"use client";

export default function SupportHero() {
  return (
    <section
      className="relative overflow-hidden flex items-center justify-center px-4 sm:px-6 pt-[90px] sm:pt-[120px] md:pt-[148px] pb-[60px] sm:pb-[80px] md:pb-[100px]"
      style={{
        minHeight: "52vh",
        background: "linear-gradient(to bottom, white 0%, white 85%, rgba(248,250,252,0.5) 100%)",
      }}
    >
      <style>{`
        .sup-grid {
          background-image:
            linear-gradient(rgba(59,130,246,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.08) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        @keyframes supBoxFill {
          0%, 100% { opacity: 0; }
          50%       { opacity: 0.55; }
        }
        .sup-box {
          position: absolute;
          width: 48px;
          height: 48px;
        }
      `}</style>

      {/* Animated grid */}
      <div className="absolute inset-0 overflow-hidden sup-grid pointer-events-none">
        {Array.from({ length: 200 }, (_, i) => {
          const shouldAnimate = (i * 7 + i * 3) % 17 === 0;
          const colorVariant = i % 4;
          const colors = ["#EFF6FF", "#DBEAFE", "#BFDBFE", "#93C5FD"];
          const delay = (i * 0.3) % 12;
          const duration = 4 + ((i * 2) % 6);
          const row = Math.floor(i / 20);
          const col = i % 20;
          return shouldAnimate ? (
            <div
              key={i}
              className="sup-box"
              style={{
                left: `${col * 50 + 1}px`,
                top: `${row * 50 + 1}px`,
                backgroundColor: colors[colorVariant],
                animation: `supBoxFill ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          ) : null;
        })}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.8) 70%, white 100%)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 75% 75% at 50% 45%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 50%, transparent 100%)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-[760px] w-full mx-auto text-center flex flex-col items-center gap-4 md:gap-5">
        <h1
          className="font-[family-name:var(--font-gothic-a1)] font-bold text-[30px] sm:text-[42px] md:text-[52px] leading-[1.1] text-[#0f1728] tracking-[-0.02em] animate-hero-rise"
          style={{ animationDelay: "80ms" }}
        >
          We're Here When You Need Us —{" "}
          <span className="text-[#155eef]">Before, During and After Go-Live.</span>
        </h1>
      </div>
    </section>
  );
}
