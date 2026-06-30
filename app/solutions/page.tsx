import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SolutionsHero from "@/components/sections/SolutionsHero";
import SolutionsIndustries from "@/components/sections/SolutionsIndustries";
import CTABanner from "@/components/sections/CTABanner";
import Testimonials from "@/components/sections/Testimonials";
import { getPage, getTestimonials } from "@/lib/api";
import { findBlock, normalizeArray, ctaHref } from "@/lib/blocks";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPage("industries").catch(() => null);
  const attrs = (pageData?.data as any)?.attributes ?? {};
  return {
    title: attrs.meta?.meta_title || "Solutions — EHSWatch",
    description: attrs.meta?.meta_description || "Every industry has different risks. EHSWatch is configured to the compliance requirements, workflows and hazard profiles of your sector.",
  };
}

export default async function SolutionsPage() {
  const [industriesData, testimonialsRes] = await Promise.all([
    getPage("industries").catch(() => null),
    getTestimonials(),
  ]);

  const blocks: any[] = (industriesData?.data as any)?.attributes?.content ?? [];
  const cmsTestimonials = testimonialsRes?.data ?? [];

  // ── hero block ──────────────────────────────────────────────────────────────
  const heroData = findBlock<{
    headline?: string;
    subheadline?: string;
    eyebrow?: string;
    primary_cta?: { label?: string; url?: string; type?: string; anchor?: string };
    secondary_cta?: { label?: string; url?: string; type?: string; anchor?: string };
  }>(blocks, "hero");

  // ── solution_carousel block ─────────────────────────────────────────────────
  const solutionData = findBlock<{
    heading?: string;
    subheading?: string;
    cards?: Record<string, {
      video?: string | null;
      title?: string;
      subheading?: string;
      description?: string;
      accordion_items?: Record<string, { title?: string; description?: string }>;
    }>;
  }>(blocks, "solution_carousel");

  const cmsIndustryCards = solutionData?.cards
    ? normalizeArray<{
        video?: string | null;
        title?: string;
        subheading?: string;
        description?: string;
        accordion_items?: Record<string, { title?: string; description?: string }>;
      }>(solutionData.cards).map((card) => ({
        video: card.video ?? null,
        title: card.title ?? "",
        subheading: card.subheading,
        description: card.description,
        // accordion_items comes from CMS as a keyed object — normalise to array
        accordion_items: card.accordion_items
          ? Object.values(card.accordion_items).map((a) => ({
              title: a.title ?? "",
              description: a.description ?? "",
            }))
          : undefined,
      }))
    : undefined;

  // ── cta_banner block ────────────────────────────────────────────────────────
  const ctaData = findBlock<{
    headline?: string;
    subhead?: string;
    primary_cta?: { label?: string; url?: string; type?: string; anchor?: string; cta?: { label?: string; url?: string; type?: string; anchor?: string } };
    secondary_cta?: { label?: string; url?: string; type?: string; anchor?: string; cta?: { label?: string; url?: string; type?: string; anchor?: string } };
  }>(blocks, "cta_banner");
  const ctaPrimary   = ctaData?.primary_cta?.cta   ?? ctaData?.primary_cta;
  const ctaSecondary = ctaData?.secondary_cta?.cta  ?? ctaData?.secondary_cta;

  return (
    <>
      <Navbar lightHero={true} />
      <main>
        {/* 1. hero */}
        <SolutionsHero
          cmsHeadline={heroData?.headline || undefined}
          cmsPrimaryCta={heroData?.primary_cta?.label ? { label: heroData.primary_cta.label, url: ctaHref(heroData.primary_cta) } : undefined}
          cmsSecondaryCta={heroData?.secondary_cta?.label ? { label: heroData.secondary_cta.label, url: ctaHref(heroData.secondary_cta) } : undefined}
        />
        {/* 2. solution_carousel */}
        <SolutionsIndustries
          cmsHeading={solutionData?.heading || undefined}
          cmsSubheading={solutionData?.subheading || undefined}
          cmsCards={cmsIndustryCards}
        />
        {/* 3. testimonials */}
        <Testimonials title="A Snapshot of Real‑World Impact" cmsItems={cmsTestimonials.length > 0 ? cmsTestimonials : undefined} />
        {/* 4. cta_banner */}
        <CTABanner
          cmsHeadline={ctaData?.headline || undefined}
          cmsSubhead={ctaData?.subhead || undefined}
          cmsPrimaryCta={ctaPrimary?.label ? { label: ctaPrimary.label, url: ctaHref(ctaPrimary) } : undefined}
          cmsSecondaryCta={ctaSecondary?.label ? { label: ctaSecondary.label, url: ctaHref(ctaSecondary) } : undefined}
        />
      </main>
      <Footer />
    </>
  );
}
