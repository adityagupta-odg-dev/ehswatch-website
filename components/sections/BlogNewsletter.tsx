"use client";

import { useState } from "react";

export default function BlogNewsletter() {
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="py-[72px] px-6 md:px-8" style={{ background: "#F8FBFF" }}>
      <style>{`.nl-input::placeholder { color: rgba(255,255,255,0.65); }`}</style>

      <div
        className="max-w-[1160px] mx-auto rounded-2xl px-10 md:px-20 py-14 md:py-20 flex flex-col items-center text-center"
        style={{ background: "linear-gradient(135deg, #5BA8FF 0%, #0060F9 55%, #0040C0 100%)" }}
      >
        {submitted ? (
          /* ── Success state ── */
          <div className="flex flex-col items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "rgba(91,110,245,0.2)" }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M5 11l4.5 4.5L17 7" stroke="#5B6EF5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="font-[family-name:var(--font-gothic-a1)] font-bold text-[22px]" style={{ color: "#FFFFFF" }}>
              You&apos;re subscribed!
            </p>
            <p className="font-[family-name:var(--font-dm-sans)] text-[14px]" style={{ color: "#9AA3C7" }}>
              Check your inbox for a confirmation.
            </p>
          </div>
        ) : (
          <>
            {/* Headline */}
            <h2
              className="font-[family-name:var(--font-gothic-a1)] font-bold text-[26px] sm:text-[30px] md:text-[34px] leading-[1.2] mb-10 max-w-[600px]"
              style={{ color: "#FFFFFF" }}
            >
              Get the latest EHSQ insights, product updates, and regulatory signals.
            </h2>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-3"
              style={{ maxWidth: 520 }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="nl-input w-full font-[family-name:var(--font-dm-sans)] text-[15px] rounded-full px-6 focus:outline-none focus:ring-2 focus:ring-[#5B6EF5]"
                style={{
                  height: 52,
                  background: "rgba(255,255,255,0.25)",
                  border: "1px solid rgba(255,255,255,0.45)",
                  color: "#FFFFFF",
                }}
              />
              <button
                type="submit"
                className="w-full font-[family-name:var(--font-dm-sans)] font-semibold text-[15px] rounded-full transition-all duration-200"
                style={{ height: 52, background: "#FFFFFF", color: "#0060F9" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#EEF4FF"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#FFFFFF"; }}
              >
                Subscribe
              </button>

              <p className="font-[family-name:var(--font-dm-sans)] text-[12px] mt-1" style={{ color: "rgba(255,255,255,0.75)" }}>
                Read more about how we protect your data.{" "}
                <a href="#" className="font-semibold underline" style={{ color: "#FFFFFF" }}>
                  Learn More
                </a>
              </p>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
