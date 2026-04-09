// 2026 SaaS Premium Animation Library
// Smooth, sophisticated animations with staggered effects

export const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export const fadeSlide = {
  initial: { opacity: 0, y: 50, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

export const slideInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

// Staggered container for parent elements
export const staggerContainer = {
  initial: {},
  animate: {
    transition: { 
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// Staggered item with fade and slide
export const staggerItem = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Faster stagger for dense content
export const staggerContainerFast = {
  initial: {},
  animate: {
    transition: { 
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

export const staggerItemFast = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Bento grid item animations
export const bentoItem = {
  initial: { opacity: 0, y: 40, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Hover lift animation for cards
export const hoverLift = {
  rest: { 
    y: 0, 
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  hover: { 
    y: -8, 
    scale: 1.02,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

// Subtle hover for buttons
export const hoverLiftSubtle = {
  rest: { 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  hover: { 
    y: -4,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Glow pulse animation
export const glowPulse = {
  initial: { opacity: 0.4 },
  animate: { 
    opacity: [0.4, 0.8, 0.4],
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

// Float animation for decorative elements
export const float = {
  initial: { y: 0, rotate: 0 },
  animate: { 
    y: [-8, 8, -8],
    rotate: [-2, 2, -2],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

// Parallax scroll animation config
export const parallaxConfig = {
  slow: { yPercent: -10 },
  medium: { yPercent: -20 },
  fast: { yPercent: -40 },
};

// Page transition
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

// Blur in animation
export const blurIn = {
  initial: { opacity: 0, filter: "blur(10px)" },
  animate: { 
    opacity: 1, 
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Scale and blur for images
export const imageReveal = {
  initial: { scale: 1.1, opacity: 0, filter: "blur(20px)" },
  animate: { 
    scale: 1, 
    opacity: 1, 
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Card 3D tilt effect (use with motion.div onMouseMove)
export const tiltConfig = {
  maxTilt: 8,
  perspective: 1000,
  scale: 1.02,
  transitionDuration: 400,
};
