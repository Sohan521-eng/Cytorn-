import React from "react";
import { HeroVideo } from "@/components/landing/HeroVideo";
import { StormTicker } from "@/components/landing/StormTicker";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { LandingMetrics } from "@/components/landing/LandingMetrics";
import { LandingTimeline } from "@/components/landing/LandingTimeline";
import { GlobalFooter } from "@/components/layout/GlobalFooter";
import { XaiFloatingWidget } from "@/components/xai/XaiFloatingWidget";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col selection:bg-[#00F2FE]/30 selection:text-[#00F2FE] overflow-x-hidden font-jakarta">
      {/* Main Mission Flow */}
      <main className="flex-1 flex flex-col">
        {/* 2. Full-Screen Satellite Video Hero Section (with /hero_video.mp4 & 4 HUD Overlays) */}
        <HeroVideo />

        {/* 3. Real-Time Live Storm Ticker (Continuous horizontal marquee in Share Tech Mono) */}
        <StormTicker />

        {/* 4. Core Technology & Capability Cards (5 Tracks: Fusion, Pattern Studio, PINNs, XAI, Warning Hub) */}
        <FeatureGrid />

        {/* 5. Mission Telemetry & Counter Grid (96.4% Accuracy, 24H Lead, 4 Tiers, 0.08° Eye Fix + Radar Sweep) */}
        <LandingMetrics />

        {/* 6. Curvilinear Cyclone Progression Lifecycle (Genesis → Alert → Warning → Landfall) */}
        <LandingTimeline />
      </main>

      {/* 7. Institutional Credits & Emergency Footer (NDMA 1078 Helpline + IMD / ISRO / NOAA / WMO) */}
      <GlobalFooter />

      {/* 8. Floating Cyclone AI Assistant Widget (Matches exactly across all pages) */}
      <XaiFloatingWidget stormName='CYCLONE "ARNAB"' />
    </div>
  );
}


