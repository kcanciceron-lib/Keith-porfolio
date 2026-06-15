import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "w-full" | "w-fit";
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const ScrollReveal = ({
  children,
  width = "w-full",
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 30,
  className = "",
  style,
}: ScrollRevealProps) => {
  const getInitial = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: distance };
      case "down": return { opacity: 0, y: -distance };
      case "left": return { opacity: 0, x: distance };
      case "right": return { opacity: 0, x: -distance };
      default: return { opacity: 0, y: distance };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Smooth cubic-bezier
      }}
      className={`${width} ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  );
};
