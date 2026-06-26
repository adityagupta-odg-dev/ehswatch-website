import Reveal from "@/components/ui/Reveal";

interface ProductOverviewProps {
  cmsHeading?: string;
  cmsBody?: string;
  cmsImage?: { url: string; alt: string } | null;
}

const DEFAULT_HEADING = "The Platform Built for EHSQ";
const DEFAULT_BODY =
  "EHSWatch is built for EHSQ teams that cannot afford gaps — in reporting, in visibility, or in response. " +
  "Integrated modules cover every core EHSQ workflow, connected on a single platform that works on any device, online or offline. " +
  "No integrations to maintain. No data living in separate systems.\n\n" +
  "Just one place where every incident, audit, permit and training record feeds into the same operational picture — " +
  "giving every team member, from the field worker to the board, the clarity they need to act.";

export default function ProductOverview({
  cmsHeading,
  cmsBody,
  cmsImage,
}: ProductOverviewProps = {}) {
  const heading = cmsHeading ?? DEFAULT_HEADING;
  const body    = cmsBody    ?? DEFAULT_BODY;

  // Split body on double-newline into paragraphs for rendering
  const paragraphs = body.split(/\n\n+/).filter(Boolean);

  return (
    <section className="bg-white py-[60px] md:py-[100px] lg:py-[120px]">
      <div className="max-w-[1160px] mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-[1fr_1.25fr] gap-8 md:gap-[96px] items-start">
        {/* Left sticky label */}
        <div className="md:sticky md:top-[120px]">
          <h2 className="font-[family-name:var(--font-gothic-a1)] font-bold text-[28px] sm:text-[32px] md:text-[40px] leading-[1.12] text-[#1b1b1b] tracking-[-0.03em]">
            {cmsHeading ? (
              heading
            ) : (
              <>
                The Platform <span className="text-[#155eef]">Built for EHSQ</span>
              </>
            )}
          </h2>
          <p className="mt-4 font-[family-name:var(--font-dm-sans)] text-[14px] text-[#9ca3af] leading-relaxed">
            No gaps. No silos. No workarounds.
          </p>
          {cmsImage?.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cmsImage.url}
              alt={cmsImage.alt ?? ""}
              className="mt-8 w-full rounded-xl object-cover"
            />
          )}
        </div>
        {/* Right body */}
        <div className="flex flex-col gap-7">
          {paragraphs.map((para, i) => (
            <Reveal key={i} variant="fade-up" duration={700} delay={i * 120}>
              <p className="font-[family-name:var(--font-dm-sans)] text-[16px] md:text-[17px] leading-[1.78] tracking-[-0.011em]">
                {para}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
