"use client";

import { basePath } from "@/lib/basePath";

const panel = (file: string) =>
  `${basePath}/images/work-environments/panels/${file}`;

interface Card {
  key: string;
  title: string;
  desc: string;
  tx: number;   /* text left % */
  ty: number;   /* text top  % */
  tw: number;   /* text maxWidth % */
  iw: number;   /* image width % */
  il: number;   /* image left % */
  idx?: number; /* image left px offset (construction only) */
  noFade?: boolean;
  imgSrc: string;
}

interface SolutionCarouselCard {
  title: string;
  subheading?: string;
  description?: string;
}

interface WorkEnvironmentsProps {
  cmsHeading?: string;
  cmsSubheading?: string;
  cmsCards?: SolutionCarouselCard[];
}

const HARDCODED_CARDS: Card[] = [
  {
    key: "construction",
    title: "Construction & Infrastructure Projects",
    desc: "Track hazards and compliance across multiple job sites instantly.",
    tx: 4.8, ty: 6, tw: 50, iw: 93.4, il: 10.1, idx: -5, noFade: true,
    imgSrc: panel("Construction%20%26%20Infrastructure%20Projects.png"),
  },
  {
    key: "manufacturing",
    title: "Manufacturing & Engineering",
    desc: "Centralise plant audits, equipment safety and worker training logs.",
    tx: 7.7, ty: 5.3, tw: 50, iw: 89.5, il: 13.1, noFade: true,
    imgSrc: panel("Manufacturing%20%26%20Engineering.png"),
  },
  {
    key: "oilgas",
    title: "Oil, Gas & Energy",
    desc: "Permit-to-work, incident reporting and risk control in one place.",
    tx: 3.2, ty: 13.4, tw: 49, iw: 90.1, il: 9.9,
    imgSrc: panel("Oil%2C%20Gas%20%26%20Energy.png"),
  },
  {
    key: "logistics",
    title: "Logistics, Warehousing & Transport",
    desc: "Track vehicle incidents, warehouse safety and driver compliance.",
    tx: 7.3, ty: 13.4, tw: 67, iw: 92.2, il: 7.3,
    imgSrc: panel("Logistics%2C%20Warehousing%20%26%20Transport.png"),
  },
  {
    key: "utilities",
    title: "Utilities and Public Services",
    desc: "Ensure field worker safety, outage reporting and regulatory compliance.",
    tx: 1.3, ty: 10, tw: 59, iw: 75.3, il: 11.8, noFade: true,
    imgSrc: panel("Utilities%20and%20Public%20Services.png"),
  },
  {
    key: "facilities",
    title: "Facilities & Property Management",
    desc: "Manage vendor safety, fire inspections and building maintenance risks.",
    tx: 4.8, ty: 11.3, tw: 58, iw: 91, il: 2.7,
    imgSrc: panel("Facilities%20%26%20Property%20Management.png"),
  },
];

// Layout metadata for up to 6 cards (positional display config)
const CARD_LAYOUT: Omit<Card, "title" | "desc" | "imgSrc">[] = [
  { key: "construction", tx: 4.8, ty: 6,    tw: 50, iw: 93.4, il: 10.1, idx: -5, noFade: true },
  { key: "manufacturing",tx: 7.7, ty: 5.3,  tw: 50, iw: 89.5, il: 13.1, noFade: true },
  { key: "oilgas",       tx: 3.2, ty: 13.4, tw: 49, iw: 90.1, il: 9.9  },
  { key: "logistics",    tx: 7.3, ty: 13.4, tw: 67, iw: 92.2, il: 7.3  },
  { key: "utilities",    tx: 1.3, ty: 10,   tw: 59, iw: 75.3, il: 11.8, noFade: true },
  { key: "facilities",   tx: 4.8, ty: 11.3, tw: 58, iw: 91,   il: 2.7  },
];

// Map title keywords to panel image filenames
function inferPanelImage(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("construct")) return panel("Construction%20%26%20Infrastructure%20Projects.png");
  if (t.includes("manufactur") || t.includes("engineer")) return panel("Manufacturing%20%26%20Engineering.png");
  if (t.includes("oil") || t.includes("gas") || t.includes("energy")) return panel("Oil%2C%20Gas%20%26%20Energy.png");
  if (t.includes("logistic") || t.includes("warehouse") || t.includes("transport")) return panel("Logistics%2C%20Warehousing%20%26%20Transport.png");
  if (t.includes("utilit") || t.includes("public")) return panel("Utilities%20and%20Public%20Services.png");
  if (t.includes("facilit") || t.includes("property")) return panel("Facilities%20%26%20Property%20Management.png");
  return panel("Construction%20%26%20Infrastructure%20Projects.png");
}

function buildCards(cmsCards?: SolutionCarouselCard[]): Card[] {
  if (!cmsCards || cmsCards.length === 0) return HARDCODED_CARDS;
  return cmsCards.slice(0, 6).map((c, i) => {
    const layout = CARD_LAYOUT[i] || CARD_LAYOUT[0];
    const hardcoded = HARDCODED_CARDS[i];
    return {
      ...layout,
      title: c.title || hardcoded.title,
      desc:  c.subheading || hardcoded.desc,
      imgSrc: inferPanelImage(c.title || hardcoded.title),
    };
  });
}

function IndustryCard({ card }: { card: Card }) {
  return (
    <div className="relative h-full min-h-[340px] sm:min-h-0 overflow-hidden bg-[#f8fbff]">
      {/* Text block — percentage-positioned */}
      <div
        className="absolute z-10 flex flex-col gap-[4px]"
        style={{ top: `${card.ty}%`, left: `${card.tx}%`, maxWidth: `${card.tw}%` }}
      >
        <h3 className="font-[family-name:var(--font-gothic-a1)] font-semibold text-[15px] md:text-[17px] lg:text-[20px] text-[#1b1b1b] leading-[1.3] text-balance">
          {card.title}
        </h3>
        <p
          className="font-[family-name:var(--font-dm-sans)] font-normal text-[11px] md:text-[12px] lg:text-[14px] text-[#727272] tracking-[-0.18px] leading-[1.5] text-pretty"
          style={{ fontVariationSettings: "'opsz' 14" }}
        >
          {card.desc}
        </p>
      </div>

      {/* Top gradient fade — hides image behind text (skipped on noFade cards) */}
      {!card.noFade && (
        <div
          className="absolute inset-x-0 top-0 z-[5] pointer-events-none"
          style={{ height: "48%", background: "linear-gradient(to bottom, #f8fbff 42%, rgba(248,251,255,0))" }}
          aria-hidden
        />
      )}

      {/* Panel image — pinned to bottom, percentage width and left */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.imgSrc}
        alt=""
        draggable={false}
        style={{
          position: "absolute",
          bottom: 0,
          left: card.idx != null ? `calc(${card.il}% + ${card.idx}px)` : `${card.il}%`,
          width: `${card.iw}%`,
          height: "auto",
          display: "block",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export default function WorkEnvironments({ cmsHeading, cmsSubheading, cmsCards }: WorkEnvironmentsProps) {
  const cards = buildCards(cmsCards);
  const [construction, manufacturing, oilgas, logistics, utilities, facilities] = cards;

  const heading    = cmsHeading    || "Built for High‑Risk, High‑Activity Work Environments";
  const subheading = cmsSubheading || "EHSWatch brings all your EHSQ activities into a single, easy‑to‑use platform so everyone, from workers in the field to leadership, works from the same, up‑to‑date information.";

  // Split heading to apply blue highlight to last two words
  const headingWords = heading.split(" ");
  const highlightCount = 2;
  const headingMain  = headingWords.slice(0, -highlightCount).join(" ");
  const headingBlue  = headingWords.slice(-highlightCount).join(" ");

  return (
    <section className="bg-[#f8fbff] pt-[60px] md:pt-[80px] lg:pt-[106px] pb-[60px] md:pb-[80px]">
      <div className="max-w-[1180px] mx-auto px-4 md:px-6">

        <div className="text-center max-w-[820px] mx-auto">
          <h2 className="font-[family-name:var(--font-gothic-a1)] font-bold text-[26px] sm:text-[34px] md:text-[40px] lg:text-[44px] leading-[1.18] text-[#1b1b1b] text-balance">
            {headingMain}{" "}
            <span className="text-[#155eef]">{headingBlue}</span>
          </h2>
          <p
            className="mt-[16px] font-[family-name:var(--font-dm-sans)] font-medium text-[13px] md:text-[15px] lg:text-[16px] text-[#727272] leading-[1.64] tracking-[-0.18px] max-w-[640px] mx-auto text-pretty"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            {subheading}
          </p>
        </div>

        {/* Grid — border-t closes top, each row has border-b */}
        <div className="mt-[44px] md:mt-[56px] lg:mt-[68px] border-t border-[#e2e8f0]">

          {/* Row 1: Construction (603) | Manufacturing (665) */}
          <div className="flex flex-col sm:flex-row border-b border-[#e2e8f0]">
            <div className="sm:border-r border-[#e2e8f0] sm:[aspect-ratio:603/470]" style={{ flex: "603 603 0%" }}>
              {construction && <IndustryCard card={construction} />}
            </div>
            <div className="sm:[aspect-ratio:665/470]" style={{ flex: "665 665 0%" }}>
              {manufacturing && <IndustryCard card={manufacturing} />}
            </div>
          </div>

          {/* Row 2: Oil Gas (665) | Logistics (603) */}
          <div className="flex flex-col sm:flex-row border-b border-[#e2e8f0]">
            <div className="sm:border-r border-[#e2e8f0] sm:[aspect-ratio:665/470]" style={{ flex: "665 665 0%" }}>
              {oilgas && <IndustryCard card={oilgas} />}
            </div>
            <div className="sm:[aspect-ratio:603/470]" style={{ flex: "603 603 0%" }}>
              {logistics && <IndustryCard card={logistics} />}
            </div>
          </div>

          {/* Row 3: Utilities (603) | Facilities (665) */}
          <div className="flex flex-col sm:flex-row border-b border-[#e2e8f0]">
            <div className="sm:border-r border-[#e2e8f0] sm:[aspect-ratio:603/470]" style={{ flex: "603 603 0%" }}>
              {utilities && <IndustryCard card={utilities} />}
            </div>
            <div className="sm:[aspect-ratio:665/470]" style={{ flex: "665 665 0%" }}>
              {facilities && <IndustryCard card={facilities} />}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
