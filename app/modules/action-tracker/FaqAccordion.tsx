"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "What is EHSWatch Action Tracker?",
    a: "Action Tracker centralises corrective and preventive actions originating from incidents, audits, observations, risk assessments and other modules. Each action has a defined owner, deadline and priority level. Status is tracked in real time, and every change is logged with a full audit trail — so nothing falls through the cracks and accountability is always clear.",
  },
  {
    q: "Can Action Tracker be configured for our specific workflow?",
    a: "Yes. Approval steps, notification rules, form fields, escalation paths and dashboards are all configurable to match your organisation's processes — without any coding or external development resource.",
  },
  {
    q: "Does it integrate with other EHSWatch modules?",
    a: "Yes. Because Action Tracker is built within the EHSWatch platform, actions link directly to the originating record — whether that is an incident, audit, observation or risk assessment. There is no manual data transfer and no duplication across systems.",
  },
  {
    q: "Who typically uses Action Tracker?",
    a: "Action Tracker is used by EHS Managers, Quality Managers, Operations Supervisors and Compliance Officers who need structured, visible follow-through on safety and quality findings. It is equally valuable for front-line supervisors managing field actions and for HSE Directors monitoring close-out performance across multiple sites.",
  },
  {
    q: "How does it support compliance and audit requirements?",
    a: "Action Tracker maintains a complete audit trail of every action — owner history, status changes, comments, attachments and closure evidence — all timestamped and user-attributed. This record is exportable for regulatory inspections, ISO 45001 audits and internal compliance reviews.",
  },
  {
    q: "Is Action Tracker accessible on mobile devices?",
    a: "Yes. The full module is accessible on smartphones and tablets, with offline capability for field teams in remote or low-connectivity environments. Data syncs automatically when connectivity is restored.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col divide-y divide-[#e5eaf2]">
      {FAQS.map((faq, i) => (
        <div key={i} className="py-5">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 text-left"
          >
            <span className="font-[family-name:var(--font-gothic-a1)] font-semibold text-[15px] sm:text-[16px] text-[#0a0f1e]">
              {faq.q}
            </span>
            <div
              className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center transition-colors duration-200"
              style={{ background: "#e5eaf2" }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                style={{
                  transform: open === i ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s ease",
                }}
              >
                <path
                  d="M2 4l4 4 4-4"
                  stroke="#374151"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
          {open === i && (
            <p className="mt-3 font-[family-name:var(--font-dm-sans)] text-[14px] sm:text-[15px] leading-[1.75] text-[#4b5563]">
              {faq.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
