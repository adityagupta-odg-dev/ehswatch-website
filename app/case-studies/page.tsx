import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CaseStudiesHero from "@/components/sections/CaseStudiesHero";
import CaseStudiesGrid from "@/components/sections/CaseStudiesGrid";
import CTABanner from "@/components/sections/CTABanner";
import { getPage, getCaseStudies } from "@/lib/api";
import { findBlock, ctaHref } from "@/lib/blocks";
import type { Metadata } from "next";
import { getCaseStudies, getPage } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const pageRes = await getPage("case-studies");
  const meta = pageRes?.data?.attributes?.meta;
  return {
    title: meta?.meta_title || "Case Studies — EHSWatch",
    description:
      meta?.meta_description ||
      "See how EHSQ teams across construction, energy, manufacturing and logistics use EHSWatch to cut reporting time, accelerate audits and gain full visibility into risk.",
  };
}

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

export default async function CaseStudiesPage() {
  const [caseStudiesRes] = await Promise.all([
    getCaseStudies(),
  ]);

  const cmsStudies = caseStudiesRes?.data ?? [];

  return (
    <>
      <Navbar lightHero={true} />
      <main>
        <CaseStudiesHero />
        <CaseStudiesGrid cmsStudies={cmsStudies.length > 0 ? cmsStudies : undefined} />
        <CaseStudiesCTA />
      </main>
      <Footer />
    </>
  );
}
