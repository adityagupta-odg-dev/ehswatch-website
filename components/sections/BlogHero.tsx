"use client";

export default function BlogHero() {
  return (
    <section
      className="relative overflow-hidden flex items-center justify-center px-6 pt-[148px] pb-[72px]"
      style={{
        background: "linear-gradient(to bottom, white 0%, white 70%, #FFFFFF 100%)",
      }}
    >
      <style>{`
        .blog-grid {
          background-image:
            linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        @keyframes blogBoxFill {
          0%, 100% { opacity: 0; }
          50%       { opacity: 0.5; }
        }
        .blog-box { position: absolute; width: 48px; height: 48px; }
      `}</style>

      <div className="absolute inset-0 overflow-hidden blog-grid pointer-events-none">
        {Array.from({ length: 200 }, (_, i) => {
          const shouldAnimate = (i * 7 + i * 3) % 17 === 0;
          const colors = ["#EFF6FF", "#DBEAFE", "#BFDBFE", "#93C5FD"];
          return shouldAnimate ? (
            <div
              key={i}
              className="blog-box"
              style={{
                left: `${(i % 20) * 50 + 1}px`,
                top: `${Math.floor(i / 20) * 50 + 1}px`,
                backgroundColor: colors[i % 4],
                animation: `blogBoxFill ${4 + ((i * 2) % 6)}s ease-in-out infinite`,
                animationDelay: `${(i * 0.3) % 12}s`,
              }}
            />
          ) : null;
        })}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.9) 60%, #FFFFFF 100%)" }}
        />
      </div>

      <div className="relative z-20 max-w-[700px] w-full mx-auto text-center flex flex-col items-center gap-4">
        <h1
          className="font-[family-name:var(--font-gothic-a1)] font-bold text-[32px] sm:text-[46px] md:text-[56px] leading-[1.5] sm:leading-[1.06] tracking-[-0.03em] animate-hero-rise"
          style={{ color: "#0a1628", animationDelay: "80ms" }}
        >
          EHSQ Insights,{" "}
          <span style={{ color: "#1d4ed8" }}>Beyond The Dashboard</span>
        </h1>
        <p
          className="font-[family-name:var(--font-dm-sans)] text-[15px] sm:text-[17px] leading-[1.8] max-w-[540px] animate-hero-rise"
          style={{ color: "#6b7280", animationDelay: "200ms" }}
        >
          Practical guidance, regulatory updates and operational insights for EHSQ professionals
          who need more than theory. Written by safety practitioners, for safety practitioners.
        </p>
      </div>
    </section>
  );
}
