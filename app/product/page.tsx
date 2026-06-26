import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductHero from "@/components/sections/ProductHero";
import ProductOverview from "@/components/sections/ProductOverview";
import ProductHowItWorks from "@/components/sections/ProductHowItWorks";
import ProductModules from "@/components/sections/ProductModules";
import Stats from "@/components/sections/Stats";
import CTABanner from "@/components/sections/CTABanner";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Product — EHSWatch",
  description: "One Platform. Every EHSQ Process. From field incidents to board-level dashboards — all connected, all in real time.",
};

export default function ProductPage() {
  return (
    <>
      <Navbar lightHero={true} />
      <main>
        <ProductHero />
        <ProductOverview />
        <Stats />
        <ProductHowItWorks />
        <ProductModules />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
