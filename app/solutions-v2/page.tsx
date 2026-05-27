import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SolutionsHero from "@/components/sections/SolutionsHero";
import SolutionsZigzag from "@/components/sections/SolutionsZigzag";
import SolutionsCTA from "@/components/sections/SolutionsCTA";
import Testimonials from "@/components/sections/Testimonials";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions v2 — EHSWatch",
  description:
    "Every industry has different risks. EHSWatch is configured to the compliance requirements, workflows and hazard profiles of your sector.",
};

export default function SolutionsV2Page() {
  return (
    <>
      <Navbar lightHero={true} />
      <main>
        <SolutionsHero />
        <SolutionsZigzag />
        <Testimonials title="A Snapshot of Real‑World Impact" />
        <SolutionsCTA />
      </main>
      <Footer />
    </>
  );
}
