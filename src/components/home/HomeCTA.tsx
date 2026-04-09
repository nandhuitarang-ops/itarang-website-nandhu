"use client";

import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { motion, useScroll, useTransform } from "framer-motion";
import { staggerContainer, staggerItem, hoverLift } from "@/lib/animations";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";
import Button from "@/components/ui/Button";

const roles = [
  {
    label: "I'm a Driver",
    message: "Hi, I'm a driver interested in iTarang batteries.",
    icon: "🛺",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    label: "I'm a Dealer",
    message: "Hi, I'm a dealer interested in partnering with iTarang.",
    icon: "🏪",
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    label: "I'm an NBFC",
    message: "Hi, I represent an NBFC interested in iTarang's lending platform.",
    icon: "🏦",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    label: "I'm an Investor",
    message: "Hi, I'm an investor interested in learning more about iTarang.",
    icon: "📊",
    gradient: "from-violet-400 to-purple-500",
  },
];

export default function HomeCTA() {
  const phoneNumber = siteConfig.whatsapp.replace(/[^0-9]/g, "");
  const containerRef = useRef<HTMLElement>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={containerRef}
      className="py-32 lg:py-40 relative overflow-hidden"
    >
      {/* Sticky parallax background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0"
      >
        {/* Base gradient */}
        <div className="absolute inset-0 bg-dark-950" />

        {/* Animated gradient mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(6,182,212,0.2),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_50%,rgba(139,92,246,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_80%,rgba(245,158,11,0.1),transparent)]" />

        {/* Animated glow orbs */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-500/10 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-20 left-1/4 w-[300px] h-[300px] rounded-full bg-accent-violet/10 blur-[100px]"
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>

      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center relative z-10" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          {/* Heading */}
          <motion.h2
            variants={staggerItem}
            className="text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05]"
          >
            Let&apos;s{" "}
            <span className="gradient-text-animated">talk</span>
          </motion.h2>

          <motion.p
            variants={staggerItem}
            className="mt-6 text-xl text-white/40 max-w-lg mx-auto"
          >
            Pick your role and we&apos;ll connect you with the right person — instantly.
          </motion.p>

          {/* Role cards */}
          <motion.div
            variants={staggerContainer}
            className="mt-14 grid grid-cols-2 gap-4 max-w-xl mx-auto"
          >
            {roles.map((role, i) => (
              <motion.div key={role.label} variants={staggerItem}>
                <motion.a
                  href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(role.message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial="rest"
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  className="group relative block"
                >
                  <motion.div
                    variants={hoverLift}
                    className="relative glass-dark rounded-2xl px-6 py-5 border border-white/5 hover:border-white/10 transition-all duration-300"
                  >
                    {/* Gradient top line on hover */}
                    <div
                      className={`absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-16 h-0.5 rounded-full bg-gradient-to-r ${role.gradient} transition-all duration-300`}
                    />

                    <div className="flex items-center justify-center gap-3">
                      <span className="text-2xl">{role.icon}</span>
                      <span className="font-semibold text-white/80 group-hover:text-white transition-colors">
                        {role.label}
                      </span>
                    </div>
                  </motion.div>
                </motion.a>
              </motion.div>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={staggerItem}
            className="mt-12 flex items-center justify-center gap-4"
          >
            <div className="h-px w-12 bg-white/10" />
            <span className="text-xs text-white/20 uppercase tracking-widest">or</span>
            <div className="h-px w-12 bg-white/10" />
          </motion.div>

          {/* Form CTA */}
          <motion.div variants={staggerItem} className="mt-8">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                href="/contact"
                size="lg"
                className="bg-white text-dark-900 hover:bg-white/90 shadow-2xl shadow-white/10 px-8 py-4"
              >
                Fill out a form
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
