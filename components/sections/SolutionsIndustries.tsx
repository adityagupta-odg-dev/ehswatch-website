"use client";

import React, { useState, useEffect, useRef } from "react";
import { basePath } from "@/lib/basePath";

const VID = basePath + "/images/Solutions_/Videos/";

/* ── keyframes ── */
const STYLES = `
@keyframes sol-bar-grow {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
@keyframes sol-fade-up {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
`;

const INDUSTRIES = [
  {
    key: "construction",
    number: "1.",
    label: "Construction & Infrastructure",
    video: VID + "construction-infrastructure.mp4",
    solutions: [
      "Real‑time hazard and near‑miss reporting from the field",
      "Digital checklists and inspection templates for each site",
      "Digital site induction workflows with sign-off confirmation and real-time completion tracking",
    ],
  },
  {
    key: "manufacturing",
    number: "2.",
    label: "Manufacturing & Engineering",
    video: VID + "manufacturing-engineering.mp4",
    solutions: [
      "Scheduled audits and equipment‑specific inspection checklists",
      "Digital LOTO and maintenance work‑order workflows",
      "Centralised training and competency tracking for all plant staff",
    ],
  },
  {
    key: "oil-gas",
    number: "3.",
    label: "Oil, Gas & Energy",
    video: VID + "oil-gas-energy.mp4",
    solutions: [
      "Digitised permit‑to‑work workflows with clear approvals",
      "Incident reporting and investigation tracking with closure workflows",
      "Risk assessments linked directly to active permits so high-risk tasks cannot proceed without documented controls",
    ],
  },
  {
    key: "logistics",
    number: "4.",
    label: "Logistics, Warehousing & Transport",
    video: VID + "logistics-warehousing-transport.mp4",
    solutions: [
      "Digital incident and near‑miss reporting for fleet and warehouse teams",
      "Inspection checklists for vehicles, forklifts, and racking systems",
      "Driver‑safety and training‑record tracking from a single view",
    ],
  },
  {
    key: "facilities",
    number: "5.",
    label: "Facilities & Property Management",
    video: VID + "facilities-property-management.mp4",
    solutions: [
      "Vendor safety questionnaires and onboarding within the system",
      "Digital fire‑safety and building‑inspection checklists",
      "Centralised maintenance and CAPA tracking for recurring issues",
    ],
  },
  {
    key: "utilities",
    number: "6.",
    label: "Utilities & Public Services",
    video: VID + "utilities-and-public-services.mp4",
    solutions: [
      "Mobile‑first incident and near‑miss reporting for field teams",
      "Digital checklists for outage‑management and safety‑permit workflows",
      "Centralised compliance and audit trail for regulatory bodies",
    ],
  },
];

const TAB_DURATION = 4000;
const N = INDUSTRIES.length;

export default function SolutionsIndustries() {
  const [active,      setActive]      = useState(0);
  const [cycleKey,    setCycleKey]    = useState(0);
  const [inView,      setInView]      = useState(false);
  const [stylesReady, setStylesReady] = useState(false);
  const [visible,     setVisible]     = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const prevActive = useRef(0);

  /* Inject keyframes */
  useEffect(() => {
    const id = "sol-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id; el.textContent = STYLES;
      document.head.appendChild(el);
    }
    setStylesReady(true);
  }, []);

  /* IntersectionObserver — start auto-advance when section enters view */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(0);
          setCycleKey((k) => k + 1);
          setInView(true);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.10 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Crossfade content on tab change */
  useEffect(() => {
    if (active === prevActive.current) return;
    prevActive.current = active;
    setVisible(false);
    setTimeout(() => setVisible(true), 200);
  }, [active]);

  const ind = INDUSTRIES[active];

  return (
    <section
      ref={sectionRef}
      id="industries"
      className="bg-white py-12 md:py-20 px-4 md:px-6"
    >
      <div className="max-w-[1160px] mx-auto">

        {/* ── Heading ── */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-[family-name:var(--font-gothic-a1)] font-bold text-[26px] sm:text-[32px] md:text-[38px] leading-[1.15] text-[#0f1728]">
            Built for <span className="text-[#155eef]">Your Industry</span>
          </h2>
          <p className="mt-2 font-[family-name:var(--font-dm-sans)] text-[15px] md:text-[16px] text-[#64748b] leading-[1.7] max-w-[600px] mx-auto">
            EHSWatch adapts to the compliance requirements, workflows and hazard profiles of your sector — not retrofitted from a generic template.
          </p>
        </div>

        {/* ── Card ── */}
        <div className="border border-[#cbcbcb] rounded-[8px] overflow-hidden bg-white">

          {/* Tab bar */}
          <div
            role="tablist"
            aria-label="Industries"
            className="flex border-b border-[#dde2eb] overflow-x-auto scrollbar-none"
          >
            {INDUSTRIES.map((tab, i) => (
              <button
                key={tab.key}
                role="tab"
                aria-selected={active === i}
                tabIndex={active === i ? 0 : -1}
                onClick={() => { setActive(i); setCycleKey((k) => k + 1); }}
                className={[
                  "flex-1 flex flex-col items-center justify-center px-2 md:px-3 py-[14px] md:py-[17px] min-h-[56px] md:min-h-[72px]",
                  "text-[10px] sm:text-[11px] md:text-[13px] font-medium cursor-pointer",
                  "transition-colors min-w-0 relative overflow-hidden",
                  i < N - 1 ? "border-r border-r-[#dde2eb]" : "",
                  active === i ? "text-[#0a0f1e]" : "text-[#888] hover:text-[#555]",
                ].join(" ")}
              >
                <span className="text-center leading-snug px-1">
                  <span
                    className={`font-[family-name:var(--font-dm-sans)] ${
                      active === i ? "text-[#0a0f1e]" : "text-[#999]"
                    }`}
                  >
                    {tab.number}
                  </span>
                  {" "}{tab.label}
                </span>

                {/* Orange auto-advance progress bar */}
                {inView && active === i && stylesReady && (
                  <span
                    key={`bar-${cycleKey}-${i}`}
                    className="absolute bottom-0 left-0 h-[2.5px] w-full bg-[#f97316]"
                    style={{
                      transform: "scaleX(0)",
                      transformOrigin: "left center",
                      animation: `sol-bar-grow ${TAB_DURATION}ms linear forwards`,
                    }}
                    onAnimationEnd={() => {
                      setActive((p) => (p + 1) % N);
                      setCycleKey((k) => k + 1);
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div className="flex flex-col md:flex-row items-center min-h-[440px] md:min-h-[500px] px-8 md:px-12 py-8 md:py-12 gap-8 md:gap-12">

            {/* Left — GIF */}
            <div
              className="flex-none md:flex-[0_0_54%] flex items-center justify-center"
              style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 0.25s ease",
              }}
            >
              {ind.video.endsWith(".mp4") ? (
                <video
                  key={ind.video}
                  src={ind.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto rounded-[8px]"
                  style={{ maxHeight: "500px", objectFit: "contain", display: "block" }}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={ind.video}
                  src={ind.video}
                  alt={ind.label}
                  className="w-full h-auto rounded-[8px]"
                  style={{ maxHeight: "500px", objectFit: "contain", display: "block" }}
                />
              )}
            </div>

            {/* Right — heading + solution bullets */}
            <div
              className="flex-1 flex flex-col justify-center text-left"
              style={{
                opacity:   visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.28s ease, transform 0.28s ease",
              }}
            >
              <h3
                className="font-[family-name:var(--font-gothic-a1)] font-bold text-[#0f1728] leading-snug mb-7"
                style={{ fontSize: "clamp(17px, 1.8vw, 24px)" }}
              >
                {ind.label}
              </h3>

              <div className="flex flex-col gap-5">
                {ind.solutions.map((sol, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-[8px] w-[4px] h-[4px] rounded-full bg-[#155eef]" />
                    <p
                      className="font-[family-name:var(--font-dm-sans)] text-[13px] leading-[1.75] text-[#374151]"
                      style={{ textWrap: "pretty" } as React.CSSProperties}
                    >
                      {sol}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
