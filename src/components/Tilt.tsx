"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

interface TiltProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  maxTilt?: number;
  perspective?: number;
  disabled?: boolean;
  glare?: boolean;
  glareIntensity?: number;
}

export default function Tilt({
  children,
  className = "",
  style,
  maxTilt = 8,
  perspective = 1000,
  disabled = false,
  glare = true,
  glareIntensity = 0.45,
}: TiltProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const resetTransform = () => {
    const el = wrapperRef.current;
    if (el) {
      el.style.transition = "transform 200ms ease-out";
      el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg)`;
    }
    const g = glareRef.current;
    if (g) {
      g.style.transition = "opacity 250ms ease-out";
      g.style.opacity = "0";
    }
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || reducedMotionRef.current) return;
    const el = wrapperRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const yRatio = (e.clientY - rect.top) / rect.height;
    const tiltY = (xRatio - 0.5) * 2 * maxTilt;
    const tiltX = -(yRatio - 0.5) * 2 * maxTilt;

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.transition = "none";
      el.style.transform = `perspective(${perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

      const g = glareRef.current;
      if (g) {
        const x = xRatio * 100;
        const y = yRatio * 100;
        g.style.transition = "none";
        g.style.opacity = "1";
        g.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,${glareIntensity}) 0%, rgba(255,255,255,0) 55%)`;
      }
    });
  };

  const handleLeave = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    resetTransform();
  };

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        position: "relative",
        transformStyle: "preserve-3d",
        willChange: "transform",
        backfaceVisibility: "hidden",
        ...style,
      }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0,
            mixBlendMode: "soft-light",
            willChange: "opacity, background",
          }}
        />
      )}
    </div>
  );
}
