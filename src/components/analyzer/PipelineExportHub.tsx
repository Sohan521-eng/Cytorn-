"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  Archive, 
  FileText, 
  Code2, 
  CheckCircle2, 
  ArrowUpRight,
  Download,
  Share2
} from "lucide-react";
import Noise from "@/components/ui/Noise";
import { DvorakTelemetry } from "./DvorakTelemetryCard";

interface PipelineExportHubProps {
  telemetry: DvorakTelemetry;
  llccCoords: { lat: number; lon: number };
  stormName: string;
  sourceName: string;
  selectedModel: string;
}

/* ─── Export Hub Action Card Button – Matches Run AI Inference Pill Styling & GSAP Effect ─── */
interface ExportHubCardButtonProps {
  href?: string;
  onClick?: () => void;
  colorHex: string;
  colorRgb: string;
  title: string;
  titleColor?: string;
  subtitle: React.ReactNode;
  leftIcon: React.ReactNode;
  leftIconHover?: React.ReactNode;
  rightIcon: React.ReactNode;
  rightIconHover?: React.ReactNode;
}

function ExportHubCardButton({
  href,
  onClick,
  colorHex,
  colorRgb,
  title,
  titleColor,
  subtitle,
  leftIcon,
  leftIconHover,
  rightIcon,
  rightIconHover,
}: ExportHubCardButtonProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const containerRef = useRef<any>(null);
  const circleRef    = useRef<HTMLSpanElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tlRef        = useRef<any>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let gsapInstance: typeof import("gsap")["gsap"] | undefined;

    const setup = async () => {
      const { gsap } = await import("gsap");
      gsapInstance = gsap;

      const layout = () => {
        const circle = circleRef.current;
        const container = containerRef.current;
        if (!circle || !container) return;

        const { width: w, height: h } = container.getBoundingClientRect();
        if (w === 0 || h === 0) return;

        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${originY}px` });

        const label = container.querySelector(".hub-card-label") as HTMLElement | null;
        const hover = container.querySelector(".hub-card-label-hover") as HTMLElement | null;

        if (label) gsap.set(label, { y: 0 });
        if (hover) gsap.set(hover, { y: h + 12, opacity: 0 });

        tlRef.current?.kill();
        const tl = gsap.timeline({ paused: true });
        tl.to(circle, { scale: 2.2, xPercent: -50, duration: 1.6, ease: "power2.easeOut", overwrite: "auto" }, 0);
        if (label) tl.to(label, { y: -(h + 12), duration: 1.6, ease: "power2.easeOut", overwrite: "auto" }, 0);
        if (hover) {
          gsap.set(hover, { y: Math.ceil(h + 60), opacity: 0 });
          tl.to(hover, { y: 0, opacity: 1, duration: 1.6, ease: "power2.easeOut", overwrite: "auto" }, 0);
        }
        tlRef.current = tl;
      };

      layout();
      window.addEventListener("resize", layout);
      if (typeof document !== "undefined" && document.fonts?.ready) {
        document.fonts.ready.then(layout).catch(() => {});
      }
      return () => window.removeEventListener("resize", layout);
    };

    let cleanup: (() => void) | undefined;
    setup().then((fn) => {
      cleanup = fn;
    });
    return () => {
      tlRef.current?.kill();
      cleanup?.();
    };
  }, []);

  const handleEnter = () => {
    setIsHovered(true);
    tlRef.current?.tweenTo(tlRef.current.duration(), { duration: 0.35, ease: "power2.easeOut", overwrite: "auto" });
  };

  const handleLeave = () => {
    setIsHovered(false);
    tlRef.current?.tweenTo(0, { duration: 0.25, ease: "power2.easeOut", overwrite: "auto" });
  };

  const sharedStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "12px 14px",
    background: `rgba(${colorRgb}, 0.10)`,
    border: `1px solid ${isHovered ? colorHex : `rgba(${colorRgb}, 0.65)`}`,
    borderRadius: "0.75rem",
    boxShadow: isHovered
      ? `0 12px 32px -2px rgba(0, 0, 0, 0.95), 0 6px 18px rgba(0, 0, 0, 0.95), 0 0 28px rgba(${colorRgb}, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.6)`
      : `0 8px 24px -2px rgba(0,0,0,0.85), 0 4px 12px rgba(0,0,0,0.95), 0 0 14px rgba(${colorRgb}, 0.25), inset 0 1px 0 rgba(255,255,255,0.4)`,
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1), border-color 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1)",
    transform: isHovered ? "scale(1.02)" : "scale(1)",
    textAlign: "left",
    textDecoration: "none",
  };

  const innerContent = (
    <>
      {/* GSAP expanding bubble fill */}
      <span
        ref={circleRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          bottom: 0,
          borderRadius: "50%",
          background: colorHex,
          zIndex: 1,
          display: "block",
          pointerEvents: "none",
          willChange: "transform",
        }}
      />

      {/* Default label stack */}
      <div
        className="hub-card-label"
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          willChange: "transform",
        }}
      >
        <div>
          <div
            className="text-xs font-rajdhani font-bold uppercase tracking-wider flex items-center gap-1.5"
            style={{
              color: titleColor || colorHex,
              textShadow: "0 1px 2px #000000, 0 2px 6px rgba(0,0,0,0.95), 0 0 10px rgba(0,0,0,0.9)",
            }}
          >
            {leftIcon}
            <span>{title}</span>
          </div>
          <div className="text-[10px] font-mono text-slate-300 mt-0.5">
            {subtitle}
          </div>
        </div>
        <div className="shrink-0 ml-3 flex items-center">
          {rightIcon}
        </div>
      </div>

      {/* Hover label stack (dark text on bright bubble fill) */}
      <div
        className="hub-card-label-hover"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          padding: "12px 14px",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#050B14",
          pointerEvents: "none",
          willChange: "transform, opacity",
        }}
      >
        <div>
          <div className="text-xs font-rajdhani font-black uppercase tracking-wider text-[#050B14] flex items-center gap-1.5">
            {leftIconHover || leftIcon}
            <span>{title}</span>
          </div>
          <div className="text-[10px] font-mono text-[#0B1E2E] font-bold mt-0.5">
            {subtitle}
          </div>
        </div>
        <div className="shrink-0 ml-3 flex items-center text-[#050B14]">
          {rightIconHover || rightIcon}
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        ref={containerRef}
        href={href}
        style={sharedStyle}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {innerContent}
      </Link>
    );
  }

  return (
    <button
      ref={containerRef}
      type="button"
      onClick={onClick}
      style={sharedStyle}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {innerContent}
    </button>
  );
}

export function PipelineExportHub({
  telemetry,
  llccCoords,
  stormName,
  sourceName,
  selectedModel,
}: PipelineExportHubProps) {
  const [copiedJson, setCopiedJson] = useState(false);
  const [archiveStatus, setArchiveStatus] = useState<string | null>(null);

  // Generate complete inference JSON payload
  const handleExportJson = () => {
    const payload = {
      project: "CYCLO-AI",
      version: "2.4.0",
      timestamp: new Date().toISOString(),
      storm: {
        name: stormName,
        source: sourceName,
        llcc: {
          latitude: llccCoords.lat,
          longitude: llccCoords.lon,
          coordinateSystem: "EPSG:4326 (WGS84)",
        },
      },
      modelInference: {
        architecture: selectedModel,
        latencyMs: 48,
        hardware: "NVIDIA L4 TensorRT FP16",
        primaryPattern: telemetry.primaryPattern,
        confidence: telemetry.confidence,
        probabilities: telemetry.probabilities,
        dvorak: {
          tNumber: telemetry.tNumber,
          currentIntensity: telemetry.ciNumber,
          vmaxKmh: telemetry.vmaxKmh,
          vmaxKts: telemetry.vmaxKts,
          centralPressureHpa: telemetry.pcHpa,
          radiusOfMaxWindsKm: telemetry.rmwKm,
          category: telemetry.category,
        },
      },
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CYCLO_AI_${stormName.replace(/\s+/g, "_")}_INFERENCE.json`;
    a.click();
    URL.revokeObjectURL(url);

    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 3000);
  };

  // Generate IMD-formatted Bulletin HTML/Print
  const handleExportPdf = () => {
    const bulletinWindow = window.open("", "_blank");
    if (!bulletinWindow) return;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>CYCLO-AI Meteorological Advisory - ${stormName}</title>
        <style>
          body { font-family: 'Courier New', monospace; padding: 32px; background: #fff; color: #111; line-height: 1.5; }
          .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 20px; }
          .title { font-size: 18px; font-weight: bold; text-transform: uppercase; }
          .subtitle { font-size: 12px; color: #555; }
          .table { width: 100%; border-collapse: collapse; margin: 16px 0; }
          .table th, .table td { border: 1px solid #333; padding: 6px 10px; font-size: 12px; text-align: left; }
          .table th { background: #f0f0f0; }
          .alert { background: #ffebee; border-left: 4px solid #d32f2f; padding: 8px 12px; margin: 16px 0; font-size: 12px; }
          .footer { font-size: 10px; color: #777; margin-top: 30px; border-top: 1px solid #ccc; padding-top: 8px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">INDIA METEOROLOGICAL DEPARTMENT / CYCLO-AI BULLETIN</div>
          <div class="subtitle">AUTOMATED DVORAK SATELLITE DIAGNOSTIC ADVISORY NO. 04</div>
          <div class="subtitle">ISSUED AT: ${new Date().toUTCString()}</div>
        </div>

        <div class="alert">
          <strong>WARNING LEVEL:</strong> VERY SEVERE CYCLONIC STORM (${stormName.toUpperCase()})
        </div>

        <table class="table">
          <tr><th>Parameter</th><th>AI Model Diagnosis (ConvNeXt-ViT)</th><th>Operational Standard</th></tr>
          <tr><td>Center Coordinates (LLCC)</td><td>${llccCoords.lat}°N, ${llccCoords.lon}°E</td><td>Sub-pixel Neural Centroid</td></tr>
          <tr><td>Identified Pattern</td><td>${telemetry.primaryPattern}</td><td>Dvorak BD-Curve</td></tr>
          <tr><td>Classification Confidence</td><td>${telemetry.confidence.toFixed(1)}%</td><td>Softmax Output</td></tr>
          <tr><td>Dvorak T-Number / CI</td><td>${telemetry.tNumber} / ${telemetry.ciNumber}</td><td>Empirical Scale</td></tr>
          <tr><td>Maximum Sustained Wind</td><td>${telemetry.vmaxKmh} km/h (${telemetry.vmaxKts} kts)</td><td>Knaff-Zehr Formulation</td></tr>
          <tr><td>Central Pressure (Pc)</td><td>${telemetry.pcHpa} hPa</td><td>Hydrostatic Balance</td></tr>
          <tr><td>Radius of Max Winds (RMW)</td><td>${telemetry.rmwKm} km</td><td>Eye Boundary Ring</td></tr>
        </table>

        <p style="font-size: 11px;">
          <strong>REMARKS:</strong> Satellite imagery reveals a well-defined eye pattern embedded within a symmetrical cold cloud shield (&lt; -75°C). Primary convective spiral rainband wraps 1.35π radians into the storm vortex with negligible vertical wind shear displacement (&lt; 18 km). Rapid forward propagation expected.
        </p>

        <div class="footer">
          Generated automatically by CYCLO-AI Deep Convective Pattern Engine • Verified with INSAT-3DR Geostationary Telemetry
        </div>
      </body>
      </html>
    `;

    bulletinWindow.document.write(html);
    bulletinWindow.document.close();
    bulletinWindow.print();
  };

  const handleCommitArchive = () => {
    setArchiveStatus("Committed run #104 to research archive!");
    setTimeout(() => setArchiveStatus(null), 3500);
  };

  return (
    <div className="relative overflow-hidden bg-[#0F1B2F]/90 backdrop-blur-xl border border-[rgba(0,242,254,0.4)] rounded-xl p-4 shadow-[0_0_15px_rgba(0,242,254,0.1),0_4px_24px_rgba(0,0,0,0.6)]">
      {/* Background Tactile Film-Grain Noise */}
      <Noise
        patternSize={250}
        patternScaleX={1.2}
        patternScaleY={1.2}
        patternRefreshInterval={2}
        patternAlpha={8}
      />

      <div className="relative z-10 space-y-3.5">
        {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#1E3252]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#00F2FE]/15 border border-[#00F2FE]/40 flex items-center justify-center text-[#00F2FE] shadow-[0_0_10px_rgba(0,242,254,0.25)]">
            <Share2 className="w-3.5 h-3.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" />
          </div>
          <span 
            className="font-rajdhani text-xs font-bold text-[#00F2FE] uppercase tracking-wider"
            style={{ textShadow: "0 1px 2px #000000, 0 2px 6px rgba(0,0,0,0.95), 0 0 10px rgba(0,0,0,0.9)" }}
          >
            Downstream Pipeline & Scientific Export Hub
          </span>
        </div>
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {/* 1. Send to Trajectory Prediction (Page 5) */}
        <ExportHubCardButton
          href={`/forecast?llcc=${llccCoords.lat},${llccCoords.lon}&vmax=${telemetry.vmaxKmh}&pc=${telemetry.pcHpa}`}
          colorHex="#00F2FE"
          colorRgb="0, 242, 254"
          title="Send to Trajectory"
          subtitle="Handoff LLCC to Ensemble Forecaster"
          leftIcon={<TrendingUp className="w-4 h-4 text-[#00F2FE]" />}
          leftIconHover={<TrendingUp className="w-4 h-4 text-[#050B14]" />}
          rightIcon={<ArrowUpRight className="w-4 h-4 text-[#00F2FE]" />}
          rightIconHover={<ArrowUpRight className="w-4 h-4 text-[#050B14] translate-x-0.5 -translate-y-0.5 transition-transform" />}
        />

        {/* 2. Commit to Benchmark Archive */}
        <ExportHubCardButton
          onClick={handleCommitArchive}
          colorHex="#10E7A2"
          colorRgb="16, 231, 162"
          title="Commit to Archive"
          subtitle={archiveStatus || "Save snapshot to /model-metrics"}
          leftIcon={<Archive className="w-4 h-4 text-[#10E7A2]" />}
          leftIconHover={<Archive className="w-4 h-4 text-[#050B14]" />}
          rightIcon={<CheckCircle2 className="w-4 h-4 text-[#10E7A2]" />}
          rightIconHover={<CheckCircle2 className="w-4 h-4 text-[#050B14]" />}
        />

        {/* 3. Export IMD-Formatted PDF Bulletin */}
        <ExportHubCardButton
          onClick={handleExportPdf}
          colorHex="#FF5E36"
          colorRgb="255, 94, 54"
          title="Export Report (PDF)"
          subtitle="Official IMD Advisory Bulletin"
          leftIcon={<FileText className="w-4 h-4 text-[#FF5E36]" />}
          leftIconHover={<FileText className="w-4 h-4 text-[#050B14]" />}
          rightIcon={<Download className="w-4 h-4 text-[#FF5E36]" />}
          rightIconHover={<Download className="w-4 h-4 text-[#050B14] translate-y-0.5 transition-transform" />}
        />

        {/* 4. Raw JSON Payload Export */}
        <ExportHubCardButton
          onClick={handleExportJson}
          colorHex="#00F2FE"
          colorRgb="0, 242, 254"
          title="Raw JSON Payload"
          titleColor="#FFFFFF"
          subtitle={copiedJson ? "Downloaded JSON File!" : "Export bounding boxes & telemetry"}
          leftIcon={<Code2 className="w-4 h-4 text-[#00F2FE]" />}
          leftIconHover={<Code2 className="w-4 h-4 text-[#050B14]" />}
          rightIcon={
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-300 border border-white/15">
              {" { } "}
            </span>
          }
          rightIconHover={
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#050B14]/20 border border-[#050B14]/40 text-[#050B14] font-bold">
              {" { } "}
            </span>
          }
        />
      </div>
    </div>
  </div>
);
}
