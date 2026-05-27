import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SupportHero from "@/components/sections/SupportHero";
import SupportContact from "@/components/sections/SupportContact";
import SupportMap from "@/components/sections/SupportMap";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support — EHSWatch",
  description: "We're here when you need us — before, during and after go-live. Contact our support team or log in to the support portal.",
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
