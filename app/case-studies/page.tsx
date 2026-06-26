import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CaseStudiesHero from "@/components/sections/CaseStudiesHero";
import CaseStudiesGrid from "@/components/sections/CaseStudiesGrid";
import Reveal from "@/components/ui/Reveal";
import Link from "next/link";
import { basePath } from "@/lib/basePath";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Case Studies — EHSWatch",
  description:
    "See how EHSQ teams across construction, energy, manufacturing and logistics use EHSWatch to cut reporting time, accelerate audits and gain full visibility into risk.",
};

function CaseStudiesCTA() {
  return (
    <section
      className="relative py-12 md:py-[61px] px-4 md:px-6 overflow-hidden"
      style={{
        background: "#f1f7ff",
        backgroundImage: `url(${basePath}/images/product/cta-background.svg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-[800px] mx-auto flex flex-col gap-3 md:gap-[16px] items-center">
        <Reveal variant="slide-right" duration={750}>
          <h2 className="font-[family-name:var(--font-gothic-a1)] font-bold text-[22px] sm:text-[26px] md:text-[30px] leading-tight text-[#0a0f1e] text-center">
            Talk to our team to find out how EHSWatch maps to your workflows and sites.
          </h2>
        </Reveal>
        <Reveal
          variant="fade-up"
          duration={700}
          delay={160}
          className="flex flex-col sm:flex-row gap-3 md:gap-[16px] items-center justify-center pt-4 md:pt-[24px] w-full sm:w-auto"
        >
          <Link
            href="#"
            className="w-full sm:w-auto flex items-center justify-center px-6 md:px-[26px] py-3 md:py-[10px] rounded-full font-[family-name:var(--font-inter)] font-medium text-[14px] text-white whitespace-nowrap hover:opacity-90 transition-opacity"
            style={{
              backgroundImage:
                "linear-gradient(102.8deg, #ffa964 0.12%, #ff8e37 34.34%, #ff7812 50.27%, #ff6d00 119.92%)",
            }}
          >
            Watch Demo
          </Link>
          <Link
            href="#"
            className="w-full sm:w-auto flex items-center justify-center px-7 md:px-[31.5px] py-3 md:py-[10px] rounded-full bg-[rgba(255,120,44,0.1)] border border-[rgba(255,120,44,0.2)] font-[family-name:var(--font-inter)] text-[14px] text-[#ff6d00] hover:bg-orange-50 transition-colors"
          >
            See Pricing
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar lightHero={true} />
      <main>
        <CaseStudiesHero />
        <CaseStudiesGrid />
        <CaseStudiesCTA />
      </main>
      <Footer />
    </>
  );
}
