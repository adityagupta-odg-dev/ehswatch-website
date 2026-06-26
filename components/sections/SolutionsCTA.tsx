import Reveal from "@/components/ui/Reveal";
import GlareButton from "@/components/ui/GlareButton";
import { basePath } from "@/lib/basePath";
import { ctaHref } from "@/lib/blocks";

interface CtaBannerBlock {
  heading?: string;
  subheading?: string;
  primary_cta?: { label?: string; url?: string; type?: string; anchor?: string };
  secondary_cta?: { label?: string; url?: string; type?: string; anchor?: string };
}

// Hardcoded fallbacks
const FALLBACK_HEADING    = "Does EHSWatch work for your industry?";
const FALLBACK_SUBHEADING = "See how teams across construction, manufacturing, oil & gas, logistics, facilities and utilities use EHSWatch to protect their people and stay compliant.";
const FALLBACK_PRIMARY_LABEL   = "Book Your Free Demo";
const FALLBACK_SECONDARY_LABEL = "View Pricing Plans";

export default function SolutionsCTA({ ctaBannerBlock }: { ctaBannerBlock?: Record<string, unknown> | null }) {
  const block = ctaBannerBlock as CtaBannerBlock | null | undefined;

  const heading        = block?.heading    ?? FALLBACK_HEADING;
  const subheading     = block?.subheading ?? FALLBACK_SUBHEADING;
  const primaryLabel   = block?.primary_cta?.label   ?? FALLBACK_PRIMARY_LABEL;
  const primaryHref    = block?.primary_cta           ? ctaHref(block.primary_cta as Parameters<typeof ctaHref>[0]) : "#";
  const secondaryLabel = block?.secondary_cta?.label  ?? FALLBACK_SECONDARY_LABEL;
  const secondaryHref  = block?.secondary_cta         ? ctaHref(block.secondary_cta as Parameters<typeof ctaHref>[0]) : "#";

  return (
    <section
      className="relative py-12 md:py-[61px] px-4 md:px-6 overflow-hidden"
      style={{
        background: "#f1f7ff",
        backgroundImage: `url(${basePath}/images/product/cta-background.svg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-[800px] mx-auto flex flex-col gap-3 md:gap-[16px] items-center">
        <Reveal variant="slide-right" duration={750}>
          <h2 className="font-[family-name:var(--font-gothic-a1)] font-bold text-[28px] sm:text-[36px] md:text-[44px] leading-tight text-[#0a0f1e] text-center">
            {heading}
          </h2>
        </Reveal>

        <Reveal variant="slide-left" duration={750} delay={120}>
          <p className="font-[family-name:var(--font-inter)] text-[14px] md:text-[17px] leading-relaxed md:leading-[29.75px] text-[#6b7280] text-center max-w-[560px]">
            {subheading}
          </p>
        </Reveal>

        <Reveal
          variant="fade-up"
          duration={700}
          delay={240}
          className="flex flex-col sm:flex-row gap-3 md:gap-[16px] items-center justify-center pt-4 md:pt-[24px] w-full sm:w-auto"
        >
          <GlareButton
            href={primaryHref}
            className="w-full sm:w-auto px-6 md:px-[26px] py-3 md:py-[10px] rounded-full font-[family-name:var(--font-inter)] font-medium text-[14px] text-white whitespace-nowrap"
            style={{
              backgroundImage:
                "linear-gradient(102.8deg, #ffa964 0.12%, #ff8e37 34.34%, #ff7812 50.27%, #ff6d00 119.92%)",
            }}
          >
            {primaryLabel}
          </GlareButton>

          <GlareButton
            href={secondaryHref}
            fillColor="#FFA660"
            hoverTextColor="#ffffff"
            className="w-full sm:w-auto px-7 md:px-[31.5px] py-3 md:py-[10px] rounded-full bg-[rgba(255,120,44,0.1)] border border-[rgba(255,120,44,0.2)] font-[family-name:var(--font-inter)] text-[14px] text-[#ff6d00] whitespace-nowrap"
          >
            {secondaryLabel}
          </GlareButton>
        </Reveal>
      </div>
    </section>
  );
}
