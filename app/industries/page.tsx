import Navbar from @/components/layout/Navbar;
import Footer from @/components/layout/Footer;
import SolutionsHero from @/components/sections/SolutionsHero;
import SolutionsIndustries from @/components/sections/SolutionsIndustries;
import SolutionsCTA from @/components/sections/SolutionsCTA;
import Testimonials from @/components/sections/Testimonials;
import type { Metadata } from next;

export const dynamic = force-dynamic;

export const metadata: Metadata = {
  title: Industries — EHSWatch,
  description: Every industry has different risks. EHSWatch is configured to the compliance requirements, workflows and hazard profiles of your sector.,
};

export default function IndustriesPage() {
  return (
    <>
      <Navbar lightHero={true} />
      <main>
        <SolutionsHero />
        <SolutionsIndustries />
        <Testimonials title=A Snapshot of Real-World Impact />
        <SolutionsCTA />
      </main>
      <Footer />
    </>
  );
}
