"use client";

import { useInView } from "@/hooks/useInView";
import { basePath } from "@/lib/basePath";

const ICONS_BASE = basePath + "/images/Manual%20Safety%20Processes%20Are%20%20Slowing%20You%20Down";

const DEFAULT_PAIN_POINTS = [
  {
    iconSrc: ICONS_BASE + "/Data%20scattered%20across%20platforms.svg",
    label: "Data scattered across platforms",
    bobDuration: "3.2s", amplitude: "10px", bobDelay: "0s",
  },
  {
    iconSrc: ICONS_BASE + "/Delayed%20reporting%20and%20follow-up.svg",
    label: "Delayed reporting and follow-up",
    bobDuration: "3.8s", amplitude: "8px", bobDelay: "0.5s",
  },
  {
    iconSrc: ICONS_BASE + "/Limited%20visibility%20into%20problems.svg",
    label: "Limited visibility into problems",
    bobDuration: "3.5s", amplitude: "12px", bobDelay: "0.3s",
  },
  {
    iconSrc: ICONS_BASE + "/Reactive%20compliance%20checks.svg",
    label: "Reactive compliance checks",
    bobDuration: "3.0s", amplitude: "6px", bobDelay: "1.0s",
  },
];

// Bob animation parameters cycled when using CMS items
const BOB_PARAMS = [
  { bobDuration: "3.2s", amplitude: "10px", bobDelay: "0s" },
  { bobDuration: "3.8s", amplitude: "8px", bobDelay: "0.5s" },
  { bobDuration: "3.5s", amplitude: "12px", bobDelay: "0.3s" },
  { bobDuration: "3.0s", amplitude: "6px", bobDelay: "1.0s" },
];

export interface PainPointItem {
  label: string;
  description?: string;
  icon?: string;
}

interface PainPointsProps {
  cmsItems?: PainPointItem[];
}

// Concentric ring sizes (px). 4 rings only. Largest first so smaller rings sit on top.
const RING_SIZES = [1060, 800, 570, 340];

export default function PainPoints({ cmsItems }: PainPointsProps = {}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  const PAIN_POINTS =
    cmsItems && cmsItems.length > 0
      ? cmsItems.map((item, i) => {
          const bob = BOB_PARAMS[i % BOB_PARAMS.length];
          return {
            iconSrc: item.icon ?? "",
            label: item.label,
            ...bob,
          };
        })
      : DEFAULT_PAIN_POINTS;

  const [tl, tr, bl, br] = PAIN_POINTS;

  return (
    <section
      ref={ref}
      className="relative py-4 md:py-8 px-4 md:px-6 pb-10 md:pb-14 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 30% 40% at center, #eef4ff 0%, #f5f8ff 35%, #fafbff 65%, #ffffff 100%)",
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
              border: `1px solid rgba(21,94,239,${0.05 + i * 0.03})`,
              animation: `ring-pulse ${7 + i * 0.3}s ease-in-out ${i * 0.1}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-[1100px] mx-auto z-10">
        {/* Desktop layout */}
        <div className="hidden md:flex flex-col gap-5 lg:gap-[24px] items-center py-3 lg:py-6">
          <div className="flex justify-between w-full max-w-[850px]">
            <PainPill {...tl} />
            <PainPill {...tr} />
          </div>

          <div className="text-center">
            <p className="font-[family-name:var(--font-gothic-a1)] font-bold text-[24px] lg:text-[32px] leading-tight lg:leading-[48px] text-[#1b1b1b] tracking-[-0.5px] lg:tracking-[-0.6px]">
              Manual Safety Processes Are
            </p>
            <p className="font-[family-name:var(--font-gothic-a1)] font-bold text-[24px] lg:text-[32px] leading-tight lg:leading-[48px] text-[#155eef] tracking-[-0.5px] lg:tracking-[-0.6px]">
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
      className="flex items-center gap-2 sm:gap-[10px] pl-2 sm:pl-[10px] pr-3 sm:pr-[16px] py-1.5 sm:py-[8px] rounded-full border border-[rgba(0,96,249,0.18)] bg-[rgba(255,255,255,0.94)] backdrop-blur-[3px] shadow-[0px_3px_8px_rgba(59,130,246,0.1)] shrink-0"
      style={{
        animation: `chip-sine ${bobDuration} ${bobDelay} ease-in-out infinite alternate`,
        ["--bob-amp" as string]: amplitude,
      }}
    >
      <div className="w-9 h-9 sm:w-[40px] sm:h-[40px] rounded-full bg-[#dbeafe] flex items-center justify-center shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={iconSrc} alt="" className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px]" style={{ filter: "brightness(0) saturate(100%) invert(20%) sepia(90%) saturate(2000%) hue-rotate(213deg) brightness(85%)" }} />
      </div>
      <span className="font-[family-name:var(--font-dm-sans)] font-medium text-[11px] sm:text-[12px] lg:text-[14px] leading-normal text-[#0a0f1e] tracking-[-0.2px] lg:tracking-[-0.3px] whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}
