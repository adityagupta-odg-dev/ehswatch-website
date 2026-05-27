"use client";

import { basePath } from "@/lib/basePath";

/* ── SVG base — ASCII folder name for reliable static serving ── */
const BHR = (file: string) =>
  `${basePath}/images/work-environments/built-for-high-risk/${file}`;

/* ── Card spec ─────────────────────────────────────────── */
interface Card {
  key: string;
  title: string;
  desc: string;
  /* text block position — exact Figma px (scaled 1100/1178 ≈ 0.934) */
  tl: number; /* text left  */
  tt: number; /* text top   */
  tw: number; /* title maxW */
  dw: number; /* desc  maxW */
  imgSrc: string;
}

const CARDS: Card[] = [
  /* Row 1 ── Construction (Figma: 537 × 470, left cell) */
  {
    key: "construction",
    title: "Construction & Infrastructure Projects",
    desc: "Track hazards and compliance across multiple job sites instantly.",
    tl: 15, tt: 25, tw: 240, dw: 267,
    imgSrc: BHR("Construction%20%26%20Infrastructure%20Projects%203.svg"),
  },
  /* Row 1 ── Manufacturing (Figma: 641 × 470, right cell) */
  {
    key: "manufacturing",
    title: "Manufacturing & Engineering",
    desc: "Centralise plant audits, equipment safety and worker training logs.",
    tl: 44, tt: 25, tw: 298, dw: 298,
    imgSrc: BHR("Manufacturing%20%26%20Engineering.svg"),
  },
  /* Row 2 ── Oil Gas (Figma: 642 × 470, left cell) */
  {
    key: "oilgas",
    title: "Oil, Gas & Energy",
    desc: "Permit-to-work, incident reporting and risk control in one place.",
    tl: 20, tt: 40, tw: 243, dw: 302,
    imgSrc: BHR("Oil%2C%20Gas%20%26%20Energy%203.svg"),
  },
  /* Row 2 ── Logistics (Figma: 536 × 470, right cell) */
  {
    key: "logistics",
    title: "Logistics, Warehousing & Transport",
    desc: "Track vehicle incidents, warehouse safety and driver compliance.",
    tl: 25, tt: 48, tw: 375, dw: 375,
    imgSrc: BHR("Logistics%2C%20Warehousing%20%26%20Transport.svg"),
  },
  /* Row 3 ── Utilities (Figma: 537 × 470, left cell) */
  {
    key: "utilities",
    title: "Utilities and Public Services",
    desc: "Ensure field worker safety, outage reporting and regulatory compliance.",
    tl: 8,  tt: 47, tw: 280, dw: 329,
    imgSrc: BHR("Utilities%20and%20Public%20Services.svg"),
  },
  /* Row 3 ── Facilities (Figma: 641 × 470, right cell) */
  {
    key: "facilities",
    title: "Facilities & Property Management",
    desc: "Manage vendor safety, fire inspections and building maintenance risks.",
    tl: 30, tt: 50, tw: 357, dw: 357,
    imgSrc: BHR("Facilities%20%26%20Property%20Management.svg"),
  },
];

/* ── Industry Card ─────────────────────────────────────── */
function IndustryCard({ card }: { card: Card }) {
  return (
    /*
      Card: fixed height matches Figma (470 px desktop, scaled down on smaller screens).
      overflow-hidden clips SVG that extends above the card.
    */
    <div
      className="relative overflow-hidden bg-[#f8fbff]"
      style={{ height: "clamp(320px, 38vw, 470px)" }}
    >
      {/*
        Text block — absolute, positioned per Figma pixel offsets.
        z-10 keeps it above the SVG.
      */}
      <div
        className="absolute z-10 flex flex-col gap-[3px]"
        style={{ top: card.tt, left: card.tl, maxWidth: `calc(100% - ${card.tl + 12}px)` }}
      >
        <h3
          className="font-[family-name:var(--font-gothic-a1)] font-semibold text-[15px] md:text-[17px] lg:text-[20px] text-[#1b1b1b] leading-[1.3]"
        >
          {card.title}
        </h3>
        <p
          className="font-[family-name:var(--font-dm-sans)] font-normal text-[11px] md:text-[12px] lg:text-[14px] text-[#727272] tracking-[-0.18px] leading-relaxed"
          style={{ fontVariationSettings: "'opsz' 14" }}
        >
          {card.desc}
        </p>
      </div>

      {/*
        Gradient fade — ensures text stays readable over the illustration.
        Covers the top ~30% of the card and fades to transparent.
      */}
      <div
        className="absolute inset-x-0 top-0 z-[5] pointer-events-none"
        style={{
          height: "42%",
          background: "linear-gradient(to bottom, #f8fbff 55%, rgba(248,251,255,0))",
        }}
        aria-hidden
      />

      {/*
        SVG illustration — pinned to bottom edge, full card width.
        height: auto → renders at its natural aspect ratio.
        The card's overflow-hidden clips anything that exceeds card height.
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.imgSrc}
        alt=""
        draggable={false}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "auto",
          display: "block",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

/* ── Section ───────────────────────────────────────────── */
export default function WorkEnvironments() {
  const [construction, manufacturing, oilgas, logistics, utilities, facilities] = CARDS;

  return (
    /*
      Figma section top: heading at top-[106px], grid at top-[382px].
      Responsive scale: pt-[60px] → pt-[80px] → pt-[106px].
      No horizontal section padding — let the inner container handle it.
    */
    <section className="bg-[#f8fbff] pt-[60px] md:pt-[80px] lg:pt-[106px] pb-[60px] md:pb-[80px]">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">

        {/* ── Heading block ── centered, max-w 860px matching Figma */}
        <div className="text-center max-w-[860px] mx-auto">
          <h2 className="font-[family-name:var(--font-gothic-a1)] font-bold text-[26px] sm:text-[34px] md:text-[42px] lg:text-[48px] leading-[1.1] lg:leading-[1.42] text-[#1b1b1b]">
            Built for High‑Risk, High‑Activity{" "}
            <span className="text-[#155eef]">Work Environments</span>
          </h2>
          {/* Figma gap between title and description: 13px */}
          <p
            className="mt-[13px] font-[family-name:var(--font-dm-sans)] font-medium text-[13px] md:text-[15px] lg:text-[18px] text-[#727272] leading-[1.64] tracking-[-0.18px]"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            EHSWatch brings all your EHSQ activities into a single, easy‑to‑use platform so
            everyone, from workers in the field to leadership, works from the same, up‑to‑date
            information.
          </p>
        </div>

        {/*
          Grid — Figma gap from heading bottom to grid top ≈ 64 px.
          Responsive: 48 → 56 → 64 px.
          Rows divided by horizontal border, left cells by vertical border.
          Final row keeps border-b to close the section cleanly.
        */}
        <div className="mt-[48px] md:mt-[56px] lg:mt-[64px]">

          {/* Row 1 — Construction 45.6% | Manufacturing 54.4% */}
          <div className="flex flex-col sm:flex-row border-b border-[#e2e8f0]">
            <div className="sm:border-r border-[#e2e8f0]" style={{ flex: "45.6 45.6 0%" }}>
              <IndustryCard card={construction} />
            </div>
            <div style={{ flex: "54.4 54.4 0%" }}>
              <IndustryCard card={manufacturing} />
            </div>
          </div>

          {/* Row 2 — Oil Gas 54.5% | Logistics 45.5% */}
          <div className="flex flex-col sm:flex-row border-b border-[#e2e8f0]">
            <div className="sm:border-r border-[#e2e8f0]" style={{ flex: "54.5 54.5 0%" }}>
              <IndustryCard card={oilgas} />
            </div>
            <div style={{ flex: "45.5 45.5 0%" }}>
              <IndustryCard card={logistics} />
            </div>
          </div>

          {/* Row 3 — Utilities 45.6% | Facilities 54.4% */}
          <div className="flex flex-col sm:flex-row border-b border-[#e2e8f0]">
            <div className="sm:border-r border-[#e2e8f0]" style={{ flex: "45.6 45.6 0%" }}>
              <IndustryCard card={utilities} />
            </div>
            <div style={{ flex: "54.4 54.4 0%" }}>
              <IndustryCard card={facilities} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
