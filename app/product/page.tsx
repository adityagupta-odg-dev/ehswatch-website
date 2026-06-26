import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductHero from "@/components/sections/ProductHero";
import ProductOverview from "@/components/sections/ProductOverview";
import ProductHowItWorks from "@/components/sections/ProductHowItWorks";
import ProductModules from "@/components/sections/ProductModules";
import Stats from "@/components/sections/Stats";
import CTABanner from "@/components/sections/CTABanner";
import { getPage, getProductModules } from "@/lib/api";
import { findBlock } from "@/lib/blocks";
import type { Metadata } from "next";
import type { StatsItem } from "@/components/sections/Stats";

export const metadata: Metadata = {
  title: "Product — EHSWatch",
  description: "One Platform. Every EHSQ Process. From field incidents to board-level dashboards — all connected, all in real time.",
};

export default async function ProductPage() {
  const [pageRes, modulesRes] = await Promise.all([
    getPage("product"),
    getProductModules(),
  ]);

  const blocks = pageRes?.data?.attributes?.content ?? [];

  const heroBlock     = findBlock<Record<string, any>>(blocks, "hero");
  const imageTextBlock = findBlock<Record<string, any>>(blocks, "image_text");
  const statsRowBlock  = findBlock<{ items?: StatsItem[] }>(blocks, "stats_row");
  const numberStepsBlock = findBlock<{ steps?: any[] }>(blocks, "number_steps");
  const ctaBannerBlock = findBlock<Record<string, any>>(blocks, "cta_banner");

  const cmsModules = modulesRes?.data ?? [];

  return (
    <>
      <Navbar lightHero={true} />
      <main>
        <ProductHero
          cmsHeading={heroBlock?.heading}
          cmsSubheading={heroBlock?.subheading}
          cmsCtaLabel={heroBlock?.cta?.label}
          cmsCtaUrl={heroBlock?.cta?.url}
        />
        <ProductOverview
          cmsHeading={imageTextBlock?.heading}
          cmsBody={imageTextBlock?.body}
          cmsImage={imageTextBlock?.image}
        />
        <Stats cmsItems={statsRowBlock?.items} />
        <ProductHowItWorks cmsSteps={numberStepsBlock?.steps} />
        <ProductModules cmsModules={cmsModules} />
        <CTABanner
          cmsHeadline={ctaBannerBlock?.heading}
          cmsSubhead={ctaBannerBlock?.subheading}
          cmsPrimaryCta={
            ctaBannerBlock?.primary_cta
              ? { label: ctaBannerBlock.primary_cta.label, url: ctaBannerBlock.primary_cta.url ?? "#" }
              : undefined
          }
          cmsSecondaryCta={
            ctaBannerBlock?.secondary_cta
              ? { label: ctaBannerBlock.secondary_cta.label, url: ctaBannerBlock.secondary_cta.url ?? "#" }
              : undefined
          }
        />
      </main>
      <Footer />
    </>
  );
}
