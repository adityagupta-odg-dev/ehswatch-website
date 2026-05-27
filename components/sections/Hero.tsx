"use client";

import Link from "next/link";

import HeroDashboard from "@/components/sections/HeroDashboard";
import DotGrid from "@/components/ui/DotGrid";
import GlareButton from "@/components/ui/GlareButton";

export default function Hero() {

  return (
    <section className="relative w-full bg-white pb-[60px] sm:pb-[80px] md:pb-[100px]">
      {/* Background animation area */}
      <div className="relative w-full h-[500px] sm:h-[580px] md:h-[660px] lg:h-[760px] overflow-hidden">
        <DotGrid />

        {/* White radial mask — clears pattern behind hero text */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(ellipse 78% 54% at 50% 36%, rgba(255,255,255,0.82) 28%, rgba(255,255,255,0.45) 52%, rgba(255,255,255,0) 76%)",
          }}
        />

        {/* Hero copy */}
        <div className="relative z-30 max-w-[948px] mx-auto px-5 sm:px-6 pt-[110px] sm:pt-[130px] md:pt-[150px] lg:pt-[165px] flex flex-col items-center text-center gap-2 sm:gap-3">
          <h1
            className="font-[family-name:var(--font-gothic-a1)] font-bold text-[36px] sm:text-[46px] md:text-[58px] lg:text-[70px] xl:text-[77px] leading-[1.5] sm:leading-[1.1] text-[#0f172a] tracking-[0.2px] lg:tracking-[0.5px] animate-hero-rise"
            style={{ animationDelay: "60ms" }}
          >
            From Manual Chaos to <br className="hidden sm:block" /> Smart Safety.
          </h1>

          <p
            className="font-[family-name:var(--font-dm-sans)] font-medium text-[14px] sm:text-[16px] lg:text-[20px] leading-relaxed text-[#475569] mt-2 max-w-[600px] px-4 animate-hero-rise text-pretty"
            style={{ animationDelay: "180ms" }}
          >
            AI-powered EHS platform to streamline reporting everywhere.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-[24px] justify-center mt-4 sm:mt-[20px] animate-hero-rise"
            style={{ animationDelay: "300ms" }}
          >
            {/* Book a Demo */}
            <GlareButton
              href="#"
              className="px-7 py-[10px] rounded-full font-[family-name:var(--font-dm-sans)] font-medium text-[16px] sm:text-[18px] text-white whitespace-nowrap"
              style={{
                background: "linear-gradient(102deg, #ffa964 0%, #ff8e37 34%, #ff7812 50%, #ff6d00 120%)",
              }}
            >
              Book a Demo
            </GlareButton>

            {/* Watch Demo */}
            <Link
              href="#"
              className="flex items-center gap-[8px] font-[family-name:var(--font-dm-sans)] font-medium text-[15px] sm:text-[17px] text-[#0f172a] whitespace-nowrap group"
            >
              <span className="flex items-center justify-center w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] rounded-full border border-[#0f172a]/25 group-hover:bg-[#0f172a]/5 transition-colors">
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                  <polygon points="3,1 13,7 3,13" fill="#0f172a" />
                </svg>
              </span>
              Watch Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Dashboard image — pulls up over the background */}
      <div className="relative -mt-[80px] sm:-mt-[120px] md:-mt-[170px] lg:-mt-[220px] mx-auto max-w-[1100px] px-3 sm:px-5 z-20">
        <div
          className="relative rounded-[14px] sm:rounded-[22px] overflow-hidden shadow-[0_24px_64px_-12px_rgba(0,0,0,0.28)] sm:shadow-[0_32px_80px_-16px_rgba(0,0,0,0.32)] border-[2px] border-[#d1d5db] bg-white animate-dashboard-reveal"
          style={{ animationDelay: "400ms" }}
        >
          <HeroDashboard />
        </div>
      </div>
    </section>
  );
}
