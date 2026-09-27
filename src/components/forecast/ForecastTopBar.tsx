"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ForecastHorizon, ForecastMode, StormScenario } from "./types";
import Noise from "@/components/ui/Noise";
import { CloudLightning } from "lucide-react";

/* ─── Framer Motion Variants (mirrors RadiometricStrip) ─── */
const PANEL_VARIANTS = {
  hidden: { opacity: 0, scale: 0.90, y: -14, filter: "blur(8px)" },
  visible: {
    opacity: 1, scale: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], staggerChildren: 0.045, delayChildren: 0.03 },
  },
  exit: {
    opacity: 0, scale: 0.92, y: -10, filter: "blur(6px)",
    transition: { duration: 0.25, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] },
  },
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, x: -8, y: -2 },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
};

/* ─── GSAP Pill Hook — mirrors DashboardPill ─── */
export function useGsapPill(dep?: unknown) {
  const btnRef    = useRef<HTMLButtonElement | null>(null);
  const circleRef = useRef<HTMLSpanElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tlRef     = useRef<any>(null);

  useEffect(() => {
    let active = true;
    const layout = () => {
      if (!active) return;
      const circle = circleRef.current;
      const btn    = btnRef.current;
      if (!circle || !btn) return;
      const { width: w, height: h } = btn.getBoundingClientRect();
      if (!w || !h) return;
      const R     = ((w * w) / 4 + h * h) / (2 * h);
      const D     = Math.ceil(2 * R) + 2;
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      circle.style.width  = `${D}px`;
      circle.style.height = `${D}px`;
      circle.style.bottom = `-${delta}px`;
      import("gsap").then(({ gsap }) => {
        if (!active) return;
        gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${D - delta}px` });
        const label = btn.querySelector<HTMLElement>(".pill-label");
        const hover = btn.querySelector<HTMLElement>(".pill-label-hover");
        if (label) gsap.set(label, { y: 0 });
        if (hover) gsap.set(hover, { y: h + 100, opacity: 0 });
        tlRef.current?.kill();
        const tl = gsap.timeline({ paused: true });
        tl.to(circle, { scale: 1.25, xPercent: -50, duration: 1.6, ease: "power2.easeOut", overwrite: "auto" }, 0);
        if (label) tl.to(label, { y: -(h + 8), duration: 1.6, ease: "power2.easeOut", overwrite: "auto" }, 0);
        if (hover) {
          gsap.set(hover, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(hover, { y: 0, opacity: 1, duration: 1.6, ease: "power2.easeOut", overwrite: "auto" }, 0);
        }
        tlRef.current = tl;
      });
    };
    layout();
    window.addEventListener("resize", layout);
    document.fonts?.ready.then(layout).catch(() => {});
    return () => {
      active = false;
      window.removeEventListener("resize", layout);
    };
  }, [dep]);

  const handleEnter = () => tlRef.current?.tweenTo(tlRef.current.duration(), { duration: 0.3, ease: "power2.easeOut", overwrite: "auto" });
  const handleLeave = () => tlRef.current?.tweenTo(0, { duration: 0.25, ease: "power2.easeOut", overwrite: "auto" });
  return { btnRef, circleRef, handleEnter, handleLeave };
}

/* ─── Pill Button Shell — matches dashboard-pill styling ─── */
export function PillButton({
  btnRef, circleRef, handleEnter, handleLeave,
  open, onClick, icon, label, style, className, id,
}: {
  btnRef: React.RefObject<HTMLButtonElement | null>;
  circleRef: React.RefObject<HTMLSpanElement | null>;
  handleEnter: () => void;
  handleLeave: () => void;
  open: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
}) {
  return (
    <button
      id={id}
      ref={btnRef} type="button" onClick={onClick}
      onMouseEnter={handleEnter} onMouseLeave={handleLeave}
      className={className}
      style={{
        position: "relative", display: "inline-flex", alignItems: "center",
        justifyContent: "center", gap: "8px", height: "38px", padding: "0 16px",
        background: open ? "rgba(0,242,254,0.18)" : "rgba(0,242,254,0.10)",
        border: `1px solid ${open ? "#00F2FE" : "rgba(0,242,254,0.65)"}`,
        borderRadius: "0.5rem",
        boxShadow: open
          ? "0 12px 32px -2px rgba(0,0,0,0.95), 0 6px 18px rgba(0,0,0,0.95), 0 0 28px rgba(0,242,254,0.85), inset 0 1px 0 rgba(255,255,255,0.6)"
          : "0 8px 24px -2px rgba(0,0,0,0.85), 0 4px 12px rgba(0,0,0,0.95), 0 0 14px rgba(0,242,254,0.2), inset 0 1px 0 rgba(224,252,255,0.4)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        color: "#FFFFFF", fontFamily: "var(--font-rajdhani, sans-serif)",
        fontWeight: 700, fontSize: "13px", textTransform: "uppercase",
        letterSpacing: "0.05em", whiteSpace: "nowrap", cursor: "pointer",
        overflow: "hidden", transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)", flexShrink: 0,
        ...style,
      }}
    >
      {/* GSAP bubble */}
      <span ref={circleRef} aria-hidden="true" style={{ position: "absolute", left: "50%", bottom: 0, borderRadius: "50%", background: "#00F2FE", zIndex: 1, display: "block", pointerEvents: "none", willChange: "transform", transform: "scale(0)" }} />
      {/* Dual-label stack */}
      <span style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: "8px", lineHeight: 1, zIndex: 2 }}>
        {/* Default label (slides up on hover) */}
        <span className="pill-label" style={{ position: "relative", zIndex: 2, display: "inline-flex", alignItems: "center", gap: "8px", lineHeight: 1, willChange: "transform" }}>
          {icon}
          <span>{label}</span>
        </span>
        {/* Hover label (dark, slides in from below) */}
        <span className="pill-label-hover" aria-hidden="true" style={{ position: "absolute", left: 0, top: 0, color: "#050B14", zIndex: 3, display: "inline-flex", alignItems: "center", gap: "8px", lineHeight: 1, willChange: "transform, opacity", fontWeight: 800 }}>
          {icon}
          <span>{label}</span>
        </span>
      </span>
    </button>
  );
}

/* ─── Storm Selector Pill ─── */
function StormSelectorPill({
  storms, currentScenario, onSelectStorm,
}: {
  storms: StormScenario[];
  currentScenario: StormScenario;
  onSelectStorm: (id: string) => void;
}) {
  const [open, setOpen]       = useState(false);
  const [mounted, setMounted] = useState(false);
  const wrapRef               = useRef<HTMLDivElement | null>(null);
  const dropdownRef           = useRef<HTMLDivElement | null>(null);
  const [dropPos, setDropPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const { btnRef, circleRef, handleEnter, handleLeave } = useGsapPill();

  useEffect(() => { setMounted(true); }, []);

  const updateDropPos = () => {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      const dropWidth = 280;
      let left = r.left;
      if (typeof window !== "undefined" && left + dropWidth > window.innerWidth - 12) {
        left = Math.max(12, window.innerWidth - dropWidth - 12);
      }
      setDropPos({ top: r.bottom + 6, left });
    }
  };

  useEffect(() => {
    if (!open) return;
    updateDropPos();
    const h = () => updateDropPos();
    window.addEventListener("scroll", h, true);
    window.addEventListener("resize", h);
    return () => { window.removeEventListener("scroll", h, true); window.removeEventListener("resize", h); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!wrapRef.current?.contains(t) && !dropdownRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={wrapRef} style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: "6px" }}>
      <PillButton
        btnRef={btnRef} circleRef={circleRef}
        handleEnter={handleEnter} handleLeave={handleLeave}
        open={open}
        onClick={() => { if (!open) updateDropPos(); setOpen((o) => !o); }}
        icon={<CloudLightning style={{ width: 14, height: 14 }} />}
        label={`${currentScenario.name} (${currentScenario.basin})`}
      />
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              ref={dropdownRef}
              key="storm-selector-dropdown"
              initial="hidden" animate="visible" exit="exit"
              variants={PANEL_VARIANTS}
              style={{ position: "fixed", top: dropPos.top, left: dropPos.left, zIndex: 9999, transformOrigin: "top left" }}
              className="min-w-[260px] bg-[#0F1B2F]/95 backdrop-blur-xl border border-[rgba(0,242,254,0.45)] rounded-xl p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.8),0_0_16px_rgba(0,242,254,0.18)] transform-gpu overflow-hidden"
            >
              <Noise patternSize={250} patternScaleX={2.5} patternScaleY={2.5} patternRefreshInterval={2} patternAlpha={10} />
              <div className="relative z-10 flex flex-col space-y-1">
                {storms.map((storm) => {
                  const active = storm.id === currentScenario.id;
                  return (
                    <motion.button
                      key={storm.id}
                      variants={ITEM_VARIANTS}
                      type="button"
                      onClick={() => { onSelectStorm(storm.id); setOpen(false); }}
                      className={`flex items-center justify-between w-full px-2.5 py-2 rounded-lg border transition-all duration-200 cursor-pointer text-left ${
                        active
                          ? "bg-[rgba(0,242,254,0.14)] border-[rgba(0,242,254,0.5)] shadow-[0_0_12px_rgba(0,242,254,0.22)]"
                          : "bg-transparent border-transparent hover:bg-white/[0.06] hover:border-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center ${active ? "bg-[#00F2FE]/20 text-[#00F2FE]" : "bg-white/5 text-[#8E9EB5]"}`}>
                          <CloudLightning className="w-3.5 h-3.5 shrink-0" />
                        </div>
                        <div>
                          <div className={`text-xs font-bold font-rajdhani uppercase tracking-wider ${active ? "text-[#00F2FE]" : "text-white"}`}>{storm.name}</div>
                          <div className="text-[10px] text-[#8E9EB5] font-mono leading-tight">{storm.basin}</div>
                        </div>
                      </div>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                        active
                          ? "bg-[#10E7A2]/15 text-[#10E7A2] border-[#10E7A2]/40"
                          : "bg-white/5 text-[#8E9EB5] border-white/10"
                      }`}>
                        {(storm as StormScenario & { category?: string }).category ?? "ACTIVE"}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

interface ForecastTopBarProps {
  currentScenario: StormScenario;
  selectedHorizon: ForecastHorizon;
  selectedMode?: ForecastMode;
  onSelectStorm: (stormId: string) => void;
  onSelectHorizon: (horizon: ForecastHorizon) => void;
  onSelectMode?: (mode: ForecastMode) => void;
  allStorms: Record<string, StormScenario>;
  isIngestedFromExternal?: boolean;
}

const HORIZONS: { id: ForecastHorizon; label: string; desc: string }[] = [
  { id: "+6h",   label: "+6h",   desc: "Tactical Evac" },
  { id: "+12h",  label: "+12h",  desc: "Immediate Alert" },
  { id: "+24h",  label: "+24h",  desc: "Coastal Warning" },
  { id: "+48h",  label: "+48h",  desc: "Prepositioning" },
  { id: "+72h",  label: "+72h",  desc: "Synoptic Track" },
  { id: "+120h", label: "+120h", desc: "5-Day Outlook" },
];

export function ForecastTopBar({
  currentScenario,
  selectedHorizon,
  selectedMode: _selectedMode,
  onSelectStorm,
  onSelectHorizon,
  onSelectMode: _onSelectMode,
  allStorms,
  isIngestedFromExternal: _isIngestedFromExternal,
}: ForecastTopBarProps) {
  return (
    <header 
      id="forecast-horizon-bar"
      className="w-full backdrop-blur-xl rounded-xl p-2.5 sm:p-3 md:p-3.5 mb-4 relative overflow-hidden"
      style={{
        background: "#0F1B2F",
        border: "1.5px solid rgba(0, 242, 254, 0.55)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,242,254,0.12)",
      }}
    >
      {/* Noise film-grain overlay — matches RadiometricStrip */}
      <Noise
        patternSize={250}
        patternScaleX={1.2}
        patternScaleY={1.2}
        patternRefreshInterval={2}
        patternAlpha={9}
      />

      {/* All content sits above the Noise overlay — 2 elements positioned at opposite ends */}
      <div className="relative z-[1] flex flex-col sm:flex-row items-center justify-between gap-3 w-full">

        {/* LEFT END: Storm Selector Pill */}
        <div className="flex items-center justify-center sm:justify-start w-full sm:w-auto shrink-0">
          <StormSelectorPill
            storms={Object.values(allStorms)}
            currentScenario={currentScenario}
            onSelectStorm={onSelectStorm}
          />
        </div>

        {/* RIGHT END: Horizon Selector Segmented Pills */}
        <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto overflow-x-auto max-w-full">
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#0F1B2F]/90 backdrop-blur-xl border border-[rgba(0,242,254,0.4)] shadow-[0_4px_16px_rgba(0,0,0,0.6),0_0_12px_rgba(0,242,254,0.15)] shrink-0">
            {HORIZONS.map((h) => {
              const isActive = selectedHorizon === h.id;
              return (
                <button
                  key={h.id}
                  onClick={() => onSelectHorizon(h.id)}
                  title={h.desc}
                  className={`h-7 px-2.5 sm:px-3 rounded-md text-xs font-mono font-bold flex items-center justify-center transition cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-[#00F2FE]/15 border border-[#00F2FE]/70 text-[#00F2FE] shadow-[0_0_8px_rgba(0,242,254,0.15)]"
                      : "bg-[#050B14]/70 hover:bg-[#00F2FE]/15 border border-[#1E3252] hover:border-[#00F2FE]/60 text-[#8E9EB5] hover:text-[#00F2FE]"
                  }`}
                >
                  <span>{h.label}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </header>
  );
}
