"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { staggerContainer, staggerItem, float, glowPulse } from "@/lib/animations";
import { ArrowDown, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useRef } from "react";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Sticky Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0">
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-dark-950" />

        {/* Layered gradient mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_50%,rgba(59,130,246,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_20%_80%,rgba(139,92,246,0.08),transparent)]" />

        {/* Animated glow orbs */}
        <motion.div
          variants={glowPulse}
          initial="initial"
          animate="animate"
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-500/10 blur-[120px]"
        />
        <motion.div
          variants={glowPulse}
          initial="initial"
          animate="animate"
          style={{ animationDelay: "1.5s" }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-violet/10 blur-[100px]"
        />

        {/* Grid pattern with fade */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)",
          }}
        />

        {/* Grain texture */}
        <div className="absolute inset-0 grain-overlay" />
      </motion.div>

      {/* Floating 3D Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating glass card - top right */}
        <motion.div
          variants={float}
          initial="initial"
          animate="animate"
          className="absolute top-32 right-[15%] w-64 h-40 rounded-3xl glass-dark border border-white/5 hidden lg:block"
          style={{ transform: "rotateX(10deg) rotateY(-10deg)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-transparent rounded-3xl" />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
              <span className="text-xs text-white/40 font-mono">LIVE TRACKING</span>
            </div>
            <div className="text-3xl font-bold text-white">1,247</div>
            <div className="text-sm text-white/40">Batteries Online</div>
          </div>
        </motion.div>

        {/* Floating glass card - bottom left */}
        <motion.div
          variants={float}
          initial="initial"
          animate="animate"
          style={{ animationDelay: "2s" }}
          className="absolute bottom-40 left-[10%] w-56 h-32 rounded-2xl glass-dark border border-white/5 hidden lg:block"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent-amber/10 to-transparent rounded-2xl" />
          <div className="p-5">
            <div className="text-xs text-white/40 font-mono mb-2">AVG. HEALTH SCORE</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-accent-emerald">94.2%</span>
              <span className="text-xs text-accent-emerald">+2.1%</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main content */}
      <motion.div style={{ opacity }} className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-32 pb-24">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-4xl"
        >
          {/* Eyebrow label */}
          <motion.div variants={staggerItem} className="mb-8">
            <span className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-dark border border-white/10 text-sm font-medium tracking-wide">
              <span className="flex items-center gap-2 text-brand-300">
                <Sparkles className="w-4 h-4" />
                Full Lifecycle Battery Platform
              </span>
              <span className="w-px h-4 bg-white/10" />
              <span className="text-white/40">India&apos;s First</span>
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={staggerItem}
            className="text-5xl md:text-7xl lg:text-8xl text-white leading-[1.02] tracking-tight"
          >
            Every Battery.
            <br />
            <span className="gradient-text-animated">
              From First Charge to Last.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={staggerItem}
            className="mt-10 text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed"
          >
            We finance, monitor, maintain, recover, and recycle EV batteries
            across India. One platform. Every stage. Zero blind spots.
          </motion.p>

          {/* CTA row */}
          <motion.div
            variants={staggerItem}
            className="mt-12 flex flex-wrap items-center gap-5"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                href="#lifecycle"
                size="lg"
                variant="primary"
                className="relative overflow-hidden bg-white text-dark-950 hover:bg-white/90 shadow-2xl shadow-white/10 px-8 py-4 text-base"
              >
                <span className="relative z-10 flex items-center gap-2">
                  See How It Works
                  <ArrowDown className="h-4 w-4" />
                </span>
              </Button>
            </motion.div>

            <Link
              href="/for-investors"
              className="group flex items-center gap-2 text-sm font-medium text-white/40 hover:text-white/70 transition-colors px-6 py-4 rounded-xl hover:bg-white/5"
            >
              For Investors
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={staggerItem}
            className="mt-20 flex flex-wrap items-center gap-8 text-sm text-white/30"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
              <span>DPIIT Recognised</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
              <span>BIS Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-amber" />
              <span>1000+ Batteries Tracked</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-surface-50 via-surface-50/80 to-transparent" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ height: ["20%", "40%", "20%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 bg-white/40 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
