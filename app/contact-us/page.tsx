import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactPage from "@/components/sections/ContactPage";
import { getForm } from "@/lib/api";
import type { CmsForm } from "@/lib/types";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Us — EHSWatch",
  description:
    "Get in touch with the EHSWatch team for demos, onboarding support, or to find out how we can help your organisation.",
};

const CONTACT_FALLBACK: CmsForm["attributes"] = {
  slug: "contact",
  name: "Contact",
  form_type: "standard",
  use_multi_step: false,
  submit_label: "Send Message",
  success_heading: "Message Received",
  success_message: "Our team will get back to you within 1 business day.",
  redirect_url: null,
  captcha: { provider: "turnstile", site_key: "1x00000000000000000000AA" },
  fields: [
    { key: "name", label: "Full Name", field_type: "text", required: true, placeholder: "Enter your name", help_text: null, options: null, default_value: null, full_width: false, catalogue_slug: null },
    { key: "email", label: "Email Address", field_type: "email", required: true, placeholder: "Email address", help_text: null, options: null, default_value: null, full_width: false, catalogue_slug: null },
    { key: "company", label: "Company", field_type: "text", required: false, placeholder: "Company name", help_text: null, options: null, default_value: null, full_width: false, catalogue_slug: null },
    { key: "message", label: "Message", field_type: "textarea", required: false, placeholder: "How can we help?", help_text: null, options: null, default_value: null, full_width: true, catalogue_slug: null },
  ],
};

export default async function ContactUsPage() {
  const formRes = await getForm("contact").catch(() => null);
  const formAttrs = formRes?.data?.attributes ?? CONTACT_FALLBACK;

  return (
    <>
      <Navbar lightHero={true} />
      <main>
        <ContactPage formAttrs={formAttrs} />
      </main>
      <Footer />
    </>
  );
}
