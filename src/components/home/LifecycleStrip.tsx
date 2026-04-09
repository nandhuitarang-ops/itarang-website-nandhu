"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Banknote,
  Truck,
  Activity,
  Wrench,
  RotateCcw,
  Recycle,
  ArrowRight,
} from "lucide-react";
import { staggerContainer, staggerItem, hoverLift } from "@/lib/animations";
import { useInView } from "react-intersection-observer";

const stages = [
  {
    icon: Banknote,
    label: "Finance",
    description: "Drivers get a lithium battery on EMI. NBFCs get IoT-backed risk data before they approve.",
    stat: "18-month tenure",
    statLabel: "Avg. Loan",
    color: "from-blue-500 to-indigo-600",
    glowColor: "rgba(59, 130, 246, 0.3)",
    iconBg: "bg-blue-500/10",
    size: "lg", // Bento size: lg, wide, tall, or default
  },
  {
    icon: Truck,
    label: "Deploy",
    description: "Dealer installs the battery + IoT device. Driver is live in 24 hours.",
    stat: "24h",
    statLabel: "Activation",
    color: "from-cyan-500 to-blue-500",
    glowColor: "rgba(34, 211, 238, 0.3)",
    iconBg: "bg-cyan-500/10",
    size: "default",
  },
  {
    icon: Activity,
    label: "Monitor",
    description: "Real-time SOH, SOC, location, temperature, charge cycles. Every battery has a heartbeat.",
    stat: "1000+",
    statLabel: "Live Tracked",
    color: "from-teal-500 to-emerald-500",
    glowColor: "rgba(20, 184, 166, 0.3)",
    iconBg: "bg-teal-500/10",
    size: "wide",
  },
  {
    icon: Wrench,
    label: "Maintain",
    description: "Alerts for anomalies before they become failures. Extend battery life by 20-30%.",
    stat: "+30%",
    statLabel: "Longer Life",
    color: "from-emerald-500 to-green-500",
    glowColor: "rgba(16, 185, 129, 0.3)",
    iconBg: "bg-emerald-500/10",
    size: "default",
  },
  {
    icon: RotateCcw,
    label: "Buyback",
    description: "When the battery reaches end-of-first-life, we buy it back. Fair price based on actual health data.",
    stat: "98%",
    statLabel: "Recovery Rate",
    color: "from-amber-500 to-orange-500",
    glowColor: "rgba(245, 158, 11, 0.3)",
    iconBg: "bg-amber-500/10",
    size: "default",
  },
  {
    icon: Recycle,
    label: "Recycle",
    description: "Partnered recyclers extract cobalt, lithium, and nickel. Full EPR compliance for OEMs.",
    stat: "100%",
    statLabel: "EPR Compliant",
    color: "from-green-500 to-teal-500",
    glowColor: "rgba(34, 197, 94, 0.3)",
    iconBg: "bg-green-500/10",
    size: "default",
  },
];

export default function LifecycleStrip() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const getBentoClass = (size: string, index: number) => {
    // Create asymmetrical bento layout
    if (index === 0) return "md:col-span-2 md:row-span-2"; // Finance - large
    if (index === 2) return "md:col-span-2"; // Monitor - wide
    return ""; // Others - default
  };

  return (
    <section id="lifecycle" className="py-32 lg:py-40 relative overflow-hidden bg-surface-50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)
            `,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div variants={staggerItem}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/5 border border-brand-500/10 text-brand-600 text-sm font-semibold tracking-wide mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              The Full Lifecycle
            </span>
          </motion.div>

          <motion.h2
            variants={staggerItem}
            className="text-4xl sm:text-5xl lg:text-6xl text-dark-900 tracking-tight leading-[1.1]"
          >
            Six stages.{" "}
            <span className="gradient-text">Zero blind spots.</span>
          </motion.h2>

          <motion.p
            variants={staggerItem}
            className="mt-6 text-xl text-dark-600/70 leading-relaxed"
          >
            No competitor covers the entire journey. We do.
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="grid grid-cols-1 md:grid-cols-4 gap-5"
        >
          {stages.map((stage, i) => {
            const Icon = stage.icon;
            const isHovered = hoveredIndex === i;

            return (
              <motion.div
                key={stage.label}
                variants={staggerItem}
                className={`relative group ${getBentoClass(stage.size, i)}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  variants={hoverLift}
                  className="relative h-full rounded-3xl bg-white border border-dark-900/5 overflow-hidden transition-shadow duration-500 hover:shadow-2xl hover:shadow-dark-900/5"
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${stage.glowColor}, transparent 70%)`,
                    }}
                  />

                  {/* Border glow */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 rounded-3xl border-2"
                    style={{
                      borderColor: stage.glowColor.replace("0.3", "0.5"),
                    }}
                  />

                  {/* Content */}
                  <div className={`relative z-10 p-7 ${i === 0 ? "p-9" : ""} h-full flex flex-col`}>
                    {/* Step number + icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-bold text-dark-400 font-mono tracking-wider">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <motion.div
                        animate={{ rotate: isHovered ? 12 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`${stage.iconBg} w-12 h-12 rounded-2xl flex items-center justify-center`}
                      >
                        <Icon className={`h-6 w-6 bg-gradient-to-r ${stage.color} bg-clip-text text-transparent`} style={{ color: `hsl(var(--brand-500))` }} />
                      </motion.div>
                    </div>

                    {/* Label */}
                    <h3 className="text-xl font-bold text-dark-900 mb-3">
                      {stage.label}
                    </h3>

                    {/* Description */}
                    <p className="text-dark-500 text-[15px] leading-relaxed flex-grow">
                      {stage.description}
                    </p>

                    {/* Stat */}
                    <div className="mt-6 pt-5 border-t border-dark-100">
                      <div className="flex items-baseline gap-2">
                        <span className={`text-2xl font-bold bg-gradient-to-r ${stage.color} bg-clip-text text-transparent`}>
                          {stage.stat}
                        </span>
                        <span className="text-sm text-dark-400">{stage.statLabel}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={staggerItem}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="mt-16 text-center"
        >
          <a
            href="/how-it-works"
            className="group inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 transition-colors"
          >
            <span>Explore the full journey</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
