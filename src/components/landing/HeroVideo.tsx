"use client";

import React, { useState, useEffect } from "react";
import { 
  Cpu, 
  Layers, 
  Sparkles
} from "lucide-react";
import { Noise } from "@/components/ui/Noise";
import { ShinyText } from "@/components/ui/ShinyText";
import { ShinyBadge } from "@/components/ui/ShinyBadge";
import { FoldText } from "@/components/ui/FoldText";
import { GradientText } from "@/components/ui/GradientText";
import { TextType } from "@/components/ui/TextType";

function PerformanceTelemetry() {
  const [fps, setFps] = useState(60);
  const [gpuMem, setGpuMem] = useState(142);

  // Subtle live variation to simulate real GPU telemetry without re-rendering the parent video
  useEffect(() => {
    const interval = setInterval(() => {
      setFps(Math.floor(59 + Math.random() * 2));
      setGpuMem(Math.floor(140 + Math.random() * 5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-[11px] text-[#8E9EB5] space-y-0.5 leading-tight font-jetbrains [font-feature-settings:'tnum'_on]">
      <p>Framerate: <span className="text-[#10E7A2] font-bold">FPS: {fps}</span></p>
      <p>Memory: <span className="text-slate-200 font-bold">GPU Mem: {gpuMem} MB</span></p>
    </div>
  );
}

export function HeroVideo() {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const sectionRef = React.useRef<HTMLElement | null>(null);

  // Bulletproof video playback & continuous looping recovery with viewport optimization
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video) return;

    // Explicitly guarantee muted DOM properties for autoplay permission
    video.defaultMuted = true;
    video.muted = true;

    const playVideo = () => {
      if (video.paused) {
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch(() => {});
        }
      }
    };

    const pauseVideo = () => {
      if (!video.paused) {
        video.pause();
      }
    };

    // Recover immediately when 10s video reaches the end if browser loop stalls
    const handleRestart = () => {
      video.currentTime = 0;
      playVideo();
    };

    video.addEventListener("ended", handleRestart);
    video.addEventListener("stalled", playVideo);
    video.addEventListener("waiting", playVideo);

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener("canplay", playVideo, { once: true });
      video.addEventListener("loadeddata", playVideo, { once: true });
    }

    let observer: IntersectionObserver | null = null;
    if (section) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            playVideo();
          } else {
            pauseVideo();
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(section);
    }

    return () => {
      video.removeEventListener("ended", handleRestart);
      video.removeEventListener("stalled", playVideo);
      video.removeEventListener("waiting", playVideo);
      observer?.disconnect();
    };
  }, []);

  return (
    <section 
      id="hero-video-section"
      ref={sectionRef}
      className="relative min-h-[90vh] w-full bg-[#050B14] overflow-hidden flex flex-col justify-center items-center pt-20 pb-16 select-none font-jakarta"
    >
      {/* 🎥 Background Satellite Video with seamless looping recovery */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onEnded={() => {
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(() => {});
          }
        }}
        className="object-cover w-full h-full absolute inset-0 z-0 pointer-events-none brightness-110 contrast-105 will-change-transform [transform:translateZ(0)]"
      >
        <source src="/hero_video.mp4" type="video/mp4" />
      </video>
      {/* 🌑 Readability Overlays for opaque contrast */}
      <div className="bg-[#050B14]/30 absolute inset-0 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050B14]/20 to-[#050B14] z-10 pointer-events-none" />

      {/* ---------------- ABSOLUTE GLASSMORPHIC HUD OVERLAYS WITH REACT BITS NOISE (z-40 Foreground) ---------------- */}
      
      {/* 1. TOP-LEFT: Feed Badge (Rajdhani) */}
      <div className="absolute top-28 sm:top-32 left-4 sm:left-8 z-40 pointer-events-auto font-rajdhani">
        <div className="group relative overflow-hidden px-4 py-3 rounded-xl bg-[#0B1528]/90 backdrop-blur-xl border border-transparent hover:border-[#00F2FE]/70 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.75)] hover:shadow-[0_12px_36px_-4px_rgba(0,0,0,0.75),0_0_25px_rgba(0,242,254,0.3)] text-left font-rajdhani transition-all duration-300 cursor-default">
          <Noise
            patternSize={120}
            patternScaleX={1}
            patternScaleY={1}
            patternRefreshInterval={3}
            patternAlpha={18}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10E7A2] animate-ping" />
              <span className="text-xs font-bold text-white tracking-wider uppercase font-rajdhani">FEED: ACTIVE</span>
            </div>
            <div className="text-xs text-[#8E9EB5] space-y-0.5 leading-tight font-rajdhani">
              <p>Feed Badge: <span className="text-[#00F2FE] font-bold">INSAT-3DR TIR-1 10.8µm</span></p>
              <p className="text-[11px]">Latency: <span className="text-[#10E7A2] font-bold">12s</span> | Coverage: <span className="text-slate-200">BoB & NIO</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TOP-RIGHT: Performance Monitor (JetBrains Mono, Tabular Nums) */}
      <div className="absolute top-28 sm:top-32 right-4 sm:right-8 z-40 pointer-events-auto hidden sm:block font-jetbrains">
        <div className="group relative overflow-hidden px-4 py-3 rounded-xl bg-[#0B1528]/90 backdrop-blur-xl border border-transparent hover:border-[#00F2FE]/70 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.75)] hover:shadow-[0_12px_36px_-4px_rgba(0,0,0,0.75),0_0_25px_rgba(0,242,254,0.3)] text-right font-jetbrains [font-feature-settings:'tnum'_on] transition-all duration-300 cursor-default">
          <Noise
            patternSize={120}
            patternScaleX={1}
            patternScaleY={1}
            patternRefreshInterval={3}
            patternAlpha={18}
          />
          <div className="relative z-10">
            <div className="flex items-center justify-end gap-2 mb-1.5 font-rajdhani">
              <Cpu className="w-3.5 h-3.5 text-[#00F2FE]" />
              <span className="text-xs font-bold text-white tracking-wider uppercase">PERFORMANCE MONITOR</span>
            </div>
            <PerformanceTelemetry />
          </div>
        </div>
      </div>

      {/* 3. BOTTOM-LEFT: Telemetry Box (JetBrains Mono, Tabular Nums) */}
      <div className="absolute bottom-8 left-4 sm:left-8 z-40 pointer-events-auto font-jetbrains">
        <div className="group relative overflow-hidden px-4 py-3.5 rounded-xl bg-[#0B1528]/90 backdrop-blur-xl border border-transparent hover:border-[#00F2FE]/70 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.75)] hover:shadow-[0_12px_36px_-4px_rgba(0,0,0,0.75),0_0_25px_rgba(0,242,254,0.3)] text-left font-jetbrains [font-feature-settings:'tnum'_on] transition-all duration-300 cursor-default">
          <Noise
            patternSize={120}
            patternScaleX={1}
            patternScaleY={1}
            patternRefreshInterval={3}
            patternAlpha={18}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 font-rajdhani">
              <span className="px-1.5 py-0.5 rounded bg-[#DC2626]/20 border border-[#DC2626] text-[#DC2626] text-[10px] font-black uppercase tracking-wider font-rajdhani shadow-[0_0_8px_rgba(220,38,38,0.4)]">
                VSCS Cat-3
              </span>
              <span className="text-sm font-bold text-white font-rajdhani tracking-wide uppercase">CYCLONE &quot;ARNAB&quot;</span>
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-1 text-xs font-jetbrains [font-feature-settings:'tnum'_on]">
              <div>
                <span className="text-[10px] text-[#8E9EB5] block uppercase font-rajdhani">Min Pressure</span>
                <span className="text-white font-bold font-jetbrains">942 hPa</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8E9EB5] block uppercase font-rajdhani">Max Wind</span>
                <span className="text-[#00F2FE] font-bold font-jetbrains">185 km/h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM-RIGHT: Shader HUD (Rajdhani) */}
      <div className="absolute bottom-8 right-4 sm:right-8 z-40 pointer-events-auto hidden md:block font-rajdhani">
        <div className="group relative overflow-hidden px-4 py-3.5 rounded-xl bg-[#0B1528]/90 backdrop-blur-xl border border-transparent hover:border-[#00F2FE]/70 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.75)] hover:shadow-[0_12px_36px_-4px_rgba(0,0,0,0.75),0_0_25px_rgba(0,242,254,0.3)] text-right font-rajdhani transition-all duration-300 cursor-default">
          <Noise
            patternSize={120}
            patternScaleX={1}
            patternScaleY={1}
            patternRefreshInterval={3}
            patternAlpha={18}
          />
          <div className="relative z-10">
            <div className="flex items-center justify-end gap-2 mb-1.5">
              <Layers className="w-3.5 h-3.5 text-[#00F2FE]" />
              <span className="text-xs font-bold text-white tracking-wider uppercase font-rajdhani">SHADER HUD</span>
            </div>
            <div className="text-xs text-[#8E9EB5] space-y-0.5 leading-tight font-rajdhani">
              <p className="font-semibold">Active: <span className="text-[#00F2FE]">Data Fusion Sequence</span></p>
              <p className="text-[11px]">Resolution: <span className="text-[#10E7A2]">Sub-Kilometer LLCC</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- CENTER OVERLAY CONTENT (z-30) ---------------- */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 text-center mt-32 sm:mt-40 lg:mt-48 translate-y-4 sm:translate-y-8 lg:translate-y-12">
        
        {/* Top Mission Pill */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <ShinyBadge
            speed={2.5}
            delay={1}
            spread={90}
            direction="right"
            yoyo
            borderColor="rgba(0, 242, 254, 0.45)"
            borderShineColor="#ffffff"
            surfaceColor="rgba(0, 242, 254, 0.2)"
            surfaceShineColor="rgba(255, 255, 255, 0.7)"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00F2FE]" />
            <span className="text-xs font-jetbrains [font-feature-settings:'tnum'_on] font-bold tracking-wider text-[#00F2FE]">
              SIH 2K26 - Disaster Management
            </span>
          </ShinyBadge>
        </div>

        {/* Center Title Specification (TEXT_TYPES.md) with React Bits FoldText & Moving Gradient */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-[1.2] mb-6 text-center">
          {/* Desktop view (lg and above): 2 lines (4 words, then 2 words) */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-2">
            <FoldText
              text="AI-POWERED INTELLIGENT SYSTEM FOR"
              solidWords={["AI-POWERED", "FOR"]}
              solidColor="#38BDF8"
              splitBy="char"
              hinge="top"
              trigger="mount"
              duration={0.7}
              stagger={0.03}
              ease="back.out(1.5)"
              perspective={550}
              creaseShading={0.45}
              color="#C084FC"
              gradientColors={["#C084FC", "#F87171", "#E879F9", "#FB7185", "#C084FC"]}
              gradientSpeed={5}
              className="font-magilio whitespace-nowrap tracking-[0.02em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] drop-shadow-[0_6px_14px_rgba(0,0,0,0.85)] drop-shadow-[0_0_30px_rgba(56,189,248,0.25)]"
            />
            <FoldText
              text="TROPICAL CYCLONE"
              solidWords={["CYCLONE"]}
              solidColor="#38BDF8"
              splitBy="char"
              hinge="top"
              trigger="mount"
              duration={0.75}
              stagger={0.045}
              ease="back.out(1.6)"
              perspective={550}
              creaseShading={0.45}
              color="#10E7A2"
              gradientColors={["#10E7A2", "#FDE047", "#4ADE80", "#FACC15", "#10E7A2"]}
              gradientSpeed={4}
              className="font-azonix whitespace-nowrap tracking-[0.05em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] drop-shadow-[0_6px_14px_rgba(0,0,0,0.85)] drop-shadow-[0_0_30px_rgba(16,231,162,0.3)]"
            />
          </div>

          {/* Tablet & Mobile view (< lg): 3 lines (2 words, 2 words, 2 words) */}
          <div className="flex lg:hidden flex-col items-center justify-center gap-1.5">
            <FoldText
              text="AI-POWERED INTELLIGENT"
              solidWords={["AI-POWERED"]}
              solidColor="#38BDF8"
              splitBy="char"
              hinge="top"
              trigger="mount"
              duration={0.65}
              stagger={0.03}
              ease="back.out(1.5)"
              perspective={550}
              creaseShading={0.45}
              color="#C084FC"
              gradientColors={["#C084FC", "#F87171", "#E879F9", "#FB7185", "#C084FC"]}
              gradientSpeed={5}
              className="font-magilio whitespace-nowrap tracking-[0.02em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] drop-shadow-[0_6px_14px_rgba(0,0,0,0.85)] drop-shadow-[0_0_30px_rgba(56,189,248,0.25)]"
            />
            <FoldText
              text="SYSTEM FOR"
              solidWords={["FOR"]}
              solidColor="#38BDF8"
              splitBy="char"
              hinge="top"
              trigger="mount"
              duration={0.65}
              stagger={0.035}
              ease="back.out(1.5)"
              perspective={550}
              creaseShading={0.45}
              color="#C084FC"
              gradientColors={["#C084FC", "#F87171", "#E879F9", "#FB7185", "#C084FC"]}
              gradientSpeed={5}
              className="font-magilio whitespace-nowrap tracking-[0.02em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] drop-shadow-[0_6px_14px_rgba(0,0,0,0.85)] drop-shadow-[0_0_30px_rgba(56,189,248,0.25)]"
            />
            <FoldText
              text="TROPICAL CYCLONE"
              solidWords={["CYCLONE"]}
              solidColor="#38BDF8"
              splitBy="char"
              hinge="top"
              trigger="mount"
              duration={0.75}
              stagger={0.045}
              ease="back.out(1.6)"
              perspective={550}
              creaseShading={0.45}
              color="#10E7A2"
              gradientColors={["#10E7A2", "#FDE047", "#4ADE80", "#FACC15", "#10E7A2"]}
              gradientSpeed={4}
              className="font-azonix whitespace-nowrap tracking-[0.05em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] drop-shadow-[0_6px_14px_rgba(0,0,0,0.85)] drop-shadow-[0_0_30px_rgba(16,231,162,0.3)]"
            />
          </div>
        </h1>

        {/* Subtitle description with React Bits TextType typing effect (all lines together, once on page open) */}
        <div className="max-w-2xl mx-auto mb-9">
          <TextType
            as="p"
            text="Fusing multi-source satellite imagery with advanced AI to automatically detect cyclone patterns, track their core, and simulate their future path with extreme precision."
            typingSpeed={18}
            initialDelay={300}
            loop={false}
            showCursor={true}
            cursorCharacter="|"
            cursorClassName="text-[#00F2FE] font-mono font-bold drop-shadow-[0_0_8px_rgba(0,242,254,0.9)] ml-1"
            cursorBlinkDuration={0.6}
            variableSpeed={{ min: 12, max: 24 }}
            className="text-sm sm:text-base md:text-lg text-[#7DD3FC] font-jakarta font-medium leading-relaxed hero-subtitle-shadow text-center inline-block"
            style={{
              textShadow: "0 2px 4px #000000, 0 4px 12px rgba(0, 0, 0, 0.95), 0 8px 24px rgba(0, 0, 0, 0.9), 0 0 6px #000000"
            }}
          />
        </div>
      </div>
    </section>
  );
}
