import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LegalHero from "@/components/sections/LegalHero";
import RichTextSection from "@/components/sections/RichTextSection";
import CTABanner from "@/components/sections/CTABanner";
import { getPage } from "@/lib/api";
import { findBlock, findBlocks, ctaHref } from "@/lib/blocks";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPage("cookie-policy").catch(() => null);
  const attrs = (pageData?.data as any)?.attributes ?? {};
  return {
    title: attrs.meta?.meta_title || "Cookie Policy — EHSWatch",
    description:
      attrs.meta?.meta_description ||
      "How EHSWatch uses cookies and similar tracking technologies.",
  };
}

export default async function CookiePolicyPage() {
  const pageData = await getPage("cookie-policy").catch(() => null);
  const blocks: any[] = pageData?.data?.attributes?.content ?? [];
  const publishedAt: string | undefined = (pageData?.data as any)?.attributes?.published_at;

  const heroBlock = findBlock<{
    eyebrow?: string | null;
    headline?: string | null;
    subheadline?: string | null;
    desktop_image?: { url?: string | null; alt?: string | null } | null;
  }>(blocks, "hero");

  const richTextBlocks = findBlocks<{
    heading?: string | null;
    subheading?: string | null;
    body?: string | null;
  }>(blocks, "rich_text");

  let lastUpdated: string | undefined;
  if (publishedAt) {
    try {
      lastUpdated = new Date(publishedAt).toLocaleDateString("en-GB", {
        day: "numeric", month: "long", year: "numeric",
      });
    } catch { lastUpdated = undefined; }
  }

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
        <LegalHero
          headline={heroBlock?.headline || "Cookie Policy"}
          subheadline={heroBlock?.subheadline || "How we use cookies and similar technologies on our website."}
          eyebrow={heroBlock?.eyebrow || undefined}
          bgImageUrl={heroBlock?.desktop_image?.url || undefined}
          bgImageAlt={heroBlock?.desktop_image?.alt || undefined}
        />

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
          <RichTextSection
            heading="Cookie Policy"
            body="<p>Our cookie policy will be available soon. Please check back later.</p>"
            updatedAt={lastUpdated}
          />
        )}

        {ctaBlock && (
          <CTABanner
            cmsHeadline={ctaBlock.headline || undefined}
            cmsSubhead={ctaBlock.subhead || undefined}
            cmsPrimaryCta={ctaPrimary?.label ? { label: ctaPrimary.label, url: ctaHref(ctaPrimary as any) } : undefined}
            cmsSecondaryCta={ctaSecondary?.label ? { label: ctaSecondary.label, url: ctaHref(ctaSecondary as any) } : undefined}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
