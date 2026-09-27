"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, useMotionValue, useAnimationFrame, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ShinyBadgeProps {
  children?: React.ReactNode;
  disabled?: boolean;
  speed?: number;
  className?: string;
  innerClassName?: string;
  borderColor?: string;
  borderShineColor?: string;
  surfaceColor?: string;
  surfaceShineColor?: string;
  spread?: number;
  yoyo?: boolean;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  delay?: number;
  roundedClassName?: string;
}

export const ShinyBadge: React.FC<ShinyBadgeProps> = ({
  children,
  disabled = false,
  speed = 2.5,
  className = "",
  innerClassName = "",
  borderColor = "rgba(0, 242, 254, 0.4)",
  borderShineColor = "#ffffff",
  surfaceColor = "rgba(0, 242, 254, 0.2)",
  surfaceShineColor = "rgba(255, 255, 255, 0.65)",
  spread = 90,
  yoyo = true,
  pauseOnHover = false,
  direction = "right",
  delay = 1,
  roundedClassName = "rounded-full",
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const directionRef = useRef(direction === "left" ? 1 : -1);

  const animationDuration = speed * 1000;
  const delayDuration = delay * 1000;

  useAnimationFrame((time) => {
    if (disabled || isPaused) {
      lastTimeRef.current = null;
      return;
    }

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;

    elapsedRef.current += deltaTime;

    if (yoyo) {
      const cycleDuration = animationDuration + delayDuration;
      const fullCycle = cycleDuration * 2;
      const cycleTime = elapsedRef.current % fullCycle;

      if (cycleTime < animationDuration) {
        const p = (cycleTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else if (cycleTime < cycleDuration) {
        progress.set(directionRef.current === 1 ? 100 : 0);
      } else if (cycleTime < cycleDuration + animationDuration) {
        const reverseTime = cycleTime - cycleDuration;
        const p = 100 - (reverseTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else {
        progress.set(directionRef.current === 1 ? 0 : 100);
      }
    } else {
      const cycleDuration = animationDuration + delayDuration;
      const cycleTime = elapsedRef.current % cycleDuration;

      if (cycleTime < animationDuration) {
        const p = (cycleTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else {
        progress.set(directionRef.current === 1 ? 100 : 0);
      }
    }
  });

  useEffect(() => {
    directionRef.current = direction === "left" ? 1 : -1;
    elapsedRef.current = 0;
    progress.set(0);
  }, [direction]);

  // Transform: p=0 -> 150% (shine off right), p=100 -> -50% (shine off left)
  const backgroundPosition = useTransform(progress, (p) => `${150 - p * 2}% center`);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  const borderGradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(${spread}deg, ${borderColor} 0%, ${borderColor} 35%, ${borderShineColor} 50%, ${borderColor} 65%, ${borderColor} 100%)`,
    backgroundSize: "200% auto",
  };

  const surfaceGradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(${spread}deg, transparent 0%, transparent 35%, ${surfaceColor} 44%, ${surfaceShineColor} 50%, ${surfaceColor} 56%, transparent 65%, transparent 100%)`,
    backgroundSize: "200% auto",
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center p-[1px] overflow-hidden select-none shadow-[0_4px_14px_rgba(0,0,0,0.35),0_1px_3px_rgba(0,0,0,0.2),0_0_10px_rgba(0,242,254,0.15)] cursor-default",
        roundedClassName,
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Glowing Animated Border Shine */}
      <motion.div
        className={`absolute inset-0 ${roundedClassName} pointer-events-none`}
        style={{ ...borderGradientStyle, backgroundPosition }}
      />

      {/* 2. Inner Body with crisp border reinforcement */}
      <div
        className={cn(
          "relative w-full h-full px-3.5 py-1.5 bg-[#0F1B2F]/95 backdrop-blur-md border border-[rgba(0,242,254,0.4)] flex items-center gap-2 overflow-hidden",
          roundedClassName,
          innerClassName
        )}
      >
        {/* 3. Sweeping Surface Specular Glare across entire container */}
        <motion.div
          className={`absolute inset-0 pointer-events-none ${roundedClassName} z-10`}
          style={{ ...surfaceGradientStyle, backgroundPosition }}
        />

        {/* 4. Child Elements (Icon + Text) */}
        <div className="relative z-20 flex items-center gap-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ShinyBadge;
