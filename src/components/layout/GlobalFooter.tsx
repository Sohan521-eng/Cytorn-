"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  PhoneCall, 
  ExternalLink, 
  Terminal, 
  Activity
} from "lucide-react";
import { GlareHover } from "@/components/ui/GlareHover";
import { Dial1078Button } from "@/components/ui/Dial1078Button";
import { EvacuationZonesButton } from "@/components/ui/EvacuationZonesButton";
import { WarpText } from "@/components/ui/WarpText";

export function GlobalFooter() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const footer = footerRef.current;
    if (!video) return;

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
    }

    let observer: IntersectionObserver | null = null;
    if (footer) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            playVideo();
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(footer);
    }

    const onUserInteraction = () => {
      playVideo();
    };
    window.addEventListener("scroll", onUserInteraction, { passive: true, once: true });
    window.addEventListener("pointerdown", onUserInteraction, { once: true });

    return () => {
      video.removeEventListener("ended", handleRestart);
      video.removeEventListener("stalled", playVideo);
      video.removeEventListener("waiting", playVideo);
      observer?.disconnect();
      window.removeEventListener("scroll", onUserInteraction);
      window.removeEventListener("pointerdown", onUserInteraction);
    };
  }, []);
  const institutionalPartners = [
    {
      name: "India Meteorological Department (IMD)",
      abbr: "IMD",
      role: "Official Tropical Cyclone Warning Provider & Cyclone E-Atlas",
      href: "https://mausam.imd.gov.in",
    },
    {
      name: "ISRO / MOSDAC Space Applications Centre",
      abbr: "ISRO / MOSDAC",
      role: "INSAT-3D/3DR Geostationary TIR Telemetry & Oceansat-3 Winds",
      href: "https://www.mosdac.gov.in",
    },
    {
      name: "National Oceanic and Atmospheric Administration",
      abbr: "NOAA",
      role: "IBTrACS Cyclone Global Archives & Microwave Sounder Data",
      href: "https://www.noaa.gov",
    },
    {
      name: "World Meteorological Organization",
      abbr: "WMO",
      role: "Panel on Tropical Cyclones (PTC) Standardized Protocols",
      href: "https://wmo.int",
    },
  ];

  return (
    <footer 
      id="global-footer" 
      ref={footerRef}
      className="w-full bg-[#03070D] border-t border-[#25426B] shadow-[0_-12px_28px_rgba(0,0,0,0.7),0_-4px_10px_rgba(0,0,0,0.5)] pt-14 pb-8 font-jakarta text-slate-300 relative z-30 overflow-hidden"
    >
      {/* 🌐 Prominent Top Edge Boundary Accent Line */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00F2FE]/60 to-transparent z-20 pointer-events-none" />

      {/* 🎥 Background Video for Footer Section */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="object-cover w-full h-full absolute inset-0 z-0 pointer-events-none brightness-110 contrast-105"
      >
        <source src="/footer_video.mp4" type="video/mp4" />
      </video>

      {/* 🌑 Readability & Contrast Overlays (Matched to HeroVideo brightness & opacity with zero top shadow) */}
      <div className="bg-[#050B14]/30 absolute inset-0 z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* TOP CALLOUT BAR: EMERGENCY DISASTER HELPLINE WITH GLARE HOVER */}
        <div className="mb-12">
          <GlareHover
            width="100%"
            height="auto"
            background="rgba(5, 11, 20, 0.72)"
            borderRadius="1rem"
            borderColor="rgba(255, 94, 54, 0.45)"
            glareColor="#FFA07A"
            glareOpacity={0.55}
            glareAngle={-30}
            glareSize={250}
            transitionDuration={1200}
            playOnce={false}
            className="w-full backdrop-blur-xl shadow-[0_12px_28px_rgba(0,0,0,0.6),0_0_20px_rgba(255,94,54,0.15)]"
          >
            <div className="w-full p-5 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-10 h-10 rounded-xl bg-[#FF5E36]/20 border border-[#FF5E36] flex items-center justify-center text-[#FF5E36] shrink-0">
                  <PhoneCall className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider font-bold text-[#FF5E36] font-jetbrains">
                    National Emergency Broadcast & Public Safety
                  </p>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-rajdhani uppercase tracking-wider">
                    NDMA National Disaster Helpline: <span className="text-[#FF5E36] font-jetbrains font-bold">1078</span>
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-3 font-rajdhani">
                <Dial1078Button />
                <EvacuationZonesButton />
              </div>
            </div>
          </GlareHover>
        </div>

        {/* MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#1E3252]/80">
          
          {/* Brand & Platform Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link 
              href="/" 
              className="group inline-flex items-center gap-1.5 sm:gap-2 shrink-0"
            >
              <Image 
                src="/logo.png" 
                alt="CYTORN Logo" 
                width={64} 
                height={64} 
                unoptimized
                className="w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 object-contain translate-y-0.5 sm:translate-y-1 drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)] drop-shadow-[0_0_8px_rgba(0,242,254,0.35)] group-hover:scale-105 group-hover:drop-shadow-[0_0_16px_rgba(0,242,254,0.65)] transition-all duration-300 shrink-0"
              />
              <div className="flex flex-col">
                <span 
                  className="text-lg sm:text-2xl font-extrabold tracking-[0.06em] text-white font-orbitron uppercase transition-all duration-300 group-hover:text-[#00F2FE] group-hover:[text-shadow:0_2px_4px_#000000,0_0_16px_rgba(0,242,254,0.9)]"
                  style={{
                    textShadow: "0 2px 4px #000000, 0 4px 12px rgba(0, 0, 0, 0.9), 0 0 16px rgba(0, 242, 254, 0.35)"
                  }}
                >
                  CYTORN
                </span>
                <span 
                  className="text-[7px] sm:text-[8.5px] uppercase tracking-[0.18em] text-slate-300 mt-1 font-jetbrains font-semibold hidden sm:inline transition-colors duration-300 group-hover:text-[#00F2FE]/80"
                  style={{
                    textShadow: "0 1px 3px #000000, 0 2px 6px rgba(0, 0, 0, 0.95)"
                  }}
                >
                  Deep-Tech Climate OS
                </span>
              </div>
            </Link>
            <WarpText
              text="Deep-tech climate operating system engineered for the Smart India Hackathon. Integrating geostationary satellite telemetry, Navier-Stokes PINNs, and automated computer vision for real-time cyclogenesis tracking."
              color="#38BDF8"
              warpStrength={1.0}
              warpScale={1.0}
              speed={0.7}
              pointerInfluence={0.45}
              pointerStrength={1.0}
              refraction={0.8}
              ripple={true}
              fontSize={13.5}
              fontWeight={600}
              fontFamily="var(--font-jakarta), 'Plus Jakarta Sans', sans-serif"
              align="left"
              letterSpacing={0.2}
              lineHeight={1.55}
              className="max-w-sm"
              style={{ height: "110px", minHeight: "110px" }}
            />
          </div>

          {/* Quick Navigations */}
          <div>
            <h4 className="text-sm uppercase tracking-wider font-bold text-[#38BDF8] mb-4 font-rajdhani footer-heading-shadow">
              Mission Modules
            </h4>
            <ul className="space-y-2.5 text-xs font-jakarta text-slate-200 font-medium footer-text-shadow">
              <li>
                <Link href="/dashboard" className="hover:text-[#00F2FE] hover:[text-shadow:0_0_12px_rgba(0,242,254,0.9),0_2px_6px_#000000] transition-all">
                  Live Command GIS
                </Link>
              </li>
              <li>
                <Link href="/satellite-analyzer" className="hover:text-[#00F2FE] hover:[text-shadow:0_0_12px_rgba(0,242,254,0.9),0_2px_6px_#000000] transition-all">
                  AI Satellite Studio
                </Link>
              </li>
              <li>
                <Link href="/forecast" className="hover:text-[#00F2FE] hover:[text-shadow:0_0_12px_rgba(0,242,254,0.9),0_2px_6px_#000000] transition-all">
                  120h Trajectory Engine
                </Link>
              </li>
              <li>
                <Link href="/alerts" className="hover:text-[#00F2FE] hover:[text-shadow:0_0_12px_rgba(0,242,254,0.9),0_2px_6px_#000000] transition-all">
                  Disaster Warning Hub
                </Link>
              </li>
              <li>
                <Link href="/model-metrics" className="hover:text-[#00F2FE] hover:[text-shadow:0_0_12px_rgba(0,242,254,0.9),0_2px_6px_#000000] transition-all">
                  AI Validation Metrics
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer & APIs */}
          <div>
            <h4 className="text-sm uppercase tracking-wider font-bold text-[#38BDF8] mb-4 font-rajdhani footer-heading-shadow">
              Developer Hub
            </h4>
            <ul className="space-y-2.5 text-xs font-jakarta text-slate-200 font-medium footer-text-shadow">
              <li>
                <Link href="/settings#api-docs" className="hover:text-[#00F2FE] hover:[text-shadow:0_0_12px_rgba(0,242,254,0.9),0_2px_6px_#000000] transition-all flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#00F2FE] drop-shadow-[0_2px_4px_#000000]" />
                  <span>REST API Docs (v1)</span>
                </Link>
              </li>
              <li>
                <Link href="/settings" className="hover:text-[#00F2FE] hover:[text-shadow:0_0_12px_rgba(0,242,254,0.9),0_2px_6px_#000000] transition-all">
                  HDF5 / GeoTIFF Ingestion
                </Link>
              </li>
              <li>
                <Link href="/settings" className="hover:text-[#00F2FE] hover:[text-shadow:0_0_12px_rgba(0,242,254,0.9),0_2px_6px_#000000] transition-all">
                  Doppler Radar Webhook
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#00F2FE] hover:[text-shadow:0_0_12px_rgba(0,242,254,0.9),0_2px_6px_#000000] transition-all">
                  Scientist Auth Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Institutional Credits Column */}
          <div>
            <h4 className="text-sm uppercase tracking-wider font-bold text-[#38BDF8] mb-4 font-rajdhani footer-heading-shadow">
              Institutional Partners
            </h4>
            <ul className="space-y-2.5 text-xs font-jakarta text-slate-200 font-medium footer-text-shadow">
              {institutionalPartners.map((item) => (
                <li key={item.abbr}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#00F2FE] hover:[text-shadow:0_0_12px_rgba(0,242,254,0.9),0_2px_6px_#000000] transition-all flex items-center justify-between group"
                  >
                    <span>{item.abbr}</span>
                    <ExternalLink className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-[0_2px_4px_#000000]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM METADATA BAR (Includes Item 23: Source Code / Repo Link) */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-start gap-3 sm:gap-6 text-xs text-slate-300 font-jakarta footer-text-shadow">
          <p>
            © 2026 CYTORN Platform. Developed by <span className="text-white font-bold">Hexa-Mindss</span>.
          </p>
          <div className="flex items-center gap-3 sm:gap-4 font-rajdhani font-bold tracking-wider uppercase text-xs sm:text-[13px]">
            <span className="hidden sm:inline text-slate-600 font-normal">•</span>
            <a
              href="https://github.com/Sohan521-eng/HEXAMINDS-SIH"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00F2FE] hover:text-white hover:underline flex items-center gap-1 group hover:[text-shadow:0_0_10px_rgba(0,242,254,0.8)] transition-all"
              title="SIH 2026 Submission Repository (Hexa-Mindss)"
            >
              <span>View Repository</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            </a>
            <span className="text-slate-600 font-normal">•</span>
            <Link href="/settings" className="text-[#00F2FE] hover:text-white hover:underline hover:[text-shadow:0_0_10px_rgba(0,242,254,0.8)] transition-all">
              Settings
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
