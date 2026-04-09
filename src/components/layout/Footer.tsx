"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { useInView } from "react-intersection-observer";

const siteLinks = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "For Partners", href: "/for-partners" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const moreLinks = [
  { label: "Blog", href: "/blog" },
  { label: "For Investors", href: "/for-investors" },
];

const socialLinks = [
  { href: siteConfig.social.linkedin, label: "LinkedIn" },
  { href: siteConfig.social.twitter, label: "Twitter" },
  { href: siteConfig.social.instagram, label: "Instagram" },
];

export default function Footer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <footer className="relative overflow-hidden">
      {/* Main footer area */}
      <div className="bg-dark-950 pt-24 pb-16">
        {/* Gradient mesh background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(6,182,212,0.08),transparent_70%)]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[radial-gradient(ellipse,rgba(139,92,246,0.05),transparent_70%)]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10" ref={ref}>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={inView ? "animate" : "initial"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16"
          >
            {/* Brand */}
            <motion.div variants={staggerItem} className="lg:col-span-1">
              <Link href="/" className="flex items-center mb-6">
                <Image
                  src="/images/logo-transparent.png"
                  alt="iTarang"
                  width={120}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <p className="text-white/30 text-sm leading-relaxed mb-8 max-w-xs">
                {siteConfig.tagline}
              </p>
              <div className="flex items-center gap-5">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/30 hover:text-brand-400 transition-colors uppercase tracking-widest"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Site Links */}
            <motion.div variants={staggerItem}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/20 mb-6">
                Site
              </h3>
              <ul className="space-y-4">
                {siteLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* More */}
            <motion.div variants={staggerItem}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/20 mb-6">
                More
              </h3>
              <ul className="space-y-4">
                {moreLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div variants={staggerItem}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/20 mb-6">
                Contact
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
                      <Mail className="h-4 w-4" />
                    </div>
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
                      <Phone className="h-4 w-4" />
                    </div>
                    {siteConfig.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-accent-emerald/20 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                    </div>
                    WhatsApp
                  </a>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-dark-950 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/20">
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <Link
                href="/privacy"
                className="text-xs text-white/20 hover:text-white/50 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-white/20 hover:text-white/50 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
