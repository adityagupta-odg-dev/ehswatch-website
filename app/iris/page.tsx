import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import IrisPage from "@/components/sections/IrisPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "IRIS — AI-Powered EHSQ | EHSWatch",
  description:
    "Meet IRIS, EHSWatch's Intelligent Risk & Insight System. Six AI capabilities embedded across your EHSQ workflows.",
};

export default function IrisPageRoute() {
  return (
    <>
      <Navbar lightHero />
      <main>
        <IrisPage />
      </main>
      <Footer />
    </>
  );
}
