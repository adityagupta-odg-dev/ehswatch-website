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
  const blocks: any[] = pageData?.data?.attributes?.content ?? [];

  const cmsHero        = findBlock(blocks, "hero");
  const cmsTextCta     = findBlock(blocks, "text_cta");
  const cmsIconFeatures = findBlock<{ items?: Record<string, any> }>(blocks, "icon_features");
  const cmsProblems    = iconFeaturesToArray(cmsIconFeatures?.items);
  const cmsNumberSteps = findBlock<{ steps?: any[] }>(blocks, "number_steps");
  const cmsCapabilities = cmsNumberSteps?.steps ?? null;
  const cmsCtaBanner   = findBlock(blocks, "cta_banner");

  return (
    <>
      <Navbar lightHero />
      <main>
        <IrisPage
          cmsHero={cmsHero ?? undefined}
          cmsTextCta={cmsTextCta ?? undefined}
          cmsProblems={cmsProblems.length > 0 ? cmsProblems : undefined}
          cmsCapabilities={cmsCapabilities ?? undefined}
          cmsCtaBanner={cmsCtaBanner ?? undefined}
        />
      </main>
      <Footer />
    </>
  );
}
