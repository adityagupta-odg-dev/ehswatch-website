import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactPage from "@/components/sections/ContactPage";
import type { ContactOfficeItem } from "@/components/sections/ContactPage";
import type { Metadata } from "next";
import { getPage } from "@/lib/api";
import { findBlock, iconFeaturesToArray } from "@/lib/blocks";

export const metadata: Metadata = {
  title: "Contact Us — EHSWatch",
  description: "Get in touch with the EHSWatch team for demos, onboarding support, or to find out how we can help your organisation.",
};

export default async function SupportPage() {
  // Fetch the contact-us page from the CMS (falls back gracefully on error)
  const pageData = await getPage("contact-us");
  const blocks = pageData?.data?.attributes?.content ?? [];

  // ── hero block ──────────────────────────────────────────────────────────────
  const heroBlock = findBlock<{ headline?: string; subheadline?: string }>(blocks, "hero");
  const heroHeadline = heroBlock?.headline || undefined;
  const heroSubheadline = heroBlock?.subheadline || undefined;

  // ── form_embed block ─────────────────────────────────────────────────────────
  // Verify form_slug matches the hardcoded "contact" slug used in the component.
  const formEmbedBlock = findBlock<{ form_slug?: string }>(blocks, "form_embed");
  if (formEmbedBlock?.form_slug && formEmbedBlock.form_slug !== "contact") {
    console.warn(
      `[contact-us] CMS form_slug is "${formEmbedBlock.form_slug}" but the form component submits to "contact". ` +
      `Update the component if the slug changes.`
    );
  }

  // ── icon_features block ──────────────────────────────────────────────────────
  const iconFeaturesBlock = findBlock<{ items?: Record<string, any> | any[] }>(blocks, "icon_features");
  let officeItems: ContactOfficeItem[] | undefined;

  if (iconFeaturesBlock?.items) {
    const rawItems = iconFeaturesToArray(iconFeaturesBlock.items);
    if (rawItems.length > 0) {
      officeItems = rawItems.map((item) => ({
        label: String(item.title ?? ""),
        description: String(item.description ?? ""),
      }));
    }
  }

  return (
    <>
      <Navbar lightHero={true} />
      <main>
        <ContactPage
          heroHeadline={heroHeadline}
          heroSubheadline={heroSubheadline}
          officeItems={officeItems}
        />
      </main>
      <Footer />
    </>
  );
}
