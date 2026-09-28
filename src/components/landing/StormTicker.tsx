"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { Radio, ArrowUpRight, Satellite } from "lucide-react";
import { LogoLoop, LogoItem } from "@/components/ui/LogoLoop";

export function StormTicker() {
  const tickerData = [
    {
      id: "count",
      isBadge: true,
      text: "Cyclones Active: 02",
      color: "text-[#00F2FE]",
      badge: "LIVE FEED",
    },
    {
      id: "arnab",
      name: 'CYCLONE "ARNAB"',
      basin: "BoB",
      category: "Cat 3",
      wind: "185 km/h",
      pressure: "942 hPa",
      coords: "16.2°N, 88.4°E",
      href: "/dashboard",
      highlight: true,
    },
    {
      id: "arb-01",
      name: "Deep Depression ARB-01",
      basin: "Arabian Sea",
      category: "Deep Depression",
      wind: "55 km/h",
      pressure: "998 hPa",
      coords: "14.8°N, 67.2°E",
      href: "/dashboard?storm=arb01",
      highlight: false,
    },
    {
      id: "invest-92b",
      name: "Invest 92B",
      basin: "Andaman Sea",
      category: "Low Pressure",
      wind: "35 km/h",
      pressure: "1004 hPa",
      coords: "9.5°N, 93.0°E",
      href: "/dashboard?storm=invest92b",
      highlight: false,
    },
    {
      id: "insat-scan",
      isBadge: true,
      text: "INSAT-3DR TIR-1: Rapid Scan Active [15m Cycle]",
      color: "text-[#10E7A2]",
      badge: "ISRO TELEMETRY",
    },
    {
      id: "biparjoy",
      name: "Severe Storm BIPARJOY",
      basin: "Arabian Sea",
      category: "Cat 2",
      wind: "165 km/h",
      pressure: "958 hPa",
      coords: "20.4°N, 66.8°E",
      href: "/dashboard?storm=biparjoy",
      highlight: false,
    },
  ];

  const logoItems: LogoItem[] = useMemo(() => {
    return tickerData.map((item) => ({
      title: item.name || item.text,
      node: item.isBadge ? (
        <div 
          className="flex items-center gap-2 px-3 py-1 rounded-lg bg-[#00F2FE]/10 border border-[#00F2FE]/30 font-jetbrains text-xs font-bold text-[#00F2FE] whitespace-nowrap shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
        >
          <Radio className="w-3.5 h-3.5 text-[#00F2FE] animate-pulse" />
          <span>[{item.text}]</span>
        </div>
      ) : (
        <Link
          href={item.href || "/dashboard"}
          className={`flex items-center gap-3 px-3.5 py-1 rounded-lg border font-jetbrains text-xs transition-all duration-200 group whitespace-nowrap ${
            item.highlight
              ? "bg-[#FF5E36]/10 border-[#FF5E36]/50 text-white hover:border-[#FF5E36] hover:bg-[#FF5E36]/25 shadow-[0_4px_14px_rgba(255,94,54,0.2),0_2px_6px_rgba(0,0,0,0.6)]"
              : "bg-[#0B1528]/80 border-[#1E3252] text-slate-300 hover:border-[#00F2FE]/60 hover:text-white shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
          }`}
        >
          <div className="flex items-center gap-1.5 font-bold">
            {item.highlight ? (
              <span className="w-2 h-2 rounded-full bg-[#FF5E36] animate-pulse" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-[#00F2FE]" />
            )}
            <span className={item.highlight ? "text-[#FF5E36]" : "text-white"}>
              {item.wind && item.pressure 
                ? `[${item.name} - ${item.basin} - ${item.category} - ${item.wind} - ${item.pressure}]`
                : `[${item.name}]`}
            </span>
          </div>

          {item.coords && (
            <>
              <span className="text-[#8E9EB5]">|</span>
              <span className="text-slate-300">{item.coords}</span>
            </>
          )}

          <ArrowUpRight className="w-3.5 h-3.5 text-[#00F2FE] opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      ),
    }));
  }, []);

  return (
    <section 
      id="live-storm-ticker" 
      className="w-full bg-[#0F1B2F]/80 backdrop-blur-md border-y border-[#1E3252] overflow-hidden py-2 relative z-40 font-jetbrains [font-feature-settings:'tnum'_on]"
    >
      <div className="flex items-center w-full">
        {/* Left Sticky Label (Rajdhani 600 per TEXT_TYPES.md) */}
        <div className="shrink-0 px-3 py-1 flex items-center bg-[#0F1B2F]/90 z-20 border-r border-[#1E3252]/80 font-rajdhani shadow-[4px_0_12px_rgba(15,27,47,0.9)]">
          <span className="text-xs font-rajdhani font-semibold tracking-wider text-[#FF5E36] uppercase whitespace-nowrap flex items-center gap-1.5">
            <span>🔴</span>
            <span>LIVE BASIN TICKER:</span>
          </span>
        </div>

        {/* React Bits LogoLoop Smooth Scrolling Track */}
        <div className="flex-1 overflow-hidden min-w-0">
          <LogoLoop
            logos={logoItems}
            speed={80}
            direction="left"
            gap={24}
            logoHeight={32}
            hoverSpeed={18}
            scaleOnHover={true}
            fadeOut={true}
            fadeOutColor="#0F1B2F"
            ariaLabel="Live tropical cyclone basin tracking ticker"
          />
        </div>
      </div>
    </section>
  );
}
