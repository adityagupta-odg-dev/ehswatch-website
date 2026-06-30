export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogPost from "@/components/sections/BlogPost";
import { getBlogPost, getBlogPosts } from "@/lib/api";

const STATIC_SLUGS = [
  "near-miss-reporting-culture",
  "iso-45001-transition",
  "leading-indicators-safety",
  "cost-manual-incident-reporting",
  "contractor-safety-management",
  "lagging-to-leading-metrics",
];

export async function generateStaticParams() {
  const res = await getBlogPosts();
  const cmsSlugs = res?.data?.map((p) => p.attributes.slug) ?? [];
  const all = Array.from(new Set([...STATIC_SLUGS, ...cmsSlugs]));
  return all.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const res = await getBlogPost(slug);
  const post = res?.data;
  return {
    title: post ? `${post.attributes.title} | EHSWatch` : `Blog | EHSWatch`,
    description: post?.attributes.excerpt ?? `EHSWatch EHS insights — ${slug.replace(/-/g, " ")}.`,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [res, allRes] = await Promise.all([
    getBlogPost(slug),
    getBlogPosts(),
  ]);
  const cmsPost = res?.data;
  // Sort all CMS posts newest-first so prev/next are chronologically adjacent
  const cmsSlugs = (allRes?.data ?? [])
    .sort((a, b) => new Date(b.attributes.published_at).getTime() - new Date(a.attributes.published_at).getTime())
    .map((p) => p.attributes.slug);
  return (
    <>
      <Navbar lightHero />
      <main>
        <BlogPost slug={slug} cmsPost={cmsPost} cmsSlugs={cmsSlugs.length > 0 ? cmsSlugs : undefined} />
      </main>
      <Footer />
    </>
  );
}
