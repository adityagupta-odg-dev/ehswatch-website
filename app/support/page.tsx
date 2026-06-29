import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SupportHero from "@/components/sections/SupportHero";
import SupportContact from "@/components/sections/SupportContact";
import SupportMap from "@/components/sections/SupportMap";
import { getForm } from "@/lib/api";
import type { CmsForm } from "@/lib/types";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Support — EHSWatch",
  description:
    "Get in touch with the EHSWatch team for demos, onboarding support, or to find out how we can help your organisation.",
};

const SUPPORT_FALLBACK: CmsForm["attributes"] = {
  slug: "support",
  name: "Support",
  form_type: "standard",
  use_multi_step: false,
  submit_label: "Send Message",
  success_heading: "Message Sent",
  success_message: "Our team will get back to you within 1 business day.",
  redirect_url: null,
  captcha: { provider: "turnstile", site_key: "1x00000000000000000000AA" },
  fields: [
    { key: "name", label: "Full Name", field_type: "text", required: true, placeholder: "Jane Smith", help_text: null, options: null, default_value: null, full_width: false, catalogue_slug: null },
    { key: "email", label: "Email Address", field_type: "email", required: true, placeholder: "jane@company.com", help_text: null, options: null, default_value: null, full_width: false, catalogue_slug: null },
    { key: "company", label: "Company", field_type: "text", required: true, placeholder: "Acme Corp", help_text: null, options: null, default_value: null, full_width: false, catalogue_slug: null },
    { key: "category", label: "Issue Category", field_type: "select", required: true, placeholder: "Select category", help_text: null, options: ["Bug report", "Feature request", "Onboarding question", "Billing", "Other"], default_value: null, full_width: false, catalogue_slug: null },
    { key: "subject", label: "Subject", field_type: "text", required: true, placeholder: "Brief description of your issue", help_text: null, options: null, default_value: null, full_width: true, catalogue_slug: null },
    { key: "priority", label: "Priority", field_type: "radio", required: true, placeholder: null, help_text: null, options: ["Low", "Normal", "High", "Urgent"], default_value: null, full_width: true, catalogue_slug: null },
    { key: "message", label: "Message", field_type: "textarea", required: true, placeholder: "Describe your issue or question in detail…", help_text: null, options: null, default_value: null, full_width: true, catalogue_slug: null },
  ],
};

export default async function SupportPage() {
  const formRes = await getForm("support").catch(() => null);
  const contactFormAttrs = formRes?.data?.attributes ?? SUPPORT_FALLBACK;

  return (
    <>
      <Navbar lightHero={true} />
      <main>
        <SupportHero />
        <SupportContact contactFormAttrs={contactFormAttrs} />
        <SupportMap />
      </main>
      <Footer />
    </>
  );
}
