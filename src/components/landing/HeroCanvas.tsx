"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Radio, 
  Satellite, 
  Cpu, 
  Layers, 
  Sparkles,
  ChevronRight,
  Target
} from "lucide-react";

export function HeroCanvas() {
  const [fps, setFps] = useState(60);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showHotspotModal, setShowHotspotModal] = useState(false);

  // Subtle interactive parallax effect responding to cursor
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  };

  // Realistic jitter for live telemetry monitor
  useEffect(() => {
    const interval = setInterval(() => {
      setFps(Math.floor(59 + Math.random() * 2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="hero-3d-canvas"
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] lg:min-h-[96vh] w-full bg-[#050B14] overflow-hidden flex flex-col justify-center items-center pt-20 pb-16 select-none font-sora"
    >
      {/* 🌌 Deep Cyber Ocean Radial Glows & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,#0F1B2F_0%,#050B14_75%)] opacity-90 pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(to_right,#1E3252_1px,transparent_1px),linear-gradient(to_bottom,#1E3252_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" 
      />

      {/* 🌀 3D Interactive Cyclone Simulation & Earth Vortex Layer */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)`,
        }}
      >
        <div className="relative w-[340px] h-[340px] sm:w-[520px] sm:h-[520px] md:w-[700px] md:h-[700px] rounded-full flex items-center justify-center">
          {/* Outermost Tropospheric Outflow Ring */}
          <div className="absolute inset-0 rounded-full border border-[#00F2FE]/15 animate-spin-slow" />
          
          {/* Counter-Clockwise Cyclone Streamlines */}
          <div className="absolute w-[85%] h-[85%] rounded-full border-2 border-dashed border-[#00F2FE]/25 animate-[spin_18s_linear_infinite_reverse]" />
          
          {/* Thermal Cloud Dense Rainbands */}
          <div className="absolute w-[68%] h-[68%] rounded-full border border-[#FF5E36]/30 bg-radial from-[#00F2FE]/10 via-[#0F1B2F]/40 to-transparent animate-[spin_12s_linear_infinite]" />

          {/* Central Dense Overcast (CDO) Core */}
          <div className="absolute w-[44%] h-[44%] rounded-full bg-gradient-to-tr from-[#0F1B2F] via-[#050B14] to-[#00F2FE]/20 border border-[#00F2FE]/50 shadow-[0_0_50px_rgba(0,242,254,0.25)] flex items-center justify-center">
            {/* 🔴 EYE WALL & CLICKABLE HOTSPOT PIN */}
            <div 
              onClick={() => setShowHotspotModal(!showHotspotModal)}
              title="Click Eyewall: Low-Level Circulation Center (LLCC)"
              className="pointer-events-auto cursor-pointer group relative w-12 h-12 rounded-full border-2 border-[#FF5E36] bg-[#050B14] flex items-center justify-center animate-alert-flash transition hover:scale-125"
            >
              <Target className="w-5 h-5 text-[#FF5E36] animate-pulse" />
              <span className="absolute -top-6 px-2 py-0.5 rounded bg-[#FF5E36] text-black text-[10px] font-mono font-bold whitespace-nowrap shadow-md">
                EYE 942 hPa
              </span>
            </div>
          </div>

          {/* Laser Scanning Cone Projection from Orbit */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-64 bg-gradient-to-b from-[#00F2FE]/30 via-[#00F2FE]/5 to-transparent [clip-path:polygon(50%_0%,0%_100%,100%_100%)] pointer-events-none animate-pulse" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F1B2F]/90 border border-[#00F2FE]/40 text-[#00F2FE] text-[11px] font-mono font-bold shadow-[0_0_12px_rgba(0,242,254,0.4)]">
            <Satellite className="w-3.5 h-3.5 text-[#00F2FE] animate-bounce" />
            <span>INSAT-3DR ORBIT ~36,000 KM</span>
          </div>
        </div>
      </div>

      {/* ---------------- 4 GLASSMORPHIC HUD OVERLAYS (Share Tech Mono) ---------------- */}
      
      {/* 1. TOP-LEFT: Feed Badge */}
      <div className="absolute top-20 left-4 sm:left-8 z-20 pointer-events-auto">
        <div className="px-4 py-3 rounded-xl bg-[#0F1B2F]/70 backdrop-blur-md border border-[#1E3252] shadow-xl text-left font-mono">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10E7A2] animate-ping" />
            <span className="text-xs font-bold text-white tracking-wider">SATELLITE FEED: ACTIVE</span>
          </div>
          <div className="text-[11px] text-[#8E9EB5] space-y-0.5 leading-tight">
            <p>Sensor: <span className="text-[#00F2FE] font-bold">INSAT-3DR TIR-1</span></p>
            <p>Band: <span className="text-slate-200">10.8 µm</span> | Latency: <span className="text-[#10E7A2] font-bold">12s</span></p>
            <p>Coverage: <span className="text-slate-200">Bay of Bengal & NIO</span></p>
          </div>
        </div>
      </div>

      {/* 2. TOP-RIGHT: Performance Monitor */}
      <div className="absolute top-20 right-4 sm:right-8 z-20 pointer-events-auto hidden sm:block">
        <div className="px-4 py-3 rounded-xl bg-[#0F1B2F]/70 backdrop-blur-md border border-[#1E3252] shadow-xl text-right font-mono">
          <div className="flex items-center justify-end gap-2 mb-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#00F2FE]" />
            <span className="text-xs font-bold text-white tracking-wider">GPU RUNTIME</span>
          </div>
          <div className="text-[11px] text-[#8E9EB5] space-y-0.5 leading-tight">
            <p>Framerate: <span className="text-[#10E7A2] font-bold">{fps} FPS</span></p>
            <p>WebGL Memory: <span className="text-slate-200">142 MB</span></p>
            <p>Draw Calls: <span className="text-slate-200">24 / pass</span></p>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM-LEFT: Storm Telemetry Box */}
      <div className="absolute bottom-8 left-4 sm:left-8 z-20 pointer-events-auto">
        <div className="px-4 py-3.5 rounded-xl bg-[#0F1B2F]/70 backdrop-blur-md border border-[#1E3252] shadow-xl text-left font-mono">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-1.5 py-0.5 rounded bg-[#FF5E36]/20 border border-[#FF5E36] text-[#FF5E36] text-[10px] font-black uppercase tracking-wider">
              VSCS CAT-3
            </span>
            <span className="text-sm font-bold text-white font-rajdhani tracking-wide">CYCLONE &quot;ARNAB&quot;</span>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-1.5 text-xs">
            <div>
              <span className="text-[10px] text-[#8E9EB5] block uppercase">Min Pressure</span>
              <span className="text-white font-bold font-mono">942 hPa</span>
            </div>
            <div>
              <span className="text-[10px] text-[#8E9EB5] block uppercase">Max Wind</span>
              <span className="text-[#00F2FE] font-bold font-mono">185 km/h</span>
            </div>
            <div>
              <span className="text-[10px] text-[#8E9EB5] block uppercase">Coordinates</span>
              <span className="text-slate-300 font-mono text-[11px]">16.2°N, 88.4°E</span>
            </div>
            <div>
              <span className="text-[10px] text-[#8E9EB5] block uppercase">Dvorak T-No</span>
              <span className="text-[#10E7A2] font-bold font-mono">T-5.5 (RI)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM-RIGHT: Shader HUD */}
      <div className="absolute bottom-8 right-4 sm:right-8 z-20 pointer-events-auto hidden md:block">
        <div className="px-4 py-3 rounded-xl bg-[#0F1B2F]/70 backdrop-blur-md border border-[#1E3252] shadow-xl text-right font-mono">
          <div className="flex items-center justify-end gap-2 mb-1.5">
            <Layers className="w-3.5 h-3.5 text-[#00F2FE]" />
            <span className="text-xs font-bold text-white tracking-wider">SHADER HUD</span>
          </div>
          <div className="text-[11px] text-[#8E9EB5] space-y-0.5 leading-tight">
            <p>Active: <span className="text-[#00F2FE]">Rayleigh Atmosphere</span></p>
            <p>Particles: <span className="text-slate-200">25k Curl Noise</span></p>
            <p>Physics Engine: <span className="text-[#10E7A2]">Navier-Stokes PINN</span></p>
          </div>
        </div>
      </div>

      {/* ---------------- CENTER HERO COPY (MERGED ARCHITECTURE) ---------------- */}
      <div className="relative z-30 max-w-5xl mx-auto px-4 text-center mt-6 sm:mt-10">
        
        {/* Top Mission Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F1B2F]/90 border border-[#00F2FE]/40 text-[#00F2FE] text-xs font-mono font-semibold mb-6 shadow-[0_0_20px_rgba(0,242,254,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-[#00F2FE]" />
          <span>MULTI-SOURCE SATELLITE AI INFERENCE ENGINE • SIH 2026</span>
        </div>

        {/* Primary Punchy Headline (From LANDING_PAGE_DESIGN_SPEC.md) */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase leading-[0.95] mb-4 font-rajdhani drop-shadow-[0_0_25px_rgba(0,242,254,0.35)]">
          Predicting Cyclones <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00F2FE] to-[#38bdf8] [text-shadow:0_0_40px_rgba(0,242,254,0.5)]">
            Before Nature Strikes.
          </span>
        </h1>

        {/* Secondary Technical Sub-Header (From SIH2K26/LANDING_PAGE.md) */}
        <h2 className="text-sm sm:text-lg md:text-xl font-bold uppercase tracking-wider text-[#00F2FE] mb-6 font-rajdhani max-w-3xl mx-auto">
          AI-Powered Intelligence for Tropical Cyclone Identification & Intensity Prediction
        </h2>

        {/* Merged Technical Description */}
        <p className="max-w-3xl mx-auto text-xs sm:text-sm md:text-base text-[#8E9EB5] mb-8 font-sora font-light leading-relaxed">
          Autonomous identification, automated Dvorak wind classification, and physics-informed trajectory forecasting powered by INSAT-3D/3DR geostationary remote sensing, Oceansat-3 scatterometer wind vectors, and Navier-Stokes PINN ensembles.
        </p>

        {/* HackSpire High-Energy Capsule Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 font-rajdhani">
          {/* Primary Cyan Capsule */}
          <Link
            href="/dashboard"
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border border-[#00F2FE] bg-[#050B14]/80 px-9 py-4 font-rajdhani text-sm sm:text-base font-bold tracking-[0.15em] uppercase text-[#00F2FE] transition-all duration-300 hover:border-[#00F2FE] hover:text-black hover:bg-[#00F2FE] hover:shadow-[0_0_35px_rgba(0,242,254,0.6)] active:scale-95"
          >
            <Radio className="w-4 h-4 animate-pulse" />
            <span className="relative z-10">Launch Command Dashboard</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          {/* Secondary Coral Capsule */}
          <Link
            href="/satellite-analyzer"
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border border-[#FF5E36]/60 bg-[#050B14]/80 px-9 py-4 font-rajdhani text-sm sm:text-base font-bold tracking-[0.15em] uppercase text-[#FF5E36] transition-all duration-300 hover:border-[#FF5E36] hover:text-black hover:bg-[#FF5E36] hover:shadow-[0_0_35px_rgba(255,94,54,0.6)] active:scale-95"
          >
            <Satellite className="w-4 h-4" />
            <span className="relative z-10">Analyze Satellite Feed</span>
          </Link>
        </div>
      </div>

      {/* Eyewall Click Modal Overlay */}
      {showHotspotModal && (
        <div 
          onClick={() => setShowHotspotModal(false)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 font-sora"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full p-6 rounded-2xl bg-[#0F1B2F] border border-[#00F2FE]/50 shadow-[0_0_40px_rgba(0,242,254,0.3)] text-left"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#1E3252] mb-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#FF5E36]" />
                <h3 className="text-xl font-bold text-white font-rajdhani uppercase tracking-wider">
                  Eyewall Core Telemetry
                </h3>
              </div>
              <button 
                onClick={() => setShowHotspotModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 text-xs text-slate-300 font-mono">
              <p><span className="text-[#8E9EB5]">Target:</span> CYCLONE &quot;ARNAB&quot; (Low-Level Circulation Center)</p>
              <p><span className="text-[#8E9EB5]">Eye Diameter:</span> 28 km (Well-defined circular eye)</p>
              <p><span className="text-[#8E9EB5]">Brightness Temp:</span> -74.2°C (Surrounding deep convective ring)</p>
              <p><span className="text-[#8E9EB5]">Central Pressure:</span> 942 hPa</p>
              <p><span className="text-[#8E9EB5]">Automated Dvorak:</span> T-5.5 / CI-5.8 (Rapid Intensification)</p>
            </div>
            <div className="mt-6 flex justify-end gap-2 font-rajdhani">
              <Link 
                href="/satellite-analyzer"
                className="px-5 py-2 rounded-lg bg-[#00F2FE] text-black font-bold text-sm tracking-wider uppercase hover:bg-[#38bdf8] transition"
              >
                Inspect in Studio →
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
