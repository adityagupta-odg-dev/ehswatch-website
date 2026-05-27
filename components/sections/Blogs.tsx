"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Reveal from "@/components/ui/Reveal";
import { basePath } from "@/lib/basePath";

const BLOGS = [
  {
    img: basePath + "/images/blogs/blog-1.png",
    category: "Risk & Analytics",
    title: "5 Leading Indicators Every Safety Manager Should Be Tracking",
    href: "#",
    readTime: "5 min read",
    date: "Apr 14, 2026",
  },
  {
    img: basePath + "/images/blogs/blog-2.png",
    category: "Operations",
    title: "The Hidden Cost of Manual Incident Reporting",
    href: "#",
    readTime: "7 min read",
    date: "Apr 2, 2026",
  },
  {
    img: basePath + "/images/blogs/blog-3.png",
    category: "Contractor Management",
    title: "Contractor Safety Management: Where Most Programmes Fall Short",
    href: "#",
    readTime: "9 min read",
    date: "Mar 18, 2026",
  },
  {
    img: basePath + "/images/blogs/blog-1.png",
    category: "Risk & Analytics",
    title: "From Lagging to Leading: Rethinking Your Safety Metrics",
    href: "#",
    readTime: "6 min read",
    date: "Mar 5, 2026",
  },
];

/* ── Individual card — full-bleed image with overlay content ── */
function BlogCard({ blog }: { blog: typeof BLOGS[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={blog.href}
      aria-label={`Read: ${blog.title}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col overflow-hidden"
      style={{
        borderRadius: 16,
        height: 360,
        boxShadow: hovered
          ? "0 24px 52px rgba(0,0,0,0.28)"
          : "0 4px 16px rgba(0,0,0,0.12)",
        transform: hovered ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)",
        transition: "transform 400ms cubic-bezier(.22,1,.36,1), box-shadow 400ms ease",
      }}
    >
      {/* Background image */}
      <Image
        src={blog.img}
        alt={blog.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover object-center"
        style={{
          transform: hovered ? "scale(1.07)" : "scale(1)",
          transition: "transform 700ms cubic-bezier(.22,1,.36,1)",
        }}
      />

      {/* Gradient overlay — subtle at top, strong at bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.18) 40%, rgba(0,0,0,0.72) 75%, rgba(0,0,0,0.88) 100%)",
          transition: "opacity 300ms ease",
        }}
      />

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-4 pt-6 flex flex-col gap-2">
        {/* Date + read time */}
        <p className="font-[family-name:var(--font-dm-sans)] text-[10.5px] text-white/60">
          {blog.date}
          <span className="mx-1.5 text-white/30">•</span>
          {blog.readTime}
        </p>

        {/* Title */}
        <h3
          className="font-[family-name:var(--font-gothic-a1)] font-bold text-[15px] leading-[1.38] text-white line-clamp-3"
          style={{ textWrap: "pretty" } as React.CSSProperties}
        >
          {blog.title}
        </h3>

        {/* Read more */}
        <div
          className="mt-1 flex items-center gap-1 font-[family-name:var(--font-dm-sans)] font-semibold text-[12px]"
          style={{
            color: hovered ? "#ff9a5c" : "rgba(255,255,255,0.75)",
            transition: "color 220ms ease",
          }}
        >
          Read more
          <span
            style={{
              display: "inline-block",
              transform: hovered ? "translateX(4px)" : "translateX(0)",
              transition: "transform 260ms ease",
            }}
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ── Section ── */
export default function Blogs() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardW = el.scrollWidth / BLOGS.length;
      if (cardW <= 0) return;
      setActiveIdx(Math.min(BLOGS.length - 1, Math.round(el.scrollLeft / cardW)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToCard = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = el.scrollWidth / BLOGS.length;
    el.scrollTo({ left: cardW * idx, behavior: "smooth" });
  };

  return (
    <section className="bg-[#f8fbff] py-10 md:py-[50px] lg:py-[90px] px-4 md:px-6">
      <div className="max-w-[1200px] mx-auto">

        {/* Centred heading */}
        <Reveal variant="fade-up" duration={700}>
          <div className="text-center mb-10 md:mb-12">
            <h2 className="font-[family-name:var(--font-gothic-a1)] font-bold text-[28px] sm:text-[36px] md:text-[42px] leading-[1.1] text-[#0f1728]">
              From the{" "}
              <span className="text-[#155eef]">EHSWatch</span> Blog
            </h2>
          </div>
        </Reveal>

        {/* Cards — horizontal snap-scroll carousel on phone; 2-col / 4-col grid sm+ / lg+ */}
        <div
          ref={scrollRef}
          className="
            flex sm:grid overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none
            sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6
            -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 sm:pb-0
            [scrollbar-width:none] [-ms-overflow-style:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {BLOGS.map((blog, i) => (
            <Reveal
              key={blog.title + i}
              variant="soft-up"
              delay={i * 90}
              duration={800}
              className="snap-start shrink-0 w-[88%] sm:w-auto sm:shrink"
            >
              <BlogCard blog={blog} />
            </Reveal>
          ))}
        </div>

        {/* Dot nav — mobile only */}
        <div className="flex sm:hidden justify-center gap-2 mt-5" role="tablist" aria-label="Blog carousel">
          {BLOGS.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={activeIdx === i}
              aria-label={`Go to blog post ${i + 1}`}
              onClick={() => scrollToCard(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIdx === i ? "w-6 bg-[#155eef]" : "w-2 bg-[#cbd5e1] hover:bg-[#94a3b8]"
              }`}
            />
          ))}
        </div>

        {/* View All CTA */}
        <Reveal variant="fade-up" duration={600} delay={200}>
          <div className="flex justify-center mt-10 md:mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-[family-name:var(--font-dm-sans)] font-semibold text-[14px] text-[#155eef] border border-[#c7d7fd] bg-white hover:bg-[#eff6ff] rounded-full px-7 py-3 transition-colors duration-200 group"
            >
              View All Articles
              <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
