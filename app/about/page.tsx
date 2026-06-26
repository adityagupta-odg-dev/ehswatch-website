import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/sections/AboutHero";
import AboutStory from "@/components/sections/AboutStory";
import AboutDrives from "@/components/sections/AboutDrives";
import Stats from "@/components/sections/Stats";
import CTABanner from "@/components/sections/CTABanner";
import type { Metadata } from "next";
import { getPage } from "@/lib/api";
import { findBlock, findBlocks, iconFeaturesToArray, ctaHref } from "@/lib/blocks";

export const metadata: Metadata = {
  title: "About Us — EHSWatch",
  description: "Built to simplify EHSQ. Designed to protect. The intelligent safety platform trusted by 25K+ teams worldwide.",
};

export default async function AboutPage() {
  // Fetch CMS data — falls back gracefully if null
  const pageData = await getPage("about");
  const blocks = pageData?.data?.attributes?.content ?? [];

  // hero block
  const heroBlock = findBlock<{
    headline?: string;
    subheadline?: string;
    primary_cta?: { label?: string; type?: string; url?: string; anchor?: string };
  }>(blocks, "hero");

  // image_text block (About story)
  const imageTextBlock = findBlock<{
    heading?: string;
    body?: string;
  }>(blocks, "image_text");

  // icon_features blocks — first is Mission/Vision (AboutDrives), second is "What drives us"
  const iconFeaturesBlocks = findBlocks<{
    heading?: string;
    subheading?: string;
    items?: Record<string, { icon?: string; title?: string; description?: string }> | Array<{ icon?: string; title?: string; description?: string }>;
  }>(blocks, "icon_features");

  const firstIconFeatures = iconFeaturesBlocks[0] ?? null;
  const drivesItems = iconFeaturesToArray(firstIconFeatures?.items ?? null);

  // stats_row block
  const statsBlock = findBlock<{
    items?: Array<{ label: string; value: string; suffix?: string | null; icon?: string }>;
  }>(blocks, "stats_row");

  // cta_banner block (may not be present in response)
  const ctaBannerBlock = findBlock<{
    headline?: string;
    subhead?: string;
    subheadline?: string;
    primary_cta?: { label?: string; type?: string; url?: string; anchor?: string };
    secondary_cta?: { label?: string; type?: string; url?: string; anchor?: string };
  }>(blocks, "cta_banner");

  return (
    <>
      <Navbar lightHero={true} />
      <main>
        <AboutHero
          cms={
            heroBlock
              ? {
                  headline: heroBlock.headline,
                  subheadline: heroBlock.subheadline,
                  primaryCta: heroBlock.primary_cta
                    ? {
                        label: heroBlock.primary_cta.label,
                        href: ctaHref(heroBlock.primary_cta),
                      }
                    : undefined,
                }
              : undefined
          }
        />
        <AboutStory
          cms={
            imageTextBlock
              ? {
                  heading: imageTextBlock.heading,
                  body: imageTextBlock.body,
                }
              : undefined
          }
        />
        <AboutDrives
          cms={
            drivesItems.length > 0
              ? { items: drivesItems }
              : undefined
          }
        />
        <Stats
          cmsItems={
            statsBlock?.items && statsBlock.items.length > 0
              ? statsBlock.items.map((item) => ({
                  value: item.value,
                  suffix: item.suffix ?? undefined,
                  label: item.label,
                  icon: item.icon,
                }))
              : undefined
          }
        />
        <CTABanner
          cmsHeadline={ctaBannerBlock?.headline ?? undefined}
          cmsSubhead={ctaBannerBlock?.subhead ?? ctaBannerBlock?.subheadline ?? undefined}
          cmsPrimaryCta={
            ctaBannerBlock?.primary_cta?.label
              ? {
                  label: ctaBannerBlock.primary_cta.label,
                  url: ctaHref(ctaBannerBlock.primary_cta),
                }
              : undefined
          }
          cmsSecondaryCta={
            ctaBannerBlock?.secondary_cta?.label
              ? {
                  label: ctaBannerBlock.secondary_cta.label,
                  url: ctaHref(ctaBannerBlock.secondary_cta),
                }
              : undefined
          }
        />
      </main>
      <Footer />
    </>
  );
}
