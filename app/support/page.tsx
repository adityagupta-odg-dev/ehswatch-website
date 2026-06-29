import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SupportHero from "@/components/sections/SupportHero";
import SupportContact from "@/components/sections/SupportContact";
import SupportMap from "@/components/sections/SupportMap";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support — EHSWatch",
  description: "Get in touch with the EHSWatch team for demos, onboarding support, or to find out how we can help your organisation.",
};

export default function SupportPage() {
  return (
    <>
      <Navbar lightHero={true} />
      <main>
        <SupportHero />
        <SupportContact />
        <SupportMap />
      </main>
      <Footer />
    </>
  );
}
