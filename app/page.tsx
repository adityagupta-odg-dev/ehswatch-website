import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/HeroV2";
import TrustedLogos from "@/components/sections/TrustedLogos";
import Stats from "@/components/sections/Stats";
import PainPoints from "@/components/sections/PainPoints";
import ProductModules from "@/components/sections/ProductModules";
import AISection from "@/components/sections/AISection";
import OnePlatform from "@/components/sections/OnePlatform";
import WorkEnvironments from "@/components/sections/WorkEnvironments";
import Testimonials from "@/components/sections/Testimonials";
import Blogs from "@/components/sections/Blogs";
import CTABanner from "@/components/sections/CTABanner";
import { getTestimonials, getClientLogos, getPage } from "@/lib/api";
import { findBlock, normalizeArray, ctaHref } from "@/lib/blocks";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPage("home").catch(() => null);
  const attrs = (pageData?.data as any)?.attributes ?? {};
  return {
    title: attrs.meta?.meta_title || "EHSWatch — From Manual Chaos to AI Clarity",
    description: attrs.meta?.meta_description || "The connected EHS platform that turns incidents, audits and observations into closed actions — across every site, every team, every time.",
  };
}

export default async function HomePage() {
  const [testimonialsRes, logosRes, homePageRes] = await Promise.all([
    getTestimonials(),
    getClientLogos(),
    getPage("home"),
  ]);
  const cmsTestimonials = testimonialsRes?.data ?? [];
  const cmsLogos = logosRes?.data ?? [];
  const blocks: any[] = (homePageRes?.data as any)?.attributes?.content ?? [];

  // ── hero ──────────────────────────────────────────────────────────────────
  const heroBlock = findBlock<{
    headline?: string; subheadline?: string; eyebrow?: string;
    primary_cta?: { label?: string; url?: string; type?: string; anchor?: string };
    secondary_cta?: { label?: string; url?: string; type?: string; anchor?: string };
  }>(blocks, "hero");

  // ── trusted_logos ─────────────────────────────────────────────────────────
  const trustedLogosBlock = findBlock<{
    heading?: string;
  }>(blocks, "trusted_logos");

  // ── stats_row ─────────────────────────────────────────────────────────────
  const statsBlock = findBlock<{
    items?: Array<{ label?: string; value?: string; suffix?: string | null }>;
  }>(blocks, "stats_row");

  // ── pain_points ───────────────────────────────────────────────────────────
  const painBlock = findBlock<{
    heading?: string; subheading?: string;
    items?: Array<{ label?: string; description?: string; icon?: string }>;
  }>(blocks, "pain_points");

  // ── product_modules ───────────────────────────────────────────────────────
  const modulesBlock = findBlock<{
    heading?: string; subheading?: string;
    items?: Array<{ slug?: string; name?: string; tagline?: string; icon?: string; icon_url?: string }>;
  }>(blocks, "product_modules");

  const cmsModules = normalizeArray<{
    slug?: string; name?: string; tagline?: string; icon?: string; icon_url?: string;
  }>(modulesBlock?.items).map((m) => ({
    slug:     m.slug,
    name:     m.name     ?? "",
    tagline:  m.tagline  ?? "",
    icon:     m.icon,
    icon_url: m.icon_url,
  }));

  // ── image_text (AI / IRIS section) ────────────────────────────────────────
  const imageTextBlock = findBlock<{
    heading?: string; body?: string; eyebrow?: string;
    cta?: { cta?: { label?: string; url?: string; type?: string } };
  }>(blocks, "image_text");

  // ── tabs_carousel (OnePlatform) ───────────────────────────────────────────
  const tabsBlock = findBlock<{
    heading?: string; subheading?: string;
    tabs?: Record<string, { label?: string; title?: string; description?: string; cta?: { label?: string; url?: string } }>;
  }>(blocks, "tabs_carousel");

  const cmsTabs = tabsBlock?.tabs
    ? Object.values(tabsBlock.tabs).map((t) => ({
        label: t.label    ?? "",
        title: t.title    ?? "",
        desc:  t.description ?? "",
        link:  t.cta?.label ?? "",
      }))
    : undefined;

  // ── solution_carousel (WorkEnvironments) ──────────────────────────────────
  const solutionBlock = findBlock<{
    heading?: string; subheading?: string;
    cards?: Record<string, { title?: string; subheading?: string; description?: string }> | Array<{ title?: string; subheading?: string; description?: string }>;
  }>(blocks, "solution_carousel");

  const solutionCards = solutionBlock?.cards
    ? normalizeArray<{ title?: string; subheading?: string; description?: string }>(solutionBlock.cards).map((c) => ({
        title:       c.title       || "",
        subheading:  c.subheading  || "",
        description: c.description || "",
      }))
    : undefined;

  // ── blog_highlights ───────────────────────────────────────────────────────
  const blogBlock = findBlock<{
    heading?: string; subheading?: string;
    items?: Array<{ slug?: string; title?: string; excerpt?: string; category?: string; published_at?: string; featured_image_url?: string | null }>;
  }>(blocks, "blog_highlights");

  const cmsBlogPosts = blogBlock?.items
    ? blogBlock.items
        .filter((i) => !!i.slug && !!i.title)
        .map((i) => ({
          slug:               i.slug!,
          title:              i.title!,
          excerpt:            i.excerpt,
          category:           i.category,
          published_at:       i.published_at,
          featured_image_url: i.featured_image_url,
        }))
    : undefined;

  // ── cta_banner ────────────────────────────────────────────────────────────
  const ctaBlock = findBlock<{
    headline?: string; subhead?: string;
    primary_cta?:   { label?: string; url?: string; type?: string; anchor?: string; cta?: { label?: string; url?: string; type?: string; anchor?: string } };
    secondary_cta?: { label?: string; url?: string; type?: string; anchor?: string; cta?: { label?: string; url?: string; type?: string; anchor?: string } };
  }>(blocks, "cta_banner");
  const ctaPrimary   = ctaBlock?.primary_cta?.cta   ?? ctaBlock?.primary_cta;
  const ctaSecondary = ctaBlock?.secondary_cta?.cta  ?? ctaBlock?.secondary_cta;

  return (
    <>
      <Navbar lightHero />
      <main>
        {/* 1. hero */}
        <Hero
          cmsHeadline={heroBlock?.headline || undefined}
          cmsSubheadline={heroBlock?.subheadline || undefined}
          cmsEyebrow={heroBlock?.eyebrow || undefined}
          cmsPrimaryCta={heroBlock?.primary_cta?.label ? { label: heroBlock.primary_cta.label, url: ctaHref(heroBlock.primary_cta) } : undefined}
          cmsSecondaryCta={heroBlock?.secondary_cta?.label ? { label: heroBlock.secondary_cta.label, url: ctaHref(heroBlock.secondary_cta) } : undefined}
        />

        {/* 2. trusted_logos */}
        <TrustedLogos
          cmsLogos={cmsLogos.length > 0 ? cmsLogos : undefined}
          cmsHeading={trustedLogosBlock?.heading || undefined}
        />

        {/* 3. stats_row */}
        <Stats
          cmsItems={statsBlock?.items && statsBlock.items.length > 0
            ? statsBlock.items.map((item) => ({ label: item.label || "", value: item.value || "0", suffix: item.suffix ?? null }))
            : undefined}
        />

        {/* 4. pain_points */}
        <PainPoints
          cmsHeading={painBlock?.heading || undefined}
          cmsSubheading={painBlock?.subheading || undefined}
          cmsItems={painBlock?.items && painBlock.items.length > 0
            ? painBlock.items.map((item) => ({ label: item.label || "", description: item.description || "", icon: item.icon || "" }))
            : undefined}
        />

        {/* 5. product_modules */}
        <ProductModules
          cmsHeading={modulesBlock?.heading || undefined}
          cmsSubheading={modulesBlock?.subheading || undefined}
          cmsModules={cmsModules.length > 0 ? cmsModules : undefined}
        />

        {/* 6. image_text (AI / IRIS) */}
        <AISection
          cmsHeading={imageTextBlock?.heading || undefined}
          cmsBody={imageTextBlock?.body || undefined}
          cmsCtaLabel={imageTextBlock?.cta?.cta?.label || undefined}
          cmsCtaUrl={imageTextBlock?.cta?.cta?.url || undefined}
        />

        {/* 7. tabs_carousel */}
        <OnePlatform
          cmsHeading={tabsBlock?.heading || undefined}
          cmsSubheading={tabsBlock?.subheading || undefined}
          cmsTabs={cmsTabs}
        />

        {/* 8. solution_carousel */}
        <WorkEnvironments
          cmsHeading={solutionBlock?.heading || undefined}
          cmsSubheading={solutionBlock?.subheading || undefined}
          cmsCards={solutionCards}
        />

        {/* 9. testimonials */}
        <Testimonials cmsItems={cmsTestimonials.length > 0 ? cmsTestimonials : undefined} />

        {/* 10. blog_highlights */}
        <Blogs
          cmsHeading={blogBlock?.heading || undefined}
          cmsSubheading={blogBlock?.subheading || undefined}
          cmsPosts={cmsBlogPosts}
        />

        {/* 11. cta_banner */}
        <CTABanner
          cmsHeadline={ctaBlock?.headline || undefined}
          cmsSubhead={ctaBlock?.subhead || undefined}
          cmsPrimaryCta={ctaPrimary?.label ? { label: ctaPrimary.label, url: ctaHref(ctaPrimary) } : undefined}
          cmsSecondaryCta={ctaSecondary?.label ? { label: ctaSecondary.label, url: ctaHref(ctaSecondary) } : undefined}
        />
      </main>
      <Footer />
    </>
  );
}
