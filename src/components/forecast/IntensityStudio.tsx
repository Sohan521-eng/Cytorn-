"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { StormScenario, SpeedUnit, RapidIntensificationData } from "./types";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? React.useLayoutEffect : useEffect;
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ReferenceLine 
} from "recharts";
import { 
  Wind, 
  Gauge, 
  Flame, 
  TrendingUp, 
  Sparkles, 
  Info
} from "lucide-react";
import Noise from "@/components/ui/Noise";

interface IntensityStudioProps {
  scenario: StormScenario;
  speedUnit: SpeedUnit;
  onToggleSpeedUnit: (unit: SpeedUnit) => void;
  onOpenRiModal?: () => void;
}

export function IntensityStudio({
  scenario,
  speedUnit,
  onToggleSpeedUnit,
}: IntensityStudioProps) {
  const [mounted, setMounted] = useState(false);
  const [maskStyle, setMaskStyle] = useState<React.CSSProperties>({});
  const cardRef = useRef<HTMLDivElement>(null);
  const summaryBarRef = useRef<HTMLDivElement>(null);
  const riGaugeRef = useRef<HTMLDivElement>(null);
  const isKmh = speedUnit === "km/h";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update SVG mask to punch out the two cutout portions, revealing the main background
  useIsomorphicLayoutEffect(() => {
    const updateCutouts = () => {
      if (!cardRef.current) return;
      const cardRect = cardRef.current.getBoundingClientRect();
      if (cardRect.width === 0 || cardRect.height === 0) return;

      const cw = Math.round(cardRect.width);
      const ch = Math.round(cardRect.height);

      const makePath = (el: HTMLElement | null, r: number) => {
        if (!el) return "";
        const b = el.getBoundingClientRect();
        const x = Math.round(b.left - cardRect.left);
        const y = Math.round(b.top - cardRect.top);
        const w = Math.round(b.width);
        const h = Math.round(b.height);
        if (w <= 0 || h <= 0) return "";
        return `M ${x + r} ${y} H ${x + w - r} Q ${x + w} ${y} ${x + w} ${y + r} V ${y + h - r} Q ${x + w} ${y + h} ${x + w - r} ${y + h} H ${x + r} Q ${x} ${y + h} ${x} ${y + h - r} V ${y + r} Q ${x} ${y} ${x + r} ${y} Z`;
      };

      const path1 = makePath(summaryBarRef.current, 12);
      const path2 = makePath(riGaugeRef.current, 12);

      const paths = [path1, path2].filter(Boolean).join(" ");
      if (!paths) return;

      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${cw}" height="${ch}"><path fill-rule="evenodd" fill="#000" d="M 0 0 H ${cw} V ${ch} H 0 Z ${paths}" /></svg>`;
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
    if (summaryBarRef.current) resizeObserver.observe(summaryBarRef.current);
    if (riGaugeRef.current) resizeObserver.observe(riGaugeRef.current);

    const timer = setTimeout(updateCutouts, 60);
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(updateCutouts).catch(() => {});
    }
    window.addEventListener("resize", updateCutouts);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateCutouts);
    };
  }, [mounted, speedUnit]);

  // Find peak intensity waypoint
  const peakWaypoint = useMemo(() => {
    let peak = scenario.forecastTrack[0];
    for (const wp of scenario.forecastTrack) {
      if (wp.vmaxKmh > peak.vmaxKmh) {
        peak = wp;
      }
    }
    return peak;
  }, [scenario.forecastTrack]);

  // Construct chart data series with 90% confidence upper and lower envelopes
  const chartData = useMemo(() => {
    return scenario.forecastTrack.map((wp) => {
      const v = isKmh ? wp.vmaxKmh : wp.vmaxKts;
      // 90% confidence envelope expansion with forecast lead time t
      const spreadFactor = 0.08 + (wp.hour / 120) * 0.12;
      const upper = Math.round(v * (1 + spreadFactor));
      const lower = Math.round(v * (1 - spreadFactor));

      return {
        time: wp.label,
        hour: wp.hour,
        vmax: v,
        upper90: upper,
        lower90: lower,
        envelopeRange: [lower, upper],
        pc: wp.pcHpa,
        category: wp.category
      };
    });
  }, [scenario.forecastTrack, isKmh]);

  // RI Gauge Calculations
  const ri = scenario.rapidIntensification;
  const riPercent = Math.min(100, Math.max(0, ri.probabilityPercent));
  const strokeDashoffset = 251.2 - (251.2 * riPercent) / 100; // circumference ~ 251.2 for r=40

  const riColor = riPercent > 50 ? "#FF5E36" : riPercent >= 25 ? "#F59E0B" : "#10E7A2";
  const riStatusText = riPercent > 50 ? "HIGH RISK" : riPercent >= 25 ? "ELEVATED" : "LOW RISK";

  return (
    <div 
      id="intensity-analytics-panel"
      ref={cardRef}
      className="w-full relative overflow-hidden bg-transparent border border-[#00F2FE]/60 rounded-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(0,242,254,0.18)] flex flex-col gap-4"
    >
      {/* Background layer with punched-out cutouts so the main bg behind the card is visible */}
      <div 
        className="absolute inset-0 bg-[#0F1B2F]/95 backdrop-blur-md pointer-events-none rounded-xl overflow-hidden"
        style={maskStyle}
      >
        {/* Noise texture overlay */}
        <Noise patternSize={250} patternScaleX={1} patternScaleY={1} patternRefreshInterval={3} patternAlpha={8} />

        {/* Background accents */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#00F2FE]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#00F2FE]/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main content layer */}
      <div className="relative z-10 flex flex-col gap-4">

      {/* TOP: Header */}
      <div className="flex items-center justify-between border-b border-[#1E3A5F] pb-3">
        <h3 className="text-sm font-orbitron font-bold text-[#00F2FE] tracking-wide [text-shadow:0_2px_4px_rgba(0,0,0,0.95)]">
          WIND SPEED &amp; STORM PRESSURE FORECAST
        </h3>
      </div>

      {/* PEAK INTENSITY & MIN PRESSURE SUMMARY BAR (Cutout Aperture) */}
      <div 
        ref={summaryBarRef}
        className="flex flex-wrap items-center justify-between gap-2.5 bg-transparent p-3 rounded-xl border border-[#00F2FE]/60 shadow-[inset_0_2px_8px_rgba(0,0,0,0.85),0_0_12px_rgba(0,242,254,0.1)]"
      >
        {/* Peak Wind Speed */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#00F2FE]/20 border border-[#00F2FE]/40 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-[#00F2FE]" />
          </div>
          <div className="text-xs font-rajdhani">
            <span className="text-[#00F2FE] uppercase font-bold">Strongest Expected Wind: </span>
            <strong className="text-[#FF5E36] font-jetbrains">
              {isKmh ? `${peakWaypoint.vmaxKmh} km/h` : `${peakWaypoint.vmaxKts} kts`}
            </strong>
            <span className="text-[#FF5E36] font-bold"> at Hour +{peakWaypoint.hour}</span>
          </div>
        </div>

        {/* Min Pressure Badge */}
        <div className="text-xs font-rajdhani text-[#8E9EB5] flex items-center gap-2">
          <span className="font-bold text-[#00F2FE] [text-shadow:0_2px_4px_rgba(0,0,0,0.95)]">Lowest Air Pressure:</span>
          <span className="font-jetbrains font-bold text-emerald-400">
            {scenario.landfall.centralPressureHpa} hPa
          </span>
        </div>
      </div>

      {/* QUICK LEGEND GUIDE: EASY TO UNDERSTAND VISUAL AID */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-[11px] font-rajdhani">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5 text-[#00F2FE] font-semibold">
            <span className="w-3 h-0.5 bg-[#00F2FE] rounded-full inline-block shadow-[0_0_6px_#00F2FE]" />
            Wind Speed ({speedUnit})
          </span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="w-3 h-0.5 border-t-2 border-dashed border-emerald-400 inline-block" />
            Air Pressure (hPa — Lower = Stronger)
          </span>
          <span className="flex items-center gap-1.5 text-[#38BDF8]">
            <span className="w-2.5 h-2.5 bg-[#00F2FE]/25 border border-[#00F2FE]/40 rounded-sm inline-block" />
            Likely Wind Range (90% Confidence)
          </span>
        </div>
        <span className="text-[10px] text-[#8E9EB5] italic">
          Higher wind &amp; lower pressure = more dangerous storm
        </span>
      </div>

      {/* DUAL PANE: CHART (LEFT) & RI GAUGE (RIGHT) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* RECHARTS INTENSITY TIMELINE (8 Columns) */}
        <div className="md:col-span-7 xl:col-span-8 w-full h-[220px] relative">
          {!mounted ? (
            <div className="w-full h-full flex items-center justify-center text-xs font-rajdhani text-[#8E9EB5]">
              Loading forecast wind and pressure timeline...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{ top: 12, right: 10, left: -10, bottom: 0 }}
              >
              <defs>
                {/* Shaded 90% Confidence Envelope */}
                <linearGradient id="envelopeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00F2FE" stopOpacity={0.22} />
                  <stop offset="95%" stopColor="#00F2FE" stopOpacity={0.04} />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#1E3252"
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.5}
              />

              <XAxis
                dataKey="time"
                stroke="#8E9EB5"
                tick={{ fill: "#8E9EB5", fontSize: 10, fontFamily: "var(--font-jetbrains), monospace" }}
                tickLine={{ stroke: "#1E3252" }}
                axisLine={{ stroke: "#1E3252" }}
              />

              {/* Left Y-Axis: Wind Speed */}
              <YAxis
                yAxisId="wind"
                domain={isKmh ? [40, 240] : [20, 130]}
                stroke="#00F2FE"
                tick={{ fill: "#00F2FE", fontSize: 10, fontFamily: "var(--font-jetbrains), monospace" }}
                tickLine={false}
                axisLine={false}
                tickCount={5}
                width={36}
                tickFormatter={(val) => `${val}`}
              />

              {/* Right Y-Axis: Central Pressure (Pc in hPa, inverted curve) */}
              <YAxis
                yAxisId="pressure"
                orientation="right"
                domain={[910, 1010]}
                reversed={true}
                stroke="#10E7A2"
                tick={{ fill: "#10E7A2", fontSize: 10, fontFamily: "var(--font-jetbrains), monospace" }}
                tickLine={false}
                axisLine={false}
                tickCount={5}
                width={48}
                unit="hPa"
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="relative overflow-hidden bg-[#0F1B2F]/95 backdrop-blur-md border border-[#00F2FE]/60 p-2.5 rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.85),0_0_15px_rgba(0,242,254,0.15)] text-xs font-jetbrains text-white">
                        {/* Noise texture overlay */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-lg z-0">
                          <Noise patternSize={200} patternScaleX={1} patternScaleY={1} patternRefreshInterval={3} patternAlpha={15} />
                        </div>

                        {/* Content with text shadow */}
                        <div className="relative z-10 [text-shadow:0_1px_3px_rgba(0,0,0,0.95),0_2px_5px_rgba(0,0,0,0.85)]">
                          <div className="font-orbitron font-bold text-[#00F2FE] border-b border-[#1E3A5F] pb-1 mb-1.5 flex items-center justify-between gap-3">
                            <span>Timeline: {data.time}</span>
                            <span className="text-[#FF5E36] text-[10px] font-bold">({data.category})</span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between gap-4">
                              <span className="text-[#8E9EB5]">Peak Wind Speed:</span>
                              <span className="text-[#00F2FE] font-bold">{data.vmax} {speedUnit}</span>
                            </div>
                            <div className="flex justify-between gap-4 text-[10px] text-[#38BDF8]">
                              <span>Likely Range (90%):</span>
                              <span className="font-semibold">[{data.lower90} – {data.upper90} {speedUnit}]</span>
                            </div>
                            <div className="flex justify-between gap-4 text-emerald-400">
                              <span className="text-[#8E9EB5]">Center Air Pressure:</span>
                              <span className="font-bold">{data.pc} hPa (lower = stronger)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              {/* Shaded 90% Confidence Envelope Range */}
              <Area
                yAxisId="wind"
                type="monotone"
                dataKey="upper90"
                stroke="transparent"
                fill="url(#envelopeGradient)"
              />
              <Area
                yAxisId="wind"
                type="monotone"
                dataKey="lower90"
                stroke="transparent"
                fill="#0F1B2F"
              />

              {/* Wind Speed Forecast Curve */}
              <Line
                yAxisId="wind"
                type="monotone"
                dataKey="vmax"
                stroke="#00F2FE"
                strokeWidth={2.8}
                dot={{ r: 3.5, fill: "#050B14", stroke: "#00F2FE", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: "#00F2FE", stroke: "#FFFFFF", strokeWidth: 2 }}
                name={`Wind Speed (${speedUnit})`}
              />

              {/* Central Pressure Deepening Curve */}
              <Line
                yAxisId="pressure"
                type="monotone"
                dataKey="pc"
                stroke="#10E7A2"
                strokeWidth={2}
                strokeDasharray="4 3"
                dot={{ r: 2.5, fill: "#050B14", stroke: "#10E7A2", strokeWidth: 1.5 }}
                name="Center Air Pressure (hPa)"
              />
            </ComposedChart>
          </ResponsiveContainer>
          )}
        </div>

        {/* RAPID INTENSIFICATION (RI) CIRCULAR RADIAL GAUGE (Cutout Aperture) */}
        <div 
          ref={riGaugeRef}
          className="md:col-span-5 xl:col-span-4 w-full relative overflow-hidden bg-transparent border border-[#00F2FE]/60 rounded-xl p-3 flex flex-col items-center justify-between shadow-[inset_0_3px_12px_rgba(0,0,0,0.9),0_0_14px_rgba(0,242,254,0.18)] min-h-[220px]"
        >
          {/* Header Row: Title & Status Badge */}
          <div className="flex items-center justify-between w-full mb-1.5 gap-2">
            <span className="text-[11px] sm:text-xs font-rajdhani uppercase font-bold text-[#FF5E36] [text-shadow:0_2px_4px_rgba(0,0,0,0.95)] flex items-center gap-1.5 whitespace-nowrap min-w-0">
              <Flame className="w-3.5 h-3.5 text-[#FF5E36] animate-pulse shrink-0" />
              <span className="truncate">Rapid Strengthening Risk</span>
            </span>
            <span 
              className="text-[9.5px] font-jetbrains font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border periodic-badge-pulse whitespace-nowrap shrink-0 transition-all"
              style={{ 
                color: riColor, 
                backgroundColor: `${riColor}25`,
                borderColor: `${riColor}dd`,
                boxShadow: `0 0 10px ${riColor}35, inset 0 0 6px ${riColor}20`,
                textShadow: `0 0 6px ${riColor}aa, 0 1px 2px rgba(0,0,0,0.95)`,
              }}
            >
              {riStatusText}
            </span>
          </div>

          {/* SVG Radial Gauge */}
          <div className="relative w-28 h-28 my-0.5 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Background Track */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#1E3252"
                strokeWidth="7"
              />
              {/* Progress Bar */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#00F2FE"
                strokeWidth="7"
                strokeDasharray="251.2"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            </svg>

            {/* Center Value */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-orbitron font-extrabold text-[#00F2FE] [text-shadow:0_2px_4px_rgba(0,0,0,0.95)]">
                {riPercent}%
              </span>
            </div>
          </div>

          <div className="text-[10px] font-inter font-medium text-[#00F2FE] [text-shadow:0_2px_4px_rgba(0,0,0,0.95)] text-center mt-1 px-1 text-balance leading-tight">
            <span>Danger Trigger: Wind jumps +55 km/h in 24h</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
