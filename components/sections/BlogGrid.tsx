"use client";

import { useState, useMemo } from "react";
import { basePath } from "@/lib/basePath";

/* ── Data ───────────────────────────────────────────────────── */
interface Post {
  slug: string;
  category: string;
  topic: string;
  format: string;
  title: string;
  date: string;
  dateSort: number;
  readTime: string;
  img: string;
}

const POSTS: Post[] = [
  {
    slug: "near-miss-reporting-culture",
    category: "Incident Management",
    topic: "Incident Management",
    format: "Article",
    title: "How to Build a Near-Miss Reporting Culture That Actually Works",
    date: "May 8, 2026",
    dateSort: 1746662400000,
    readTime: "6 min read",
    img: `${basePath}/images/blogs/blog-1.png`,
  },
  {
    slug: "iso-45001-transition",
    category: "Compliance",
    topic: "Compliance",
    format: "Guide",
    title: "ISO 45001 vs OHSAS 18001: What the Transition Really Means for Your Team",
    date: "Apr 29, 2026",
    dateSort: 1745884800000,
    readTime: "8 min read",
    img: `${basePath}/images/blogs/blog-2.png`,
  },
  {
    slug: "leading-indicators-safety",
    category: "Risk & Analytics",
    topic: "Risk Management",
    format: "Article",
    title: "5 Leading Indicators Every Safety Manager Should Be Tracking",
    date: "Apr 14, 2026",
    dateSort: 1744588800000,
    readTime: "5 min read",
    img: `${basePath}/images/blogs/blog-3.png`,
  },
  {
    slug: "cost-manual-incident-reporting",
    category: "Operations",
    topic: "Operations",
    format: "Article",
    title: "The Hidden Cost of Manual Incident Reporting",
    date: "Apr 2, 2026",
    dateSort: 1743552000000,
    readTime: "7 min read",
    img: `${basePath}/images/blogs/blog-1.png`,
  },
  {
    slug: "contractor-safety-management",
    category: "Contractor Management",
    topic: "Contractor Management",
    format: "Guide",
    title: "Contractor Safety Management: Where Most Programmes Fall Short",
    date: "Mar 18, 2026",
    dateSort: 1742256000000,
    readTime: "9 min read",
    img: `${basePath}/images/blogs/blog-2.png`,
  },
  {
    slug: "lagging-to-leading-metrics",
    category: "Risk & Analytics",
    topic: "Risk Management",
    format: "Case Study",
    title: "From Lagging to Leading: Rethinking Your Safety Metrics",
    date: "Mar 5, 2026",
    dateSort: 1741132800000,
    readTime: "6 min read",
    img: `${basePath}/images/blogs/blog-3.png`,
  },
];

const TIMELINE_OPTIONS = ["Timeline: All time", "Last month", "Last 3 months", "This year"];
const TOPIC_OPTIONS    = ["Topic: All topics", "Incident Management", "Compliance", "Risk Management", "Operations", "Contractor Management"];
const FORMAT_OPTIONS   = ["Format: All formats", "Article", "Guide", "Case Study"];

/* ── Category chip ───────────────────────────────────────────── */
function Chip({ label }: { label: string }) {
  return (
    <span
      className="absolute top-3 left-3 font-[family-name:var(--font-dm-sans)] text-[11px] font-medium px-2.5 py-[5px] rounded-[6px] leading-none z-10"
      style={{ background: "white", color: "#111827" }}
    >
      {label}
    </span>
  );
}

/* ── Featured Card (Row 1): image left, text right ───────────── */
function FeaturedCard({ post }: { post: Post }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={`/blog/${post.slug}/`}
      className="group flex flex-col lg:flex-row bg-white overflow-hidden h-full"
      style={{
        border: "1px solid #E5E7EB",
        borderRadius: 12,
        boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.10)" : "none",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image — full width below desktop (16/9 on phone, 4/3 on iPad), 47% square on desktop */}
      <div
        className="relative flex-shrink-0 overflow-hidden w-full lg:w-[47%] aspect-[16/9] sm:aspect-[4/3] lg:aspect-square"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.img}
          alt={post.title}
          className="w-full h-full object-cover rounded-t-[11px] lg:rounded-t-none lg:rounded-l-[11px] block"
          style={{
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        />
        <Chip label={post.category} />
        {/* Arrow — always visible, brightens on hover */}
        <div
          className="absolute bottom-3 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center"
          style={{
            boxShadow: "0 1px 6px rgba(0,0,0,0.12)",
            opacity: hovered ? 1 : 0.7,
            transition: "opacity 0.2s",
          }}
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 9.5l7-7M9.5 2.5H3.5M9.5 2.5v6" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Text — bottom on iPad, right (vertically centered) on desktop */}
      <div className="flex flex-col justify-center px-5 py-5 lg:px-7 lg:py-7 flex-1">
        <p className="font-[family-name:var(--font-dm-sans)] text-[12px] mb-3 flex items-center gap-1.5" style={{ color: "#6B7280" }}>
          {post.date}
          <span className="inline-block w-[3px] h-[3px] rounded-full" style={{ background: "#6B7280" }} />
          {post.readTime}
        </p>
        <h3
          className="font-[family-name:var(--font-gothic-a1)] font-semibold text-[17px] leading-[1.35] mb-4 lg:mb-5"
          style={{ color: "#111827" }}
        >
          {post.title}
        </h3>
        <span
          className="inline-flex items-center gap-1.5 text-[13px] font-medium font-[family-name:var(--font-dm-sans)]"
          style={{
            color: hovered ? "#111827" : "#6B7280",
            transition: "color 0.2s",
          }}
        >
          Read more
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    </a>
  );
}

/* ── Standard Card (Row 2): image top, text bottom ───────────── */
function StandardCard({ post }: { post: Post }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={`/blog/${post.slug}/`}
      className="group flex flex-col bg-white overflow-hidden h-full"
      style={{
        border: "1px solid #E5E7EB",
        borderRadius: 12,
        boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.10)" : "none",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 4:3 image */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ aspectRatio: "4/3" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.img}
          alt={post.title}
          className="w-full h-full object-cover"
          style={{
            borderRadius: "11px 11px 0 0",
            display: "block",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        />
        <Chip label={post.category} />
      </div>

      {/* Text */}
      <div className="flex flex-col px-5 pt-4 pb-5 flex-1">
        <p className="font-[family-name:var(--font-dm-sans)] text-[12px] mb-2.5 flex items-center gap-1.5" style={{ color: "#6B7280" }}>
          {post.date}
          <span className="inline-block w-[3px] h-[3px] rounded-full" style={{ background: "#6B7280" }} />
          {post.readTime}
        </p>
        <h3
          className="font-[family-name:var(--font-gothic-a1)] font-semibold text-[17px] leading-[1.35] line-clamp-2 mb-4 flex-1"
          style={{ color: "#111827" }}
        >
          {post.title}
        </h3>
        <span
          className="inline-flex items-center gap-1.5 text-[13px] font-medium font-[family-name:var(--font-dm-sans)]"
          style={{
            color: hovered ? "#111827" : "#6B7280",
            transition: "color 0.2s",
          }}
        >
          Read more
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    </a>
  );
}

/* ── Filter select ───────────────────────────────────────────── */
function FilterSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  const isDefault = value === options[0];
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none font-[family-name:var(--font-dm-sans)] text-[13px] bg-white rounded-full pl-4 pr-8 py-[9px] border cursor-pointer focus:outline-none focus:border-[#111827] transition-colors"
        style={{
          WebkitAppearance: "none",
          borderColor: isDefault ? "#E5E7EB" : "#111827",
          color:       isDefault ? "#6B7280" : "#111827",
          fontWeight:  isDefault ? 400 : 600,
        }}
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 4.5L6 8l3.5-3.5" stroke="#9ca3af" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────── */
export default function BlogGrid() {
  const [search,   setSearch]   = useState("");
  const [timeline, setTimeline] = useState(TIMELINE_OPTIONS[0]);
  const [topic,    setTopic]    = useState(TOPIC_OPTIONS[0]);
  const [format,   setFormat]   = useState(FORMAT_OPTIONS[0]);

  const filtered = useMemo(() => {
    const now = Date.now();
    return POSTS.filter((p) => {
      if (search) {
        const q = search.toLowerCase();
        if (!p.title.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q)) return false;
      }
      if (timeline === "Last month"    && now - p.dateSort > 30  * 86400000) return false;
      if (timeline === "Last 3 months" && now - p.dateSort > 90  * 86400000) return false;
      if (timeline === "This year"     && now - p.dateSort > 365 * 86400000) return false;
      if (!topic.startsWith("Topic:")   && p.topic  !== topic)  return false;
      if (!format.startsWith("Format:") && p.format !== format) return false;
      return true;
    });
  }, [search, timeline, topic, format]);

  const featured = filtered.slice(0, 2);
  const standard = filtered.slice(2);

  return (
    <section className="pt-8 pb-12 md:pt-10 md:pb-16 lg:pt-[48px] lg:pb-[80px] px-4 md:px-6 lg:px-8" style={{ background: "#FFFFFF" }}>
      <div className="max-w-[1280px] mx-auto">

        {/* ── Search + Filters — centred, max 720px ─────────────── */}
        <div className="flex flex-col gap-3 mb-12 max-w-[720px] mx-auto">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" width="15" height="15" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="#9ca3af" strokeWidth="1.5"/>
              <path d="M11 11l2.5 2.5" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by keyword, topic, regulation, site issue..."
              autoComplete="off"
              className="w-full font-[family-name:var(--font-dm-sans)] text-[14px] placeholder-[#9ca3af] bg-[#f9fafb] rounded-full pl-10 pr-5 py-[12px] border border-[#E5E7EB] focus:outline-none focus:border-[#111827] transition-colors"
              style={{ color: "#111827" }}
            />
          </div>

          {/* Filter pills — centred */}
          <div className="flex flex-wrap justify-center gap-2">
            <FilterSelect value={timeline} onChange={setTimeline} options={TIMELINE_OPTIONS} />
            <FilterSelect value={topic}    onChange={setTopic}    options={TOPIC_OPTIONS} />
            <FilterSelect value={format}   onChange={setFormat}   options={FORMAT_OPTIONS} />
          </div>
        </div>

        {/* ── Grid ────────────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-[family-name:var(--font-dm-sans)] text-[15px]" style={{ color: "#9ca3af" }}>
              No articles match your filters.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Row 1 — featured 2-col */}
            {featured.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featured.map((p) => <FeaturedCard key={p.slug} post={p} />)}
                {featured.length === 1 && <div className="hidden md:block" />}
              </div>
            )}

            {/* Row 2 — standard cards: 1 col phone, 2 cols iPad, 4 cols desktop */}
            {standard.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {standard.map((p) => <StandardCard key={p.slug} post={p} />)}
              </div>
            )}
          </div>
        )}

        {/* Load more */}
        {filtered.length >= 6 && (
          <div className="flex justify-center mt-12">
            <button
              className="inline-flex items-center gap-2 px-7 py-[11px] rounded-full font-[family-name:var(--font-dm-sans)] font-medium text-[14px] bg-white border transition-all duration-200 hover:border-[#111827]"
              style={{ borderColor: "#E5E7EB", color: "#374151" }}
            >
              Load More Articles
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
