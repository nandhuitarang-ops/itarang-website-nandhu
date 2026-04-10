"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { 
  Activity, 
  Wrench, 
  Truck, 
  RefreshCw, 
  BadgeDollarSign, 
  Recycle,
  ChevronRight
} from "lucide-react";

const services = [
  {
    id: "monitor",
    label: "Monitor",
    description: "Real-time IoT tracking of battery health, charge cycles, and performance metrics",
    icon: Activity,
  },
  {
    id: "maintain",
    label: "Maintain",
    description: "Proactive maintenance alerts and certified service network across India",
    icon: Wrench,
  },
  {
    id: "deploy",
    label: "Deploy",
    description: "Seamless fleet integration with plug-and-play installation support",
    icon: Truck,
  },
  {
    id: "buyback",
    label: "Buyback",
    description: "Guaranteed buyback program ensuring maximum residual value",
    icon: RefreshCw,
  },
  {
    id: "finance",
    label: "Finance",
    description: "Flexible financing options with asset-backed certificates",
    icon: BadgeDollarSign,
  },
  {
    id: "recycle",
    label: "Recycle",
    description: "Sustainable end-of-life recycling with zero landfill commitment",
    icon: Recycle,
  },
];

export default function BatteryExplodedView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [showEcosystem, setShowEcosystem] = useState(false);
  
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);

  return (
    <div ref={containerRef} className="relative">
      <div ref={inViewRef} className="relative">
        {/* Toggle buttons */}
        <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={() => setShowEcosystem(false)}
            className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
              !showEcosystem 
                ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25" 
                : "bg-surface-100 text-dark-600 hover:bg-surface-200"
            }`}
          >
            Product View
          </button>
          <button
            onClick={() => setShowEcosystem(true)}
            className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
              showEcosystem 
                ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25" 
                : "bg-surface-100 text-dark-600 hover:bg-surface-200"
            }`}
          >
            Ecosystem View
          </button>
        </div>

        {/* Image container with animations */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {!showEcosystem ? (
              /* Product View */
              <motion.div
                key="product"
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Ambient glow effect */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[500px] h-[500px] bg-brand-400/15 rounded-full blur-[100px]" />
                </div>
                
                {/* Battery image with 3D hover effect */}
                <motion.div
                  style={{ y, rotateY }}
                  className="relative max-w-2xl mx-auto"
                >
                  <motion.div
                    className="relative cursor-pointer"
                    whileHover={{ scale: 1.03, y: -8 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Image
                      src="/images/itarang-battery.png"
                      alt="iTarang Advanced Lithium Battery"
                      width={700}
                      height={700}
                      className="w-full h-auto drop-shadow-2xl"
                      priority
                    />
                  </motion.div>
                  
                  {/* Floating spec cards */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="absolute left-0 top-1/4 -translate-x-[110%] hidden lg:block"
                  >
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-xl shadow-dark-900/5 border border-dark-100/10">
                      <div className="text-xs text-dark-400 mb-1 uppercase tracking-wider">Capacity</div>
                      <div className="text-2xl font-bold text-dark-900">60V / 40Ah</div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="absolute right-0 top-1/3 translate-x-[110%] hidden lg:block"
                  >
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-xl shadow-dark-900/5 border border-dark-100/10">
                      <div className="text-xs text-dark-400 mb-1 uppercase tracking-wider">Warranty</div>
                      <div className="text-2xl font-bold text-dark-900">3 Years</div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2"
                  >
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl px-8 py-4 shadow-xl shadow-dark-900/5 border border-dark-100/10">
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-xs text-dark-400 uppercase tracking-wider">Range</div>
                          <div className="text-lg font-bold text-dark-900">80+ km</div>
                        </div>
                        <div className="w-px h-10 bg-dark-200" />
                        <div className="text-center">
                          <div className="text-xs text-dark-400 uppercase tracking-wider">Weight</div>
                          <div className="text-lg font-bold text-dark-900">24 kg</div>
                        </div>
                        <div className="w-px h-10 bg-dark-200" />
                        <div className="text-center">
                          <div className="text-xs text-dark-400 uppercase tracking-wider">Cycles</div>
                          <div className="text-lg font-bold text-dark-900">2000+</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
                
                {/* Call to action */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="flex justify-center mt-20"
                >
                  <button 
                    onClick={() => setShowEcosystem(true)}
                    className="flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium transition-colors group"
                  >
                    <span>Explore Full Ecosystem</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </motion.div>
            ) : (
              /* Ecosystem View */
              <motion.div
                key="ecosystem"
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Ecosystem image */}
                <motion.div 
                  className="relative max-w-4xl mx-auto"
                  style={{ y }}
                >
                  <Image
                    src="/images/itarang-ecosystem.png"
                    alt="iTarang Battery Ecosystem - Monitor, Maintain, Deploy, Buyback, Finance, Recycle"
                    width={1000}
                    height={800}
                    className="w-full h-auto rounded-3xl"
                    priority
                  />
                </motion.div>
                
                {/* Service cards grid */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4"
                >
                  {services.map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.08 }}
                      onMouseEnter={() => setActiveService(service.id)}
                      onMouseLeave={() => setActiveService(null)}
                      className={`group p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                        activeService === service.id
                          ? "bg-brand-50 border-brand-200 shadow-lg shadow-brand-500/10 -translate-y-1"
                          : "bg-white/70 backdrop-blur-sm border-dark-100/50 hover:border-brand-200 hover:bg-white hover:-translate-y-1"
                      }`}
                    >
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                        activeService === service.id
                          ? "bg-brand-500 text-white shadow-lg shadow-brand-500/30"
                          : "bg-surface-100 text-dark-500 group-hover:bg-brand-100 group-hover:text-brand-600"
                      }`}>
                        <service.icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-semibold text-dark-900 mb-2">{service.label}</h4>
                      <p className="text-sm text-dark-500 leading-relaxed">{service.description}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
