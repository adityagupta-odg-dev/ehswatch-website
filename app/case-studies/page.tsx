import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CaseStudiesHero from "@/components/sections/CaseStudiesHero";
import CaseStudiesGrid from "@/components/sections/CaseStudiesGrid";
import CTABanner from "@/components/sections/CTABanner";
import { getPage, getCaseStudies } from "@/lib/api";
import { findBlock, ctaHref } from "@/lib/blocks";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Case Studies — EHSWatch",
  description:
    "See how EHSQ teams across construction, energy, manufacturing and logistics use EHSWatch to cut reporting time, accelerate audits and gain full visibility into risk.",
};

export default async function CaseStudiesPage() {
  const [pageRes, caseStudiesRes] = await Promise.all([
    getPage("case-studies"),
    getCaseStudies(),
  ]);

  const blocks = pageRes?.data?.attributes?.content ?? [];

  // ── hero block ────────────────────────────────────────────────────────────
  const heroBlock = findBlock<{
    headline?: string;
    subheadline?: string;
    primary_cta?: { label?: string; url?: string; type?: string; anchor?: string };
    secondary_cta?: { label?: string; url?: string; type?: string; anchor?: string };
  }>(blocks, "hero");

  // ── cta_banner block ──────────────────────────────────────────────────────
  const ctaBlock = findBlock<{
    headline?: string;
    subheadline?: string;
    primary_cta?: { label?: string; url?: string; type?: string; anchor?: string };
    secondary_cta?: { label?: string; url?: string; type?: string; anchor?: string };
  }>(blocks, "cta_banner");

  // ── case study items — prefer /case-studies endpoint; fall back to post_listing ──
  const cmsItems = caseStudiesRes?.data ?? [];

  return (
    <>
      <Navbar lightHero={true} />
      <main>
        <CaseStudiesHero
          cmsHeadline={heroBlock?.headline}
          cmsSubheadline={heroBlock?.subheadline}
          cmsPrimaryCta={
            heroBlock?.primary_cta
              ? { label: heroBlock.primary_cta.label ?? "", url: ctaHref(heroBlock.primary_cta) }
              : undefined
          }
          cmsSecondaryCta={
            heroBlock?.secondary_cta
              ? { label: heroBlock.secondary_cta.label ?? "", url: ctaHref(heroBlock.secondary_cta) }
              : undefined
          }
        />
        <CaseStudiesGrid cmsItems={cmsItems.length > 0 ? cmsItems : undefined} />
        <CTABanner
          cmsHeadline={ctaBlock?.headline}
          cmsSubhead={ctaBlock?.subheadline}
          cmsPrimaryCta={
            ctaBlock?.primary_cta
              ? { label: ctaBlock.primary_cta.label ?? "", url: ctaHref(ctaBlock.primary_cta) }
              : undefined
          }
          cmsSecondaryCta={
            ctaBlock?.secondary_cta
              ? { label: ctaBlock.secondary_cta.label ?? "", url: ctaHref(ctaBlock.secondary_cta) }
              : undefined
          }
        />
      </main>
      <Footer />
    </>
  );
}
