"use client";

import React, { useRef, useState, useEffect } from "react";
import { AlertBadge } from "@/components/ui/AlertBadge";
import { ShieldCheck, Clock, MapPin, AlertTriangle } from "lucide-react";
import Noise from "@/components/ui/Noise";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? React.useLayoutEffect : useEffect;

export function CycloneStatusCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);
  const [maskStyle, setMaskStyle] = useState<React.CSSProperties>({});

  useIsomorphicLayoutEffect(() => {
    const updateCutouts = () => {
      if (!cardRef.current || !box1Ref.current || !box2Ref.current) return;
      const cardRect = cardRef.current.getBoundingClientRect();
      const b1 = box1Ref.current.getBoundingClientRect();
      const b2 = box2Ref.current.getBoundingClientRect();
      if (cardRect.width === 0 || cardRect.height === 0) return;

      const cw = Math.round(cardRect.width);
      const ch = Math.round(cardRect.height);

      const x1 = Math.round(b1.left - cardRect.left);
      const y1 = Math.round(b1.top - cardRect.top);
      const w1 = Math.round(b1.width);
      const h1 = Math.round(b1.height);

      const x2 = Math.round(b2.left - cardRect.left);
      const y2 = Math.round(b2.top - cardRect.top);
      const w2 = Math.round(b2.width);
      const h2 = Math.round(b2.height);
      const r = 8; // rounded-lg corner radius

      // SVG path with fill-rule="evenodd": outer rect filled, inner boxes cut out
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${cw}" height="${ch}"><path fill-rule="evenodd" fill="#000" d="M 0 0 H ${cw} V ${ch} H 0 Z M ${x1 + r} ${y1} H ${x1 + w1 - r} Q ${x1 + w1} ${y1} ${x1 + w1} ${y1 + r} V ${y1 + h1 - r} Q ${x1 + w1} ${y1 + h1} ${x1 + w1 - r} ${y1 + h1} H ${x1 + r} Q ${x1} ${y1 + h1} ${x1} ${y1 + h1 - r} V ${y1 + r} Q ${x1} ${y1} ${x1 + r} ${y1} Z M ${x2 + r} ${y2} H ${x2 + w2 - r} Q ${x2 + w2} ${y2} ${x2 + w2} ${y2 + r} V ${y2 + h2 - r} Q ${x2 + w2} ${y2 + h2} ${x2 + w2 - r} ${y2 + h2} H ${x2 + r} Q ${x2} ${y2 + h2} ${x2} ${y2 + h2 - r} V ${y2 + r} Q ${x2} ${y2} ${x2 + r} ${y2} Z" /></svg>`;
      const dataUri = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

      setMaskStyle({
        WebkitMaskImage: dataUri,
        maskImage: dataUri,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      });
    };

    updateCutouts();

    const resizeObserver = new ResizeObserver(updateCutouts);
    if (cardRef.current) resizeObserver.observe(cardRef.current);
    window.addEventListener("resize", updateCutouts);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateCutouts);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="relative overflow-hidden p-4 flex flex-col justify-between shrink-0 min-h-[235px] bg-transparent border border-[rgba(0,242,254,0.4)] shadow-[0_0_15px_rgba(0,242,254,0.1)] rounded-xl"
    >
      {/* Background layer with punched-out cutouts for the two sections */}
      <div 
        className="absolute inset-0 bg-[#0F1B2F]/90 backdrop-blur-xl pointer-events-none"
        style={maskStyle}
      >
        {/* React Bits Noise Film-Grain Texture Overlay - Enhanced tactile grain */}
        <Noise
          patternSize={250}
          patternScaleX={1.2}
          patternScaleY={1.2}
          patternRefreshInterval={2}
          patternAlpha={9}
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col justify-between flex-1 gap-3">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {/* Palette 4: IMD Stage 3 Cyclone Warning */}
              <AlertBadge tier="warning">Stage 3 Warning</AlertBadge>
            </div>
            <span className="text-[11px] font-mono text-[#8E9EB5] flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#00F2FE]" /> Updated 8m ago
            </span>
          </div>

          <div className="mb-3">
            <h2 className="text-xl font-black font-rajdhani uppercase tracking-wider flex items-center gap-2">
              <span className="heading-gradient-shadow-wrapper">
                <span className="heading-moving-gradient font-black font-rajdhani uppercase tracking-wider">
                  CYCLONE &quot;ARNAB&quot;
                </span>
              </span>
            </h2>
            <p className="text-xs font-rajdhani font-semibold text-[#00F2FE] flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#00F2FE]" /> Bay of Bengal • East Coast Threat Sector
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 my-3">
            {/* Palette 1 & 2: Intensity - Cutout Aperture */}
            <div
              ref={box1Ref}
              className="p-3 rounded-lg bg-transparent border border-[#00F2FE]/50 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),0_0_8px_rgba(0,242,254,0.12)]"
            >
              <span className="text-[10px] font-rajdhani uppercase font-bold tracking-wider text-[#8E9EB5]">Intensity</span>
              <div className="text-sm font-bold font-rajdhani text-[#FF5E36] mt-0.5 flex items-center gap-1.5 drop-shadow-[0_0_8px_rgba(255,94,54,0.35)]">
                <AlertTriangle className="w-3.5 h-3.5 text-[#FF5E36]" /> Category 4 Severe
              </div>
            </div>

            {/* Palette 5: AI Model Confidence - Cutout Aperture */}
            <div
              ref={box2Ref}
              className="p-3 rounded-lg bg-transparent border border-[#00F2FE]/50 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),0_0_8px_rgba(0,242,254,0.12)]"
            >
              <span className="text-[10px] font-rajdhani uppercase font-bold tracking-wider text-[#8E9EB5]">AI Confidence</span>
              <div className="text-sm font-bold font-jetbrains text-[#10E7A2] mt-0.5 flex items-center gap-1.5 drop-shadow-[0_0_8px_rgba(16,231,162,0.35)]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10E7A2]" /> 96.4%
              </div>
            </div>
          </div>
        </div>

        {/* Palette 4: Landfall countdown */}
        <div className="pt-2.5 border-t border-[#1E3252] flex items-center justify-start gap-2 text-xs text-[#8E9EB5]">
          <span className="font-rajdhani font-semibold">Estimated Landfall:</span>
          <span className="font-bold text-[#FF5E36] font-jetbrains tracking-wide drop-shadow-[0_0_8px_rgba(255,94,54,0.4)]">
            T-24h (Puri-Dhamra Sector)
          </span>
        </div>
      </div>
    </div>
  );
}
