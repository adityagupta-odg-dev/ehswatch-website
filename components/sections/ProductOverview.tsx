import Reveal from "@/components/ui/Reveal";

export default function ProductOverview() {
  return (
    <section className="bg-white py-[40px] md:py-[60px] lg:py-[100px]">
      <div className="max-w-[1160px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-8 lg:gap-[96px] items-start">
        {/* Left sticky label */}
        <div className="lg:sticky lg:top-[120px]">
          <h2 className="font-[family-name:var(--font-gothic-a1)] font-bold text-[28px] sm:text-[32px] md:text-[40px] leading-[1.5] sm:leading-[1.12] text-[#1b1b1b] tracking-[-0.03em]">
            The Platform <span className="text-[#155eef]">Built for EHSQ</span>
          </h2>
          <p className="mt-4 font-[family-name:var(--font-dm-sans)] text-[14px] text-[#9ca3af] leading-relaxed">
            No gaps. No silos. No workarounds.
          </p>
        </div>
        {/* Right body */}
        <div className="flex flex-col gap-7">
          <Reveal variant="fade-up" duration={700}>
            <p className="font-[family-name:var(--font-dm-sans)] text-[16px] md:text-[17px] leading-[1.78] tracking-[-0.011em]">
              EHSWatch is built for EHSQ teams that <strong className="font-semibold text-[#1b1b1b]">cannot afford gaps</strong> — in reporting, in visibility, or in response. Integrated modules cover every core EHSQ workflow, connected on a single platform that <strong className="font-semibold text-[#1b1b1b]">works on any device, online or offline</strong>. No integrations to maintain. No data living in separate systems.
            </p>
          </Reveal>
          <Reveal variant="fade-up" duration={700} delay={120}>
            <p className="font-[family-name:var(--font-dm-sans)] text-[16px] md:text-[17px] leading-[1.78] tracking-[-0.011em]">
              Just <strong className="font-semibold text-[#1b1b1b]">one place</strong> where every incident, audit, permit and training record feeds into the same operational picture — giving every team member, from the field worker to the board, the clarity they need to act.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
