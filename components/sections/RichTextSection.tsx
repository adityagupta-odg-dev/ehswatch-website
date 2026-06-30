interface RichTextSectionProps {
  heading?: string;
  subheading?: string;
  body?: string;
  updatedAt?: string;
}

export default function RichTextSection({
  heading,
  subheading,
  body,
  updatedAt,
}: RichTextSectionProps = {}) {
  if (!heading && !body) return null;

  return (
    <section className="py-[64px] md:py-[90px] px-4 md:px-6 bg-white">
      <style>{`
        .legal-prose h1 {
          font-family: var(--font-gothic-a1), sans-serif;
          font-weight: 700;
          font-size: clamp(1.5rem, 3vw, 2rem);
          color: #0a0f1e;
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }
        .legal-prose h2 {
          font-family: var(--font-gothic-a1), sans-serif;
          font-weight: 700;
          font-size: clamp(1.2rem, 2.5vw, 1.5rem);
          color: #0a0f1e;
          margin-top: 2.25rem;
          margin-bottom: 0.6rem;
          line-height: 1.25;
          letter-spacing: -0.015em;
          padding-bottom: 0.4rem;
          border-bottom: 1.5px solid #f0f4ff;
        }
        .legal-prose h3 {
          font-family: var(--font-gothic-a1), sans-serif;
          font-weight: 600;
          font-size: 1.05rem;
          color: #1e293b;
          margin-top: 1.75rem;
          margin-bottom: 0.4rem;
          line-height: 1.3;
        }
        .legal-prose h4 {
          font-family: var(--font-dm-sans), sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          color: #334155;
          margin-top: 1.25rem;
          margin-bottom: 0.3rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .legal-prose p {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 0.9625rem;
          color: #374151;
          line-height: 1.85;
          margin-bottom: 1rem;
        }
        .legal-prose ul,
        .legal-prose ol {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 0.9625rem;
          color: #374151;
          line-height: 1.85;
          margin-bottom: 1.1rem;
          padding-left: 1.5rem;
        }
        .legal-prose ul { list-style-type: disc; }
        .legal-prose ol { list-style-type: decimal; }
        .legal-prose li { margin-bottom: 0.35rem; }
        .legal-prose li::marker { color: #1d4ed8; }
        .legal-prose strong { font-weight: 600; color: #0a0f1e; }
        .legal-prose em { font-style: italic; color: #4b5563; }
        .legal-prose a {
          color: #1d4ed8;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.15s;
        }
        .legal-prose a:hover { color: #1e40af; }
        .legal-prose blockquote {
          border-left: 3px solid #1d4ed8;
          padding: 0.6rem 1.25rem;
          margin: 1.25rem 0;
          background: #f8faff;
          border-radius: 0 6px 6px 0;
          font-style: italic;
          color: #4b5563;
        }
        .legal-prose hr {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 2rem 0;
        }
        .legal-prose table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
          margin-bottom: 1.25rem;
        }
        .legal-prose th {
          background: #f0f5ff;
          font-weight: 600;
          color: #0a0f1e;
          padding: 0.6rem 0.9rem;
          text-align: left;
          border: 1px solid #dbeafe;
        }
        .legal-prose td {
          padding: 0.55rem 0.9rem;
          border: 1px solid #e5e7eb;
          color: #374151;
          vertical-align: top;
        }
        .legal-prose tr:nth-child(even) td { background: #f9fafb; }
        .legal-prose > *:first-child { margin-top: 0; }
        .legal-prose > *:last-child { margin-bottom: 0; }
      `}</style>

      <div className="max-w-[860px] mx-auto">
        {/* Section header */}
        {(heading || subheading) && (
          <div className="mb-10 pb-8 border-b border-gray-100">
            {heading && (
              <h2 className="font-[family-name:var(--font-gothic-a1)] font-bold text-[24px] sm:text-[30px] text-[#0a0f1e] leading-snug tracking-[-0.02em] mb-2">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="font-[family-name:var(--font-dm-sans)] text-[15px] text-[#6b7280] leading-[1.7]">
                {subheading}
              </p>
            )}
            {updatedAt && (
              <p className="font-[family-name:var(--font-dm-sans)] text-[13px] text-[#9ca3af] mt-3">
                Last updated: {updatedAt}
              </p>
            )}
          </div>
        )}

        {/* Rich text body */}
        {body && (
          <div
            className="legal-prose"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        )}
      </div>
    </section>
  );
}
