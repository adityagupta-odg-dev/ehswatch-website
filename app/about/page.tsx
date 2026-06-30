import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/sections/AboutHero";
import AboutStory from "@/components/sections/AboutStory";
import AboutDrives from "@/components/sections/AboutDrives";
import Stats from "@/components/sections/Stats";
import CTABanner from "@/components/sections/CTABanner";
import type { Metadata } from "next";
import { getPage } from "@/lib/api";
import { findBlock, findBlocks, normalizeArray, ctaHref } from "@/lib/blocks";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPage("about").catch(() => null);
  const attrs = (pageData?.data as any)?.attributes ?? {};
  return {
    title: attrs.meta?.meta_title || "About Us — EHSWatch",
    description: attrs.meta?.meta_description || "Built to simplify EHSQ. Designed to protect. The intelligent safety platform trusted by 25K+ teams worldwide.",
  };
}

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
  const heroCtaUrl = heroCtaRaw ? ctaHref(heroCtaRaw as any) : undefined;

  // ── image_text block (AboutStory) ───────────────────────────────────────────
  const imageTextData = findBlock<{
    heading?: string | null;
    body?: string | null;
    image?: { url?: string | null; alt?: string | null } | null;
  }>(blocks, "image_text");

  const storyHeading = imageTextData?.heading || undefined;
  const storyBody = imageTextData?.body || undefined;
  const storyImageUrl = imageTextData?.image?.url || undefined;
  const storyImageAlt = imageTextData?.image?.alt || undefined;

  // ── icon_features blocks ────────────────────────────────────────────────────
  const iconFeaturesAll = findBlocks<{
    heading?: string | null;
    subheading?: string | null;
    items?: unknown;
  }>(blocks, "icon_features");

  function extractIconFeatureItems(block: typeof iconFeaturesAll[0] | null) {
    const raw = normalizeArray<{
      title?: string | null;
      description?: string | null;
      icon?: string | null;
    }>(block?.items);
    return raw.length > 0
      ? raw.map((item) => ({ title: item.title || "", description: item.description || "" }))
      : undefined;
  }

  // icon_features[0] — "Purpose Behind Every Feature" (Mission / Vision)
  const drivesBlock = iconFeaturesAll[0] ?? null;
  const drivesItems = extractIconFeatureItems(drivesBlock);

  // icon_features[1] — "What drives us" (Make safety frictionless / defensible)
  const valuesBlock = iconFeaturesAll[1] ?? null;
  const valuesItems = extractIconFeatureItems(valuesBlock);

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
        <AboutHero
          cmsHeadline={heroHeadline}
          cmsSubheadline={heroSubheadline}
          cmsPrimaryCtaLabel={heroCtaLabel}
          cmsPrimaryCtaUrl={heroCtaUrl}
        />
        {/* 2. image_text (About Story) */}
        <AboutStory
          cmsHeading={storyHeading}
          cmsBody={storyBody}
          cmsImageUrl={storyImageUrl}
          cmsImageAlt={storyImageAlt}
        />
        {/* 3. icon_features[0] — Mission / Vision */}
        <AboutDrives
          cmsHeading={drivesBlock?.heading || undefined}
          cmsSubheading={drivesBlock?.subheading || undefined}
          cmsItems={drivesItems}
        />
        {/* 4. stats_row */}
        <Stats cmsItems={statsItems} />
        {/* 5. icon_features[1] — What drives us */}
        {valuesBlock && (
          <AboutDrives
            cmsHeading={valuesBlock.heading || undefined}
            cmsSubheading={valuesBlock.subheading || undefined}
            cmsItems={valuesItems}
          />
        )}
        {/* 6. cta_banner */}
        <CTABanner
          cmsHeadline={ctaData?.headline || undefined}
          cmsSubhead={ctaData?.subhead || undefined}
          cmsPrimaryCta={ctaPrimary?.label ? { label: ctaPrimary.label, url: ctaHref(ctaPrimary as any) } : undefined}
          cmsSecondaryCta={ctaSecondary?.label ? { label: ctaSecondary.label, url: ctaHref(ctaSecondary as any) } : undefined}
        />
      </main>
      <Footer />
    </>
  );
}
