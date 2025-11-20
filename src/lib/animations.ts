// Animation durations
export const durations = {
  instant: "100ms",
  fast: "150ms",
  normal: "300ms",
  slow: "500ms",
  slower: "750ms",
  float: "6s",
  glow: "2s",
  shimmer: "2s",
} as const;

// Easing functions
export const easings = {
  linear: "linear",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  bounceIn: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  bounceOut: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

// Animation spacing values
export const spacing = {
  float: "-20px",
  shimmerOpacity: "0.2",
  shadowBlur: {
    small: "20px",
    medium: "40px",
    large: "60px",
  },
  shadowSpread: "-10px",
} as const;

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
    "50%": { transform: `translateY(${spacing.float})` },
  },
  glow: {
    "0%": { boxShadow: `0 0 ${spacing.shadowBlur.small} ${spacing.shadowSpread} hsl(var(--primary))` },
    "100%": { boxShadow: `0 0 ${spacing.shadowBlur.medium} ${spacing.shadowSpread} hsl(var(--primary))` },
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
  slideUpFade: {
    "0%": { transform: "translateY(20px)", opacity: "0" },
    "100%": { transform: "translateY(0)", opacity: "1" },
  },
  slideInLeft: {
    "0%": { transform: "translateX(-20px)", opacity: "0" },
    "100%": { transform: "translateX(0)", opacity: "1" },
  },
  slideInRight: {
    "0%": { transform: "translateX(20px)", opacity: "0" },
    "100%": { transform: "translateX(0)", opacity: "1" },
  },
} as const;

// Animation configurations
export const animations = {
  "accordion-down": `accordion-down ${durations.fast} ${easings.easeOut}`,
  "accordion-up": `accordion-up ${durations.fast} ${easings.easeOut}`,
  float: `float ${durations.float} ${easings.easeInOut} infinite`,
  glow: `glow ${durations.glow} ${easings.easeInOut} infinite alternate`,
  shimmer: `shimmer ${durations.shimmer} infinite`,
  pulse: `pulse ${durations.glow} ${easings.smooth} infinite`,
  fadeIn: `fadeIn ${durations.slow} ${easings.easeOut}`,
  slideIn: `slideIn ${durations.normal} ${easings.easeOut}`,
  scaleIn: `scaleIn ${durations.fast} ${easings.easeOut}`,
  slideUpFade: `slideUpFade ${durations.normal} ${easings.easeOut}`,
  slideInLeft: `slideInLeft ${durations.normal} ${easings.easeOut}`,
  slideInRight: `slideInRight ${durations.normal} ${easings.easeOut}`,
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