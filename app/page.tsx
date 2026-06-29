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

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [testimonialsRes, logosRes, homePageRes] = await Promise.all([
    getTestimonials(),
    getClientLogos(),
    getPage("home"),
  ]);
  const cmsTestimonials = testimonialsRes?.data ?? [];
  const cmsLogos = logosRes?.data ?? [];
  const blocks = homePageRes?.data?.attributes?.content ?? [];

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
        <Hero />
        <TrustedLogos cmsLogos={cmsLogos.length > 0 ? cmsLogos : undefined} />
        <Stats />
        <PainPoints />
        <OnePlatform />
        <AISection />
        <WorkEnvironments />
        <Testimonials cmsItems={cmsTestimonials.length > 0 ? cmsTestimonials : undefined} />
        <Blogs />
        <CTABanner
          cmsHeadline={ctaBlock?.headline || undefined}
          cmsSubhead={ctaBlock?.subheadline || undefined}
          cmsPrimaryCta={
            ctaBlock?.primary_cta?.label
              ? { label: ctaBlock.primary_cta.label, url: ctaHref(ctaBlock.primary_cta) }
              : undefined
          }
          cmsSecondaryCta={
            ctaBlock?.secondary_cta?.label
              ? { label: ctaBlock.secondary_cta.label, url: ctaHref(ctaBlock.secondary_cta) }
              : undefined
          }
        />
      </main>
      <Footer />
    </>
  );
}
