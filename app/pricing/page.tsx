import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PricingHero from "@/components/sections/PricingHero";
import PricingOverview from "@/components/sections/PricingOverview";
import PricingCalculator from "@/components/sections/PricingCalculator";
import PricingFAQ from "@/components/sections/PricingFAQ";
import CTABanner from "@/components/sections/CTABanner";
import { getPage } from "@/lib/api";
import { findBlock } from "@/lib/blocks";
import { ctaHref } from "@/lib/blocks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — EHSWatch",
  description: "Simple, flexible pricing for enterprise-grade EHS management. Pay only for the modules you need.",
};

export default async function PricingPage() {
  const pageRes = await getPage("pricing");
  const blocks = pageRes?.data?.attributes?.content ?? [];

  // ── hero block ──────────────────────────────────────────────────────────────
  const hero = findBlock<{
    heading?: string;
    subheading?: string;
    primary_cta?: { label: string; type?: string; url?: string; anchor?: string };
    secondary_cta?: { label: string; type?: string; url?: string; anchor?: string };
  }>(blocks, "hero");

  // ── text_checklist block ────────────────────────────────────────────────────
  const textChecklist = findBlock<{
    eyebrow?: string;
    heading?: string;
    body?: string;
    checklist_heading?: string;
    checklist_items?: Array<{ icon: string; text: string }>;
  }>(blocks, "text_checklist");

  // ── form_embed block ────────────────────────────────────────────────────────
  // PricingCalculator uses its own multi-step form (APPS/ADDONS are hardcoded).
  // The form_embed block's slug is noted here for future wiring; the calculator
  // section itself is left intact as instructed.
  const formEmbed = findBlock<{ form_slug?: string }>(blocks, "form_embed");
  const _formSlug = formEmbed?.form_slug; // expected: "pricing-proposal" or equivalent

  // ── faq_accordion block ─────────────────────────────────────────────────────
  const faqBlock = findBlock<{
    heading?: string;
    subheading?: string;
    items?: Array<{ question: string; answer: string }>;
  }>(blocks, "faq_accordion");

  // ── cta_banner block ────────────────────────────────────────────────────────
  const ctaBanner = findBlock<{
    heading?: string;
    subheading?: string;
    primary_cta?: { label: string; type?: string; url?: string; anchor?: string };
    secondary_cta?: { label: string; type?: string; url?: string; anchor?: string };
  }>(blocks, "cta_banner");

  return (
    <>
      <Navbar lightHero={true} />
      <main>
        <PricingHero
          cmsHeading={hero?.heading}
          cmsSubheading={hero?.subheading}
          cmsPrimaryCta={
            hero?.primary_cta
              ? { label: hero.primary_cta.label, url: ctaHref(hero.primary_cta) }
              : undefined
          }
          cmsSecondaryCta={
            hero?.secondary_cta
              ? { label: hero.secondary_cta.label, url: ctaHref(hero.secondary_cta) }
              : undefined
          }
        />
        <PricingOverview
          cmsEyebrow={textChecklist?.eyebrow}
          cmsHeading={textChecklist?.heading}
          cmsBody={textChecklist?.body}
          cmsChecklistHeading={textChecklist?.checklist_heading}
          cmsItems={textChecklist?.checklist_items}
        />
        <PricingCalculator />
        <PricingFAQ
          cmsHeading={faqBlock?.heading}
          cmsSubheading={faqBlock?.subheading}
          cmsItems={faqBlock?.items}
        />
        <CTABanner
          cmsHeadline={ctaBanner?.heading}
          cmsSubhead={ctaBanner?.subheading}
          cmsPrimaryCta={
            ctaBanner?.primary_cta
              ? { label: ctaBanner.primary_cta.label, url: ctaHref(ctaBanner.primary_cta) }
              : undefined
          }
          cmsSecondaryCta={
            ctaBanner?.secondary_cta
              ? { label: ctaBanner.secondary_cta.label, url: ctaHref(ctaBanner.secondary_cta) }
              : undefined
          }
        />
      </main>
      <Footer />
    </>
  );
}
