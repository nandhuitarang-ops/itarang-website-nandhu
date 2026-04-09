"use client";

import { Shield, ShieldCheck, Handshake, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerItem, hoverLift } from "@/lib/animations";
import { useInView } from "react-intersection-observer";
import { useState, useEffect, useCallback } from "react";

const partners = [
  { icon: Shield, label: "DPIIT Recognised", description: "Startup India" },
  { icon: ShieldCheck, label: "BIS Certified", description: "IoT Standards" },
  { icon: Handshake, label: "Intellicar Partner", description: "Telematics" },
];

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "E-Rickshaw Driver, Delhi",
    avatar: "/images/placeholder-avatar.jpg",
    content:
      "Switched from lead-acid to iTarang lithium. My daily earning went up because the battery lasts longer. EMI is easy to manage.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sunil Sharma",
    role: "Battery Dealer, Lucknow",
    avatar: "/images/placeholder-avatar.jpg",
    content:
      "As a dealer, iTarang handles the financing headache. I just sell the battery and they take care of the rest.",
    rating: 5,
  },
  {
    id: 3,
    name: "Priya Mehta",
    role: "NBFC Manager, Mumbai",
    avatar: "/images/placeholder-avatar.jpg",
    content:
      "The IoT dashboard gives us real-time battery health data. This is exactly the visibility lenders need before approving EV battery loans.",
    rating: 5,
  },
];

export default function SocialProof() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 lg:py-40 relative overflow-hidden bg-white">
      {/* Subtle gradient accents */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(6,182,212,0.04),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          {/* Section Header */}
          <motion.div variants={staggerItem} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/5 border border-brand-500/10 text-brand-600 text-sm font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              Trusted By
            </span>
          </motion.div>

          {/* Partner badges */}
          <motion.div
            variants={staggerContainer}
            className="flex flex-wrap items-center justify-center gap-5 mb-20"
          >
            {partners.map((partner, i) => {
              const Icon = partner.icon;
              return (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  initial="rest"
                  whileHover="hover"
                >
                  <motion.div
                    variants={hoverLift}
                    className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-surface-50 border border-dark-900/5 hover:border-brand-500/20 hover:bg-brand-50/30 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center group-hover:bg-brand-500/15 transition-colors">
                      <Icon className="h-5 w-5 text-brand-600" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-dark-900">
                        {partner.label}
                      </span>
                      <span className="text-xs text-dark-400">
                        {partner.description}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={staggerItem}
            className="flex items-center justify-center mb-16"
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-dark-200 to-transparent" />
            <div className="mx-6 w-2 h-2 rounded-full bg-dark-200" />
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-dark-200 to-transparent" />
          </motion.div>

          {/* Testimonials Section */}
          <motion.div variants={staggerItem}>
            <h3 className="text-center text-sm font-semibold text-dark-400 uppercase tracking-wider mb-10">
              What our partners say
            </h3>

            {/* Testimonial Card */}
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Quote icon */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center">
                  <Quote className="w-6 h-6 text-brand-500" />
                </div>

                {/* Glass card */}
                <div className="glass-card-strong rounded-3xl p-10 md:p-12">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTestimonial}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-6">
                        {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-amber-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-xl md:text-2xl text-dark-700 leading-relaxed mb-8 font-light">
                        &ldquo;{testimonials[activeTestimonial].content}&rdquo;
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold">
                          {testimonials[activeTestimonial].name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-dark-900">
                            {testimonials[activeTestimonial].name}
                          </div>
                          <div className="text-sm text-dark-500">
                            {testimonials[activeTestimonial].role}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="w-10 h-10 rounded-xl bg-surface-100 hover:bg-surface-200 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-dark-500" />
                </button>
                
                <div className="flex items-center gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === activeTestimonial
                          ? "bg-brand-500 w-8"
                          : "bg-dark-200 hover:bg-dark-300 w-2"
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                  className="w-10 h-10 rounded-xl bg-surface-100 hover:bg-surface-200 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-dark-500" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
