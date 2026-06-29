import { getHeader } from "@/lib/api";
import NavbarClient from "./NavbarClient";

export default async function Navbar({ lightHero }: { lightHero?: boolean }) {
  const header = await getHeader();
  const mainNav = header?.data?.attributes?.main_nav ?? [];
  const ctas    = header?.data?.attributes?.ctas ?? [];

  const cmsNav = (mainNav as any[]).map((item) => ({
    label:       item.label as string,
    href:        item.type === "dropdown" ? "#" : (item.url as string) || "#",
    hasDropdown: item.type === "dropdown",
    hideOnScroll: false,
    children: item.type === "dropdown"
      ? (item.children as any[] ?? []).map((c: any) => ({
          label: c.label as string,
          href:  (c.url as string) || "#",
          desc:  c.description as string | undefined,
        }))
      : undefined,
  }));

  const firstCta = (ctas as any[])[0];
  const cmsCta = firstCta
    ? { label: firstCta.label as string, href: (firstCta.url as string) || "#" }
    : undefined;

  return (
    <NavbarClient
      lightHero={lightHero}
      cmsNav={cmsNav.length > 0 ? cmsNav : undefined}
      cmsCta={cmsCta}
    />
  );
}
