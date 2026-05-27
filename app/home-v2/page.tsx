import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import TrustedLogos from "@/components/sections/TrustedLogos";
import Stats from "@/components/sections/Stats";
import PainPoints from "@/components/sections/PainPoints";
import OnePlatform from "@/components/sections/OnePlatform";
import AISection from "@/components/sections/AISection";
import WorkEnvironments from "@/components/sections/WorkEnvironments";
import Testimonials from "@/components/sections/Testimonials";
import Blogs from "@/components/sections/Blogs";
import CTABanner from "@/components/sections/CTABanner";

export default function HomeV2Page() {
  return (
    <>
      <Navbar lightHero />
      <main>
        <Hero />
        <TrustedLogos />
        <Stats />
        <PainPoints />
        <OnePlatform />
        <AISection />
        <WorkEnvironments />
        <Testimonials />
        <Blogs />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
