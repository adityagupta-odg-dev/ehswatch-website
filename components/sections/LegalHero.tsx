"use client";

interface LegalHeroProps {
  headline?: string;
  subheadline?: string;
  eyebrow?: string;
  bgImageUrl?: string;
  bgImageAlt?: string;
}

export default function LegalHero({
  headline,
  subheadline,
  eyebrow,
  bgImageUrl,
}: LegalHeroProps = {}) {
  const title = headline || "Privacy Policy";

  return (
    <section
      className="relative overflow-hidden flex items-center justify-center px-4 sm:px-6 pt-[90px] sm:pt-[120px] md:pt-[148px] pb-[60px] sm:pb-[80px]"
      style={{ minHeight: "44vh" }}
    >
      {/* Background */}
      {bgImageUrl ? (
        <>
          <img
            src={bgImageUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ zIndex: 0 }}
          />
          {/* Gradient overlay — darkens image so white text is legible */}
          <div
            className="absolute inset-0"
            style={{
              zIndex: 1,
              background:
                "linear-gradient(135deg, rgba(10,15,30,0.82) 0%, rgba(21,94,239,0.55) 100%)",
            }}
          />
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            zIndex: 0,
            background:
              "linear-gradient(135deg, #0a0f1e 0%, #1d4ed8 100%)",
          }}
        />
      )}

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(10,15,30,0.3) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative text-center max-w-[760px] w-full mx-auto flex flex-col items-center gap-4" style={{ zIndex: 3 }}>
        {eyebrow && (
          <span className="font-[family-name:var(--font-dm-sans)] text-[12px] font-semibold uppercase tracking-[0.16em] text-blue-300 animate-hero-rise">
            {eyebrow}
          </span>
        )}
        <h1
          className="font-[family-name:var(--font-gothic-a1)] font-bold text-[34px] sm:text-[48px] md:text-[58px] leading-[1.06] tracking-[-0.03em] text-white animate-hero-rise"
          style={{ animationDelay: "60ms" }}
        >
          {title}
        </h1>
        {subheadline && (
          <p
            className="font-[family-name:var(--font-dm-sans)] text-[15px] sm:text-[17px] text-blue-100 leading-[1.7] max-w-[520px] animate-hero-rise text-pretty"
            style={{ animationDelay: "160ms" }}
          >
            {subheadline}
          </p>
        )}
      </div>
    </section>
  );
}
