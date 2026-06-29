import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogHero from "@/components/sections/BlogHero";
import BlogGrid from "@/components/sections/BlogGrid";
import BlogNewsletter from "@/components/sections/BlogNewsletter";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import GlareButton from "@/components/ui/GlareButton";
import { basePath } from "@/lib/basePath";
import type { Metadata } from "next";
import { getBlogPosts, getPage } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — EHSWatch",
  description:
    "Practical guidance, regulatory updates and operational insights for EHSQ professionals. Written by safety practitioners, for safety practitioners.",
};

interface CtaBannerProps {
  headline?: string;
  subhead?: string;
  primaryLabel?: string;
  primaryUrl?: string;
  secondaryLabel?: string;
  secondaryUrl?: string;
}

function BlogCTA({
  headline = "Reading is a start. Now is your time to take action.",
  subhead = "Give your teams the platform to match the knowledge — report, respond and prevent incidents all from one place.",
  primaryLabel = "Book Your Free Demo",
  primaryUrl = "#",
  secondaryLabel = "View Pricing Plans",
  secondaryUrl = "#",
}: CtaBannerProps) {
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
            {headline}
          </h2>
        </Reveal>
        <Reveal variant="slide-left" duration={750} delay={120}>
          <p className="font-[family-name:var(--font-inter)] text-[14px] md:text-[17px] leading-relaxed md:leading-[29.75px] text-[#6b7280] text-center max-w-[520px]">
            {subhead}
          </p>
        </Reveal>
        <Reveal
          variant="fade-up"
          duration={700}
          delay={240}
          className="flex flex-col sm:flex-row gap-3 md:gap-[16px] items-center justify-center pt-4 md:pt-[24px] w-full sm:w-auto"
        >
          <GlareButton
            href={primaryUrl}
            className="w-full sm:w-auto px-6 md:px-[26px] py-3 md:py-[10px] rounded-full font-[family-name:var(--font-inter)] font-medium text-[14px] text-white whitespace-nowrap"
            style={{
              backgroundImage:
                "linear-gradient(102.8deg, #ffa964 0.12%, #ff8e37 34.34%, #ff7812 50.27%, #ff6d00 119.92%)",
            }}
          >
            {primaryLabel}
          </GlareButton>
          <GlareButton
            href={secondaryUrl}
            fillColor="#FFA660"
            hoverTextColor="#ffffff"
            className="w-full sm:w-auto px-7 md:px-[31.5px] py-3 md:py-[15.5px] rounded-full bg-[rgba(255,120,44,0.1)] border border-[rgba(255,120,44,0.2)] font-[family-name:var(--font-inter)] text-[14px] text-[#ff6d00] whitespace-nowrap"
          >
            {secondaryLabel}
          </GlareButton>
        </Reveal>
      </div>
    </section>
  );
}

export default async function BlogPage() {
  // Fetch blog posts (keep existing behaviour)
  const res = await getBlogPosts();
  const cmsPosts = res?.data ?? [];

  // Fetch page CMS data for hero + cta_banner
  const pageRes = await getPage("blog");
  const blocks: Array<{ type: string; data: Record<string, unknown> }> =
    (pageRes?.data?.attributes?.content as Array<{ type: string; data: Record<string, unknown> }>) ?? [];

  // Extract hero block
  const heroBlock = blocks.find((b) => b.type === "hero")?.data ?? {};
  const heroHeadline = (heroBlock.headline as string | undefined) || undefined;
  const heroSubheadline = (heroBlock.subheadline as string | undefined) || undefined;
  const heroEyebrow = (heroBlock.eyebrow as string | undefined) || undefined;

  // Extract cta_banner block
  const ctaBlock = blocks.find((b) => b.type === "cta_banner")?.data ?? {};
  const ctaHeadline = (ctaBlock.headline as string | undefined) || undefined;
  const ctaSubhead = (ctaBlock.subhead as string | undefined) || undefined;

  // CMS nests CTA labels under {cta: {...}}
  const primaryCtaData = (ctaBlock.primary_cta as { cta?: { label?: string; url?: string } } | undefined)?.cta;
  const secondaryCtaData = (ctaBlock.secondary_cta as { cta?: { label?: string; url?: string } } | undefined)?.cta;

  const primaryLabel = primaryCtaData?.label || undefined;
  const primaryUrl = primaryCtaData?.url || undefined;
  const secondaryLabel = secondaryCtaData?.label || undefined;
  // secondary_cta is internal (page_id based) — fall back to "#" if no url
  const secondaryUrl = secondaryCtaData?.url || undefined;

  return (
    <>
      <Navbar lightHero={true} />
      <main>
        <BlogHero
          headline={heroHeadline}
          subheadline={heroSubheadline}
          eyebrow={heroEyebrow}
        />
        <BlogGrid cmsPosts={cmsPosts.length > 0 ? cmsPosts : undefined} />
        <BlogNewsletter />
        <BlogCTA
          headline={ctaHeadline}
          subhead={ctaSubhead}
          primaryLabel={primaryLabel}
          primaryUrl={primaryUrl}
          secondaryLabel={secondaryLabel}
          secondaryUrl={secondaryUrl}
        />
      </main>
      <Footer />
    </>
  );
}
