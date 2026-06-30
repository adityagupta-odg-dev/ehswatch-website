import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LegalHero from "@/components/sections/LegalHero";
import RichTextSection from "@/components/sections/RichTextSection";
import CTABanner from "@/components/sections/CTABanner";
import { getPage } from "@/lib/api";
import { findBlock, findBlocks, normalizeArray, ctaHref } from "@/lib/blocks";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPage("privacy-policy").catch(() => null);
  const attrs = (pageData?.data as any)?.attributes ?? {};
  return {
    title: attrs.meta?.meta_title || "Privacy Policy — EHSWatch",
    description:
      attrs.meta?.meta_description ||
      "How EHSWatch collects, uses, and protects your personal data.",
  };
}

export default async function PrivacyPolicyPage() {
  const pageData = await getPage("privacy-policy").catch(() => null);
  const blocks: any[] = pageData?.data?.attributes?.content ?? [];
  const publishedAt: string | undefined = (pageData?.data as any)?.attributes?.published_at;

  // ── hero block ──────────────────────────────────────────────────────────────
  const heroBlock = findBlock<{
    eyebrow?: string | null;
    headline?: string | null;
    subheadline?: string | null;
    desktop_image?: { url?: string | null; alt?: string | null } | null;
    mobile_image?: { url?: string | null; alt?: string | null } | null;
  }>(blocks, "hero");

  const heroHeadline    = heroBlock?.headline    || undefined;
  const heroSubheadline = heroBlock?.subheadline || undefined;
  const heroEyebrow     = heroBlock?.eyebrow     || undefined;
  const heroBgImageUrl  = heroBlock?.desktop_image?.url || undefined;
  const heroBgImageAlt  = heroBlock?.desktop_image?.alt || undefined;

  // ── rich_text blocks — one or many sections of legal prose ─────────────────
  const richTextBlocks = findBlocks<{
    heading?: string | null;
    subheading?: string | null;
    body?: string | null;
  }>(blocks, "rich_text");

  // Format published_at as a readable date for the first section's "last updated"
  let lastUpdated: string | undefined;
  if (publishedAt) {
    try {
      lastUpdated = new Date(publishedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      lastUpdated = undefined;
    }
  }

  // ── cta_banner block ────────────────────────────────────────────────────────
  const ctaBlock = findBlock<{
    headline?: string;
    subhead?: string;
    primary_cta?: { cta?: { label?: string; url?: string; type?: string; anchor?: string } };
    secondary_cta?: { cta?: { label?: string; url?: string; type?: string; anchor?: string } };
  }>(blocks, "cta_banner");

  const ctaPrimary   = ctaBlock?.primary_cta?.cta;
  const ctaSecondary = ctaBlock?.secondary_cta?.cta;

  return (
    <>
      <Navbar lightHero={false} />
      <main>
        {/* Hero */}
        <LegalHero
          headline={heroHeadline}
          subheadline={heroSubheadline}
          eyebrow={heroEyebrow}
          bgImageUrl={heroBgImageUrl}
          bgImageAlt={heroBgImageAlt}
        />

        {/* Rich text sections — admin can add multiple rich_text blocks */}
        {richTextBlocks.length > 0 ? (
          richTextBlocks.map((block, i) => (
            <RichTextSection
              key={i}
              heading={block.heading || undefined}
              subheading={block.subheading || undefined}
              body={block.body || undefined}
              updatedAt={i === 0 ? lastUpdated : undefined}
            />
          ))
        ) : (
          // Fallback when no rich_text block is in CMS yet
          <RichTextSection
            heading="Privacy Policy"
            body="<p>This privacy policy will be available soon. Please check back later.</p>"
            updatedAt={lastUpdated}
          />
        )}

        {/* CTA Banner */}
        {ctaBlock && (
          <CTABanner
            cmsHeadline={ctaBlock.headline || undefined}
            cmsSubhead={ctaBlock.subhead || undefined}
            cmsPrimaryCta={
              ctaPrimary?.label
                ? { label: ctaPrimary.label, url: ctaHref(ctaPrimary as any) }
                : undefined
            }
            cmsSecondaryCta={
              ctaSecondary?.label
                ? { label: ctaSecondary.label, url: ctaHref(ctaSecondary as any) }
                : undefined
            }
          />
        )}
      </main>
      <Footer />
    </>
  );
}
