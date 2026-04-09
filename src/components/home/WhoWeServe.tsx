"use client";

import { Zap, Store, BarChart3, ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const audiences = [
  {
    icon: Zap,
    title: "Drivers",
    description: "Better batteries, daily EMIs you can afford. Earn more, worry less.",
    benefits: ["Affordable EMIs", "Longer battery life", "24/7 support"],
    gradient: "from-amber-400 to-orange-500",
    glowColor: "rgba(245, 158, 11, 0.25)",
    iconBg: "bg-amber-500/10",
    href: "/how-it-works",
  },
  {
    icon: Store,
    title: "Dealers",
    description: "Sell more with ready financing. Zero credit risk, higher margins.",
    benefits: ["Instant financing", "Zero risk", "Higher margins"],
    gradient: "from-blue-400 to-indigo-500",
    glowColor: "rgba(59, 130, 246, 0.25)",
    iconBg: "bg-blue-500/10",
    href: "/for-partners",
  },
  {
    icon: BarChart3,
    title: "Lenders",
    description: "See inside every battery you finance. Real-time data, real confidence.",
    benefits: ["IoT visibility", "Risk scoring", "Recovery support"],
    gradient: "from-emerald-400 to-teal-500",
    glowColor: "rgba(16, 185, 129, 0.25)",
    iconBg: "bg-emerald-500/10",
    href: "/for-partners",
  },
];

function Card3D({ audience, index }: { audience: typeof audiences[0]; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = audience.icon;

  return (
    <motion.div
      variants={staggerItem}
      className="relative group"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {/* Glow effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute -inset-4 rounded-[2rem] blur-2xl -z-10"
          style={{ background: audience.glowColor }}
        />

        {/* Card */}
        <div className="relative rounded-3xl bg-white border border-dark-900/5 overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500">
          {/* Gradient top border */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${audience.gradient}`} />

          {/* Header with photo placeholder and icon */}
          <div className="relative h-52 overflow-hidden bg-gradient-to-br from-surface-100 to-surface-50">
            {/* Decorative gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${audience.gradient} opacity-5`} />

            {/* Floating icon badge */}
            <motion.div
              style={{ transform: "translateZ(40px)" }}
              className="absolute bottom-4 left-6"
            >
              <div
                className={`${audience.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center border border-white/50 shadow-lg backdrop-blur-sm`}
              >
                <Icon className={`h-7 w-7 bg-gradient-to-r ${audience.gradient} bg-clip-text`} style={{ color: "currentColor" }} />
              </div>
            </motion.div>

            {/* Photo placeholder text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-medium text-dark-300/50">
                PHOTO: {audience.title}
              </span>
            </div>
          </div>

          {/* Content */}
          <div
            className="p-7"
            style={{ transform: "translateZ(20px)" }}
          >
            <h3 className="text-2xl font-bold text-dark-900 mb-3">
              {audience.title}
            </h3>
            <p className="text-dark-500 leading-relaxed mb-6">
              {audience.description}
            </p>

            {/* Benefits list */}
            <ul className="space-y-2 mb-6">
              {audience.benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-dark-600">
                  <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${audience.gradient}`} />
                  {benefit}
                </li>
              ))}
            </ul>

            {/* CTA Link */}
            <Link
              href={audience.href}
              className={`group/link inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${audience.gradient} bg-clip-text text-transparent hover:opacity-80 transition-opacity`}
            >
              Learn more
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform text-current" style={{ color: "inherit" }} />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WhoWeServe() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-32 lg:py-40 bg-surface-50 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.04),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.03),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div variants={staggerItem}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/5 border border-brand-500/10 text-brand-600 text-sm font-semibold tracking-wide mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              Who We Serve
            </span>
          </motion.div>

          <motion.h2
            variants={staggerItem}
            className="text-4xl sm:text-5xl lg:text-6xl text-dark-900 tracking-tight leading-[1.1]"
          >
            Built for the people who{" "}
            <span className="gradient-text">move India</span>
          </motion.h2>

          <motion.p
            variants={staggerItem}
            className="mt-6 text-xl text-dark-600/70 leading-relaxed"
          >
            From drivers to financiers, everyone wins with full lifecycle visibility.
          </motion.p>
        </motion.div>

        {/* 3D Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="grid gap-8 md:grid-cols-3"
        >
          {audiences.map((audience, i) => (
            <Card3D key={audience.title} audience={audience} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
