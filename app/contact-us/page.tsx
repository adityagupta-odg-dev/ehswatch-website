import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactPage from "@/components/sections/ContactPage";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Us — EHSWatch",
  description: "Get in touch with the EHSWatch team for demos, onboarding support, or to find out how we can help your organisation.",
};

export default function ContactUsPage() {
  return (
    <>
      <Navbar lightHero={true} />
      <main>
        <ContactPage />
      </main>
      <Footer />
    </>
  );
}
