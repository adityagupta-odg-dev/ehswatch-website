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
import { getTestimonials, getClientLogos } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [testimonialsRes, logosRes] = await Promise.all([
    getTestimonials(),
    getClientLogos(),
  ]);
  const cmsTestimonials = testimonialsRes?.data ?? [];
  const cmsLogos = logosRes?.data ?? [];
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
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
