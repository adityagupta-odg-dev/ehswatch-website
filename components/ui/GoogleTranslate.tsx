"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

/* ── Arabic-speaking country codes ─────────────────────────────────────── */
const ARABIC_COUNTRIES = new Set([
  "SA", "AE", "EG", "QA", "KW", "BH", "OM", "JO", "LB", "SY",
  "IQ", "YE", "LY", "TN", "MA", "DZ", "SD", "MR", "PS", "SO", "DJ",
]);

const COUNTRY_NAMES: Record<string, string> = {
  SA: "Saudi Arabia", AE: "UAE", EG: "Egypt", QA: "Qatar",
  KW: "Kuwait", BH: "Bahrain", OM: "Oman", JO: "Jordan",
  LB: "Lebanon", SY: "Syria", IQ: "Iraq", YE: "Yemen",
  LY: "Libya", TN: "Tunisia", MA: "Morocco", DZ: "Algeria",
  SD: "Sudan", MR: "Mauritania", PS: "Palestine",
};

const STORAGE_KEY = "ehswatch_lang";
const GEO_STORAGE  = "ehswatch_geo_checked";

/* ── Context ────────────────────────────────────────────────────────────── */
interface TranslateCtx {
  lang: "en" | "ar";
  switchLang: (l: "en" | "ar") => void;
}

const TranslateContext = createContext<TranslateCtx>({
  lang: "en",
  switchLang: () => {},
});

export function useTranslate() {
  return useContext(TranslateContext);
}

/* ── Cookie helpers ─────────────────────────────────────────────────────── */
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp("(?:^|;\\s*)" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : null;
}

function setGoogTransCookie(lang: "en" | "ar") {
  const val = `googtrans=/en/${lang}`;
  const exp = lang === "en" ? "; expires=Thu, 01 Jan 1970 00:00:00 GMT" : "";
  const hosts = ["", window.location.hostname, `.${window.location.hostname}`];
  hosts.forEach((d) => {
    document.cookie = `${val}${exp}; path=/${d ? `; domain=${d}` : ""}`;
  });
}

function readGoogLang(): "en" | "ar" {
  const c = getCookie("googtrans");
  return c && c.endsWith("/ar") ? "ar" : "en";
}

/* ── Provider ───────────────────────────────────────────────────────────── */
export default function GoogleTranslate({ children }: { children: React.ReactNode }) {
  /* Derive initial lang from cookie (synced before first paint via suppressHydrationWarning) */
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [banner, setBanner] = useState<{ country: string } | null>(null);
  const scriptInjected = useRef(false);

  /* On mount: sync lang state + dir attribute from googtrans cookie */
  useEffect(() => {
    const current = readGoogLang();
    setLang(current);
    if (current === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.removeAttribute("dir");
    }
  }, []);

  /* Inject Google Translate widget — it reads the googtrans cookie automatically
     and translates the page on load when the cookie is set to /en/ar           */
  useEffect(() => {
    if (scriptInjected.current) return;
    scriptInjected.current = true;

    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "ar",
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.head.appendChild(script);

    /* Prevent Google from pushing body down to make room for its toolbar */
    const obs = new MutationObserver(() => {
      const b = document.body;
      if (b.style.top       && b.style.top       !== "0px") b.style.top       = "";
      if (b.style.marginTop && b.style.marginTop !== "0px") b.style.marginTop = "";
    });
    obs.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    return () => obs.disconnect();
  }, []);

  /* IP geolocation — show banner once per browser session for Arabic countries */
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    if (sessionStorage.getItem(GEO_STORAGE))  return;
    sessionStorage.setItem(GEO_STORAGE, "1");

    fetch("https://ipapi.co/json/", { mode: "cors" })
      .then((r) => r.json())
      .then((data: { country_code?: string }) => {
        const cc = data.country_code ?? "";
        if (ARABIC_COUNTRIES.has(cc)) setBanner({ country: COUNTRY_NAMES[cc] ?? cc });
      })
      .catch(() => {});
  }, []);

  /* Language switch: set googtrans cookie then reload so Google translates on load */
  const switchLang = useCallback((target: "en" | "ar") => {
    localStorage.setItem(STORAGE_KEY, target);
    setBanner(null);
    setGoogTransCookie(target);
    if (target === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.removeAttribute("dir");
    }
    window.location.reload();
  }, []);

  return (
    <TranslateContext.Provider value={{ lang, switchLang }}>
      {/* Widget mount — must exist in DOM (not display:none) for Google to inject into */}
      <div
        id="google_translate_element"
        aria-hidden
        style={{ position: "fixed", bottom: 0, left: 0, width: "1px", height: "1px", overflow: "hidden", opacity: 0, pointerEvents: "none" }}
      />

      {children}

      {/* ── Location banner ─────────────────────────────────────────────── */}
      {banner && (
        <div
          role="dialog"
          aria-live="polite"
          style={{
            position: "fixed", bottom: "24px", left: "50%",
            transform: "translateX(-50%)", zIndex: 9999,
            background: "#0a0f1e", color: "white",
            borderRadius: "16px", padding: "16px 20px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
            display: "flex", alignItems: "center", gap: "16px",
            flexWrap: "wrap", maxWidth: "calc(100vw - 32px)",
            width: "max-content", border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" stroke="#60a5fa" strokeWidth="1.5" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10A15.3 15.3 0 0 1 8 12a15.3 15.3 0 0 1 4-10z" stroke="#60a5fa" strokeWidth="1.5" />
          </svg>

          <span style={{ fontFamily: "var(--font-dm-sans, sans-serif)", fontSize: "14px", color: "rgba(255,255,255,0.85)" }}>
            We noticed you&apos;re browsing from <strong style={{ color: "white" }}>{banner.country}</strong>. View this site in Arabic?
          </span>

          <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
            <button
              onClick={() => switchLang("ar")}
              style={{
                background: "#1d4ed8", color: "white", border: "none",
                borderRadius: "8px", padding: "7px 16px",
                fontSize: "13px", fontWeight: 600, cursor: "pointer",
                fontFamily: "var(--font-dm-sans, sans-serif)", whiteSpace: "nowrap",
              }}
            >
              Switch to Arabic
            </button>
            <button
              onClick={() => { localStorage.setItem(STORAGE_KEY, "en"); setBanner(null); }}
              style={{
                background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px",
                padding: "7px 14px", fontSize: "13px", cursor: "pointer",
                fontFamily: "var(--font-dm-sans, sans-serif)", whiteSpace: "nowrap",
              }}
            >
              Keep English
            </button>
          </div>

          <button
            onClick={() => setBanner(null)}
            aria-label="Dismiss"
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", padding: "2px", lineHeight: 1, flexShrink: 0 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </TranslateContext.Provider>
  );
}
