"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface LayerProps {
  name: string;
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
  breatheOffset: number;
  hasExploded: boolean;
}

const layerData = [
  { name: "Lid Cover", baseOffset: 0 },
  { name: "BMS Circuit Board", baseOffset: 1 },
  { name: "Cell Array", baseOffset: 2 },
  { name: "Aluminum Chassis", baseOffset: 3 },
  { name: "Base Plate", baseOffset: 4 },
];

const Layer = ({ name, index, isHovered, onHover, breatheOffset, hasExploded }: LayerProps) => {
  const baseY = index * 48;
  const separationY = hasExploded ? index * 80 : index * 48;
  const hoverLift = isHovered ? -8 : 0;
  
  return (
    <motion.div
      className="relative cursor-pointer"
      style={{
        zIndex: 5 - index,
        transformStyle: "preserve-3d",
      }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: separationY + breatheOffset + hoverLift,
        opacity: 1,
      }}
      transition={{
        y: { 
          type: "spring", 
          stiffness: 100, 
          damping: 20,
          delay: hasExploded ? index * 0.08 : 0 
        },
        opacity: { duration: 0.5, delay: index * 0.08 },
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Tooltip */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-dark-900/90 text-white text-xs font-medium rounded-lg whitespace-nowrap z-50 backdrop-blur-sm"
        >
          {name}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-dark-900/90" />
        </motion.div>
      )}
      
      {/* Layer Content */}
      {index === 0 && <LidLayer isHovered={isHovered} />}
      {index === 1 && <BMSLayer isHovered={isHovered} />}
      {index === 2 && <CellArrayLayer isHovered={isHovered} />}
      {index === 3 && <ChassisLayer isHovered={isHovered} />}
      {index === 4 && <BasePlateLayer isHovered={isHovered} />}
    </motion.div>
  );
};

// Layer 1: Electric Blue Lid
const LidLayer = ({ isHovered }: { isHovered: boolean }) => (
  <div
    className={`relative w-64 h-12 rounded-lg transition-all duration-300 ${
      isHovered ? "shadow-[0_0_20px_rgba(0,212,255,0.5)]" : ""
    }`}
    style={{
      background: "linear-gradient(135deg, #0078FF 0%, #0056CC 100%)",
      transform: "perspective(800px) rotateX(15deg) rotateY(-10deg)",
      border: isHovered ? "1px solid #00D4FF" : "1px solid rgba(255,255,255,0.2)",
    }}
  >
    {/* Handles */}
    <div className="absolute -top-2 left-8 w-8 h-3 rounded-t-full bg-gradient-to-b from-amber-600 to-amber-800" />
    <div className="absolute -top-2 right-8 w-8 h-3 rounded-t-full bg-gradient-to-b from-amber-600 to-amber-800" />
    
    {/* Branding */}
    <div className="absolute inset-0 flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 2L4 14h7v8l9-12h-7V2z" />
        </svg>
        <span className="text-white font-bold text-sm tracking-wide">iTarang</span>
      </div>
      <div className="text-white/80 text-[10px] font-medium">
        <div className="flex items-center gap-1">
          <span>TRONTEK</span>
        </div>
      </div>
    </div>
    
    {/* Surface texture */}
    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-lg" />
  </div>
);

// Layer 2: BMS Circuit Board
const BMSLayer = ({ isHovered }: { isHovered: boolean }) => (
  <div
    className={`relative w-60 h-10 rounded transition-all duration-300 ${
      isHovered ? "shadow-[0_0_20px_rgba(0,212,255,0.5)]" : ""
    }`}
    style={{
      background: "linear-gradient(135deg, #1a3d2e 0%, #0d261c 100%)",
      transform: "perspective(800px) rotateX(15deg) rotateY(-10deg)",
      border: isHovered ? "1px solid #00D4FF" : "1px solid rgba(0,255,100,0.2)",
    }}
  >
    {/* Circuit traces */}
    <div className="absolute inset-2 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[1px] bg-emerald-400/40"
          style={{
            top: `${15 + i * 12}%`,
            left: `${5 + i * 3}%`,
            width: `${30 + Math.random() * 40}%`,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
      {/* IC Chips */}
      <div className="absolute top-2 left-4 w-6 h-4 bg-dark-900 rounded-sm border border-emerald-500/30" />
      <div className="absolute top-2 right-8 w-4 h-4 bg-dark-900 rounded-sm border border-emerald-500/30" />
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-3 bg-dark-900 rounded-sm border border-emerald-500/30" />
    </div>
  </div>
);

// Layer 3: Cylindrical Cell Array
const CellArrayLayer = ({ isHovered }: { isHovered: boolean }) => (
  <div
    className={`relative w-56 h-16 rounded transition-all duration-300 ${
      isHovered ? "shadow-[0_0_20px_rgba(0,212,255,0.5)]" : ""
    }`}
    style={{
      transform: "perspective(800px) rotateX(15deg) rotateY(-10deg)",
      border: isHovered ? "1px solid #00D4FF" : "none",
    }}
  >
    {/* Cell rows */}
    <div className="flex flex-col gap-1 p-1">
      {[0, 1, 2].map((row) => (
        <div key={row} className="flex gap-1 justify-center">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-5 h-4 rounded-full"
              style={{
                background: "linear-gradient(90deg, #a8a8a8 0%, #e8e8e8 50%, #a8a8a8 100%)",
                boxShadow: "inset 0 1px 2px rgba(255,255,255,0.5), inset 0 -1px 2px rgba(0,0,0,0.2)",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);

// Layer 4: Aluminum Chassis
const ChassisLayer = ({ isHovered }: { isHovered: boolean }) => (
  <div
    className={`relative w-64 h-20 rounded transition-all duration-300 ${
      isHovered ? "shadow-[0_0_20px_rgba(0,212,255,0.5)]" : ""
    }`}
    style={{
      background: "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)",
      transform: "perspective(800px) rotateX(15deg) rotateY(-10deg)",
      border: isHovered ? "1px solid #00D4FF" : "1px solid rgba(255,255,255,0.1)",
    }}
  >
    {/* Inner cavity */}
    <div 
      className="absolute inset-2 rounded bg-dark-900/50"
      style={{
        boxShadow: "inset 0 2px 8px rgba(0,0,0,0.5)",
      }}
    />
    
    {/* Cables */}
    <div className="absolute top-1/2 -right-12 -translate-y-1/2 flex flex-col gap-2">
      <motion.div 
        className="w-16 h-2 rounded-full bg-dark-800"
        animate={{ y: [0, 2, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="absolute right-0 w-4 h-3 bg-gradient-to-r from-sky-500 to-sky-600 rounded -translate-y-0.5" />
      </motion.div>
      <motion.div 
        className="w-14 h-2 rounded-full bg-dark-800"
        animate={{ y: [0, 3, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.2 }}
      >
        <div className="absolute right-0 w-4 h-3 bg-gradient-to-r from-gray-400 to-gray-500 rounded -translate-y-0.5" />
      </motion.div>
    </div>
    
    {/* Side vents */}
    <div className="absolute left-1 top-1/2 -translate-y-1/2 flex flex-col gap-1">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="w-1 h-3 bg-dark-700 rounded-full" />
      ))}
    </div>
  </div>
);

// Layer 5: Base Plate
const BasePlateLayer = ({ isHovered }: { isHovered: boolean }) => (
  <div
    className={`relative w-68 h-6 rounded-b-lg transition-all duration-300 ${
      isHovered ? "shadow-[0_0_20px_rgba(0,212,255,0.5)]" : ""
    }`}
    style={{
      background: "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)",
      transform: "perspective(800px) rotateX(15deg) rotateY(-10deg)",
      border: isHovered ? "1px solid #00D4FF" : "1px solid rgba(255,255,255,0.05)",
      width: "272px",
    }}
  >
    {/* Mounting feet */}
    <div className="absolute -bottom-2 left-2 w-4 h-3 bg-dark-800 rounded-b" />
    <div className="absolute -bottom-2 right-2 w-4 h-3 bg-dark-800 rounded-b" />
    <div className="absolute -bottom-2 left-1/4 w-4 h-3 bg-dark-800 rounded-b" />
    <div className="absolute -bottom-2 right-1/4 w-4 h-3 bg-dark-800 rounded-b" />
    
    {/* Surface texture */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-b-lg" />
  </div>
);

export default function BatteryExplodedView() {
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);
  const [breatheOffset, setBreatheOffset] = useState(0);
  const [hasExploded, setHasExploded] = useState(false);
  const [initialExplosionDone, setInitialExplosionDone] = useState(false);
  const explosionTriggered = useRef(false);
  
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Breathing animation
  useEffect(() => {
    const breatheInterval = setInterval(() => {
      setBreatheOffset((prev) => {
        const time = Date.now() / 1000;
        return Math.sin(time * (Math.PI / 2)) * 4;
      });
    }, 50);

    return () => clearInterval(breatheInterval);
  }, []);

  // Dramatic explosion on scroll into view
  useEffect(() => {
    if (inView && !explosionTriggered.current) {
      explosionTriggered.current = true;
      
      // Explode
      setHasExploded(true);
      
      // Hold for 600ms then reassemble
      setTimeout(() => {
        setHasExploded(false);
        setInitialExplosionDone(true);
      }, 600);
    }
  }, [inView]);

  return (
    <div 
      ref={ref}
      className="w-full flex items-center justify-center py-12"
    >
      <div 
        className="relative"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        {/* Ambient glow behind battery */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, #0078FF 0%, transparent 70%)",
          }}
        />
        
        {/* Battery layers */}
        <div className="relative flex flex-col items-center">
          {layerData.map((layer, index) => (
            <Layer
              key={layer.name}
              name={layer.name}
              index={index}
              isHovered={hoveredLayer === index}
              onHover={setHoveredLayer}
              breatheOffset={breatheOffset}
              hasExploded={hasExploded}
            />
          ))}
        </div>
        
        {/* Shadow */}
        <motion.div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-4 rounded-full bg-black/30 blur-md"
          animate={{
            scale: hasExploded ? [1, 1.2, 1] : 1,
            opacity: hasExploded ? [0.3, 0.15, 0.3] : 0.3,
          }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </div>
  );
}
