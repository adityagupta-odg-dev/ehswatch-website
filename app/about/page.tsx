import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/sections/AboutHero";
import AboutStory from "@/components/sections/AboutStory";
import AboutDrives from "@/components/sections/AboutDrives";
import Stats from "@/components/sections/Stats";
import CTABanner from "@/components/sections/CTABanner";
import type { Metadata } from "next";
import { getPage } from "@/lib/api";
import { findBlock, findBlocks, normalizeArray } from "@/lib/blocks";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us — EHSWatch",
  description: "Built to simplify EHSQ. Designed to protect. The intelligent safety platform trusted by 25K+ teams worldwide.",
};

export default async function AboutPage() {
  const pageData = await getPage("about");
  const blocks = pageData?.data?.attributes?.content ?? [];

  // ── hero block ──────────────────────────────────────────────────────────────
  const heroData = findBlock<{
    headline?: string | null;
    subheadline?: string | null;
    primary_cta?: { label?: string | null; url?: string | null; anchor?: string | null; type?: string | null } | null;
  }>(blocks, "hero");

  const heroHeadline = heroData?.headline || undefined;
  const heroSubheadline = heroData?.subheadline || undefined;
  const heroCtaRaw = heroData?.primary_cta;
  const heroCtaLabel = heroCtaRaw?.label || undefined;
  const heroCtaUrl =
    (heroCtaRaw?.type === "anchor" ? heroCtaRaw?.anchor : heroCtaRaw?.url) || undefined;

  // ── image_text block (AboutStory) ───────────────────────────────────────────
  const imageTextData = findBlock<{
    heading?: string | null;
    body?: string | null;
  }>(blocks, "image_text");

  const storyHeading = imageTextData?.heading || undefined;
  const storyBody = imageTextData?.body || undefined;

  // ── icon_features[0] — "Purpose Behind Every Feature" (AboutDrives) ─────────
  const iconFeaturesAll = findBlocks<{
    heading?: string | null;
    subheading?: string | null;
    items?: unknown;
  }>(blocks, "icon_features");

  const drivesBlock = iconFeaturesAll[0] ?? null;
  const drivesHeading = drivesBlock?.heading || undefined;
  const drivesRawItems = normalizeArray<{
    title?: string | null;
    description?: string | null;
    icon?: string | null;
  }>(drivesBlock?.items);
  const drivesItems =
    drivesRawItems.length > 0
      ? drivesRawItems.map((item) => ({
          title: item.title || "",
          description: item.description || "",
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

  // ── stats_row block ─────────────────────────────────────────────────────────
  const statsData = findBlock<{
    heading?: string | null;
    items?: unknown;
  }>(blocks, "stats_row");

  const statsRawItems = normalizeArray<{
    value?: string | null;
    suffix?: string | null;
    label?: string | null;
  }>(statsData?.items);
  const statsItems =
    statsRawItems.length > 0
      ? statsRawItems.map((item) => ({
          value: item.value || "0",
          suffix: item.suffix || null,
          label: item.label || "",
        }))
      : undefined;

  return (
    <>
      <Navbar lightHero={true} />
      <main>
        <AboutHero
          cmsHeadline={heroHeadline}
          cmsSubheadline={heroSubheadline}
          cmsPrimaryCtaLabel={heroCtaLabel}
          cmsPrimaryCtaUrl={heroCtaUrl}
        />
        <AboutStory
          cmsHeading={storyHeading}
          cmsBody={storyBody}
        />
        <AboutDrives
          cmsHeading={drivesHeading}
          cmsItems={drivesItems}
        />
        <Stats cmsItems={statsItems} />
        <CTABanner
          cmsHeadline={ctaData?.headline || undefined}
          cmsSubhead={ctaData?.subhead || undefined}
          cmsPrimaryCta={ctaPrimary?.label ? { label: ctaPrimary.label, url: ctaPrimary.url || ctaPrimary.anchor || "#" } : undefined}
          cmsSecondaryCta={ctaSecondary?.label ? { label: ctaSecondary.label, url: ctaSecondary.url || ctaSecondary.anchor || "#" } : undefined}
        />
      </main>
      <Footer />
    </>
  );
}
