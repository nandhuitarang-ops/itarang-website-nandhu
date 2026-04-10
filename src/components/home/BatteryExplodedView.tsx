"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  useTexture, 
  Float, 
  Html, 
  Environment,
  MeshTransmissionMaterial,
  RoundedBox
} from "@react-three/drei";
import { useRef, useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import * as THREE from "three";
import Image from "next/image";
import { 
  Monitor, 
  Wrench, 
  Truck, 
  RefreshCw, 
  BadgeDollarSign, 
  Recycle,
  Zap,
  Battery,
  Shield,
  Gauge,
  ChevronUp,
  ChevronDown
} from "lucide-react";

// Individual exploded layer component
function ExplodedLayer({ 
  yOffset, 
  baseY,
  texture, 
  opacity = 1,
  isExploded,
  index,
  hoveredLayer,
  setHoveredLayer,
  label,
  color
}: { 
  yOffset: number;
  baseY: number;
  texture: THREE.Texture;
  opacity?: number;
  isExploded: boolean;
  index: number;
  hoveredLayer: number | null;
  setHoveredLayer: (i: number | null) => void;
  label: string;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isHovered = hoveredLayer === index;
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Target Y position based on exploded state
    const targetY = isExploded ? baseY + yOffset : baseY;
    const hoverOffset = isHovered ? 0.15 : 0;
    
    // Smooth interpolation
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetY + hoverOffset,
      0.06
    );
    
    // Subtle floating animation
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 1.5 + index * 0.5) * 0.015;
    
    // Slight rotation on hover
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      isHovered ? -0.05 : 0,
      0.1
    );
    
    // Scale on hover
    const targetScale = isHovered ? 1.03 : 1;
    meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1);
    meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScale, 0.1);
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        position={[0, baseY, 0]}
        onPointerOver={() => setHoveredLayer(index)}
        onPointerOut={() => setHoveredLayer(null)}
      >
        <planeGeometry args={[4.5, 3]} />
        <meshStandardMaterial
          map={texture}
          transparent
          opacity={opacity}
          side={THREE.DoubleSide}
          emissive={color}
          emissiveIntensity={isHovered ? 0.15 : 0}
        />
      </mesh>
      
      {/* Label on hover */}
      {isHovered && isExploded && (
        <Html
          position={[2.8, baseY + yOffset, 0]}
          center
          style={{ pointerEvents: 'none' }}
        >
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-dark-900/95 backdrop-blur-xl text-white px-5 py-3 rounded-xl text-sm whitespace-nowrap border border-cyan-500/30 shadow-2xl shadow-cyan-500/20"
          >
            <div className="font-semibold">{label}</div>
          </motion.div>
        </Html>
      )}
    </group>
  );
}

// Glowing connection lines between layers
function ConnectionLines({ isExploded }: { isExploded: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.visible = isExploded;
  });

  return (
    <group ref={groupRef}>
      {[-1, -0.5, 0, 0.5].map((y, i) => (
        <mesh key={i} position={[2.5, y * 2, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.008, 0.008, 0.8, 8]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

// Ambient glow orbs
function GlowOrbs() {
  const orb1Ref = useRef<THREE.Mesh>(null);
  const orb2Ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (orb1Ref.current) {
      orb1Ref.current.position.x = Math.sin(t * 0.5) * 3;
      orb1Ref.current.position.y = Math.cos(t * 0.3) * 2;
    }
    if (orb2Ref.current) {
      orb2Ref.current.position.x = Math.cos(t * 0.4) * 3;
      orb2Ref.current.position.y = Math.sin(t * 0.35) * 2;
    }
  });

  return (
    <>
      <mesh ref={orb1Ref} position={[-3, 1, -2]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial color="#0066ff" transparent opacity={0.08} />
      </mesh>
      <mesh ref={orb2Ref} position={[3, -1, -2]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.06} />
      </mesh>
    </>
  );
}

// Main 3D Scene
function BatteryScene({ isExploded }: { isExploded: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);
  const { viewport } = useThree();
  
  // Load battery texture
  const batteryTexture = useTexture("/images/itarang-battery.png");
  batteryTexture.colorSpace = THREE.SRGBColorSpace;
  
  // Define layers with their exploded offsets
  const layers = [
    { yOffset: 2.0, baseY: 0.12, opacity: 1, label: "Smart Lid - Thermal Management", color: "#00aaff" },
    { yOffset: 1.0, baseY: 0.06, opacity: 0.95, label: "BMS Board - Intelligent Control", color: "#0088ff" },
    { yOffset: 0, baseY: 0, opacity: 1, label: "Cell Pack - LiFePO4 Technology", color: "#0066ff" },
    { yOffset: -1.0, baseY: -0.06, opacity: 0.95, label: "Housing Frame - Aircraft Aluminum", color: "#0044ff" },
    { yOffset: -2.0, baseY: -0.12, opacity: 1, label: "Base Unit - Secure Mounting", color: "#0022ff" },
  ];

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Gentle auto-rotation
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    
    // Responsive scaling
    const scale = Math.min(viewport.width / 7, 1.1);
    groupRef.current.scale.setScalar(scale);
  });

  return (
    <>
      <GlowOrbs />
      <group ref={groupRef}>
        {layers.map((layer, index) => (
          <ExplodedLayer
            key={index}
            yOffset={layer.yOffset}
            baseY={layer.baseY}
            texture={batteryTexture}
            opacity={layer.opacity}
            isExploded={isExploded}
            index={index}
            hoveredLayer={hoveredLayer}
            setHoveredLayer={setHoveredLayer}
            label={layer.label}
            color={layer.color}
          />
        ))}
        <ConnectionLines isExploded={isExploded} />
      </group>
    </>
  );
}

// Specs overlay for 3D view
function SpecsCards({ isExploded }: { isExploded: boolean }) {
  const specs = [
    { icon: Zap, value: "60V 40Ah", label: "Capacity", color: "from-yellow-400 to-orange-500" },
    { icon: Battery, value: "2000+", label: "Cycles", color: "from-green-400 to-emerald-500" },
    { icon: Shield, value: "3 Years", label: "Warranty", color: "from-blue-400 to-indigo-500" },
    { icon: Gauge, value: "80+ km", label: "Range", color: "from-purple-400 to-pink-500" },
  ];

  return (
    <motion.div 
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <div className="flex gap-3">
        {specs.map((spec, i) => (
          <motion.div
            key={spec.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            whileHover={{ y: -6, scale: 1.05 }}
            className="bg-white/95 backdrop-blur-2xl rounded-2xl px-5 py-4 border border-dark-100/20 shadow-xl cursor-pointer group"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${spec.color} flex items-center justify-center mb-2 shadow-lg group-hover:scale-110 transition-transform`}>
              <spec.icon className="w-5 h-5 text-white" />
            </div>
            <p className="font-bold text-dark-900">{spec.value}</p>
            <p className="text-xs text-dark-500">{spec.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Loading state
function LoadingState() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="w-14 h-14 border-3 border-brand-200 border-t-brand-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-dark-400 text-sm">Loading 3D View...</p>
      </div>
    </div>
  );
}

// Ecosystem view with the actual ecosystem image
function EcosystemView() {
  const [activeService, setActiveService] = useState<string | null>(null);
  
  const services = [
    { id: "monitor", icon: Monitor, label: "Monitor", desc: "Real-time IoT tracking", color: "from-cyan-500 to-blue-500" },
    { id: "maintain", icon: Wrench, label: "Maintain", desc: "Proactive service alerts", color: "from-blue-500 to-indigo-500" },
    { id: "deploy", icon: Truck, label: "Deploy", desc: "Fleet integration", color: "from-indigo-500 to-violet-500" },
    { id: "buyback", icon: RefreshCw, label: "Buyback", desc: "Guaranteed value", color: "from-violet-500 to-purple-500" },
    { id: "finance", icon: BadgeDollarSign, label: "Finance", desc: "Flexible options", color: "from-purple-500 to-pink-500" },
    { id: "recycle", icon: Recycle, label: "Recycle", desc: "Zero landfill", color: "from-emerald-500 to-teal-500" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Ecosystem image with floating effect */}
      <motion.div 
        className="relative max-w-4xl mx-auto mb-10"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Glow behind image */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 via-cyan-500/15 to-brand-500/20 blur-3xl scale-110 rounded-full" />
        
        <Image
          src="/images/itarang-ecosystem.png"
          alt="iTarang Battery Ecosystem"
          width={1000}
          height={700}
          className="relative w-full h-auto drop-shadow-2xl"
          priority
        />
      </motion.div>

      {/* Service cards */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
        }}
      >
        {services.map((service) => (
          <motion.div
            key={service.id}
            variants={{
              hidden: { opacity: 0, y: 25, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
            whileHover={{ y: -8, scale: 1.03 }}
            onMouseEnter={() => setActiveService(service.id)}
            onMouseLeave={() => setActiveService(null)}
            className="group relative cursor-pointer"
          >
            <div className={`relative bg-white/90 backdrop-blur-xl rounded-2xl p-5 border transition-all duration-300 overflow-hidden ${
              activeService === service.id 
                ? "border-brand-300 shadow-xl shadow-brand-500/15" 
                : "border-dark-100/50 shadow-lg shadow-dark-900/5 hover:border-brand-200"
            }`}>
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="relative font-semibold text-dark-900 mb-1">{service.label}</h4>
              <p className="relative text-sm text-dark-500">{service.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

// Main component
export default function BatteryExplodedView() {
  const [view, setView] = useState<"3d" | "ecosystem">("3d");
  const [isExploded, setIsExploded] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  // Auto-explode when in view
  useEffect(() => {
    if (inView && view === "3d") {
      const timer = setTimeout(() => setIsExploded(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [inView, view]);

  return (
    <div ref={ref} className="relative">
      {/* View toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-surface-100/80 backdrop-blur-xl rounded-2xl p-1.5 border border-dark-100/30 shadow-lg">
          {[
            { id: "3d", label: "3D Exploded View" },
            { id: "ecosystem", label: "Ecosystem View" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id as "3d" | "ecosystem")}
              className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                view === tab.id ? "text-white" : "text-dark-500 hover:text-dark-700"
              }`}
            >
              {view === tab.id && (
                <motion.div
                  layoutId="viewTab"
                  className="absolute inset-0 bg-gradient-to-r from-brand-600 to-brand-500 rounded-xl shadow-lg shadow-brand-500/25"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {view === "3d" ? (
          <motion.div
            key="3d-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
          >
            {/* Explode toggle button */}
            <div className="flex justify-center mb-6">
              <motion.button
                onClick={() => setIsExploded(!isExploded)}
                className="flex items-center gap-2 px-6 py-3 bg-dark-900 hover:bg-dark-800 text-white rounded-xl text-sm font-medium transition-all shadow-xl shadow-dark-900/30 hover:shadow-dark-900/40"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isExploded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                {isExploded ? "Collapse Layers" : "Explode Layers"}
              </motion.button>
            </div>

            {/* 3D Canvas */}
            <div className="relative h-[650px] w-full rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border border-white/5">
              {/* Corner glow effects */}
              <div className="absolute top-0 left-0 w-72 h-72 bg-brand-500/15 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />
              
              <Suspense fallback={<LoadingState />}>
                <Canvas
                  camera={{ position: [0, 0, 7], fov: 40 }}
                  gl={{ antialias: true, alpha: true }}
                  dpr={[1, 2]}
                >
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[5, 5, 5]} intensity={1} />
                  <pointLight position={[-5, 5, 5]} intensity={0.5} color="#00aaff" />
                  <pointLight position={[5, -5, 5]} intensity={0.3} color="#0066ff" />
                  <Environment preset="city" />
                  <BatteryScene isExploded={isExploded} />
                </Canvas>
              </Suspense>

              {/* Specs overlay */}
              <SpecsCards isExploded={isExploded} />

              {/* Instruction hint */}
              <motion.p 
                className="absolute top-6 left-1/2 -translate-x-1/2 text-white/50 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                Hover over layers to explore
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="ecosystem-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
          >
            <EcosystemView />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
