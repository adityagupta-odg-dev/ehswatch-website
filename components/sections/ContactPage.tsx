import DynamicCmsForm from "@/components/ui/DynamicCmsForm";
import type { CmsForm } from "@/lib/types";

export interface ContactOfficeItem {
  label: string;
  description: string;
}

export interface ContactPageProps {
  heroHeadline?: string;
  heroSubheadline?: string;
  officeItems?: ContactOfficeItem[];
  formAttrs: CmsForm["attributes"];
}

const DEFAULT_OFFICE_ITEMS: ContactOfficeItem[] = [
  { label: "USA Office", description: "7138 Sale Ave,\nWest Hills, CA 91307, USA" },
  { label: "India Office", description: "Awfis Space Solutions,\nHyderabad, Telangana, India" },
  { label: "Email", description: "sales@ehswatch.com" },
];

export default function ContactPage({
  heroHeadline,
  heroSubheadline,
  officeItems,
  formAttrs,
}: ContactPageProps) {
  const resolvedOfficeItems =
    officeItems && officeItems.length > 0 ? officeItems : DEFAULT_OFFICE_ITEMS;

  return (
    <>
      {/* ── Banner ── */}
      <section className="relative overflow-hidden flex items-center justify-center px-6 pt-[148px] pb-[40px]">
        <style>{`
          .ct-grid {
            background-image:
              linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px);
            background-size: 50px 50px;
          }
          @keyframes ctBoxFill { 0%,100%{opacity:0} 50%{opacity:0.5} }
          .ct-box { position:absolute; width:48px; height:48px; }
        `}</style>

        <div className="absolute inset-0 overflow-hidden ct-grid pointer-events-none">
          {Array.from({ length: 200 }, (_, i) => {
            const shouldAnimate = (i * 7 + i * 3) % 17 === 0;
            const colors = ["#EFF6FF", "#DBEAFE", "#BFDBFE", "#93C5FD"];
            return shouldAnimate ? (
              <div
                key={i}
                className="ct-box"
                style={{
                  left: `${(i % 20) * 50 + 1}px`,
                  top: `${Math.floor(i / 20) * 50 + 1}px`,
                  backgroundColor: colors[i % 4],
                  animation: `ctBoxFill ${4 + ((i * 2) % 6)}s ease-in-out infinite`,
                  animationDelay: `${(i * 0.3) % 12}s`,
                }}
              />
            ) : null;
          })}
          <div
            className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.9) 60%, #fff 100%)",
            }}
          />
        </div>

        <div className="relative z-20 max-w-[700px] w-full mx-auto text-center flex flex-col items-center gap-4">
          <h1
            className="font-[family-name:var(--font-gothic-a1)] font-bold text-[36px] sm:text-[52px] md:text-[64px] leading-[1.05] tracking-[-0.03em] text-[#0a0f1e] animate-hero-rise"
            style={{ animationDelay: "80ms" }}
            dangerouslySetInnerHTML={{
              __html:
                heroHeadline ??
                'Get in Touch with <span style="color:#1d4ed8">Our Team</span>',
            }}
          />
          <p
            className="font-[family-name:var(--font-dm-sans)] text-[15px] sm:text-[17px] leading-[1.8] text-[#6b7280] max-w-[520px] text-pretty animate-hero-rise"
            style={{ animationDelay: "180ms" }}
          >
            {heroSubheadline ??
              "Reach out for demos, onboarding support, or to discuss how EHSWatch fits your organisation."}
          </p>
        </div>
      </section>

      {/* ── Contact section ── */}
      <section className="bg-white px-6 sm:px-10 lg:px-20 pt-[36px] pb-[72px] md:pt-[48px] md:pb-[96px]">
        <div className="max-w-[1180px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-14 lg:gap-24">
            {/* ── Left: contact info ── */}
            <div className="flex flex-col gap-9">
              {resolvedOfficeItems.map((item, idx) => (
                <div key={idx}>
                  <p className="font-[family-name:var(--font-dm-sans)] text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9ca3af] mb-2.5">
                    {item.label}
                  </p>
                  <p className="font-[family-name:var(--font-dm-sans)] text-[14px] leading-[1.8] text-[#374151] text-pretty whitespace-pre-line">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* ── Right: dynamic CMS form ── */}
            <DynamicCmsForm formAttrs={formAttrs} slug="contact" variant="contact" />
          </div>
        </div>
      </section>
    </>
  );
}
