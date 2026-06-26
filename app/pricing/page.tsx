import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PricingHero from "@/components/sections/PricingHero";
import PricingOverview from "@/components/sections/PricingOverview";
import PricingCalculator from "@/components/sections/PricingCalculator";
import PricingFAQ from "@/components/sections/PricingFAQ";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pricing — EHSWatch",
  description: "Simple, flexible pricing for enterprise-grade EHS management. Pay only for the modules you need.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar lightHero={true} />
      <main>
        <PricingHero />
        <PricingOverview />
        <PricingCalculator />
        <PricingFAQ />
        <section
          className="relative py-12 md:py-[61px] px-4 md:px-6 overflow-hidden"
          style={{ background: "#f1f7ff" }}
        >
          <div className="max-w-[800px] mx-auto flex flex-col gap-3 md:gap-4 items-center text-center">
            <h2 className="font-[family-name:var(--font-gothic-a1)] font-bold text-[28px] sm:text-[36px] md:text-[44px] leading-tight text-[#0a0f1e]">
              Speak to our team to find the right configuration for your organisation.
            </h2>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
