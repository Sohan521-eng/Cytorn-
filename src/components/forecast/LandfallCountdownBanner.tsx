"use client";

import React, { useState, useEffect, useRef } from "react";
import { LandfallInfo } from "./types";
import { 
  Clock, 
  MapPin, 
  Waves, 
  Wind, 
  AlertTriangle, 
  ArrowUpRight 
} from "lucide-react";
import Noise from "@/components/ui/Noise";
import { gsap } from "gsap";

/* ─── Intercept Model Pill Button (Matches SC ScientistProfilePill styling & GSAP circular expansion effect) ─── */
function InterceptModelPillButton({
  onClick,
  className = "",
}: {
  onClick?: () => void;
  className?: string;
}) {
  const pillRef = useRef<HTMLButtonElement | null>(null);
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
    <button
      type="button"
      ref={pillRef}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className={`scientist-pill ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      title="View Full Intercept Model"
    >
      <span className="hover-circle" aria-hidden="true" ref={circleRef} />
      <span className="label-stack">
        <span className="pill-label">
          <span>View Full Intercept Model</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#00F2FE]" />
        </span>
        <span className="pill-label-hover" aria-hidden="true">
          <span>View Full Intercept Model</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#050B14]" />
        </span>
      </span>
    </button>
  );
}

interface LandfallCountdownBannerProps {
  landfall: LandfallInfo;
  stormName: string;
  onOpenDetails: () => void;
}

export function LandfallCountdownBanner({
  landfall,
  stormName: _stormName,
  onOpenDetails,
}: LandfallCountdownBannerProps) {
  // Compute initial remaining seconds based on landfallHourOffset
  const initialSeconds = Math.round(landfall.landfallHourOffset * 3600);
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);

  // Live countdown timer ticking down every second
  useEffect(() => {
    setSecondsRemaining(Math.round(landfall.landfallHourOffset * 3600));
  }, [landfall.landfallHourOffset]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(secondsRemaining / (24 * 3600));
  const hours = Math.floor((secondsRemaining % (24 * 3600)) / 3600);
  const minutes = Math.floor((secondsRemaining % 3600) / 60);
  const seconds = secondsRemaining % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div 
      onClick={onOpenDetails}
      className="w-full bg-[#2A0E06]/95 bg-gradient-to-r from-[#4A1608]/95 via-[#381105]/95 to-[#240A03]/95 backdrop-blur-md border-2 border-[#FF5E36] hover:border-[#FF7A59] rounded-xl p-3 sm:p-4 my-4 shadow-[0_0_30px_rgba(255,94,54,0.4),0_8px_32px_rgba(0,0,0,0.8)] hover:shadow-[0_0_42px_rgba(255,94,54,0.6),0_8px_32px_rgba(0,0,0,0.8)] transition-all cursor-pointer relative overflow-hidden group"
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl z-0">
        <Noise patternSize={250} patternScaleX={1} patternScaleY={1} patternRefreshInterval={3} patternAlpha={14} />
      </div>

      {/* Hazard coral glowing ambient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF5E36]/20 via-[#FF5E36]/10 to-[#FF5E36]/15 pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-64 h-full bg-[#FF5E36]/15 blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* LEFT: Target Diagnostics & Header */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#050B14] border-2 border-[#FF5E36] flex items-center justify-center shrink-0 shadow-[0_0_18px_rgba(255,94,54,0.5)] group-hover:scale-105 transition-transform">
            <AlertTriangle className="w-5 h-5 text-[#FF5E36] animate-pulse" />
          </div>

          <div>
            <div className="text-sm sm:text-base font-orbitron font-bold text-white tracking-wide flex flex-wrap items-center gap-x-2">
              <span>
                <span className="text-[#FF5E36] [text-shadow:0_2px_4px_rgba(0,0,0,0.95)]">Target:</span>{" "}
                <span className="text-[#00F2FE] [text-shadow:0_2px_4px_rgba(0,0,0,0.95)]">
                  {landfall.targetDistrict} ({landfall.coordinates.lat}°N, {landfall.coordinates.lng}°E)
                </span>
              </span>
              <span className="text-xs font-rajdhani font-semibold text-slate-300">
                | Window: <strong className="text-[#00F2FE] font-mono font-bold">±{landfall.uncertaintyWindowHours}h</strong> | Surge: <strong className="text-[#00F2FE] font-mono font-bold">+{landfall.projectedSurgeMeters}m</strong>
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: Live Ticking Countdown Clock in Orbitron 800 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/20 w-full lg:w-auto">
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 order-1 sm:order-2 lg:order-1">
            {/* Days */}
            <div className="flex flex-col items-center bg-[#050B14] px-2.5 py-1.5 rounded-lg border border-[#FF5E36]/60 min-w-[50px] shadow-[0_4px_16px_rgba(0,0,0,0.7),0_0_10px_rgba(255,94,54,0.2)]">
              <span className="text-base sm:text-lg font-orbitron font-extrabold text-[#FF5E36]">
                {pad(days)}
              </span>
              <span className="text-[8px] font-rajdhani uppercase font-bold text-[#FF5E36]/90">Days</span>
            </div>
            <span className="text-lg font-bold text-[#00F2FE] -mt-2">:</span>

            {/* Hours */}
            <div className="flex flex-col items-center bg-[#050B14] px-2.5 py-1.5 rounded-lg border border-[rgba(0,242,254,0.4)] min-w-[50px] shadow-[0_4px_16px_rgba(0,0,0,0.7),0_0_10px_rgba(0,242,254,0.15)]">
              <span className="text-base sm:text-lg font-orbitron font-extrabold text-[#00F2FE]">
                {pad(hours)}
              </span>
              <span className="text-[8px] font-rajdhani uppercase font-bold text-[#00F2FE]/90">Hours</span>
            </div>
            <span className="text-lg font-bold text-[#00F2FE] -mt-2">:</span>

            {/* Minutes */}
            <div className="flex flex-col items-center bg-[#050B14] px-2.5 py-1.5 rounded-lg border border-[#FF5E36]/60 min-w-[50px] shadow-[0_4px_16px_rgba(0,0,0,0.7),0_0_10px_rgba(255,94,54,0.2)]">
              <span className="text-base sm:text-lg font-orbitron font-extrabold text-[#FF5E36]">
                {pad(minutes)}
              </span>
              <span className="text-[8px] font-rajdhani uppercase font-bold text-[#FF5E36]/90">Mins</span>
            </div>
            <span className="text-lg font-bold text-[#00F2FE] -mt-2">:</span>

            {/* Seconds */}
            <div className="flex flex-col items-center bg-[#050B14] px-2.5 py-1.5 rounded-lg border border-[rgba(0,242,254,0.4)] min-w-[50px] shadow-[0_4px_16px_rgba(0,0,0,0.7),0_0_10px_rgba(0,242,254,0.15)]">
              <span className="text-base sm:text-lg font-orbitron font-extrabold text-[#00F2FE]">
                {pad(seconds)}
              </span>
              <span className="text-[8px] font-rajdhani uppercase font-bold text-[#00F2FE]/90">Secs</span>
            </div>
          </div>

          <InterceptModelPillButton
            onClick={onOpenDetails}
            className="order-2 sm:order-1 lg:order-2"
          />
        </div>
      </div>
    </div>
  );
}
