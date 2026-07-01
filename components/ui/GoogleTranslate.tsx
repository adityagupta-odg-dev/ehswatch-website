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
const GEO_STORAGE = "ehswatch_geo_checked";

/* ── Context ────────────────────────────────────────────────────────────── */
interface TranslateCtx {
  lang: "en" | "ar";
  isReady: boolean;
  switchLang: (l: "en" | "ar") => void;
}

const TranslateContext = createContext<TranslateCtx>({
  lang: "en",
  isReady: false,
  switchLang: () => {},
});

export function useTranslate() {
  return useContext(TranslateContext);
}

/* ── Helpers ────────────────────────────────────────────────────────────── */
function getCookie(name: string): string | null {
  const m = document.cookie.match(new RegExp("(?:^|;\\s*)" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : null;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname}`;
}

function readGoogleLang(): "en" | "ar" {
  const c = getCookie("googtrans");
  return c && c.endsWith("/ar") ? "ar" : "en";
}

/* Poll until Google Translate's combo <select> appears, then call cb */
function whenReady(cb: () => void, maxMs = 8000) {
  const t0 = Date.now();
  const id = setInterval(() => {
    if (document.querySelector(".goog-te-combo")) {
      clearInterval(id);
      cb();
    } else if (Date.now() - t0 > maxMs) {
      clearInterval(id);
    }
  }, 250);
}

/* Programmatically change Google Translate language */
function applyLang(lang: "en" | "ar") {
  const sel = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (!sel) { setTimeout(() => applyLang(lang), 300); return; }
  sel.value = lang;
  sel.dispatchEvent(new Event("change"));
}

/* Switch to English: clear cookie + reload */
function restoreEnglish() {
  deleteCookie("googtrans");
  window.location.reload();
}

/* ── Provider ───────────────────────────────────────────────────────────── */
export default function GoogleTranslate({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [isReady, setIsReady] = useState(false);
  const [banner, setBanner] = useState<{ country: string } | null>(null);
  const scriptInjected = useRef(false);

  /* Inject Google Translate widget script once */
  useEffect(() => {
    if (scriptInjected.current) return;
    scriptInjected.current = true;

    // 1. Define the init callback Google calls after loading
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

      // 2. Once widget is ready, restore any saved language
      whenReady(() => {
        setIsReady(true);
        const saved = localStorage.getItem(STORAGE_KEY) as "en" | "ar" | null;
        const googleCurrent = readGoogleLang();

        if (saved === "ar" && googleCurrent !== "ar") {
          applyLang("ar");
          setLang("ar");
          document.documentElement.setAttribute("dir", "rtl");
        } else if (googleCurrent === "ar") {
          setLang("ar");
          document.documentElement.setAttribute("dir", "rtl");
        } else {
          setLang("en");
          document.documentElement.removeAttribute("dir");
        }
      });
    };

    // 2. Inject the script
    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  /* IP geolocation — run once per browser, skip if user already chose */
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return; // user has a preference
    if (sessionStorage.getItem(GEO_STORAGE)) return; // already checked this session

    sessionStorage.setItem(GEO_STORAGE, "1");

    fetch("https://ipapi.co/json/", { mode: "cors" })
      .then((r) => r.json())
      .then((data: { country_code?: string }) => {
        const cc = data.country_code ?? "";
        if (ARABIC_COUNTRIES.has(cc)) {
          setBanner({ country: COUNTRY_NAMES[cc] ?? cc });
        }
      })
      .catch(() => {
        // Fallback to ip-api (HTTP only, so only for non-HTTPS, skip silently)
      });
  }, []);

  /* Language switcher exposed to the rest of the app */
  const switchLang = useCallback((target: "en" | "ar") => {
    localStorage.setItem(STORAGE_KEY, target);
    setBanner(null);

    if (target === "ar") {
      if (!isReady) {
        whenReady(() => { applyLang("ar"); });
      } else {
        applyLang("ar");
      }
      setLang("ar");
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      setLang("en");
      document.documentElement.removeAttribute("dir");
      restoreEnglish();
    }
  }, [isReady]);

  return (
    <TranslateContext.Provider value={{ lang, isReady, switchLang }}>
      {/* Hidden mount point for Google widget */}
      <div id="google_translate_element" style={{ display: "none" }} aria-hidden />

      {children}

      {/* ── Location banner ─────────────────────────────────────────── */}
      {banner && (
        <div
          role="dialog"
          aria-live="polite"
          style={{
            position: "fixed",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            background: "#0a0f1e",
            color: "white",
            borderRadius: "16px",
            padding: "16px 20px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
            maxWidth: "calc(100vw - 32px)",
            width: "max-content",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Globe icon */}
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
                background: "#1d4ed8",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "7px 16px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "var(--font-dm-sans, sans-serif)",
                whiteSpace: "nowrap",
              }}
            >
              Switch to Arabic
            </button>
            <button
              onClick={() => {
                localStorage.setItem(STORAGE_KEY, "en");
                setBanner(null);
              }}
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "8px",
                padding: "7px 14px",
                fontSize: "13px",
                cursor: "pointer",
                fontFamily: "var(--font-dm-sans, sans-serif)",
                whiteSpace: "nowrap",
              }}
            >
              Keep English
            </button>
          </div>

          {/* Close */}
          <button
            onClick={() => setBanner(null)}
            aria-label="Dismiss"
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.4)",
              cursor: "pointer",
              padding: "2px",
              lineHeight: 1,
              flexShrink: 0,
            }}
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
