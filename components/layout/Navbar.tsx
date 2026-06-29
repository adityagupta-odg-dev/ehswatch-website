import { getHeader, getBlogPost, getCaseStudy } from "@/lib/api";
import NavbarClient from "./NavbarClient";

async function fetchDropdownChildImg(url: string): Promise<string | undefined> {
  try {
    const blogMatch = url.match(/^\/blog\/([^/?#]+)/);
    const caseMatch = url.match(/^\/case-studies\/([^/?#]+)/);

    if (blogMatch) {
      const post = await getBlogPost(blogMatch[1]);
      const cover = (post?.data as any)?.attributes?.cover;
      return cover?.attributes?.url ?? cover?.url ?? undefined;
    }
    if (caseMatch) {
      const cs = await getCaseStudy(caseMatch[1]);
      const cover = (cs?.data as any)?.attributes?.cover;
      return cover?.attributes?.url ?? cover?.url ?? undefined;
    }
  } catch {
    // silently fall back — no image
  }
  return undefined;
}

export default async function Navbar({ lightHero }: { lightHero?: boolean }) {
  const header = await getHeader();
  const mainNav = (header?.data as any)?.attributes?.main_nav ?? [];
  const ctas    = (header?.data as any)?.attributes?.ctas ?? [];

  const linkIndices = (mainNav as any[])
    .map((item: any, i: number) => (item.type !== "dropdown" ? i : -1))
    .filter((i: number) => i !== -1);
  const firstLinkIdx = linkIndices[0] ?? -1;
  const lastLinkIdx  = linkIndices[linkIndices.length - 1] ?? -1;

  const cmsNav = await Promise.all(
    (mainNav as any[]).map(async (item: any, idx: number) => {
      let children: { label: string; href: string; desc?: string; img?: string }[] | undefined;

      if (item.type === "dropdown" && Array.isArray(item.children)) {
        children = await Promise.all(
          (item.children as any[]).map(async (c: any) => {
            const href = (c.url as string) || "#";
            const img  = await fetchDropdownChildImg(href);
            return {
              label: c.label as string,
              href,
              desc: c.description as string | undefined,
              img,
            };
          })
        );
      }

      return {
        label:        item.label as string,
        href:         item.type === "dropdown" ? "#" : (item.url as string) || "#",
        hasDropdown:  item.type === "dropdown",
        hideOnScroll: idx === firstLinkIdx || idx === lastLinkIdx,
        children,
      };
    })
  );

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
