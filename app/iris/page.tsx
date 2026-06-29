import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import IrisPage from "@/components/sections/IrisPage";
import { getPage } from "@/lib/api";
import { findBlock, iconFeaturesToArray } from "@/lib/blocks";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "IRIS — AI-Powered EHSQ | EHSWatch",
  description: "Meet IRIS, EHSWatch's Intelligent Risk & Insight System. Six AI capabilities embedded across your EHSQ workflows.",
};

export default async function IrisPageRoute() {
  const pageData = await getPage("iris");
  const blocks: Array<{ type: string; data: Record<string, unknown> }> =
    (pageData?.data?.attributes?.content as Array<{ type: string; data: Record<string, unknown> }>) ?? [];

  const cmsHero         = findBlock<{ eyebrow?: string; headline?: string; subheadline?: string; primary_cta?: unknown }>(blocks, "hero") ?? undefined;
  const cmsTextCta      = findBlock<{ heading?: string; subheading?: string; cta?: unknown }>(blocks, "text_cta") ?? undefined;
  const cmsIconFeatures = findBlock<{ items?: Record<string, unknown> }>(blocks, "icon_features");
  const cmsProblems     = iconFeaturesToArray(cmsIconFeatures?.items);
  const cmsNumberSteps  = findBlock<{ steps?: unknown }>(blocks, "number_steps");
  const rawSteps        = cmsNumberSteps?.steps;
  const cmsCapabilities = rawSteps
    ? (Array.isArray(rawSteps) ? rawSteps : Object.values(rawSteps as Record<string, unknown>))
    : undefined;
  const cmsCtaBanner    = findBlock<{ headline?: string; subhead?: string; primary_cta?: unknown }>(blocks, "cta_banner") ?? undefined;

  return (
    <>
      <Navbar lightHero />
      <main>
        <IrisPage
          cmsHero={cmsHero}
          cmsTextCta={cmsTextCta}
          cmsProblems={cmsProblems.length > 0 ? cmsProblems : undefined}
          cmsCapabilities={cmsCapabilities && cmsCapabilities.length > 0 ? cmsCapabilities as Array<{ title?: string; description?: string; eyebrow?: string; sub_items?: unknown[] }> : undefined}
          cmsCtaBanner={cmsCtaBanner}
        />
      </main>
      <Footer />
    </>
  );
}
