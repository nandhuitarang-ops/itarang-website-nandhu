"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface FadeInOnScrollProps {
  children: ReactNode;
  direction?: "up" | "left" | "right" | "none";
  delay?: number;
  className?: string;
  scale?: boolean;
  blur?: boolean;
}

const directionOffsets = {
  up: { x: 0, y: 50 },
  left: { x: -50, y: 0 },
  right: { x: 50, y: 0 },
  none: { x: 0, y: 0 },
};

export default function FadeInOnScroll({
  children,
  direction = "up",
  delay = 0,
  className,
  scale = false,
  blur = false,
}: FadeInOnScrollProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const offset = directionOffsets[direction];

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
        scale: scale ? 0.95 : 1,
        filter: blur ? "blur(10px)" : "blur(0px)",
      }}
      animate={
        inView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }
          : {
              opacity: 0,
              x: offset.x,
              y: offset.y,
              scale: scale ? 0.95 : 1,
              filter: blur ? "blur(10px)" : "blur(0px)",
            }
      }
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
