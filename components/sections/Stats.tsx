"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { useInView } from "@/hooks/useInView";

const STATS = [
  { target: 20, display: (n: number) => `${Math.round(n)}`, suffix: "+", desc1: "Years of proven expertise in", desc2: "EHS management" },
  { target: 25000, display: (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 25000 ? 0 : 1)}K` : `${Math.round(n)}`), suffix: "+", desc1: "Professionals across industries", desc2: "rely on our platform daily" },
  { target: 95, display: (n: number) => `${Math.round(n)}`, suffix: "%", desc1: "Users rate us highly for ease of", desc2: "use and workflow impact" },
  { target: 60, display: (n: number) => `${Math.round(n)}`, suffix: "%", desc1: "Reduction in incident reporting", desc2: "time across teams" },
];

const DURATION = 2000; // ms
// ease-out-cubic
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function Counter({
  target,
  display,
  start,
  delay,
}: {
  target: number;
  display: (n: number) => string;
  start: boolean;
  delay: number;
}) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;
    startedRef.current = true;
    let raf = 0;
    let startTime = 0;
    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime - delay;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(1, elapsed / DURATION);
      setValue(target * easeOut(progress));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, delay]);

  return <>{display(value)}</>;
}

export default function Stats() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section ref={ref} className="bg-white py-8 md:py-[40px] lg:py-[60px]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-[32px] grid grid-cols-2 lg:grid-cols-4 gap-y-10">
        {STATS.map((stat, i) => (
          <Reveal
            key={stat.desc1}
            variant={i % 2 === 0 ? "slide-right" : "slide-left"}
            delay={i * 100}
            duration={700}
            className="flex flex-col gap-2 md:gap-[13.3px] items-center px-2 md:px-4 lg:px-[40px] py-2 md:py-[16px]"
          >
            <div className="flex items-baseline tabular-nums">
              <span className="font-[family-name:var(--font-gothic-a1)] font-semibold text-[34px] sm:text-[44px] md:text-[56px] lg:text-[66px] leading-none tracking-[-1px] sm:tracking-[-1.5px] md:tracking-[-2.97px] text-[#0a1628]">
                <Counter target={stat.target} display={stat.display} start={inView} delay={i * 120} />
              </span>
              <span className="font-[family-name:var(--font-gothic-a1)] font-semibold text-[18px] sm:text-[24px] md:text-[30px] lg:text-[34px] leading-none tracking-[-0.4px] md:tracking-[-0.68px] text-[#0a1628]">
                {stat.suffix}
              </span>
            </div>

            <div className="flex flex-col items-center max-w-[140px] sm:max-w-[190px]">
              <p className="font-[family-name:var(--font-dm-sans)] font-normal text-[12px] md:text-[14px] lg:text-[16px] leading-tight md:leading-[24.1px] text-[#404040] text-center">
                {stat.desc1} {stat.desc2}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
