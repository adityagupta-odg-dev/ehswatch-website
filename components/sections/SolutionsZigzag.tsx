"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { basePath } from "@/lib/basePath";

const GIF = basePath + "/images/Solutions_/GIF/";
const VID = basePath + "/images/Solutions_/Videos/";

const INDUSTRIES = [
  {
    label: "Construction & Infrastructure",
    video: VID + "Construction%20%26%20Infrastructure.mp4",
    gif: null,
    solutions: [
      "Log incidents, near misses and observations directly from the field.",
      "Manage permit-to-work and high-risk work authorisations across every site.",
      "Track subcontractor inductions and certifications without paperwork.",
      "Run scheduled safety inspections with structured digital checklists.",
    ],
  },
  {
    label: "Manufacturing & Engineering",
    video: VID + "Manufacturing-%26-Engineering.mp4",
    gif: null,
    solutions: [
      "Automate machine guarding checks and shift-change safety handovers.",
      "Manage COSHH assessments and chemical exposure monitoring in one place.",
      "Run ISO 45001 audit cycles with auto-generated corrective actions.",
      "Track training compliance and competency records across every role.",
    ],
  },
  {
    label: "Oil, Gas & Energy",
    video: VID + "Oil-Gas-Energy.mp4",
    gif: null,
    solutions: [
      "Manage permit-to-work and isolation certificates across multiple rigs.",
      "Conduct risk assessments and MOC reviews with built-in approval workflows.",
      "Track process safety events and near-miss trends on a live dashboard.",
      "Maintain contractor compliance and competency records digitally.",
    ],
  },
  {
    label: "Logistics, Warehousing & Transport",
    video: VID + "Logistics%2C-Warehousing-%26-Transport.mp4",
    gif: null,
    solutions: [
      "Capture vehicle pre-use checks and defect reports from mobile devices.",
      "Manage warehouse hazard observations and unsafe condition reports in real time.",
      "Schedule driver inductions, licence checks and mandatory safety training.",
      "Monitor fatigue, route risk and incident trends across your entire fleet.",
    ],
  },
  {
    label: "Facilities & Property Management",
    video: VID + "Facilities-%26-Property-Management-3.mp4",
    gif: null,
    solutions: [
      "Centralise fire safety and statutory inspection records across all buildings.",
      "Manage contractor permits and RAMS reviews for every vendor.",
      "Track corrective actions from building audits through to verified close-out.",
      "Monitor occupational health risks and workplace wellbeing data.",
    ],
  },
  {
    label: "Utilities & Public Services",
    video: VID + "Utilities-and-Public-Services.mp4",
    gif: null,
    solutions: [
      "Manage high-voltage isolation and confined space entry protocols digitally.",
      "Conduct infrastructure inspections with structured checklists and photo capture.",
      "Track environmental compliance and regulatory obligations in real time.",
      "Coordinate safety actions across distributed field teams from one dashboard.",
    ],
  },
];

const N = INDUSTRIES.length;
const HEADER_H = 0; // no header strip

/* ── Copy panel ── */
function CopyBlock({ industry, active }: { industry: typeof INDUSTRIES[0]; active: boolean }) {
  return (
    <div
      className="flex flex-col justify-start lg:justify-center h-full px-6 sm:px-10 lg:px-20 pt-6 lg:pt-0"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 0.45s ease, transform 0.45s ease",
        pointerEvents: active ? "auto" : "none",
      }}
    >
      <h3
        className="font-[family-name:var(--font-gothic-a1)] font-bold leading-[1.15] mb-7"
        style={{ fontSize: "clamp(17px, 1.6vw, 22px)", color: "#0a0f1e" }}
      >
        {industry.label}
      </h3>

      <div className="flex flex-col">
        {industry.solutions.map((sol, i) => (
          <div
            key={i}
            className="flex items-start gap-3 py-[10px]"
            style={{
              borderBottom: i < industry.solutions.length - 1 ? "1px solid #F0F0F0" : "none",
            }}
          >
            <svg className="flex-shrink-0 mt-[5px]" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="#155eef" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p
              className="font-[family-name:var(--font-dm-sans)] text-[13.5px] leading-[1.65]"
              style={{ color: "#374151", textWrap: "pretty" } as React.CSSProperties}
            >
              {sol}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Media panel (video or gif) ── */
function MediaBlock({ industry, active }: { industry: typeof INDUSTRIES[0]; active: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (active) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [active]);

  return (
    <div
      className="flex items-end lg:items-center justify-center h-full px-6 sm:px-10 lg:px-14 pb-2 lg:pb-0"
      style={{
        opacity: active ? 1 : 0,
        transition: "opacity 0.45s ease",
        pointerEvents: "none",
      }}
    >
      {industry.video ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
          }}
        >
          <source src={industry.video} type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={industry.gif!}
          alt={industry.label}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      )}
    </div>
  );
}

/* ── Progress dots ── */
function ProgressDots({ active }: { active: number }) {
  return (
    <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
      {INDUSTRIES.map((_, i) => (
        <div
          key={i}
          style={{
            width: 4,
            height: i === active ? 22 : 4,
            borderRadius: 99,
            background: i === active ? "#155eef" : "#D1D5DB",
            transition: "height 0.3s ease, background 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

/* ── Main ── */
export default function SolutionsZigzag() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const handleScroll = useCallback(() => {
    const el = outerRef.current;
    if (!el) return;
    const sticky = el.firstElementChild as HTMLElement | null;
    const stickyH = sticky?.offsetHeight ?? window.innerHeight;
    const pinning = Math.max(1, el.offsetHeight - stickyH);
    const stepSize = pinning / N;
    const scrolled = window.scrollY - el.offsetTop;
    if (scrolled < 0) return;
    const idx = Math.min(Math.floor(scrolled / stepSize), N - 1);
    setActive(idx);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div ref={outerRef} className="h-[300vh] lg:h-[700vh]">
      <div className="sticky top-0 overflow-hidden h-screen">

        {/* ── Two-panel area: stacks centered on iPad, side-by-side on desktop ── */}
        <div className="absolute inset-0">
          {INDUSTRIES.map((ind, i) => (
            <div
              key={ind.label}
              className="absolute inset-0 flex flex-col lg:flex-row items-center lg:items-stretch justify-center lg:justify-start gap-4 lg:gap-0"
            >
              {/* Media — natural-height on iPad (centered group), left half on desktop */}
              <div className="relative w-full max-h-[42vh] lg:max-h-none lg:h-full lg:flex-1 lg:border-r lg:border-[#EFEFEF]">
                <MediaBlock industry={ind} active={active === i} />
              </div>
              {/* Copy — natural-height on iPad (centered group), right half on desktop */}
              <div className="relative w-full lg:h-full lg:flex-1">
                <CopyBlock industry={ind} active={active === i} />
              </div>
            </div>
          ))}
        </div>

        {/* Progress dots */}
        <ProgressDots active={active} />
      </div>
    </div>
  );
}
