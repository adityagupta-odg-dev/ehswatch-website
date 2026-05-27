import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogHero from "@/components/sections/BlogHero";
import BlogGrid from "@/components/sections/BlogGrid";
import BlogNewsletter from "@/components/sections/BlogNewsletter";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { basePath } from "@/lib/basePath";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — EHSWatch",
  description:
    "Practical guidance, regulatory updates and operational insights for EHSQ professionals. Written by safety practitioners, for safety practitioners.",
};

function BlogCTA() {
  return (
    <section
      className="relative py-10 md:py-[50px] px-4 md:px-6 overflow-hidden"
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
          <h2 className="font-[family-name:var(--font-gothic-a1)] font-bold text-[28px] sm:text-[36px] md:text-[44px] leading-tight text-[#0a0f1e] text-center">
            Reading is a start. Now is your time to take action.
          </h2>
        </Reveal>
        <Reveal variant="slide-left" duration={750} delay={120}>
          <p className="font-[family-name:var(--font-inter)] text-[14px] md:text-[17px] leading-relaxed md:leading-[29.75px] text-[#6b7280] text-center max-w-[520px]">
            Give your teams the platform to match the knowledge — report, respond and prevent
            incidents all from one place.
          </p>
        </Reveal>
        <Reveal
          variant="fade-up"
          duration={700}
          delay={240}
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
            Book Your Free Demo
          </Link>
          <Link
            href="#"
            className="w-full sm:w-auto flex items-center justify-center px-7 md:px-[31.5px] py-3 md:py-[15.5px] rounded-full bg-[rgba(255,120,44,0.1)] border border-[rgba(255,120,44,0.2)] font-[family-name:var(--font-inter)] text-[14px] text-[#ff6d00] hover:bg-orange-50 transition-colors"
          >
            View Pricing Plans
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default function BlogPage() {
  return (
    <>
      <Navbar lightHero={true} />
      <main>
        <BlogHero />
        <BlogGrid />
        <BlogNewsletter />
        <BlogCTA />
      </main>
      <Footer />
    </>
  );
}
