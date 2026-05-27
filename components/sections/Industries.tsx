"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { basePath } from "@/lib/basePath";

const INDUSTRIES = [
  {
    image: basePath + "/images/industries/construction.png",
    title: "Construction & Infrastructure Projects",
    description: "Track hazards and compliance across multiple job sites instantly.",
    span: "col-span-1 row-span-2",       // tall left card
    imgClass: "object-bottom",
  },
  {
    image: basePath + "/images/industries/manufacturing.png",
    title: "Manufacturing & Engineering",
    description: "Centralise plant audits, equipment safety and worker training logs.",
    span: "col-span-2 row-span-1",       // wide top-right card
    imgClass: "object-center",
  },
  {
    image: basePath + "/images/industries/oil-gas.png",
    title: "Oil, Gas & Energy",
    description: "Permit-to-work, incident reporting and risk control in one place.",
    span: "col-span-1 row-span-1",
    imgClass: "object-center",
  },
  {
    image: basePath + "/images/industries/logistics.png",
    title: "Logistics, Warehousing & Transport",
    description: "Track vehicle incidents, warehouse safety and driver compliance.",
    span: "col-span-1 row-span-1",
    imgClass: "object-center",
  },
  {
    image: basePath + "/images/industries/facilities.png",
    title: "Facilities & Property Management",
    description: "Manage vendor safety, fire inspections and building maintenance risks.",
    span: "col-span-2 row-span-1",       // wide bottom-left card
    imgClass: "object-center",
  },
  {
    image: basePath + "/images/industries/utilities.png",
    title: "Utilities and Public Services",
    description: "Ensure field worker safety, outage reporting and regulatory compliance.",
    span: "col-span-1 row-span-1",
    imgClass: "object-center",
  },
];

export default function Industries() {
  return (
    <section className="bg-[#eef4fb] py-10 md:py-14 lg:py-20 px-4 md:px-6">
      <div className="max-w-[1100px] mx-auto">
        <Reveal variant="fade-up" duration={700}>
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-[family-name:var(--font-gothic-a1)] font-bold text-[28px] sm:text-[36px] md:text-[42px] text-[#0e1a2b]">
              One Platform for{" "}
              <span className="text-[#0060f9]">Everyday Safety</span>
            </h2>
            <p className="mt-3 text-[14px] md:text-[16px] text-[#555] max-w-[600px] mx-auto leading-relaxed font-[family-name:var(--font-dm-sans)]">
              From construction sites to corporate offices, EHSWatch adapts to the unique safety needs of your industry.
            </p>
          </div>
        </Reveal>

        {/* Bento grid — 3 cols, 3 rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:grid-rows-3">
          {INDUSTRIES.map((industry, i) => (
            <Reveal
              key={industry.title}
              variant={i % 2 === 0 ? "fade-up" : "fade-up"}
              delay={i * 80}
              duration={700}
              className={`group bg-white rounded-[18px] overflow-hidden relative ${industry.span} min-h-[220px]`}
            >
              {/* Text on top */}
              <div className="relative z-10 p-5 md:p-6">
                <h3 className="font-[family-name:var(--font-gothic-a1)] font-bold text-[15px] md:text-[17px] leading-[1.5] sm:leading-snug text-[#0e1a2b] mb-1.5">
                  {industry.title}
                </h3>
                <p className="font-[family-name:var(--font-dm-sans)] text-[12px] md:text-[13px] text-[#555] leading-relaxed max-w-[260px]">
                  {industry.description}
                </p>
              </div>

              {/* Image — bottom half */}
              <div className="absolute bottom-0 left-0 right-0 h-[55%] overflow-hidden rounded-b-[18px]">
                <Image
                  src={industry.image}
                  alt={industry.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={`object-cover ${industry.imgClass} group-hover:scale-105 transition-transform duration-500`}
                />
                {/* subtle top fade so image blends into card */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent" style={{ height: "40%" }} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
