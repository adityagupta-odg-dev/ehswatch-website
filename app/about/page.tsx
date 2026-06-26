import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/sections/AboutHero";
import AboutStory from "@/components/sections/AboutStory";
import AboutDrives from "@/components/sections/AboutDrives";
import Stats from "@/components/sections/Stats";
import CTABanner from "@/components/sections/CTABanner";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us — EHSWatch",
  description: "Built to simplify EHSQ. Designed to protect. The intelligent safety platform trusted by 25K+ teams worldwide.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar lightHero={true} />
      <main>
        <AboutHero />
        <AboutStory />
        <AboutDrives />
        <Stats />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
