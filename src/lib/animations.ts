// Animation keyframes
export const keyframes = {
  "accordion-down": {
    from: { height: "0" },
    to: { height: "var(--radix-accordion-content-height)" },
  },
  "accordion-up": {
    from: { height: "var(--radix-accordion-content-height)" },
    to: { height: "0" },
  },
  float: {
    "0%, 100%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-20px)" },
  },
  glow: {
    "0%": { boxShadow: "0 0 20px -10px hsl(var(--primary))" },
    "100%": { boxShadow: "0 0 40px -10px hsl(var(--primary))" },
  },
  shimmer: {
    "0%": { transform: "translateX(-100%)" },
    "100%": { transform: "translateX(100%)" },
  },
  pulse: {
    "0%, 100%": { opacity: "1" },
    "50%": { opacity: "0.5" },
  },
  fadeIn: {
    "0%": { opacity: "0", transform: "translateY(10px)" },
    "100%": { opacity: "1", transform: "translateY(0)" },
  },
  slideIn: {
    "0%": { transform: "translateX(-100%)" },
    "100%": { transform: "translateX(0)" },
  },
  scaleIn: {
    "0%": { transform: "scale(0.95)", opacity: "0" },
    "100%": { transform: "scale(1)", opacity: "1" },
  },
} as const;

// Animation configurations
export const animations = {
  "accordion-down": "accordion-down 0.2s ease-out",
  "accordion-up": "accordion-up 0.2s ease-out",
  float: "float 6s ease-in-out infinite",
  glow: "glow 2s ease-in-out infinite alternate",
  shimmer: "shimmer 2s infinite",
  pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  fadeIn: "fadeIn 0.5s ease-out",
  slideIn: "slideIn 0.3s ease-out",
  scaleIn: "scaleIn 0.2s ease-out",
} as const;

// Animation durations
export const durations = {
  fast: "150ms",
  normal: "300ms",
  slow: "500ms",
  slower: "750ms",
} as const;

// Easing functions
export const easings = {
  linear: "linear",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  bounceIn: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  bounceOut: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
} as const;

// Animation utilities
export const getStaggeredDelay = (index: number, baseDelay = 100) => {
  return `${index * baseDelay}ms`;
};

export const createStaggeredAnimation = (
  animationName: keyof typeof animations,
  totalItems: number,
  baseDelay = 100
) => {
  return Array.from({ length: totalItems }, (_, i) => ({
    animationName: animations[animationName],
    animationDelay: getStaggeredDelay(i, baseDelay),
  }));
};