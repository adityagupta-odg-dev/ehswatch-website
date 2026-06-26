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
        {/* CTA — matches style of other pages */}
        <section
          className="relative py-12 md:py-[61px] px-4 md:px-6 overflow-hidden"
          style={{ background: "#f1f7ff" }}
        >
          <div className="max-w-[800px] mx-auto flex flex-col gap-3 md:gap-4 items-center text-center">
            <h2 className="font-[family-name:var(--font-gothic-a1)] font-bold text-[28px] sm:text-[36px] md:text-[44px] leading-tight text-[#0a0f1e]">
              Speak to our team to find the right configuration for your organisation.
            </h2>
            <p className="font-[family-name:var(--font-dm-sans)] text-[14px] md:text-[17px] leading-relaxed text-[#6b7280] max-w-[500px] text-pretty">
              We&apos;ll walk you through the modules, discuss your sites and compliance needs, and put together a proposal.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center pt-4 md:pt-6">
              <a
                href="#"
                className="flex items-center justify-center px-6 md:px-7 py-3 md:py-[10px] rounded-full font-[family-name:var(--font-dm-sans)] font-medium text-[14px] text-white whitespace-nowrap hover:opacity-90 transition-opacity"
                style={{
                  backgroundImage: "linear-gradient(102.8deg, #ffa964 0.12%, #ff8e37 34.34%, #ff7812 50.27%, #ff6d00 119.92%)",
                }}
              >
                Book a Demo
              </a>
              <a
                href="#"
                className="flex items-center justify-center px-7 py-3 md:py-[10px] rounded-full border font-[family-name:var(--font-dm-sans)] text-[14px] text-[#ff6d00] hover:bg-orange-50 transition-colors"
                style={{ background: "rgba(255,120,44,0.1)", borderColor: "rgba(255,120,44,0.2)" }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
