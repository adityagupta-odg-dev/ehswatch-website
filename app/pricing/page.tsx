import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PricingHero from "@/components/sections/PricingHero";
import PricingOverview from "@/components/sections/PricingOverview";
import PricingCalculator from "@/components/sections/PricingCalculator";
import PricingFAQ from "@/components/sections/PricingFAQ";
import CTABanner from "@/components/sections/CTABanner";
import { getPage, getForm } from "@/lib/api";
import { findBlock, normalizeArray } from "@/lib/blocks";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pricing — EHSWatch",
  description: "Simple, flexible pricing for enterprise-grade EHS management. Pay only for the modules you need.",
};

export default async function PricingPage() {
  const pageData = await getPage("pricing");
  const blocks: any[] = pageData?.data?.attributes?.content ?? [];

  // ── hero block ──────────────────────────────────────────────────────────────
  const heroBlock = findBlock<{
    eyebrow?: string;
    headline?: string;
    subheadline?: string;
    primary_cta?: { label?: string; anchor?: string; url?: string };
    secondary_cta?: { label?: string; url?: string };
  }>(blocks, "hero");

  const heroEyebrow       = heroBlock?.eyebrow || undefined;
  const heroHeadline      = heroBlock?.headline || undefined;
  const heroSubheadline   = heroBlock?.subheadline || undefined;
  const primaryCtaLabel   = heroBlock?.primary_cta?.label || "Build Your Package";
  const primaryCtaHref    = heroBlock?.primary_cta?.anchor || heroBlock?.primary_cta?.url || "#calculator";
  const secondaryCtaLabel = heroBlock?.secondary_cta?.label || "Book a Demo";
  const secondaryCtaHref  = heroBlock?.secondary_cta?.url || "#";

  // ── text_checklist block ────────────────────────────────────────────────────
  const overviewBlock = findBlock<{
    heading?: string;
    body?: string;
    checklist_heading?: string;
    checklist_items?: Record<string, { text?: string }> | Array<{ text?: string }>;
  }>(blocks, "text_checklist");

  const overviewHeading          = overviewBlock?.heading || undefined;
  const overviewBody             = overviewBlock?.body || undefined;
  const overviewChecklistHeading = overviewBlock?.checklist_heading || undefined;
  const rawChecklistItems        = overviewBlock?.checklist_items;
  const overviewChecklistItems: string[] = rawChecklistItems
    ? normalizeArray<{ text?: string }>(rawChecklistItems)
        .map((item) => item?.text || "")
        .filter(Boolean)
    : [];

  // ── faq_accordion block ─────────────────────────────────────────────────────
  const faqBlock = findBlock<{
    heading?: string;
    items?: Record<string, { question?: string; answer?: string }> | Array<{ question?: string; answer?: string }>;
  }>(blocks, "faq_accordion");

  const faqHeading  = faqBlock?.heading || undefined;
  const rawFaqItems = faqBlock?.items;
  const faqItems: Array<{ question: string; answer: string }> = rawFaqItems
    ? normalizeArray<{ question?: string; answer?: string }>(rawFaqItems)
        .filter((item) => item?.question)
        .map((item) => ({ question: item.question!, answer: item.answer || "" }))
    : [];

  // ── form_embed block (pricing wizard) ────────────────────────────────────────
  const formEmbedBlock = findBlock<{
    heading?: string;
    description?: string;
    form_slug?: string;
  }>(blocks, "form_embed");

  const calcFormSlug = formEmbedBlock?.form_slug ?? "build-ehswatch-package";

  // Fetch the multi-step form schema for step titles, org options, and success messaging
  const calcFormRes = await getForm(calcFormSlug).catch(() => null);
  const calcFormAttrs = (calcFormRes?.data as any)?.attributes as {
    steps?: Array<{
      key: string;
      title: string;
      description: string;
      fields: Array<{ key: string; label: string; field_type: string; options?: string[] | null }>;
    }>;
    submit_label?: string;
    success_heading?: string;
    success_message?: string;
  } | undefined;

  // ── cta_banner block ────────────────────────────────────────────────────────
  const ctaBlock = findBlock<{
    headline?: string;
    subhead?: string;
    primary_cta?: { cta?: { label?: string; url?: string } };
    secondary_cta?: { cta?: { label?: string; url?: string } };
  }>(blocks, "cta_banner");

  const ctaHeadline       = ctaBlock?.headline || undefined;
  const ctaSubhead        = ctaBlock?.subhead || undefined;
  const ctaPrimaryLabel   = ctaBlock?.primary_cta?.cta?.label || undefined;
  const ctaPrimaryUrl     = ctaBlock?.primary_cta?.cta?.url || undefined;
  const ctaSecondaryLabel = ctaBlock?.secondary_cta?.cta?.label || undefined;
  const ctaSecondaryUrl   = ctaBlock?.secondary_cta?.cta?.url || undefined;

  return (
    <>
      <Navbar lightHero={true} />
      <main>
        <PricingHero
          eyebrow={heroEyebrow}
          headline={heroHeadline}
          subheadline={heroSubheadline}
          primaryCtaLabel={primaryCtaLabel}
          primaryCtaHref={primaryCtaHref}
          secondaryCtaLabel={secondaryCtaLabel}
          secondaryCtaHref={secondaryCtaHref}
        />
        <PricingOverview
          heading={overviewHeading}
          body={overviewBody}
          checklistHeading={overviewChecklistHeading}
          checklistItems={overviewChecklistItems.length > 0 ? overviewChecklistItems : undefined}
        />
        <PricingCalculator
          cmsHeading={formEmbedBlock?.heading || undefined}
          cmsSubheading={formEmbedBlock?.description || undefined}
          cmsFormSlug={calcFormSlug}
          cmsFormSteps={calcFormAttrs?.steps}
          cmsSubmitLabel={calcFormAttrs?.submit_label || undefined}
          cmsSuccessHeading={calcFormAttrs?.success_heading || undefined}
          cmsSuccessBody={calcFormAttrs?.success_message || undefined}
        />
        <PricingFAQ
          heading={faqHeading}
          items={faqItems.length > 0 ? faqItems : undefined}
        />
        <CTABanner
          cmsHeadline={ctaHeadline}
          cmsSubhead={ctaSubhead}
          cmsPrimaryCta={ctaPrimaryLabel ? { label: ctaPrimaryLabel, url: ctaPrimaryUrl || "#" } : undefined}
          cmsSecondaryCta={ctaSecondaryLabel ? { label: ctaSecondaryLabel, url: ctaSecondaryUrl || "#" } : undefined}
        />
      </main>
      <Footer />
    </>
  );
}
