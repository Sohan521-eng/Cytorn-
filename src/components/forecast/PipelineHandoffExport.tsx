"use client";

import React, { useState, useRef, useEffect } from "react";
import { StormScenario } from "./types";
import { 
  AlertTriangle, 
  Waves, 
  FileCode, 
  FileSpreadsheet, 
  Archive, 
  FlaskConical, 
  ArrowUpRight,
  CheckCircle2,
  Share2
} from "lucide-react";
import Link from "next/link";
import { gsap } from "gsap";
import Noise from "@/components/ui/Noise";

/* ─── Broadcast Alerts Pill Link (Matches ScientistProfilePill styling & GSAP circular expansion effect) ─── */
function BroadcastAlertsPillLink({ href }: { href: string }) {
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
      className="relative p-3.5 rounded-xl bg-[rgba(255,94,54,0.10)] border border-[rgba(255,94,54,0.65)] hover:border-[#FF5E36] shadow-[0_8px_24px_-2px_rgba(0,0,0,0.85),0_4px_12px_rgba(0,0,0,0.95),0_0_14px_rgba(255,94,54,0.25),inset_0_1px_0_rgba(255,200,180,0.4)] hover:shadow-[0_12px_32px_-2px_rgba(0,0,0,0.95),0_6px_18px_rgba(0,0,0,0.95),0_0_28px_rgba(255,94,54,0.85),inset_0_1px_0_rgba(255,255,255,0.6)] hover:scale-[1.02] backdrop-blur-[20px] transition-all duration-250 ease-out cursor-pointer overflow-hidden flex items-center justify-between group"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      title="Broadcast to Alerts"
    >
      <span
        ref={circleRef}
        aria-hidden="true"
        className="absolute left-1/2 bottom-0 rounded-full bg-[#FF5E36] z-[1] block pointer-events-none will-change-transform"
      />
      <div className="relative z-[2] w-full flex items-center justify-between">
        {/* Default resting label */}
        <div className="pill-label relative z-[2] w-full flex items-center justify-between will-change-transform">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FF5E36]/15 border border-[#FF5E36]/30 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4 text-[#FF5E36]" />
            </div>
            <div>
              <div className="text-xs font-rajdhani font-bold tracking-wider uppercase text-white">
                Broadcast to Alerts
              </div>
              <div className="text-[10px] text-[#FF5E36] font-jetbrains">
                Broadcast Emergency Early Warning Bulletins
              </div>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-[#FF5E36] shrink-0 ml-2" />
        </div>

        {/* Hover label (inverted dark on hazard orange circle) */}
        <div
          className="pill-label-hover absolute inset-0 z-[3] w-full flex items-center justify-between will-change-[transform,opacity]"
          aria-hidden="true"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#050B14]/15 border border-[#050B14]/30 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4 text-[#050B14]" />
            </div>
            <div>
              <div className="text-xs font-rajdhani font-bold tracking-wider uppercase text-[#050B14]">
                Broadcast to Alerts
              </div>
              <div className="text-[10px] text-[#050B14]/90 font-jetbrains">
                Broadcast Emergency Early Warning Bulletins
              </div>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-[#050B14] shrink-0 ml-2" />
        </div>
      </div>
    </Link>
  );
}

/* ─── Simulate Flooding Pill Link (Matches BroadcastAlertsPillLink styling & GSAP circular expansion effect in Cyan) ─── */
function SimulateFloodingPillLink({ href, surgeMeters }: { href: string; surgeMeters: number }) {
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
      className="relative p-3.5 rounded-xl bg-[rgba(0,242,254,0.10)] border border-[rgba(0,242,254,0.65)] hover:border-[#00F2FE] shadow-[0_8px_24px_-2px_rgba(0,0,0,0.85),0_4px_12px_rgba(0,0,0,0.95),0_0_14px_rgba(0,242,254,0.2),inset_0_1px_0_rgba(224,252,255,0.4)] hover:shadow-[0_12px_32px_-2px_rgba(0,0,0,0.95),0_6px_18px_rgba(0,0,0,0.95),0_0_28px_rgba(0,242,254,0.85),inset_0_1px_0_rgba(255,255,255,0.6)] hover:scale-[1.02] backdrop-blur-[20px] transition-all duration-250 ease-out cursor-pointer overflow-hidden flex items-center justify-between group"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      title="Simulate Street Flooding"
    >
      <span
        ref={circleRef}
        aria-hidden="true"
        className="absolute left-1/2 bottom-0 rounded-full bg-[#00F2FE] z-[1] block pointer-events-none will-change-transform"
      />
      <div className="relative z-[2] w-full flex items-center justify-between">
        {/* Default resting label */}
        <div className="pill-label relative z-[2] w-full flex items-center justify-between will-change-transform">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00F2FE]/15 border border-[#00F2FE]/30 flex items-center justify-center shrink-0">
              <Waves className="w-4 h-4 text-[#00F2FE]" />
            </div>
            <div>
              <div className="text-xs font-rajdhani font-bold tracking-wider uppercase text-white">
                Simulate Street Flooding
              </div>
              <div className="text-[10px] text-[#00F2FE] font-jetbrains">
                View Real-Time Coastal Flood Impact Simulation
              </div>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-[#00F2FE] shrink-0 ml-2" />
        </div>

        {/* Hover label (inverted dark on cyan circle) */}
        <div
          className="pill-label-hover absolute inset-0 z-[3] w-full flex items-center justify-between will-change-[transform,opacity]"
          aria-hidden="true"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#050B14]/15 border border-[#050B14]/30 flex items-center justify-center shrink-0">
              <Waves className="w-4 h-4 text-[#050B14]" />
            </div>
            <div>
              <div className="text-xs font-rajdhani font-bold tracking-wider uppercase text-[#050B14]">
                Simulate Street Flooding
              </div>
              <div className="text-[10px] text-[#050B14]/90 font-jetbrains">
                View Real-Time Coastal Flood Impact Simulation
              </div>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-[#050B14] shrink-0 ml-2" />
        </div>
      </div>
    </Link>
  );
}

/* ─── Validate in PINNs Lab Pill Link (Matches styling & GSAP circular expansion effect in Deep Navy theme) ─── */
function ValidatePinnsPillLink({ href }: { href: string }) {
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
      className="relative p-3.5 rounded-xl bg-[rgba(16,231,162,0.10)] border border-[rgba(16,231,162,0.65)] hover:border-[#10E7A2] shadow-[0_8px_24px_-2px_rgba(0,0,0,0.85),0_4px_12px_rgba(0,0,0,0.95),0_0_14px_rgba(16,231,162,0.2),inset_0_1px_0_rgba(180,255,225,0.4)] hover:shadow-[0_12px_32px_-2px_rgba(0,0,0,0.95),0_6px_18px_rgba(0,0,0,0.95),0_0_28px_rgba(16,231,162,0.85),inset_0_1px_0_rgba(255,255,255,0.6)] hover:scale-[1.02] backdrop-blur-[20px] transition-all duration-250 ease-out cursor-pointer overflow-hidden flex items-center justify-between group"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      title="Validate in PINNs Lab"
    >
      <span
        ref={circleRef}
        aria-hidden="true"
        className="absolute left-1/2 bottom-0 rounded-full bg-[#10E7A2] z-[1] block pointer-events-none will-change-transform"
      />
      <div className="relative z-[2] w-full flex items-center justify-between">
        {/* Default resting label */}
        <div className="pill-label relative z-[2] w-full flex items-center justify-between will-change-transform">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#10E7A2]/15 border border-[#10E7A2]/30 flex items-center justify-center shrink-0">
              <FlaskConical className="w-4 h-4 text-[#10E7A2]" />
            </div>
            <div>
              <div className="text-xs font-rajdhani font-bold tracking-wider uppercase text-white">
                Validate in PINNs Lab
              </div>
              <div className="text-[10px] text-[#10E7A2] font-jetbrains">
                Run Real-Time AI &amp; Physics Model Validation
              </div>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-[#10E7A2] shrink-0 ml-2" />
        </div>

        {/* Hover label (inverted dark on green circle) */}
        <div
          className="pill-label-hover absolute inset-0 z-[3] w-full flex items-center justify-between will-change-[transform,opacity]"
          aria-hidden="true"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#050B14]/15 border border-[#050B14]/30 flex items-center justify-center shrink-0">
              <FlaskConical className="w-4 h-4 text-[#050B14]" />
            </div>
            <div>
              <div className="text-xs font-rajdhani font-bold tracking-wider uppercase text-[#050B14]">
                Validate in PINNs Lab
              </div>
              <div className="text-[10px] text-[#050B14]/90 font-jetbrains">
                Run Real-Time AI &amp; Physics Model Validation
              </div>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-[#050B14] shrink-0 ml-2" />
        </div>
      </div>
    </Link>
  );
}

/* ─── Reusable Scientific GIS Export Pill Button with GSAP Circular Ripple ─── */
const exportVariantStyles = {
  cyan: {
    color: "#00F2FE",
    classes: "bg-[rgba(0,242,254,0.10)] border-[rgba(0,242,254,0.65)] hover:border-[#00F2FE] shadow-[0_8px_24px_-2px_rgba(0,0,0,0.85),0_4px_12px_rgba(0,0,0,0.95),0_0_14px_rgba(0,242,254,0.2),inset_0_1px_0_rgba(224,252,255,0.4)] hover:shadow-[0_12px_32px_-2px_rgba(0,0,0,0.95),0_6px_18px_rgba(0,0,0,0.95),0_0_28px_rgba(0,242,254,0.85),inset_0_1px_0_rgba(255,255,255,0.6)]",
  },
  amber: {
    color: "#F59E0B",
    classes: "bg-[rgba(245,158,11,0.10)] border-[rgba(245,158,11,0.65)] hover:border-[#F59E0B] shadow-[0_8px_24px_-2px_rgba(0,0,0,0.85),0_4px_12px_rgba(0,0,0,0.95),0_0_14px_rgba(245,158,11,0.25),inset_0_1px_0_rgba(254,243,199,0.4)] hover:shadow-[0_12px_32px_-2px_rgba(0,0,0,0.95),0_6px_18px_rgba(0,0,0,0.95),0_0_28px_rgba(245,158,11,0.85),inset_0_1px_0_rgba(255,255,255,0.6)]",
  },
  emerald: {
    color: "#10E7A2",
    classes: "bg-[rgba(16,231,162,0.10)] border-[rgba(16,231,162,0.65)] hover:border-[#10E7A2] shadow-[0_8px_24px_-2px_rgba(0,0,0,0.85),0_4px_12px_rgba(0,0,0,0.95),0_0_14px_rgba(16,231,162,0.2),inset_0_1px_0_rgba(180,255,225,0.4)] hover:shadow-[0_12px_32px_-2px_rgba(0,0,0,0.95),0_6px_18px_rgba(0,0,0,0.95),0_0_28px_rgba(16,231,162,0.85),inset_0_1px_0_rgba(255,255,255,0.6)]",
  },
};

interface ExportPillButtonProps {
  onClick: () => void;
  title: string;
  label: string;
  icon: React.ReactNode;
  iconHover: React.ReactNode;
  variant: "cyan" | "amber" | "emerald";
}

function ExportPillButton({
  onClick,
  title,
  label,
  icon,
  iconHover,
  variant,
}: ExportPillButtonProps) {
  const pillRef = useRef<HTMLButtonElement | null>(null);
  const circleRef = useRef<HTMLSpanElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const styleConfig = exportVariantStyles[variant];

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

      const labelEl = pill.querySelector<HTMLElement>(".pill-label");
      const hoverEl = pill.querySelector<HTMLElement>(".pill-label-hover");

      if (labelEl) gsap.set(labelEl, { y: 0 });
      if (hoverEl) gsap.set(hoverEl, { y: h + 12, opacity: 0 });

      tlRef.current?.kill();
      const tl = gsap.timeline({ paused: true });

      tl.to(circle, { scale: 1.5, xPercent: -50, duration: 1.6, ease: "power2.easeOut", overwrite: "auto" }, 0);

      if (labelEl) {
        tl.to(labelEl, { y: -(h + 8), duration: 1.6, ease: "power2.easeOut", overwrite: "auto" }, 0);
      }

      if (hoverEl) {
        gsap.set(hoverEl, { y: Math.ceil(h + 100), opacity: 0 });
        tl.to(hoverEl, { y: 0, opacity: 1, duration: 1.6, ease: "power2.easeOut", overwrite: "auto" }, 0);
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
      onClick={onClick}
      className={`relative inline-flex items-center justify-center gap-2 h-[38px] px-3.5 rounded-xl border ${styleConfig.classes} hover:scale-[1.03] backdrop-blur-[20px] transition-all duration-250 ease-out cursor-pointer overflow-hidden group shrink-0`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      title={title}
    >
      <span
        ref={circleRef}
        aria-hidden="true"
        className="absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none will-change-transform"
        style={{ backgroundColor: styleConfig.color }}
      />
      <span className="relative z-[2] inline-flex items-center justify-center">
        {/* Default label */}
        <span className="pill-label relative z-[2] inline-flex items-center gap-2 will-change-transform font-jetbrains text-xs text-white font-medium">
          {icon}
          <span>{label}</span>
        </span>

        {/* Hover label */}
        <span
          className="pill-label-hover absolute inset-0 z-[3] inline-flex items-center justify-center gap-2 will-change-[transform,opacity] font-jetbrains text-xs text-[#050B14] font-bold"
          aria-hidden="true"
        >
          {iconHover}
          <span>{label}</span>
        </span>
      </span>
    </button>
  );
}

interface PipelineHandoffExportProps {
  scenario: StormScenario;
}

export function PipelineHandoffExport({ scenario }: PipelineHandoffExportProps) {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const stormParam = scenario.name.toLowerCase().replace("cyclone ", "");
  const surgeParam = `${scenario.landfall.projectedSurgeMeters}m`;

  const triggerDownload = (filename: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(filename);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  // 17. Export GeoJSON
  const handleExportGeoJson = () => {
    const geojson = {
      type: "FeatureCollection",
      generator: "CYCLO-AI Page 5 Trajectory & Intensity Prediction Center",
      generatedAt: new Date().toISOString(),
      properties: {
        stormId: scenario.id,
        stormName: scenario.name,
        basin: scenario.basin,
        pinnLoss: "L_total = L_data + L_NavierStokes + L_Coriolis + L_betaDrift"
      },
      features: [
        // AI Forecast Track Line
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: scenario.forecastTrack.map((wp) => [wp.lng, wp.lat])
          },
          properties: {
            layer: "AI_PINN_Forecast_Trajectory",
            maxHours: 120,
            peakVmaxKmh: scenario.landfall.peakWindSpeedKmh
          }
        },
        // Past Track Line
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: scenario.pastTrack.map((wp) => [wp.lng, wp.lat])
          },
          properties: {
            layer: "Observed_Past_Track",
            startHour: -24,
            endHour: 0
          }
        },
        // Landfall Coastal Intercept Point
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [scenario.landfall.coordinates.lng, scenario.landfall.coordinates.lat]
          },
          properties: {
            layer: "Coastal_Landfall_Intercept",
            targetDistrict: scenario.landfall.targetDistrict,
            targetState: scenario.landfall.targetState,
            landfallHour: scenario.landfall.landfallHourOffset,
            projectedSurgeMeters: scenario.landfall.projectedSurgeMeters,
            peakWindsKmh: scenario.landfall.peakWindSpeedKmh
          }
        },
        // Waypoints Points
        ...scenario.forecastTrack.map((wp) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [wp.lng, wp.lat]
          },
          properties: {
            hour: wp.hour,
            label: wp.label,
            vmaxKmh: wp.vmaxKmh,
            vmaxKts: wp.vmaxKts,
            pcHpa: wp.pcHpa,
            category: wp.category
          }
        }))
      ]
    };

    triggerDownload("forecast_track.geojson", JSON.stringify(geojson, null, 2), "application/geo+json");
  };

  // 19. Export CSV Table
  const handleExportCsv = () => {
    const headers = [
      "LeadTime_Hours",
      "Waypoint_Label",
      "Latitude_DegN",
      "Longitude_DegE",
      "Vmax_kmh",
      "Vmax_knots",
      "CentralPressure_hPa",
      "Intensity_Category",
      "Track_Type"
    ];

    const pastRows = scenario.pastTrack.map((wp) => [
      wp.hour,
      `"${wp.label}"`,
      wp.lat.toFixed(4),
      wp.lng.toFixed(4),
      wp.vmaxKmh,
      wp.vmaxKts,
      wp.pcHpa,
      `"${wp.category}"`,
      "Observed"
    ]);

    const forecastRows = scenario.forecastTrack.map((wp) => [
      wp.hour,
      `"${wp.label}"`,
      wp.lat.toFixed(4),
      wp.lng.toFixed(4),
      wp.vmaxKmh,
      wp.vmaxKts,
      wp.pcHpa,
      `"${wp.category}"`,
      "PINN_Forecast"
    ]);

    const csvContent = [headers.join(","), ...pastRows.map((r) => r.join(",")), ...forecastRows.map((r) => r.join(","))].join("\n");
    triggerDownload("track_waypoints.csv", csvContent, "text/csv;charset=utf-8;");
  };

  // 18. Export ESRI Shapefile Archive (.shp.zip simulation bundle)
  const handleExportShapefile = () => {
    const metaPrj = `GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]]`;
    const readme = `CYCLO-AI Page 5 GIS Shapefile Export Bundle
Storm: ${scenario.name} (${scenario.id})
Basin: ${scenario.basin}
Generated: ${new Date().toISOString()}

Included Layers in GIS Archive:
- forecast_track.shp (Trajectory Polyline)
- forecast_track.shx (Shape Index)
- forecast_track.dbf (Attribute Table: Vmax, Pc, LeadTime)
- forecast_track.prj (WGS 1984 Projection Definition)
- cone_uncertainty.shp (Empirical Cross-Track Error Polygon)
`;
    triggerDownload("forecast_shp.zip", readme, "application/zip");
  };

  return (
    <div 
      id="forecast-action-panel"
      className="w-full bg-[#0F1B2F]/95 backdrop-blur-md border border-[#00F2FE]/60 rounded-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(0,242,254,0.18)] flex flex-col gap-4 relative overflow-hidden"
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl z-0">
        <Noise patternSize={250} patternScaleX={1} patternScaleY={1} patternRefreshInterval={3} patternAlpha={12} />
      </div>

      {/* Background accents */}
      <div className="absolute bottom-0 right-0 w-64 h-32 bg-[#FF5E36]/5 blur-3xl pointer-events-none z-0" />
      <div className="absolute top-0 left-0 w-64 h-32 bg-[#00F2FE]/5 blur-3xl pointer-events-none z-0" />

      {/* Main content layer */}
      <div className="relative z-10 flex flex-col gap-4">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E3A5F] pb-2.5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-orbitron font-bold text-[#00F2FE] tracking-wide [text-shadow:0_2px_4px_rgba(0,0,0,0.95)]">
              PIPELINE HANDOFF & SCIENTIFIC EXPORT
            </h3>
          </div>
        </div>

        {downloadSuccess && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-[11px] font-jetbrains text-emerald-400 animate-fadeIn">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Downloaded {downloadSuccess}</span>
          </div>
        )}
      </div>

      {/* SECTION 1: Inter-Page Pipeline Handoff CTAs (15, 16, 20) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* 15. "Broadcast to Alerts" CTA */}
        <BroadcastAlertsPillLink href={`/alerts?storm=${stormParam}&auto=true`} />

        {/* 16. "Simulate Flooding" CTA */}
        <SimulateFloodingPillLink
          href={`/digital-twin?surge=${surgeParam}`}
          surgeMeters={scenario.landfall.projectedSurgeMeters}
        />

        {/* 20. "Test in Physics Lab" Link */}
        <ValidatePinnsPillLink href={`/physics-lab?storm=${stormParam}`} />
      </div>

      {/* SECTION 2: Multi-Format Scientific GIS Exporter (17, 18, 19) */}
      <div className="pt-2 border-t border-[#1E3A5F]/60 flex flex-wrap items-center gap-2.5">
        {/* 17. "Export GeoJSON" Button */}
        <ExportPillButton
          onClick={handleExportGeoJson}
          title="Download standard GeoJSON track & uncertainty cone"
          label="Export GeoJSON"
          icon={<FileCode className="w-3.5 h-3.5 text-[#00F2FE]" />}
          iconHover={<FileCode className="w-3.5 h-3.5 text-[#050B14]" />}
          variant="cyan"
        />

        {/* 18. "Export Shapefile" Button */}
        <ExportPillButton
          onClick={handleExportShapefile}
          title="Download GIS Shapefile archive bundle (.zip)"
          label="Export Shapefile"
          icon={<Archive className="w-3.5 h-3.5 text-[#F59E0B]" />}
          iconHover={<Archive className="w-3.5 h-3.5 text-[#050B14]" />}
          variant="amber"
        />

        {/* 19. "Export CSV Table" Button */}
        <ExportPillButton
          onClick={handleExportCsv}
          title="Download CSV table of hourly coordinates & winds"
          label="Export CSV"
          icon={<FileSpreadsheet className="w-3.5 h-3.5 text-[#10E7A2]" />}
          iconHover={<FileSpreadsheet className="w-3.5 h-3.5 text-[#050B14]" />}
          variant="emerald"
        />
      </div>
    </div>
  </div>
);
}
