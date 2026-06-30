"use client";

import GlareButton from "@/components/ui/GlareButton";

interface CaseStudiesHeroProps {
  cmsHeadline?: string;
  cmsSubheadline?: string;
  cmsPrimaryCta?: { label: string; url: string };
  cmsSecondaryCta?: { label: string; url: string };
}

export default function CaseStudiesHero({
  cmsHeadline,
  cmsSubheadline,
  cmsPrimaryCta,
  cmsSecondaryCta,
}: CaseStudiesHeroProps = {}) {
  const headlineHtml = (
    cmsHeadline ?? 'Proof from the Field,<br/><span>Not the Pitch.</span>'
  ).replace(/<span\b[^>]*>/gi, '<span style="color:#1d4ed8">');

  const subheadline =
    cmsSubheadline ??
    "EHSQ teams across construction, energy, manufacturing, logistics and other sectors use EHSWatch to cut reporting time, accelerate audits, close actions faster and gain clear visibility into risk across every site.";

  const primaryLabel = cmsPrimaryCta?.label ?? "Explore Case Studies";
  const primaryHref = cmsPrimaryCta?.url ?? "#case-studies";
  const secondaryLabel = cmsSecondaryCta?.label ?? "Talk to Experts";
  const secondaryHref = cmsSecondaryCta?.url ?? "#";

  return (
    <section
      className="relative overflow-hidden flex items-center justify-center px-6 pt-[148px] pb-[72px]"
      style={{
        background: "linear-gradient(to bottom, white 0%, white 70%, #FFFFFF 100%)",
      }}
    >
      <style>{`
        .cs-grid {
          background-image:
            linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        @keyframes csBoxFill {
          0%, 100% { opacity: 0; }
          50%       { opacity: 0.5; }
        }
        .cs-box { position: absolute; width: 48px; height: 48px; }
      `}</style>

      <div className="absolute inset-0 overflow-hidden cs-grid pointer-events-none">
        {Array.from({ length: 200 }, (_, i) => {
          const shouldAnimate = (i * 7 + i * 3) % 17 === 0;
          const colors = ["#EFF6FF", "#DBEAFE", "#BFDBFE", "#93C5FD"];
          return shouldAnimate ? (
            <div
              key={i}
              className="cs-box"
              style={{
                left: `${(i % 20) * 50 + 1}px`,
                top: `${Math.floor(i / 20) * 50 + 1}px`,
                backgroundColor: colors[i % 4],
                animation: `csBoxFill ${4 + ((i * 2) % 6)}s ease-in-out infinite`,
                animationDelay: `${(i * 0.3) % 12}s`,
              }}
            />
          ) : null;
        })}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.9) 60%, #FFFFFF 100%)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 75% 75% at 50% 45%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 50%, transparent 100%)" }}
        />
      </div>

      <div className="relative z-20 max-w-[720px] w-full mx-auto text-center flex flex-col items-center gap-5">
        <h1
          className="font-[family-name:var(--font-gothic-a1)] font-bold text-[32px] sm:text-[46px] md:text-[56px] leading-[1.06] tracking-[-0.03em] animate-hero-rise"
          style={{ color: "#0a1628", animationDelay: "80ms" }}
          dangerouslySetInnerHTML={{ __html: headlineHtml }}
        />
        <p
          className="font-[family-name:var(--font-dm-sans)] text-[15px] sm:text-[17px] leading-[1.8] max-w-[580px] animate-hero-rise"
          style={{ color: "#6b7280", animationDelay: "200ms", textWrap: "pretty" } as React.CSSProperties}
        >
          {subheadline}
        </p>
        <div className="flex flex-wrap gap-3 justify-center animate-hero-rise" style={{ animationDelay: "320ms" }}>
          <GlareButton
            href={primaryHref}
            className="gap-2 px-7 py-[11px] rounded-full font-[family-name:var(--font-dm-sans)] font-medium text-[14px] text-white"
            style={{
              backgroundImage: "linear-gradient(102.8deg, #ffa964 0.12%, #ff8e37 34.34%, #ff7812 50.27%, #ff6d00 119.92%)",
            }}
          >
            {primaryLabel}
          </GlareButton>
          <GlareButton
            fillColor="#FFA660"
            hoverTextColor="#ffffff"
            href={secondaryHref}
            className="gap-2 px-7 py-[11px] rounded-full font-[family-name:var(--font-dm-sans)] font-medium text-[14px] text-[#1b1b1b] border border-[#d1d5db]"
          >
            {secondaryLabel}
          </GlareButton>
        </div>
      </div>
    </section>
  );
}
