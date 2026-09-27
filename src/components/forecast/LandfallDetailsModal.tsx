"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { LandfallInfo } from "./types";
import { 
  AlertTriangle, 
  MapPin, 
  Clock, 
  Waves, 
  Wind, 
  X, 
  ArrowRight,
  Gauge
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Noise from "@/components/ui/Noise";

interface LandfallDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  landfall: LandfallInfo;
  stormName: string;
}

/* ─── Simulate Street Surge Pill Link (matches SC / scientist-pill) ─── */
function SimulateSurgePillLink({ href }: { href: string }) {
  const pillRef = useRef<HTMLAnchorElement | null>(null);
  const circleRef = useRef<HTMLSpanElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    let active = true;
    const layout = () => {
      if (!active) return;
      const circle = circleRef.current;
      const pill = pillRef.current;
      if (!circle || !pill) return;

      const w = pill.offsetWidth || pill.getBoundingClientRect().width;
      const h = pill.offsetHeight || pill.getBoundingClientRect().height;
      if (w === 0 || h === 0) return;

      const R = ((w * w) / 4 + h * h) / (2 * h);
      const D = Math.ceil(2 * R) + 2;
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      const originY = D - delta;

      circle.style.width = `${D}px`;
      circle.style.height = `${D}px`;
      circle.style.bottom = `-${delta}px`;

      gsap.set(circle, {
        xPercent: -50,
        scale: 0,
        transformOrigin: `50% ${originY}px`,
      });

      const label = pill.querySelector<HTMLElement>(".pill-label");
      const hover = pill.querySelector<HTMLElement>(".pill-label-hover");

      if (label) gsap.set(label, { y: 0 });
      if (hover) gsap.set(hover, { y: h + 12, opacity: 0 });

      tlRef.current?.kill();
      const tl = gsap.timeline({ paused: true });

      tl.to(circle, { scale: 1.5, xPercent: -50, duration: 1.6, ease: "power2.easeOut", overwrite: "auto" }, 0);

      if (label) {
        tl.to(label, { y: -(h + 8), duration: 1.6, ease: "power2.easeOut", overwrite: "auto" }, 0);
      }

      if (hover) {
        gsap.set(hover, { y: Math.ceil(h + 100), opacity: 0 });
        tl.to(hover, { y: 0, opacity: 1, duration: 1.6, ease: "power2.easeOut", overwrite: "auto" }, 0);
      }

      tlRef.current = tl;
    };

    layout();
    const timer = setTimeout(layout, 250);

    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    return () => {
      active = false;
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handleEnter = () => {
    tlRef.current?.tweenTo(tlRef.current.duration(), {
      duration: 0.3,
      ease: "power2.easeOut",
      overwrite: "auto",
    });
  };

  const handleLeave = () => {
    tlRef.current?.tweenTo(0, {
      duration: 0.25,
      ease: "power2.easeOut",
      overwrite: "auto",
    });
  };

  return (
    <Link
      ref={pillRef}
      href={href}
      className="scientist-pill"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      title="Simulate Street Surge"
    >
      <span className="hover-circle" aria-hidden="true" ref={circleRef} />
      <span className="label-stack">
        <span className="pill-label">
          <span>Simulate Street Surge</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#00F2FE]" />
        </span>
        <span className="pill-label-hover" aria-hidden="true">
          <span>Simulate Street Surge</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#050B14]" />
        </span>
      </span>
    </Link>
  );
}

/* ─── Broadcast Official Warning Pill Link (matches Simulate Surge pill, hazard orange theme) ─── */
function BroadcastWarningPillLink({ href }: { href: string }) {
  const pillRef = useRef<HTMLAnchorElement | null>(null);
  const circleRef = useRef<HTMLSpanElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    let active = true;
    const layout = () => {
      if (!active) return;
      const circle = circleRef.current;
      const pill = pillRef.current;
      if (!circle || !pill) return;

      const w = pill.offsetWidth || pill.getBoundingClientRect().width;
      const h = pill.offsetHeight || pill.getBoundingClientRect().height;
      if (w === 0 || h === 0) return;

      const R = ((w * w) / 4 + h * h) / (2 * h);
      const D = Math.ceil(2 * R) + 2;
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      const originY = D - delta;

      circle.style.width = `${D}px`;
      circle.style.height = `${D}px`;
      circle.style.bottom = `-${delta}px`;

      gsap.set(circle, {
        xPercent: -50,
        scale: 0,
        transformOrigin: `50% ${originY}px`,
      });

      const label = pill.querySelector<HTMLElement>(".pill-label");
      const hover = pill.querySelector<HTMLElement>(".pill-label-hover");

      if (label) gsap.set(label, { y: 0 });
      if (hover) gsap.set(hover, { y: h + 12, opacity: 0 });

      tlRef.current?.kill();
      const tl = gsap.timeline({ paused: true });

      tl.to(circle, { scale: 1.5, xPercent: -50, duration: 1.6, ease: "power2.easeOut", overwrite: "auto" }, 0);

      if (label) {
        tl.to(label, { y: -(h + 8), duration: 1.6, ease: "power2.easeOut", overwrite: "auto" }, 0);
      }

      if (hover) {
        gsap.set(hover, { y: Math.ceil(h + 100), opacity: 0 });
        tl.to(hover, { y: 0, opacity: 1, duration: 1.6, ease: "power2.easeOut", overwrite: "auto" }, 0);
      }

      tlRef.current = tl;
    };

    layout();
    const timer = setTimeout(layout, 250);

    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    return () => {
      active = false;
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handleEnter = () => {
    tlRef.current?.tweenTo(tlRef.current.duration(), {
      duration: 0.3,
      ease: "power2.easeOut",
      overwrite: "auto",
    });
  };

  const handleLeave = () => {
    tlRef.current?.tweenTo(0, {
      duration: 0.25,
      ease: "power2.easeOut",
      overwrite: "auto",
    });
  };

  return (
    <Link
      ref={pillRef}
      href={href}
      className="relative inline-flex items-center justify-center gap-2 h-[38px] px-3.5 bg-[rgba(255,94,54,0.10)] border border-[rgba(255,94,54,0.65)] hover:border-[#FF5E36] rounded-xl shadow-[0_8px_24px_-2px_rgba(0,0,0,0.85),0_4px_12px_rgba(0,0,0,0.95),0_0_14px_rgba(255,94,54,0.25),inset_0_1px_0_rgba(255,200,180,0.4)] hover:shadow-[0_12px_32px_-2px_rgba(0,0,0,0.95),0_6px_18px_rgba(0,0,0,0.95),0_0_28px_rgba(255,94,54,0.85),inset_0_1px_0_rgba(255,255,255,0.6)] hover:scale-[1.04] backdrop-blur-[20px] text-white font-rajdhani font-bold text-xs uppercase tracking-wider whitespace-nowrap cursor-pointer overflow-hidden transition-all duration-250 ease-out shrink-0"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      title="Broadcast Official Warning"
    >
      <span
        ref={circleRef}
        aria-hidden="true"
        className="absolute left-1/2 bottom-0 rounded-full bg-[#FF5E36] z-[1] block pointer-events-none will-change-transform"
      />
      <span className="relative inline-flex items-center justify-center gap-2 leading-none z-[2]">
        <span className="pill-label relative z-[2] inline-flex items-center gap-2 leading-none text-white font-bold will-change-transform">
          <span>Broadcast Official Warning</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#FF5E36]" />
        </span>
        <span
          className="pill-label-hover absolute left-0 top-0 text-[#050B14] z-[3] inline-flex items-center justify-center w-full gap-2 leading-none font-extrabold will-change-[transform,opacity]"
          aria-hidden="true"
        >
          <span>Broadcast Official Warning</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#050B14]" />
        </span>
      </span>
    </Link>
  );
}

export function LandfallDetailsModal({
  isOpen,
  onClose,
  landfall,
  stormName
}: LandfallDetailsModalProps) {
  // ESC key to dismiss
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050B14]/85 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="w-full max-w-2xl bg-[#0F1B2F]/95 backdrop-blur-xl border border-[rgba(0,242,254,0.35)] rounded-2xl shadow-[0_24px_70px_rgba(0,0,0,0.9),0_0_35px_rgba(0,242,254,0.18)] overflow-hidden relative flex flex-col max-h-[90vh] select-none pointer-events-auto no-scrollbar"
            onClick={(e) => e.stopPropagation()}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Top Cyan Cyber Scan Line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#00F2FE] to-transparent shrink-0 opacity-80" />

            {/* Noise texture overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
              <Noise patternSize={250} patternScaleX={1} patternScaleY={1} patternRefreshInterval={3} patternAlpha={8} />
            </div>

            <div className="relative z-10 flex flex-col flex-1 overflow-hidden">
              {/* Header Bar */}
              <div className="bg-[#050B14]/80 p-4 border-b border-[#1E3252] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF5E36]/15 border border-[#FF5E36]/50 flex items-center justify-center shadow-[0_0_16px_rgba(255,94,54,0.35)] shrink-0">
                    <MapPin className="w-5 h-5 text-[#FF5E36]" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-orbitron font-bold text-[#FF5E36] tracking-wide leading-none">
                      COASTAL LANDFALL SPECIFICATION
                    </h3>
                    <p className="text-xs font-rajdhani text-[#8E9EB5] font-semibold mt-1">
                      <span className="text-[#00F2FE]">{stormName}</span> Projected Intercept Diagnostics &amp; Coastal Vulnerability Profile
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-[#050B14]/80 hover:bg-[#00F2FE]/15 border border-[#1E3A5F] hover:border-[#00F2FE]/60 text-[#8E9EB5] hover:text-[#00F2FE] flex items-center justify-center transition-all cursor-pointer shrink-0"
                  title="Close (ESC)"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 overflow-y-auto space-y-4 text-xs font-inter text-[#8E9EB5] no-scrollbar">
                {/* Top Alert Banner with Periodic Glowing Effect */}
                <div className="bg-[#050B14]/90 border border-[#FF5E36]/40 rounded-xl p-3.5 flex items-start gap-3 animate-glow-orange transition-all">
                  <AlertTriangle className="w-5 h-5 text-[#FF5E36] shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <div className="text-xs sm:text-sm font-orbitron font-bold text-[#00F2FE] uppercase tracking-wider">
                      Predicted Landfall Site: <span className="text-[#FF5E36]">{landfall.targetDistrict}, {landfall.targetState}</span>
                    </div>
                    <p className="text-xs text-[#CBD5E1] mt-1 leading-relaxed">
                      Eye crossing scheduled at <strong className="text-[#00F2FE] font-mono">{landfall.coordinates.lat}°N, {landfall.coordinates.lng}°E</strong> with a temporal confidence window of <strong className="text-white font-mono">±{landfall.uncertaintyWindowHours} hours</strong>.
                    </p>
                  </div>
                </div>

                {/* Key Landfall Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-[#050B14]/85 p-3 rounded-xl border border-white/50 hover:border-white transition-all shadow-[0_4px_16px_rgba(0,0,0,0.5),0_0_16px_rgba(255,255,255,0.2)]">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-white/90 mb-1">
                      <Clock className="w-3.5 h-3.5 text-white" />
                      Estimated Arrival
                    </div>
                    <div className="text-xl font-orbitron font-bold text-white tracking-tight">
                      T+{landfall.landfallHourOffset}h
                    </div>
                  </div>

                  <div className="bg-[#050B14]/85 p-3 rounded-xl border border-[#FF5E36]/50 hover:border-[#FF5E36] transition-all shadow-[0_4px_16px_rgba(0,0,0,0.5),0_0_16px_rgba(255,94,54,0.2)]">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF5E36]/90 mb-1">
                      <Waves className="w-3.5 h-3.5 text-[#FF5E36]" />
                      Projected Surge
                    </div>
                    <div className="text-xl font-orbitron font-bold text-[#FF5E36] tracking-tight">
                      +{landfall.projectedSurgeMeters}m
                    </div>
                  </div>

                  <div className="bg-[#050B14]/85 p-3 rounded-xl border border-[#00F2FE]/50 hover:border-[#00F2FE] transition-all shadow-[0_4px_16px_rgba(0,0,0,0.5),0_0_16px_rgba(0,242,254,0.2)]">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#00F2FE]/90 mb-1">
                      <Wind className="w-3.5 h-3.5 text-[#00F2FE]" />
                      Peak Landfall Winds
                    </div>
                    <div className="text-xl font-orbitron font-bold text-[#00F2FE] tracking-tight">
                      {landfall.peakWindSpeedKmh} <span className="text-xs font-normal font-sans text-[#00F2FE]/80">km/h</span>
                    </div>
                  </div>

                  <div className="bg-[#050B14]/85 p-3 rounded-xl border border-[#10E7A2]/50 hover:border-[#10E7A2] transition-all shadow-[0_4px_16px_rgba(0,0,0,0.5),0_0_16px_rgba(16,231,162,0.2)]">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#10E7A2]/90 mb-1">
                      <Gauge className="w-3.5 h-3.5 text-[#10E7A2]" />
                      Central Pressure
                    </div>
                    <div className="text-xl font-orbitron font-bold text-[#10E7A2] tracking-tight">
                      {landfall.centralPressureHpa} <span className="text-xs font-normal font-sans text-[#10E7A2]/80">hPa</span>
                    </div>
                  </div>
                </div>

                {/* Affected Blocks & Evacuation Readiness */}
                <div className="bg-[#050B14]/85 p-4 rounded-xl border border-[#1E3252] space-y-3 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                  <div>
                    <span className="text-xs font-orbitron font-bold text-[#00F2FE] uppercase tracking-wider block mb-2">
                      Vulnerable Coastal Revenue Blocks:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {landfall.affectedBlocks.map((block) => (
                        <span
                          key={block}
                          className="px-2.5 py-1 rounded-lg bg-[#0F1B2F]/90 border border-[rgba(0,242,254,0.3)] hover:border-[#00F2FE] text-white font-mono text-xs flex items-center gap-1.5 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                        >
                          <MapPin className="w-3 h-3 text-[#FF5E36] shrink-0" />
                          <span>{block}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer CTAs */}
              <div className="p-4 bg-[#050B14]/80 border-t border-[#1E3252] flex flex-wrap items-center justify-end gap-3 shrink-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <SimulateSurgePillLink href={`/digital-twin?surge=${landfall.projectedSurgeMeters}m`} />
                  <BroadcastWarningPillLink href={`/alerts?storm=${stormName.toLowerCase().replace("cyclone ", "")}&auto=true`} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
