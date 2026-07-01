import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/sections/CTABanner";
import PricingFAQ from "@/components/sections/PricingFAQ";
import { getProductModule } from "@/lib/api";
import { findBlock, findBlocks } from "@/lib/blocks";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const pageData = await getProductModule(slug).catch(() => null);
  const attrs = pageData?.data?.attributes ?? ({} as any);
  const blocks: any[] = attrs.content ?? [];
  const hero = findBlock<{ headline?: string; subheadline?: string }>(blocks, "hero");
  return {
    title: attrs.meta?.meta_title || (hero?.headline ? `${hero.headline} — EHSWatch` : attrs.name ? `${attrs.name} — EHSWatch` : "EHSWatch"),
    description: attrs.meta?.meta_description || hero?.subheadline || attrs.tagline || "",
  };
}

/* ── Lucide-style icon renderer (subset covering CMS icon slugs) ── */
function ModuleIcon({ name, size = 22 }: { name: string; size?: number }) {
  const s = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "#1d4ed8", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<string, React.ReactNode> = {
    "user-check":    <><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></>,
    "gauge-circle":  <><path d="M15.6 2.7a10 10 0 1 0 5.7 5.7"/><circle cx="12" cy="12" r="2"/><path d="M13.4 10.6 19 5"/></>,
    "bell-ring":     <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/><path d="M4 2C2.8 3.7 2 5.7 2 8"/><path d="M22 8c0-2.3-.8-4.3-2-6"/></>,
    "workflow":      <><rect x="3" y="3" width="5" height="5" rx="1"/><rect x="3" y="16" width="5" height="5" rx="1"/><rect x="16" y="9" width="5" height="5" rx="1"/><path d="M8 5.5h5a2 2 0 012 2V9"/><path d="M8 18.5h5a2 2 0 002-2V14"/></>,
    "smartphone":    <><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></>,
    "link-2":        <><path d="M9 17H7A5 5 0 017 7h2"/><path d="M15 7h2a5 5 0 010 10h-2"/><line x1="8" y1="12" x2="16" y2="12"/></>,
    "rocket":        <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></>,
    "users":         <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
    "trending-up":   <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    "shield-check":  <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></>,
    "clipboard-list":<><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><line x1="12" y1="11" x2="16" y2="11"/><line x1="12" y1="15" x2="16" y2="15"/><polyline points="8 11 9 12 11 10"/><polyline points="8 15 9 16 11 14"/></>,
    "activity":      <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
    "layers":        <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
    "zap":           <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    "check-circle":  <><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></>,
    "bar-chart":     <><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></>,
    "settings":      <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
  };
  const children = paths[name] ?? <circle cx="12" cy="12" r="9" />;
  return <svg {...s}>{children}</svg>;
}

/* ── Icon Features section (icon_features block type) ── */
function IconFeaturesSection({ heading, subheading, items }: {
  heading?: string;
  subheading?: string;
  items: { icon?: string; title?: string; description?: string }[];
}) {
  return (
    <section className="py-[60px] md:py-[80px] px-6 bg-white">
      <div className="max-w-[1180px] mx-auto">
        {(heading || subheading) && (
          <div className="text-center mb-12">
            {heading && (
              <h2
                className="font-[family-name:var(--font-gothic-a1)] font-bold text-[26px] sm:text-[32px] md:text-[38px] leading-tight tracking-[-0.02em] text-[#0a0f1e] mb-3"
                dangerouslySetInnerHTML={{ __html: heading.replace(/<span\b[^>]*>/gi, '<span style="color:#1d4ed8">') }}
              />
            )}
            {subheading && (
              <p className="font-[family-name:var(--font-dm-sans)] text-[15px] md:text-[17px] leading-[1.8] text-[#6b7280] max-w-[560px] mx-auto">
                {subheading}
              </p>
            )}
          </div>
        )}
        <div className={`grid gap-6 ${items.length <= 4 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
          {items.map((item, i) => (
            <div key={i} className="flex flex-col gap-3 p-6 rounded-2xl border border-[#e8eef8] bg-[#f8faff]">
              {item.icon && (
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#eef4ff" }}>
                  <ModuleIcon name={item.icon} />
                </div>
              )}
              {item.title && (
                <p className="font-[family-name:var(--font-gothic-a1)] font-bold text-[15px] text-[#0a0f1e]">
                  {item.title}
                </p>
              )}
              {item.description && (
                <p className="font-[family-name:var(--font-dm-sans)] text-[13.5px] leading-[1.75] text-[#6b7280]">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Rich text section (rich_text block type) ── */
function RichTextSection({ heading, body }: { heading?: string; body?: string }) {
  if (!heading && !body) return null;
  return (
    <section className="py-[60px] md:py-[80px] px-6 bg-[#f8fafc]">
      <div className="max-w-[860px] mx-auto">
        {heading && (
          <h2
            className="font-[family-name:var(--font-gothic-a1)] font-bold text-[24px] sm:text-[30px] md:text-[36px] leading-tight tracking-[-0.02em] text-[#0a0f1e] mb-8"
            dangerouslySetInnerHTML={{ __html: heading.replace(/<span\b[^>]*>/gi, '<span style="color:#1d4ed8">') }}
          />
        )}
        {body && (
          <div
            className="font-[family-name:var(--font-dm-sans)] text-[15px] md:text-[16px] leading-[1.85] text-[#4b5563] [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:pb-1 [&_p+p]:mt-4"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        )}
      </div>
    </section>
  );
}

/* ── Image + Text section ── */
function ImageTextSection({ heading, body, imageUrl, side = "right" }: {
  heading?: string;
  body?: string;
  imageUrl?: string;
  side?: "left" | "right";
}) {
  return (
    <section className="py-[60px] md:py-[80px] px-6 bg-[#f8fafc]">
      <div className={`max-w-[1180px] mx-auto flex flex-col ${side === "right" ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-20`}>
        <div className="flex-1">
          {heading && (
            <h2
              className="font-[family-name:var(--font-gothic-a1)] font-bold text-[24px] sm:text-[30px] md:text-[36px] leading-tight tracking-[-0.02em] text-[#0a0f1e] mb-5"
              dangerouslySetInnerHTML={{ __html: heading.replace(/<span\b[^>]*>/gi, '<span style="color:#1d4ed8">') }}
            />
          )}
          {body && (
            <div
              className="font-[family-name:var(--font-dm-sans)] text-[15px] md:text-[16px] leading-[1.85] text-[#4b5563] [&_p+p]:mt-4"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          )}
        </div>
        {imageUrl && (
          <div className="flex-1 w-full max-w-[520px] lg:max-w-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt={heading || ""} className="w-full rounded-2xl object-cover shadow-lg" />
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Hero section ── */
function ModuleHero({ eyebrow, headline, subheadline, primaryCta, secondaryCta }: {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  primaryCta?: { label?: string; url?: string };
  secondaryCta?: { label?: string; url?: string };
}) {
  return (
    <section className="relative overflow-hidden flex items-center justify-center px-6 pt-[148px] pb-[60px] bg-white">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 70% at 50% 40%, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.5) 60%, transparent 100%)" }} />
      <div className="relative z-10 max-w-[720px] w-full mx-auto text-center flex flex-col items-center gap-4">
        {eyebrow && (
          <span className="font-[family-name:var(--font-dm-sans)] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1d4ed8]">
            {eyebrow}
          </span>
        )}
        {headline && (
          <h1
            className="font-[family-name:var(--font-gothic-a1)] font-bold text-[36px] sm:text-[48px] md:text-[58px] leading-[1.08] tracking-[-0.03em] text-[#0a0f1e]"
            dangerouslySetInnerHTML={{ __html: headline.replace(/<span\b[^>]*>/gi, '<span style="color:#1d4ed8">') }}
          />
        )}
        {subheadline && (
          <p className="font-[family-name:var(--font-dm-sans)] text-[15px] sm:text-[17px] leading-[1.8] text-[#6b7280] max-w-[560px] text-pretty">
            {subheadline}
          </p>
        )}
        {(primaryCta?.label || secondaryCta?.label) && (
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            {primaryCta?.label && (
              <a
                href={primaryCta.url || "#"}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-[family-name:var(--font-dm-sans)] font-semibold text-[14px] text-white"
                style={{ background: "linear-gradient(102.8deg, #ffa964 0.12%, #ff6d00 119.92%)" }}
              >
                {primaryCta.label}
              </a>
            )}
            {secondaryCta?.label && (
              <a
                href={secondaryCta.url || "#"}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-[family-name:var(--font-dm-sans)] font-medium text-[14px] text-[#0a0f1e] border border-[#e2e8f0] hover:border-[#1d4ed8] transition-colors"
              >
                {secondaryCta.label}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Page ── */
export default async function ModulePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const pageData = await getProductModule(slug).catch(() => null);
  if (!pageData?.data) notFound();

  const blocks: any[] = (pageData.data as any).attributes?.content ?? [];

  const heroBlock = findBlock<{
    eyebrow?: string; headline?: string; subheadline?: string;
    primary_cta?: any; secondary_cta?: any;
  }>(blocks, "hero");

  const imageTextBlock = findBlock<{
    heading?: string; body?: string; side?: string; image?: { url?: string } | null;
  }>(blocks, "image_text");

  /* icon_features — used by all module pages */
  const iconFeaturesBlocks = findBlocks<{
    anchor?: string; heading?: string; subheading?: string;
    items?: Array<{ icon?: string; title?: string; description?: string }> | Record<string, { icon?: string; title?: string; description?: string }>;
  }>(blocks, "icon_features");

  /* rich_text — used by some module pages for bullet-list "What Sets Us Apart" sections */
  const richTextBlocks = findBlocks<{
    heading?: string; body?: string;
  }>(blocks, "rich_text");

  const faqBlock = findBlock<{
    heading?: string;
    items?: Array<{ question: string; answer: string }> | Record<string, { question: string; answer: string }>;
  }>(blocks, "faq_accordion");

  const ctaBlock = findBlock<{
    headline?: string; subhead?: string;
    primary_cta?: any; secondary_cta?: any;
  }>(blocks, "cta_banner");

  function resolveCta(raw: any): { label?: string; url?: string } | undefined {
    if (!raw) return undefined;
    if (raw.label) return raw;
    if (raw.cta?.label) return raw.cta;
    return undefined;
  }

  const faqItems = faqBlock?.items
    ? (Array.isArray(faqBlock.items) ? faqBlock.items : Object.values(faqBlock.items as Record<string, any>))
    : [];

  return (
    <>
      <Navbar lightHero />
      <main>
        {/* Hero */}
        <ModuleHero
          eyebrow={heroBlock?.eyebrow}
          headline={heroBlock?.headline}
          subheadline={heroBlock?.subheadline}
          primaryCta={resolveCta(heroBlock?.primary_cta)}
          secondaryCta={resolveCta(heroBlock?.secondary_cta)}
        />

        {/* Image + text */}
        {imageTextBlock?.heading && (
          <ImageTextSection
            heading={imageTextBlock.heading}
            body={imageTextBlock.body}
            imageUrl={(imageTextBlock.image as any)?.attributes?.url || imageTextBlock.image?.url || undefined}
            side={(imageTextBlock.side as "left" | "right") || "right"}
          />
        )}

        {/* Icon features — renders all icon_features blocks in CMS order */}
        {iconFeaturesBlocks.map((feat, i) => {
          const rawItems = Array.isArray(feat.items)
            ? feat.items
            : Object.values((feat.items ?? {}) as Record<string, any>);
          if (!rawItems.length) return null;
          return (
            <IconFeaturesSection
              key={i}
              heading={feat.heading}
              subheading={feat.subheading}
              items={rawItems}
            />
          );
        })}

        {/* Rich text blocks */}
        {richTextBlocks.map((rt, i) => (
          <RichTextSection key={i} heading={rt.heading} body={rt.body} />
        ))}

        {/* FAQ */}
        {faqItems.length > 0 && (
          <PricingFAQ
            heading={faqBlock?.heading || "Frequently Asked Questions"}
            items={faqItems as { question: string; answer: string }[]}
          />
        )}

        {/* CTA Banner */}
        {ctaBlock && (
          <CTABanner
            cmsHeadline={ctaBlock.headline}
            cmsSubhead={ctaBlock.subhead}
            cmsPrimaryCta={(() => { const c = resolveCta(ctaBlock.primary_cta); return c?.label ? { label: c.label, url: c.url ?? "#" } : undefined; })()}
            cmsSecondaryCta={(() => { const c = resolveCta(ctaBlock.secondary_cta); return c?.label ? { label: c.label, url: c.url ?? "#" } : undefined; })()}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
