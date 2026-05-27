"use client";

import { useInView } from "@/hooks/useInView";
import { basePath } from "@/lib/basePath";

const ICONS_BASE = basePath + "/images/Manual%20Safety%20Processes%20Are%20%20Slowing%20You%20Down";

const PAIN_POINTS = [
  {
    iconSrc: ICONS_BASE + "/Data%20scattered%20across%20platforms.svg",
    label: "Data scattered across platforms",
    bobDuration: "1.6s", amplitude: "10px", bobDelay: "0s",
  },
  {
    iconSrc: ICONS_BASE + "/Delayed%20reporting%20and%20follow-up.svg",
    label: "Delayed reporting and follow-up",
    bobDuration: "1.9s", amplitude: "8px", bobDelay: "0.3s",
  },
  {
    iconSrc: ICONS_BASE + "/Limited%20visibility%20into%20problems.svg",
    label: "Limited visibility into problems",
    bobDuration: "1.7s", amplitude: "12px", bobDelay: "0.15s",
  },
  {
    iconSrc: ICONS_BASE + "/Reactive%20compliance%20checks.svg",
    label: "Reactive compliance checks",
    bobDuration: "1.5s", amplitude: "6px", bobDelay: "0.6s",
  },
];

// Concentric ring sizes (px). 4 rings only. Largest first so smaller rings sit on top.
const RING_SIZES = [1060, 800, 570, 340];

export default function PainPoints() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [tl, tr, bl, br] = PAIN_POINTS;

  return (
    <section
      ref={ref}
      className="relative py-8 md:py-12 px-4 md:px-6 pb-16 md:pb-20 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 45% 55% at center, #e8f1ff 0%, #f1f6ff 30%, #f8faff 60%, #ffffff 100%)",
      }}
    >
      {/* Bottom fade blend into metrics section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-20"
        style={{ background: "linear-gradient(to bottom, transparent 0%, #ffffff 100%)" }}
        aria-hidden
      />

      {/* Concentric rings — desktop only */}
      <div
        className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        {RING_SIZES.map((size, i) => (
          <div
            key={size}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              border: `1px solid rgba(21,94,239,${0.044 + (RING_SIZES.length - i) * 0.0132})`,
              animation: `ring-pulse ${7 + i * 0.3}s ease-in-out ${i * 0.1}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-[1100px] mx-auto z-10">
        {/* Desktop layout */}
        <div className="hidden md:flex flex-col gap-8 lg:gap-[33px] items-center py-8 lg:py-12">
          <div className="flex justify-between w-full max-w-[850px]">
            <PainPill {...tl} />
            <PainPill {...tr} />
          </div>

          <div className="text-center">
            <p className="font-[family-name:var(--font-gothic-a1)] font-bold text-[32px] lg:text-[42px] leading-tight lg:leading-[62px] text-[#1b1b1b] tracking-[-0.5px] lg:tracking-[-0.896px]">
              Manual Safety Processes Are
            </p>
            <p className="font-[family-name:var(--font-gothic-a1)] font-bold text-[32px] lg:text-[42px] leading-tight lg:leading-[62px] text-[#155eef] tracking-[-0.5px] lg:tracking-[-0.896px]">
              Slowing You Down
            </p>
          </div>

          <div className="flex justify-between w-full max-w-[850px]">
            <PainPill {...bl} />
            <PainPill {...br} />
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden flex flex-col gap-6 items-center py-8">
          <div className="text-center">
            <p className="font-[family-name:var(--font-gothic-a1)] font-bold text-[26px] sm:text-[30px] leading-tight text-[#1b1b1b] tracking-[-0.5px]">
              Manual Safety Processes Are
            </p>
            <p className="font-[family-name:var(--font-gothic-a1)] font-bold text-[26px] sm:text-[30px] leading-tight text-[#155eef] tracking-[-0.5px]">
              Slowing You Down
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full max-w-[400px]">
            {PAIN_POINTS.map((p) => (
              <PainPill key={p.label} {...p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PainPill({
  iconSrc,
  label,
  bobDuration,
  amplitude,
  bobDelay,
}: {
  iconSrc: string;
  label: string;
  bobDuration: string;
  amplitude: string;
  bobDelay: string;
}) {
  return (
    <div
      className="flex items-center gap-2 sm:gap-[12px] pl-2.5 sm:pl-[13px] pr-3 sm:pr-[21px] py-2 sm:py-[13px] rounded-full border border-[rgba(0,96,249,0.18)] bg-[rgba(255,255,255,0.94)] backdrop-blur-[3px] shadow-[0px_3px_8px_rgba(59,130,246,0.1)] shrink-0"
      style={{
        animation: `chip-sine ${bobDuration} ${bobDelay} ease-in-out infinite alternate`,
        ["--bob-amp" as string]: amplitude,
      }}
    >
      <div className="w-10 h-10 sm:w-[46px] sm:h-[46px] rounded-full bg-[#155eef] flex items-center justify-center shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={iconSrc} alt="" className="w-5 h-5 sm:w-[24px] sm:h-[24px]" style={{ filter: "brightness(0) invert(1)" }} />
      </div>
      <span className="font-[family-name:var(--font-dm-sans)] font-medium text-[11px] sm:text-[12px] lg:text-[14px] leading-normal text-[#0a0f1e] tracking-[-0.2px] lg:tracking-[-0.3px] whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}
