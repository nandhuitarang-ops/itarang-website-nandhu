"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  label,
  duration = 2.5,
  className,
}: AnimatedCounterProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div ref={ref} className="text-center">
      <div
        className={cn(
          "text-4xl sm:text-5xl lg:text-6xl font-bold",
          className ? `bg-gradient-to-r ${className} bg-clip-text text-transparent` : "text-white"
        )}
      >
        {inView ? (
          <CountUp
            start={0}
            end={value}
            duration={duration}
            prefix={prefix}
            suffix={suffix}
            separator=","
          />
        ) : (
          <span>
            {prefix}0{suffix}
          </span>
        )}
      </div>
      <p className="mt-3 text-sm sm:text-base text-white/60 font-medium">{label}</p>
    </div>
  );
}
