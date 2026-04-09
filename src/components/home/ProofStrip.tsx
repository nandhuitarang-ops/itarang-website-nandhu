"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { staggerContainer, staggerItem, hoverLift } from "@/lib/animations";
import { useInView } from "react-intersection-observer";

const proofStats = [
  {
    value: 1000,
    suffix: "+",
    label: "Batteries monitored live",
    gradient: "from-brand-400 to-brand-600",
    glow: "rgba(6, 182, 212, 0.2)",
  },
  {
    value: 50,
    suffix: "+",
    label: "Dealer partners",
    gradient: "from-blue-400 to-blue-600",
    glow: "rgba(59, 130, 246, 0.2)",
  },
  {
    value: 99,
    suffix: "%",
    label: "Recovery rate",
    gradient: "from-emerald-400 to-emerald-600",
    glow: "rgba(16, 185, 129, 0.2)",
  },
  {
    value: 5,
    suffix: "",
    label: "Financer tie-ups",
    gradient: "from-amber-400 to-amber-600",
    glow: "rgba(245, 158, 11, 0.2)",
  },
] as const;

export default function ProofStrip() {
  const containerRef = useRef<HTMLElement>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={containerRef}
      className="py-28 md:py-36 relative overflow-hidden"
    >
      {/* Sticky parallax background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0"
      >
        {/* Dark gradient base */}
        <div className="absolute inset-0 bg-dark-950" />

        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(6,182,212,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_80%,rgba(139,92,246,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_20%_60%,rgba(245,158,11,0.08),transparent)]" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      <div className="mx-auto max-w-6xl px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          {/* Section label */}
          <motion.p
            variants={staggerItem}
            className="text-center text-sm font-semibold text-white/30 uppercase tracking-[0.25em] mb-16"
          >
            Traction to date
          </motion.p>

          {/* Stats grid */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {proofStats.map((stat, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                initial="rest"
                whileHover="hover"
              >
                <motion.div
                  variants={hoverLift}
                  className="relative group"
                >
                  {/* Glow background */}
                  <div
                    className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{ background: stat.glow }}
                  />

                  {/* Card */}
                  <div className="relative glass-dark rounded-2xl p-8 text-center border border-white/5 hover:border-white/10 transition-all duration-300">
                    {/* Top gradient line */}
                    <div
                      className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-gradient-to-r ${stat.gradient} opacity-60`}
                    />

                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      label={stat.label}
                      className={stat.gradient}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
