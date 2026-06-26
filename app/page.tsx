import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/HeroV2";
import TrustedLogos from "@/components/sections/TrustedLogos";
import Stats from "@/components/sections/Stats";
import PainPoints from "@/components/sections/PainPoints";
import OnePlatform from "@/components/sections/OnePlatform";
import AISection from "@/components/sections/AISection";
import WorkEnvironments from "@/components/sections/WorkEnvironments";
import Testimonials from "@/components/sections/Testimonials";
import Blogs from "@/components/sections/Blogs";
import CTABanner from "@/components/sections/CTABanner";
import { getTestimonials, getClientLogos, getPage } from "@/lib/api";
import { findBlock, ctaHref } from "@/lib/blocks";

export default async function HomePage() {
  const [testimonialsRes, logosRes, homePageRes] = await Promise.all([
    getTestimonials(),
    getClientLogos(),
    getPage("home"),
  ]);
  const cmsTestimonials = testimonialsRes?.data ?? [];
  const cmsLogos = logosRes?.data ?? [];

  const blocks = homePageRes?.data?.attributes?.content ?? [];

  // hero block
  const heroBlock = findBlock<{
    headline?: string;
    subheadline?: string;
    primary_cta?: { label?: string; url?: string; type?: string; anchor?: string };
    secondary_cta?: { label?: string; url?: string; type?: string; anchor?: string };
  }>(blocks, "hero");

  // stats_row block
  const statsBlock = findBlock<{
    items?: { value: string; suffix?: string; label: string; icon?: string }[];
  }>(blocks, "stats_row");

  // pain_points block
  const painBlock = findBlock<{
    items?: { label: string; description?: string; icon?: string }[];
  }>(blocks, "pain_points");

  // cta_banner block
  const ctaBlock = findBlock<{
    headline?: string;
    subheadline?: string;
    primary_cta?: { label?: string; url?: string; type?: string; anchor?: string };
    secondary_cta?: { label?: string; url?: string; type?: string; anchor?: string };
  }>(blocks, "cta_banner");

  return (
    <>
      <Navbar lightHero />
      <main>
        <Hero
          cmsHeadline={heroBlock?.headline}
          cmsSubheadline={heroBlock?.subheadline}
          cmsPrimaryCta={
            heroBlock?.primary_cta
              ? { label: heroBlock.primary_cta.label ?? "", url: ctaHref(heroBlock.primary_cta) }
              : undefined
          }
          cmsSecondaryCta={
            heroBlock?.secondary_cta
              ? { label: heroBlock.secondary_cta.label ?? "", url: ctaHref(heroBlock.secondary_cta) }
              : undefined
          }
        />
        <TrustedLogos cmsLogos={cmsLogos.length > 0 ? cmsLogos : undefined} />
        <Stats cmsItems={statsBlock?.items && statsBlock.items.length > 0 ? statsBlock.items : undefined} />
        <PainPoints cmsItems={painBlock?.items && painBlock.items.length > 0 ? painBlock.items : undefined} />
        <OnePlatform />
        <AISection />
        <WorkEnvironments />
        <Testimonials cmsItems={cmsTestimonials.length > 0 ? cmsTestimonials : undefined} />
        <Blogs />
        <CTABanner
          cmsHeadline={ctaBlock?.headline}
          cmsSubhead={ctaBlock?.subheadline}
          cmsPrimaryCta={
            ctaBlock?.primary_cta
              ? { label: ctaBlock.primary_cta.label ?? "", url: ctaHref(ctaBlock.primary_cta) }
              : undefined
          }
          cmsSecondaryCta={
            ctaBlock?.secondary_cta
              ? { label: ctaBlock.secondary_cta.label ?? "", url: ctaHref(ctaBlock.secondary_cta) }
              : undefined
          }
        />
      </main>
      <Footer />
    </>
  );
}
