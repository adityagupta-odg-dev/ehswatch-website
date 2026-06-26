import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SolutionsHero from "@/components/sections/SolutionsHero";
import SolutionsIndustries from "@/components/sections/SolutionsIndustries";
import SolutionsCTA from "@/components/sections/SolutionsCTA";
import Testimonials from "@/components/sections/Testimonials";
import { getPage } from "@/lib/api";
import { findBlock } from "@/lib/blocks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions — EHSWatch",
  description:
    "Every industry has different risks. EHSWatch is configured to the compliance requirements, workflows and hazard profiles of your sector.",
};

export default async function SolutionsPage() {
  // Fetch the solutions page from the CMS; fall back gracefully on failure
  const pageRes = await getPage("solutions");
  const blocks: import("@/lib/types").CmsBlock[] =
    pageRes?.data?.attributes?.content ?? [];

  const heroBlock      = findBlock<Record<string, unknown>>(blocks, "hero");
  const carouselBlock  = findBlock<Record<string, unknown>>(blocks, "solution_carousel");
  const testimonialsBlock = findBlock<Record<string, unknown>>(blocks, "testimonials");
  const ctaBannerBlock = findBlock<Record<string, unknown>>(blocks, "cta_banner");

  // Normalise testimonials block → CmsTestimonial-shaped array for the
  // existing Testimonials component interface
  const cmsTestimonialItems =
    testimonialsBlock && Array.isArray((testimonialsBlock as any).items)
      ? (testimonialsBlock as any).items.map(
          (item: { quote: string; author?: string; author_name?: string; author_role?: string; author_company?: string }, idx: number) => ({
            id: idx,
            type: "testimonial" as const,
            attributes: {
              quote: item.quote ?? "",
              author_name: item.author_name ?? item.author ?? "",
              author_role: item.author_role ?? "",
              author_company: item.author_company ?? (item.author ?? ""),
              rating: 5,
              is_featured: false,
              avatar: null,
            },
          })
        )
      : undefined;

  return (
    <>
      <Navbar lightHero={true} />
      <main>
        <SolutionsHero heroBlock={heroBlock} />
        <SolutionsIndustries
          cmsCards={
            carouselBlock && Array.isArray((carouselBlock as any).cards)
              ? (carouselBlock as any).cards
              : undefined
          }
        />

        <Testimonials
          title={
            (testimonialsBlock as any)?.heading
              ? (testimonialsBlock as any).heading
              : "A Snapshot of Real‑World Impact"
          }
          cmsItems={cmsTestimonialItems}
        />

        <SolutionsCTA ctaBannerBlock={ctaBannerBlock} />
      </main>
      <Footer />
    </>
  );
}
