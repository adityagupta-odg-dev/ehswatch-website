import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SolutionsHero from "@/components/sections/SolutionsHero";
import SolutionsIndustries from "@/components/sections/SolutionsIndustries";
import CTABanner from "@/components/sections/CTABanner";
import Testimonials from "@/components/sections/Testimonials";
import { getPage, getTestimonials } from "@/lib/api";
import { findBlock, ctaHref } from "@/lib/blocks";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Solutions — EHSWatch",
  description: "Every industry has different risks. EHSWatch is configured to the compliance requirements, workflows and hazard profiles of your sector.",
};

export default async function SolutionsPage() {
  const [industriesData, testimonialsRes] = await Promise.all([
    getPage("industries").catch(() => null),
    getTestimonials(),
  ]);

  const blocks: any[] = (industriesData?.data as any)?.attributes?.content ?? [];
  const cmsTestimonials = testimonialsRes?.data ?? [];

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
        <SolutionsHero />
        <SolutionsIndustries />
        <Testimonials title="A Snapshot of Real‑World Impact" cmsItems={cmsTestimonials.length > 0 ? cmsTestimonials : undefined} />
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
