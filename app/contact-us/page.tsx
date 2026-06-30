import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactPage from "@/components/sections/ContactPage";
import { getForm, getPage } from "@/lib/api";
import { findBlock, normalizeArray, ctaHref } from "@/lib/blocks";
import type { CmsForm } from "@/lib/types";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const pageRes = await getPage("contact-us").catch(() => null);
  const meta = (pageRes?.data as any)?.attributes?.meta;
  return {
    title: meta?.meta_title || "Contact Us — EHSWatch",
    description:
      meta?.meta_description ||
      "Get in touch with the EHSWatch team for demos, onboarding support, or to find out how we can help your organisation.",
  };
}

/* Fallback used only when the CMS form hasn't been created yet */
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
    { key: "name",    label: "Full Name",      field_type: "text",     required: true,  placeholder: "Enter your name",  help_text: null, options: null, default_value: null, full_width: false, catalogue_slug: null },
    { key: "email",   label: "Email Address",  field_type: "email",    required: true,  placeholder: "Email address",    help_text: null, options: null, default_value: null, full_width: false, catalogue_slug: null },
    { key: "phone",   label: "Phone",          field_type: "phone",    required: false, placeholder: "Phone number",     help_text: null, options: null, default_value: null, full_width: false, catalogue_slug: null },
    { key: "company", label: "Company",        field_type: "text",     required: false, placeholder: "Company name",     help_text: null, options: null, default_value: null, full_width: false, catalogue_slug: null },
    { key: "message", label: "Message",        field_type: "textarea", required: false, placeholder: "How can we help?", help_text: null, options: null, default_value: null, full_width: true,  catalogue_slug: null },
  ],
};

export default async function ContactUsPage() {
  /* Step 1: fetch the page to read the CMS-configured form slug */
  const pageRes = await getPage("contact-us").catch(() => null);
  const blocks: any[] = (pageRes?.data as any)?.attributes?.content ?? [];

  /* ── hero block ── */
  const heroBlock = findBlock<{
    eyebrow?: string;
    headline?: string;
    subheadline?: string;
    primary_cta?: unknown;
  }>(blocks, "hero");

  const heroPrimaryCtaLabel = (heroBlock?.primary_cta as any)?.label as string | undefined;
  const heroPrimaryCtaHref  = heroBlock?.primary_cta ? ctaHref(heroBlock.primary_cta) : undefined;

  /* ── form_embed block — contains the form_slug the CMS admin chose ── */
  const formEmbed = findBlock<{
    heading?: string;
    subheading?: string;
    description?: string;
    form_slug?: string;
  }>(blocks, "form_embed");

  /* Step 2: fetch the form schema using the CMS-defined slug */
  const formSlug = formEmbed?.form_slug ?? "contact";
  const formRes = await getForm(formSlug).catch(() => null);
  const formAttrs = formRes?.data?.attributes ?? CONTACT_FALLBACK;

  /* ── icon_features block (offices) ── */
  const officesBlock = findBlock<{
    heading?: string;
    items?: unknown;
  }>(blocks, "icon_features");

  const rawItems = normalizeArray<{
    icon?: string;
    title?: string;
    description?: string | null;
    link?: { link?: { label?: string; url?: string; type?: string } };
  }>(officesBlock?.items);

  const officeItems = rawItems.length > 0
    ? rawItems.map((item) => ({
        icon:        item.icon        ?? "building-office",
        title:       item.title       ?? "",
        description: item.description ?? null,
        linkLabel:   item.link?.link?.label ?? null,
        linkUrl:     item.link?.link?.url   ?? null,
        linkType:    item.link?.link?.type  ?? null,
      }))
    : null;

  return (
    <>
      <Navbar lightHero={true} />
      <main>
        <ContactPage
          formAttrs={formAttrs}
          formSlug={formSlug}
          heroEyebrow={heroBlock?.eyebrow || undefined}
          heroHeadline={heroBlock?.headline || undefined}
          heroSubheadline={heroBlock?.subheadline || undefined}
          heroPrimaryCtaLabel={heroPrimaryCtaLabel || undefined}
          heroPrimaryCtaHref={heroPrimaryCtaHref || undefined}
          formHeading={formEmbed?.heading || undefined}
          formSubheading={formEmbed?.subheading || undefined}
          officesHeading={officesBlock?.heading || undefined}
          officeItems={officeItems}
        />
      </main>
      <Footer />
    </>
  );
}
