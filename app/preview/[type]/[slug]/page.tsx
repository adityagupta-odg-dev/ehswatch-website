export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogPost from "@/components/sections/BlogPost";
import { getPreviewBlogPost } from "@/lib/api";

export const metadata: Metadata = {
  title: "Preview | EHSWatch",
  robots: { index: false, follow: false },
};

export default async function PreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string; slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { type, slug } = await params;
  const sp = await searchParams;
  const token = Array.isArray(sp.token) ? sp.token[0] : (sp.token ?? "");
  const exp   = Array.isArray(sp.exp)   ? sp.exp[0]   : (sp.exp   ?? "");

  return (
    <>
      <Navbar lightHero />

      {/* Preview banner */}
      <div
        className="sticky top-0 z-50 border-b px-4 py-2.5 text-center text-sm font-medium"
        style={{ background: "#fffbeb", borderColor: "#fcd34d", color: "#92400e" }}
      >
        PREVIEW — This content is not yet published and may not be visible to the public.
      </div>

      <main>
        <PreviewContent type={type} slug={slug} token={token} exp={exp} />
      </main>

      <Footer />
    </>
  );
}

async function PreviewContent({
  type,
  slug,
  token,
  exp,
}: {
  type: string;
  slug: string;
  token: string;
  exp: string;
}) {
  if (!token || !exp) {
    return <PreviewError message="Missing preview token. Generate a new link from the CMS admin." />;
  }

  if (type === "blog-post") {
    const res = await getPreviewBlogPost(slug, token, exp);
    if (!res?.data) {
      return <PreviewError message="Preview link has expired or the content was not found. Generate a new link from the CMS admin." />;
    }
    return <BlogPost slug={slug} cmsPost={res.data} />;
  }

  return (
    <PreviewError message={`Preview for content type "${type}" is not yet supported in the frontend.`} />
  );
}

function PreviewError({ message }: { message: string }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="font-bold text-[24px] text-gray-900 mb-3">Preview unavailable</h1>
        <p className="text-gray-500 text-[15px] leading-relaxed">{message}</p>
      </div>
    </div>
  );
}
