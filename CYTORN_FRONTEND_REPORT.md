# 🌪️ CYTORN (TCAPS) — Comprehensive Frontend Development & Architecture Report

> **Project Title:** Tropical Cyclone AI Prediction & Monitoring System (TCAPS) / CYTORN  
> **Problem Statement (SIH 2026):** *"To develop an Artificial Intelligence (AI) / Machine Learning (ML) based system for identification, classification, and prediction of different tropical cyclone patterns using multi-source satellite data."*  
> **Team / Organization:** Hexa-Minds • Ministry of Earth Sciences (MoES) / IMD / ISRO  
> **Official Repository:** [https://github.com/Sohan521-eng/HEXAMINDS-SIH](https://github.com/Sohan521-eng/HEXAMINDS-SIH)  
> **Document Status:** Complete Historical & Architectural Implementation Record (From Inception to Production)  
> **Document File:** `CYTORN_FRONTEND_REPORT.md`

---

## 📑 Table of Contents

1. [Executive Summary & Project Overview](#1-executive-summary--project-overview)
2. [Chronological Development Evolution (From Inception to Production)](#2-chronological-development-evolution)
   - 2.1 [Phase 1: Research, Design Specs & Vite/React Prototype (`SIH2K26`)](#21-phase-1-research-design-specs--vitereact-prototype-sih2k26)
   - 2.2 [Phase 2: Next.js 16 App Router & Modern Tooling Migration](#22-phase-2-nextjs-16-app-router--modern-tooling-migration)
   - 2.3 [Phase 3: Design System Foundation (Tailwind v4, 60-30-10 Harmonization & 15-Font Catalog)](#23-phase-3-design-system-foundation)
   - 2.4 [Phase 4: WebGL / OGL Shader & Procedural Graphics Engine](#24-phase-4-webgl--ogl-shader--procedural-graphics-engine)
   - 2.5 [Phase 5: High-Precision Hero Video & Glassmorphic Telemetry HUDs](#25-phase-5-high-precision-hero-video--glassmorphic-telemetry-huds)
   - 2.6 [Phase 6: Navigation Ecosystem, Pill Mechanics & GSAP Drawer](#26-phase-6-navigation-ecosystem-pill-mechanics--gsap-drawer)
   - 2.7 [Phase 7: Interactive Science Showcase (Feature Grid, Metrics & 4-Stage Timeline)](#27-phase-7-interactive-science-showcase)
   - 2.8 [Phase 8: Operational Command Dashboard & Map Engine Architecture](#28-phase-8-operational-command-dashboard--map-engine-architecture)
   - 2.9 [Phase 9: Role-Based Authentication Gateway & Institutional Footer](#29-phase-9-role-based-authentication-gateway--institutional-footer)
   - 2.10 [Phase 10: Mission Control Command Center Overhaul & Emergency Action Dispatch](#210-phase-10-mission-control-command-center-overhaul--emergency-action-dispatch)
   - 2.11 [Phase 11: Satellite AI Pattern Studio, Grad-CAM & Scientific Export Hub](#211-phase-11-satellite-ai-pattern-studio-grad-cam--scientific-export-hub)
   - 2.12 [Phase 12: Interactive Navigation Ecosystem, GSAP Micro-Interactions & Action Cards Alignment](#212-phase-12-interactive-navigation-ecosystem-gsap-micro-interactions--action-cards-alignment)
   - 2.13 [Phase 13: Trajectory & Intensity Prediction Center (/forecast), Navbar Overlap Fix & UI Polish](#213-phase-13-trajectory--intensity-prediction-center-forecast-navbar-overlap-fix--ui-polish)
3. [Technology Stack & Dependency Inventory](#3-technology-stack--dependency-inventory)
4. [Design System & Visual Identity Architecture](#4-design-system--visual-identity-architecture)
   - 4.1 [The 60-30-10 Golden Ratio Color Balance](#41-the-60-30-10-golden-ratio-color-balance)
   - 4.2 [The 5 Dedicated Color Palettes](#42-the-5-dedicated-color-palettes)
   - 4.3 [Master 15-Font Catalog & 5 Typography Systems](#43-master-15-font-catalog--5-typography-systems)
   - 4.4 [Tailwind CSS v4 Modern Token Integration](#44-tailwind-css-v4-modern-token-integration)
5. [Complete Source Directory & File Breakdown](#5-complete-source-directory--file-breakdown)
6. [Component-by-Component Deep Dive](#6-component-by-component-deep-dive)
   - 6.1 [Core Landing Components (`src/components/landing/`)](#61-core-landing-components)
   - 6.2 [Interactive Custom UI Primitives (`src/components/ui/`)](#62-interactive-custom-ui-primitives)
   - 6.3 [Operational Layout Components (`src/components/layout/`)](#63-operational-layout-components)
   - 6.4 [Command Dashboard Components (`src/components/dashboard/`)](#64-command-dashboard-components)
   - 6.5 [AI Pattern Analyzer Components (`src/components/analyzer/`)](#65-ai-pattern-analyzer-components)
   - 6.6 [Map Rendering Canvas (`src/components/map/`)](#66-map-rendering-canvas)
   - 6.7 [Cyclone AI Assistant & Explainability Layer (`src/components/xai/`)](#67-cyclone-ai-assistant--explainability-layer)
   - 6.8 [Forecast Prediction Center Components (`src/components/forecast/`)](#68-forecast-prediction-center-components-srccomponentsforecast)
7. [Routing Architecture & Page Walkthroughs](#7-routing-architecture--page-walkthroughs)
   - 7.1 [Root Public Landing Page (`/`)](#71-root-public-landing-page-)
   - 7.2 [Operational Geospatial Dashboard (`/dashboard`)](#72-operational-geospatial-dashboard-dashboard)
   - 7.3 [AI Satellite Analyzer & Pattern Studio (`/satellite-analyzer`)](#73-ai-satellite-analyzer--pattern-studio-satellite-analyzer)
   - 7.4 [Trajectory & Intensity Prediction Center (`/forecast`)](#74-trajectory--intensity-prediction-center-forecast)
   - 7.5 [Authentication & Role Verification (`/login`, `/register`)](#75-authentication--role-verification-login-register)
8. [Global State Management Architecture (Zustand Stores)](#8-global-state-management-architecture)
9. [Data Domain Models, TypeScript Contracts & API Client](#9-data-domain-models-typescript-contracts--api-client)
10. [Animation Physics & Mathematical Implementations](#10-animation-physics--mathematical-implementations)
11. [Current Implementation Status & Future Expansion Roadmap](#11-current-implementation-status--future-expansion-roadmap)

---

## 1. Executive Summary & Project Overview

**CYTORN** (also architected under the **TCAPS** framework — *Tropical Cyclone AI Prediction & Monitoring System*) is an enterprise-grade, deep-tech meteorological operating system designed for the **Smart India Hackathon 2026**.

The platform is engineered to solve a critical humanitarian and meteorological challenge: ingesting high-volume, multi-spectral geostationary satellite telemetry (from ISRO’s INSAT-3D/3DR, Oceansat-3 scatterometer winds, and NOAA GOES datasets) and applying modern deep learning architectures to:
1. Automatically identify Low-Level Circulation Centers (LLCC) and cyclone eyewalls.
2. Automate Dvorak Technique (ADT) intensity classifications (T-Numbers and Central Pressure).
3. Forecast 120-hour track cones and Rapid Intensification (RI) events using Physics-Informed Neural Networks (PINNs) constrained by Navier-Stokes momentum equations.
4. Deliver human-interpretable Explainable AI (Grad-CAM feature attribution) to meteorological officers.
5. Standardize automated multi-tier emergency alerts compliant with India Meteorological Department (IMD) and World Meteorological Organization (WMO) protocols.

The frontend is built to shatter standard academic dashboard tropes. It synthesizes an **ISRO / NASA Mission Control Command Center** with modern high-energy fluid typography, curved transitions, physics-based micro-interactions, WebGL/OGL procedural shaders, and glassmorphism.

---

## 2. Chronological Development Evolution

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       CYTORN DEVELOPMENT TIMELINE                                               │
├─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [Phase 1: Conceptualization & Prototype]                                                                        │
│ • Specification documents authored: COLOR_THEME.md, TEXT_TYPES.md, LANDING_PAGE.md, 3D_HERO_SPECIFICATION.md   │
│ • Vite + React 19 proof-of-concept (`SIH2K26/`) testing Three.js vortex shaders and early layout concepts      │
│                                                                                                                 │
│ [Phase 2: Next.js 16 App Router & Full Architecture Setup]                                                     │
│ • Initialized Next.js 16.3.4 (App Router) with TypeScript 5, React 19.2.8, Tailwind CSS v4, and PostCSS        │
│ • Configured shadcn/ui framework primitives (`components.json`)                                                 │
│                                                                                                                 │
│ [Phase 3: Deep Design System & Typography Engine]                                                               │
│ • Established 60-30-10 Oceanic Cyber Abyss palette and 5 domain-specific sub-palettes                          │
│ • Integrated 15-font catalog with Next.js Google Fonts and local asset loading (`Magilio`, `Azonix`, Orbitron)  │
│                                                                                                                 │
│ [Phase 4: WebGL / OGL Shaders & Canvas FX]                                                                     │
│ • Built full-screen reactive background scanner (`Scanner.tsx`) using OGL WebGL 2.0 shaders                     │
│ • Built procedural liquid text refraction shader (`WarpText.tsx`) and 3D terrain canvas (`GlowingRidges.tsx`)   │
│                                                                                                                 │
│ [Phase 5: High-Precision Hero Section]                                                                          │
│ • Engineered `HeroVideo.tsx` with video loop recovery, intersection observer, and 4 HUD telemetry overlays     │
│ • Created 3D fold typography (`FoldText.tsx`) with animated chromatic gradients and typewriter subtitles       │
│                                                                                                                 │
│ [Phase 6: Advanced Navigation & Pill Button Physics]                                                           │
│ • Designed `GlobalNav.tsx` with high-clarity frosted glass (24px blur, saturated backdrop)                     │
│ • Built circular-geometry GSAP pills: `WarningPill`, `SatellitePill`, `DashboardPill`, and `MenuPill`          │
│ • Implemented GSAP choreographed fullscreen slide-over drawer (`SlideOverMenu.tsx`)                            │
│                                                                                                                 │
│ [Phase 7: Interactive Science & Benchmark Showcase]                                                            │
│ • Built 3D hoverable `TiltedCard` component with Framer Motion spring physics                                  │
│ • Developed 5-Track `FeatureGrid.tsx`, 4-Card `LandingMetrics.tsx` with holographic radar sweeps               │
│ • Implemented curvilinear 4-stage IMD disaster progression timeline (`LandingTimeline.tsx`)                    │
│                                                                                                                 │
│ [Phase 8: Operational Command Center & Mission Modules]                                                         │
│ • Built `/dashboard` with `RealTimeParameters`, `CycloneStatusCard`, `TrendCharts`, and `MapLayerCanvas`       │
│ • Built `/satellite-analyzer` with multi-spectral band switching, Dvorak curves, and Grad-CAM blending          │
│ • Created drag-and-drop raster uploader (`ImageUploader.tsx`) for HDF5, GeoTIFF, and NetCDF formats           │
│                                                                                                                 │
│ [Phase 9: Role-Based Auth & Emergency Footer]                                                                  │
│ • Developed `/login` and `/register` with role selector (Scientist, NDMA, Public) and encrypted auth UI        │
│ • Engineered `GlobalFooter.tsx` with `/footer_video.mp4`, `GlareHover` NDMA 1078 helpline, and partner credits │
│                                                                                                                 │
│ [Phase 10: Mission Control Command Center Overhaul & Emergency Action Dispatch]                                 │
│ • Built `ActionDispatchPanel.tsx` with 4-tier emergency escalation controls & countdown feedback                │
│ • Engineered `CycloneStatusCard.tsx` with moving gradient headings, dual drop-shadows & Dvorak category badges   │
│ • Enhanced `RealTimeParameters.tsx` with high-definition cyan text shadows & balanced metric spacing             │
│                                                                                                                 │
│ [Phase 11: Satellite AI Pattern Studio, Grad-CAM & Scientific Export Hub]                                       │
│ • Built `SatelliteCanvas.tsx` with deep pan/zoom, sub-pixel LLCC crosshairs & RMW ring overlays                  │
│ • Built `GradCamStudio.tsx` with layer opacity blending, Jet/Inferno colormaps & tactile film-grain noise       │
│ • Built `DvorakTelemetryCard.tsx` with specular `ShinyBadge`, moving gradient pattern banner & softmax HUD       │
│ • Engineered `PipelineExportHub.tsx` with 4 downstream actions, aligned to `RUN AI INFERENCE` styling & GSAP    │
│ • Built `RadiometricAdjustmentsModal.tsx` & `RadiometricStrip.tsx` with `ElasticSlider` physics controls        │
│ • Built `ScientificUploadModal.tsx` supporting INSAT-3DR HDF5, GeoTIFF, NetCDF-4, and PNG raster formats        │
│                                                                                                                 │
│ [Phase 12: Interactive Navigation Ecosystem, GSAP Micro-Interactions & Action Cards Alignment]                  │
│ • Built `ScientistProfilePill.tsx` with responsive label roll-up & expanding GSAP circle flood wave             │
│ • Built `AlertsPill.tsx`, `FullscreenButton.tsx`, `LayersButton.tsx`, `MagicRings.tsx`, and `SplitFlapText.tsx` │
│ • Aligned all 4 Pipeline Export action cards to `RUN AI INFERENCE` styling, shadows, and GSAP bubble fill       │
│                                                                                                                 │
│ [Phase 13: Trajectory & Intensity Prediction Center (/forecast), Navbar Overlap Fix & UI Polish]                │
│ • Built complete `/forecast` page (Page 5) with 7-component architecture and 3-mode PINN prediction engine      │
│ • Built `ForecastTopBar.tsx`: Storm selector, 6 horizon tabs, 3 mode toggles, GSAP pill buttons                │
│ • Built `ForecastGisCanvas.tsx`: MapLibre GL geospatial canvas with trajectory cone & ensemble spaghetti        │
│ • Built `LandfallCountdownBanner.tsx`: Live countdown timer, surge/wind readouts & expandable detail section    │
│ • Built `IntensityStudio.tsx`: Recharts ComposedChart dual-axis intensity curves with RI radial gauge           │
│ • Built `NwpComparisonMatrix.tsx`: AI vs ECMWF/IMD-GFS/NCMRWF accuracy table with toggle checkboxes           │
│ • Built `PipelineHandoffExport.tsx`: GeoJSON/Shapefile/CSV exporter + 3 inter-page CTA handoffs                │
│ • Built `LandfallDetailsModal.tsx`: Full coastal diagnostic modal (surge, wind, blocks, evacuation)            │
│ • Built `RiAttributionModal.tsx`: Rapid Intensification SHAP panel with WMO threshold badges                   │
│ • Built `forecastData.ts`: Complete mock data engine (Mocha, Biparjoy) + synthesizeScenarioFromInputs()        │
│ • Built `types.ts`: Domain TypeScript contracts (StormScenario, Waypoint, NwpModelTrack, LandfallInfo, RI)     │
│ • Fixed GlobalNav.tsx: removed 2xl:absolute centering to eliminate navbar overlap on 1536px viewports          │
│ • Updated DashboardPill.tsx: shortened "Landing Page" label to "Landing" for compact navbar footprint          │
│ • Fixed NwpComparisonMatrix.tsx: whitespace-nowrap + inline-flex to prevent badge line-break in narrow panels  │
│ • Generalized export button labels: "Export GeoJSON", "Export Shapefile", "Export CSV"                        │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 2.1 Phase 1: Research, Design Specs & Vite/React Prototype (`SIH2K26`)
Before writing production code, extensive scientific, architectural, and visual documentation was established:
- **`COLOR_THEME.md`**: Formalized the 60-30-10 Golden Ratio distribution, proved why Electric Cyclone Cyan (`#00F2FE`) on Deep Abyss (`#050B14`) was optimal over dangerous red/orange UI chrome, and established the 5 Project Palettes.
- **`TEXT_TYPES.md`**: Created the 15-font catalog and mapped exact fonts, weights, and tracking to every UI element across the application.
- **`3D_HERO_SPECIFICATION.md` & `BACKGROUND_SUG.md`**: Detailed the WebGL Three.js shaders, orbital camera trajectories, Rayleigh atmospheric scattering, and particle curl noise.
- **`PAGES_SPECIFICATION.md` & `LANDING_PAGE.md`**: Defined the 8-page operational flow for the entire SIH proposal.
- **`SIH2K26/`**: Built a lightweight Vite + React prototype testing Three.js vortex animations, raw canvas shaders, and initial CSS token structures.

### 2.2 Phase 2: Next.js 16 App Router & Modern Tooling Migration
The project transitioned from the Vite prototype to a full production architecture:
- Adopted **Next.js 16.3.4 (App Router)** with server and client components (`use client`).
- Upgraded to **React 19.2.8** and **React-DOM 19.2.8**.
- Implemented **Tailwind CSS v4** with `@tailwindcss/postcss`.
- Initialized `components.json` for shadcn/ui component integration.
- Configured TypeScript 5 with strict path aliases (`@/*` pointing to `./src/*`).

### 2.3 Phase 3: Design System Foundation
- Integrated 13 Google Fonts via `next/font/google` and 2 local proprietary fonts (`Magilio` and `Azonix`) via `next/font/local`.
- Created `@theme` modern CSS tokens in `src/app/globals.css` mapping every color, font family, and transition.
- Created `src/lib/theme.ts` for programmatic access to color tokens and IMD 4-stage alert color generators.

### 2.4 Phase 4: WebGL / OGL Shader & Procedural Graphics Engine
- Implemented `src/components/ui/Scanner.tsx`: A full-screen WebGL 2.0 shader running on OGL that provides atmospheric scanning beams, customizable sweep width, wave ripples, and interactive mouse coordinates.
- Implemented `src/components/ui/WarpText.tsx`: A WebGL liquid refraction shader that renders text offscreen and applies fluid cursor displacement.
- Implemented `src/components/ui/GlowingRidges.tsx`: A procedural Three.js shader creating multi-layered topographic ridges.
- Implemented `src/components/ui/Noise.tsx`: A lightweight HTML5 canvas procedural grain filter simulating film texture.

### 2.5 Phase 5: High-Precision Hero Video & Glassmorphic Telemetry HUDs
- Created `src/components/landing/HeroVideo.tsx`: Ingests high-definition satellite loop video `/hero_video.mp4` with zero-latency recovery, autoplay guarantees, and intersection observer pauses when out of viewport.
- Overlayed 4 mission-critical HUD telemetry panels with real-time browser FPS & GPU memory monitors.
- Implemented `FoldText.tsx`: 3D letter origami unfolding with continuous moving chromatic gradients.
- Added `TextType.tsx`: Typewriter subtitle streaming with terminal caret.

### 2.6 Phase 6: Navigation Ecosystem, Pill Mechanics & GSAP Drawer
- Engineered `GlobalNav.tsx` with high-clarity frosted glass (24px blur, saturated backdrop).
- Solved circle-geometry expanding hover animations via GSAP in `WarningPill.tsx`, `SatellitePill.tsx`, `DashboardPill.tsx`, and `MenuPill.tsx`.
- Built `SlideOverMenu.tsx`: A full-screen tactical drawer driven by GSAP timelines with staggered entrance and exit transitions.

### 2.7 Phase 7: Interactive Science Showcase
- Created `TiltedCard.tsx` leveraging Framer Motion spring physics (`damping: 30`, `stiffness: 100`) for 3D card tilt and multi-layer `translateZ` depth.
- Implemented `FeatureGrid.tsx`: Showcasing the 5 core scientific capabilities.
- Implemented `LandingMetrics.tsx`: Incorporating 4 interactive SVG rotating holographic radar sweep gauges.
- Implemented `LandingTimeline.tsx`: Presenting the 4-stage IMD disaster timeline with dynamic watermark numerals that illuminate in stage alert colors on hover.

### 2.8 Phase 8: Operational Command Dashboard & Map Engine Architecture
- Built `src/app/(main)/dashboard/page.tsx`: Real-time weather parameters grid, active cyclone status card (Cyclone REMIGR BOB-02), Recharts temporal projection placeholder, and MapLibre GL + deck.gl canvas container.
- Built `src/app/(main)/satellite-analyzer/page.tsx`: Multi-spectral sensor band toggling (TIR-1, TIR-2, WV, VIS), Dvorak BD enhancement curve, Grad-CAM attention blending slider (0-100%), automated T-number readout, and `ImageUploader.tsx`.

### 2.9 Phase 9: Role-Based Authentication Gateway & Institutional Footer
- Created `src/app/(auth)/login/page.tsx` and `register/page.tsx`: Operational role selectors (Scientist, NDMA, Public), encrypted agency authentication forms, and ambient glow layout.
- Engineered `GlobalFooter.tsx`: Incorporating `/footer_video.mp4`, `GlareHover` NDMA 1078 disaster hotline callout bar, `Dial1078Button`, `EvacuationZonesButton`, `WarpText` platform description, and institutional credits (IMD, ISRO, NOAA, WMO).

### 2.10 Phase 10: Mission Control Command Center Overhaul & Emergency Action Dispatch
- **`ActionDispatchPanel.tsx`**: Engineered a complete operational emergency dispatch panel for meteorological commanding officers. Features 4 tiered action buttons with live status badges, automated dispatch countdown latencies, and critical emergency action triggers (NDMA Red Alert Broadcast, Coastal Evacuation Corridors, Fishermen Offshore Recall, Port Authority Gale Warnings).
- **`CycloneStatusCard.tsx` Upgrade**: Completely refactored the active storm status display with dynamic `heading-moving-gradient` animations flowing across the cyclone name (Blue → Cyan → White → Coral), multi-layered drop shadows (`drop-shadow(0 2px 6px rgba(0,0,0,0.9))` and `drop-shadow(0 4px 14px rgba(0,0,0,0.85))`), live wind speed gauge rings, sub-pixel LLCC coordinate readouts, and responsive Dvorak category badges.
- **`RealTimeParameters.tsx` Visual Elevation**: Transformed the 6 real-time meteorological parameter cards with high-definition cyan typography (`#00F2FE`), multi-layered text shadows (`textShadow: "0 1px 2px #000000, 0 2px 6px rgba(0,0,0,0.95), 0 0 10px rgba(0,0,0,0.9)"`), balanced spacing between values and progress tracks, and deep cyber abyss backgrounds.
- **`TrendCharts.tsx` Real-Time Telemetry**: Deployed interactive Recharts area curves plotting observed vs. predicted pressure drops and sustained wind speeds with custom glassmorphic tooltips.

### 2.11 Phase 11: Satellite AI Pattern Studio, Grad-CAM & Scientific Export Hub
- **`SatelliteCanvas.tsx`**: Developed a high-performance interactive raster viewport with sub-pixel eye centroid tracking crosshairs, radius of maximum winds (RMW) dynamic overlay ring, real-time coordinate picking, zoom/pan controls, and false-color lookup tables.
- **`GradCamStudio.tsx`**: Deployed an Explainable AI studio component rendering ConvNeXt-ViT layer 4 gradient attention maps over satellite imagery with adjustable colormaps (Jet, Inferno, Viridis), blend opacity sliders, prominent cyber borders, and tactile film-grain noise (`Noise.tsx`).
- **`DvorakTelemetryCard.tsx`**: Architected the pattern classification HUD card with specular `ShinyBadge` for category telemetry, animated moving gradient pattern headings, deep void backdrop (`bg-[#070D18]/95`) preventing orange tint bleed, softmax probability distributions, and empirical T-number/CI metrics.
- **`PipelineExportHub.tsx`**: Implemented a scientific export hub with 4 downstream pipeline action cards (Send to Trajectory, Commit to Archive, Export Report PDF, Raw JSON Payload), providing direct links to ensemble track forecasting and IMD advisory bulletin print generators.
- **`RadiometricAdjustmentsModal.tsx` & `RadiometricStrip.tsx`**: Sensor calibration tools with brightness, contrast, gamma, and threshold sliders powered by `ElasticSlider`.
- **`ScientificUploadModal.tsx`**: Multi-format raster ingestion interface supporting INSAT-3DR HDF5, GeoTIFF, NetCDF-4, and PNG satellite feeds.

### 2.12 Phase 12: Interactive Navigation Ecosystem, GSAP Micro-Interactions & Action Cards Alignment
- **`ScientistProfilePill.tsx`**: Built a specialized GSAP capsule pill button in the topbar indicating the logged-in scientist's identity (`Scientist (IMD)` on desktop, `SC` on mobile) with dynamic label roll-up physics, expanding cyan circle fill, and dark cyber text inversion on hover.
- **Micro-Interaction Suite**: Integrated `AlertsPill.tsx` (pulsing alert counter), `FullscreenButton.tsx` (browser Fullscreen API with physics hover), `LayersButton.tsx` (GIS layer drawer trigger), `MagicRings.tsx` (concentric radar rings with pulse animations), and `SplitFlapText.tsx` (mechanical airport departure-board text animations).
- **Export Hub Action Cards Alignment**: Upgraded all 4 action cards in `PipelineExportHub.tsx` to match the exact styling, depth, and interactive GSAP rising bubble hover effect of the **`RUN AI INFERENCE`** button while strictly preserving card shape, padding, two-line layout, and individual color themes (Cyan `#00F2FE`, Emerald `#10E7A2`, Coral `#FF5E36`, Tech Cyan `#00F2FE`).

### 2.13 Phase 13: Trajectory & Intensity Prediction Center (/forecast), Navbar Overlap Fix & UI Polish
- **Complete `/forecast` page (Page 5):** Built the full 7-component Trajectory & Intensity Prediction Center as a production-ready Next.js App Router page. The page infers storm parameters from `/dashboard` and `/satellite-analyzer` via URL query parameters (`?llcc=`, `?vmax=`, `?pc=`, `?storm=`), supporting a seamless operational page-to-page pipeline handoff.
- **`ForecastTopBar.tsx`**: Command bar with storm scenario selector dropdown (Framer Motion animated portal panel), 6 forecast horizon tabs (`+6h` to `+120h`), 3 prediction mode toggles (Deterministic, Ensemble, NWP Benchmark), speed unit toggle (`km/h` ↔ `knots`), and map control toggles (Cone of Uncertainty, Ensemble Spaghetti). All interactive elements use the reusable `useGsapPill` circular-flood-wave hook.
- **`ForecastGisCanvas.tsx`**: MapLibre GL geospatial canvas rendering the AI-predicted storm trajectory, historical past track, 120-hour Cone of Uncertainty (empirical $R(t) = R_0 + \gamma t^{1.15}$), 30-member PINN ensemble spaghetti tracks, and NWP model benchmark tracks — with a floating map-control HUD.
- **`LandfallCountdownBanner.tsx`**: High-urgency coral countdown banner with live IST/UTC landfall timer (`Orbitron 800`), expandable coastal diagnostic section showing projected surge ($3.2\text{m}$), peak winds ($185\text{ km/h}$), affected administrative blocks, and evacuation status. Integrates `InterceptModelPillButton` (GSAP circular expansion) linking to `LandfallDetailsModal`.
- **`IntensityStudio.tsx`**: Dual-axis Recharts `ComposedChart` displaying wind speed (`km/h` or `knots`) and central pressure (`hPa`) across the 120-hour horizon. Embeds an RI radial gauge at $78.4\%$ with a static cyan SVG ring, pulsing "HIGH RISK" badge, and "Danger Trigger: Wind jumps +55 km/h in 24h" annotation in cyan with drop shadow.
- **`NwpComparisonMatrix.tsx`**: Interactive model accuracy comparison table with AI vs. ECMWF, IMD-GFS, NCMRWF. Features `<Noise />` background overlay, orange (`#FF5E36`) column headers with text-shadow, per-row toggle checkboxes, plain-language footer guidance, whitespace-nowrap on all cells, and `min-w-[560px]` to prevent badge line-break.
- **`PipelineHandoffExport.tsx`**: Scientific pipeline hub with 3 downstream inter-page CTAs and 3 multi-format GIS exporters: **Export GeoJSON** (full `FeatureCollection` with track + cone + NWP tracks), **Export Shapefile** (ZIP bundle with README), **Export CSV** (hourly coordinate/wind table). All export buttons use Cyan/Amber/Emerald GSAP rising-bubble pill style.
- **`LandfallDetailsModal.tsx`**: Full-screen coastal diagnostic modal covering target district/state, coordinates, storm surge with uncertainty range, peak winds (dual unit), central pressure, affected block list, and evacuation status badge.
- **`RiAttributionModal.tsx`**: RI SHAP explainability modal with WMO/IMD threshold banner, 4 atmospheric driver cards (SST, VWS, OHC, Divergence), and SHAP feature importance bar chart.
- **`forecastData.ts`**: Static mock data engine for `CYCLONE_MOCHA` and `CYCLONE_BIPARJOY` with full past/forecast track waypoints, 30 ensemble member paths, NWP benchmark tracks, landfall info, and `synthesizeScenarioFromInputs()` override function.
- **`types.ts`**: Domain TypeScript contracts — `ForecastHorizon`, `ForecastMode`, `SpeedUnit`, `Waypoint`, `EnsembleMember`, `NwpModelTrack`, `LandfallInfo`, `RapidIntensificationData`, `StormScenario`.
- **GlobalNav Overlap Fix (`GlobalNav.tsx`)**: Removed `2xl:absolute 2xl:left-1/2 2xl:top-1/2 2xl:-translate-x-1/2 2xl:-translate-y-1/2` from the center nav container. At 1536px viewports (1080p / 125% DPI), absolute positioning caused the DashboardPill to collide with the right clock section. Replaced with `flex-1 min-w-0 px-2` for disjoint flex-flow positioning.
- **DashboardPill Label Shrink (`DashboardPill.tsx`)**: Shortened `targetLabel` from `"Landing Page"` to `"Landing"` for a more compact navbar footprint.
- **NwpComparisonMatrix Badge Fix**: Added `whitespace-nowrap` and `inline-flex items-center justify-center` to all error cells and the AI badge span, plus `min-w-[560px]` on the table, to prevent `38 km` from line-breaking in narrow panels.
- **Export Button Label Generalization (`PipelineHandoffExport.tsx`)**: Replaced `GeoJSON (.geojson)`, `ESRI Shapefile (.zip)`, and `CSV Table (.csv)` with clean action-oriented generic labels: `Export GeoJSON`, `Export Shapefile`, `Export CSV`.

---

## 3. Technology Stack & Dependency Inventory

The application is built on modern frontend engineering tools:

| Layer / Domain | Technology / Library | Version | Role in CYTORN |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `16.3.4` | Server/Client hybrid rendering, file-based routing, font optimization, SEO |
| **UI Runtime** | React & React-DOM | `19.2.8` | Component lifecycle, concurrent rendering, modern hooks |
| **Language** | TypeScript | `^5.0.0` | Strict static typing for meteorological models, coordinates, and stores |
| **Styling Engine** | Tailwind CSS (v4) | `^4.0.0` | Utility-first styling with `@theme` tokens and zero CSS bloat |
| **CSS Post-Processing**| `@tailwindcss/postcss` | `^4.0.0` | PostCSS plugin bundle for Next.js and Tailwind v4 compilation |
| **Animation Physics** | Framer Motion | `^13.2.0` | Spring physics, 3D card tilts (`TiltedCard`), continuous shine sweeps |
| **Timeline Choreography** | GSAP (GreenSock) | `^3.15.0` | Complex multi-stage entrance/exit timelines, expanding pill hover circles |
| **3D & WebGL Shaders**| Three.js | `^0.186.0` | Procedural WebGL rendering, atmospheric Rayleigh scattering, 3D vortex |
| **React 3D Bridge** | `@react-three/fiber` & `drei` | `^9.7.0` / `^10.7.8` | Declarative Three.js components and canvas management |
| **Lightweight WebGL** | OGL | `^1.0.11` | High-performance WebGL 2.0 shader pipeline for `Scanner.tsx` and `WarpText.tsx` |
| **Geospatial Mapping** | MapLibre GL & React Map GL | `^6.9.0` / `^8.1.3` | Vector tile base maps, coordinate projections, satellite raster tile layers |
| **Data Visualization** | Deck.gl | `^9.4.0` | High-volume GPU data visualization (wind streamlines, trajectory uncertainty cones) |
| **Data Charting** | Recharts | `^3.10.1` | Intensity curves ($V_{max}$, $P_c$), pressure drop trends, NWP model comparisons |
| **Iconography** | Lucide React | `^1.43.0` | Clean, crisp, aerospace-grade SVG icon system |
| **Global State** | Zustand | `^5.0.15` | Lightweight, decoupled global reactive stores for storm, dashboard, and auth state |
| **Class Utilities** | `clsx` & `tailwind-merge` | `^2.1.1` / `^3.6.0` | Safe conditional class names merging without specificity conflicts |

---

## 4. Design System & Visual Identity Architecture

### 4.1 The 60-30-10 Golden Ratio Color Balance

To ensure optimal operational safety and prevent visual fatigue during prolonged 24/7 monitoring sessions, CYTORN follows a strict **60-30-10** color distribution:

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 THE 60-30-10 COLOR DISTRIBUTION                                 │
├──────────────────────────────────────┬────────────────────────────┬─────────────────────────────┤
│ 60% DOMINANT BASE                    │ 30% STRUCTURAL / TELEMETRY │ 10% CRITICAL HAZARD BEACON  │
│ #050B14 [Deep Abyss Navy]            │ #00F2FE [Cyclone Cyan]     │ #FF5E36 / #DC2626 [Coral]   │
│ Minimizes eye strain; maximum        │ Powers visual hierarchy,   │ Strictly reserved for       │
│ contrast for multi-spectral overlays │ AI vectors, active pills   │ eyewalls, landfall alerts   │
└──────────────────────────────────────┴────────────────────────────┴─────────────────────────────┘
```

**Why Electric Cyclone Cyan (`#00F2FE`) is the Primary Signature Color:**
1. **Semantic Safety:** In meteorology, red and orange are strictly reserved for severe warnings and landfall emergencies; green denotes safe conditions. Cyan is semantically neutral to hazard alerts.
2. **Optical Contrast on Satellite Channels:** Satellite imagery consists of white clouds (VIS), grayscale/rainbow fields (TIR-1), and blue-gray moisture fields (WV). Electric Cyan maintains 100% luminance contrast across all three channels.
3. **ISRO / NASA Aesthetic:** Instant cognitive association with space-based telemetry, radar scanning, and neural network computing.

---

### 4.2 The 5 Dedicated Color Palettes

Defined in `src/lib/theme.ts` and configured across CSS tokens:

```typescript
export const PALETTES = {
  // 🌌 Palette 1: Oceanic Cyber Abyss (Master Command Theme)
  abyss: {
    base: "#050B14",
    surface: "#0F1B2F",
    elevated: "#16253D",
    border: "#1E3252",
    cyan: "#00F2FE",
    coral: "#FF5E36",
    mint: "#10E7A2",
    textPrimary: "#FFFFFF",
    textMuted: "#8E9EB5",
  },

  // 🛰️ Palette 2: Multi-Spectral Thermal IR (Remote Sensing & Pattern Studio)
  thermalIR: {
    deepVoid: "#0B0E17",
    coldSlate: "#1C2237",
    atmosphericCyan: "#22D3EE",
    eyewallMagenta: "#D946EF",
    coreRed: "#EF4444",
  },

  // 🏛️ Palette 3: Institutional Oceanic Precision (Gov Reports & Light Mode)
  institutional: {
    pristineMist: "#F8FAFC",
    pureWhite: "#FFFFFF",
    maritimeNavy: "#0A2540",
    pacificAzure: "#0284C7",
    hazardAmber: "#EA580C",
  },

  // ⚠️ Palette 4: WMO / IMD 4-Stage Alert Ecosystem (Early Warning Hub)
  imdAlerts: {
    charcoalBase: "#0F141C",
    stage1Watch: "#10B981",    // 72h Advisory (Green)
    stage2Alert: "#F59E0B",    // 48h Precautionary (Amber)
    stage3Warning: "#F97316",  // 24h Threat Action (Orange)
    stage4Landfall: "#DC2626", // <12h Evacuation/Emergency (Red)
  },

  // 🧠 Palette 5: Neural AI Fusion (Explainable AI & ViT Models)
  neuralAI: {
    void: "#070A12",
    surface: "#13192B",
    attentionIndigo: "#6366F1",
    detectionMint: "#00FFA3",
    divergenceRose: "#FB7185",
  },
} as const;
```

---

### 4.3 Master 15-Font Catalog & 5 Typography Systems

Loaded in `src/app/layout.tsx` and styled across `globals.css`:

| Font Family | Source | Weights | Visual Character & Exact Role in CYTORN |
| :--- | :--- | :--- | :--- |
| **Orbitron** | Google Fonts | 700, 800, 900 | Hero brand title ("CYTORN"), primary orbital radar headings |
| **Rajdhani** | Google Fonts | 500, 600, 700 | HUD section labels, metric badges, pill button uppercase labels |
| **Outfit** | Google Fonts | 600, 700, 800 | Modern AI studio headings, feature card titles |
| **Plus Jakarta Sans** | Google Fonts | 400, 500, 600 | Master application UI body font, descriptions, navbar links |
| **JetBrains Mono** | Google Fonts | 500, 700 | Numerical telemetry ($km/h$, $hPa$, coordinates, timers) with `tnum` |
| **Space Grotesk** | Google Fonts | 600, 700 | Scientific module headers, XAI studio sections |
| **Inter** | Google Fonts | 400, 500, 600 | High-density data tables, benchmark verification sheets |
| **Chakra Petch** | Google Fonts | 600, 700 | Tactical IMD Stage 1-4 emergency alert banners |
| **Exo 2** | Google Fonts | 500, 700 | Evacuation text, high-urgency disaster summaries |
| **Share Tech Mono** | Google Fonts | 400 | CAP XML warning codes, geo-fenced alert IDs |
| **Syne** | Google Fonts | 700, 800 | High-impact keynote & presentation titles |
| **Unbounded** | Google Fonts | 600, 700, 800, 900 | Cyber display titles, punchy numerical stats |
| **DM Sans** | Google Fonts | 400, 500 | Secondary clean technical body copy |
| **Magilio** | Local Font (`src/fonts/`) | 400 | Chic, high-contrast display serif used in 3D fold hero title |
| **Azonix** | Local Font (`src/fonts/`) | Regular | Crossbar-less geometric futuristic sans for "TROPICAL CYCLONE" hero |

#### The 5 Systematic Typography Systems:
- **System 1: Aerospace Mission Control** (`Orbitron` + `Rajdhani` + `JetBrains Mono` with `tnum` enabled)
- **System 2: Modern Cyber-AI SaaS** (`Outfit` + `Plus Jakarta Sans` + `JetBrains Mono`)
- **System 3: Deep Space & Scientific Research** (`Space Grotesk` + `Inter` + `JetBrains Mono`)
- **System 4: Tactical Early Warning** (`Chakra Petch` + `Exo 2` + `Share Tech Mono`)
- **System 5: Minimalist High-Concept Futuristic** (`Syne` + `DM Sans` + `JetBrains Mono`)

---

### 4.4 Tailwind CSS v4 Modern Token Integration

In `src/app/globals.css`, Tailwind CSS v4 `@theme` directives bind all font and color tokens:

```css
@theme {
  --font-orbitron: 'Orbitron', var(--font-orbitron), -apple-system, sans-serif;
  --font-rajdhani: var(--font-rajdhani), -apple-system, sans-serif;
  --font-outfit: var(--font-outfit), -apple-system, sans-serif;
  --font-jakarta: var(--font-jakarta), -apple-system, sans-serif;
  --font-jetbrains: var(--font-jetbrains), ui-monospace, monospace;
  --font-space: var(--font-space), -apple-system, sans-serif;
  --font-inter: var(--font-inter), -apple-system, sans-serif;
  --font-chakra: var(--font-chakra), -apple-system, sans-serif;
  --font-share-mono: var(--font-share-mono), ui-monospace, monospace;
  --font-magilio: var(--font-magilio), 'Magilio', Georgia, serif;
  --font-azonix: var(--font-azonix), 'Azonix', sans-serif;

  --color-canvas-primary: #050B14;
  --color-canvas-surface: #0F1B2F;
  --color-brand: #00F2FE;
  --color-critical: #FF5E36;
  
  --color-alert-stage-1-watch: #10B981;
  --color-alert-stage-2-alert: #F59E0B;
  --color-alert-stage-3-warning: #F97316;
  --color-alert-stage-4-landfall: #DC2626;
}
```

---

## 5. Complete Source Directory & File Breakdown

Below is the exhaustive map of every single source file created and implemented in the repository:

```
d:/SIH 2026/
├── .agents/                                    # Workflow rules & guidelines
│   ├── rules/
│   │   ├── colourtheme.md                      # Rule: Enforce COLOR_THEME.md
│   │   ├── textstyle.md                        # Rule: Enforce TEXT_TYPES.md
│   │   ├── text_types.md                       # Typography enforcement rules
│   │   └── uitheme.md                          # Rule: Enforce LANDING_PAGE_DESIGN
│   └── workflows/
│       ├── designingui.md                      # UI design process guidelines
│       ├── textwork.md                         # Typography editing workflow
│       └── uitheme.md                          # Theme decision workflow
├── public/                                     # Public static assets
│   ├── fonts/                                  # Public-served font assets
│   │   ├── Azonix.otf
│   │   ├── Magilio-Slant.ttf
│   │   ├── Magilio.otf
│   │   ├── Magilio.ttf
│   │   ├── Magilio.woff2
│   │   └── Orbitron.ttf
│   ├── cyclo_logo.svg                          # Vector brand insignia
│   ├── hero_video.mp4                          # High-res satellite cyclone loop for Hero
│   └── footer_video.mp4                        # Ambient satellite radar loop for Footer
├── src/
│   ├── app/                                    # Next.js 16 App Router pages & layouts
│   │   ├── (auth)/                             # Authentication route group
│   │   │   ├── layout.tsx                      # Atmospheric centered layout with cyber glow
│   │   │   ├── login/page.tsx                  # Role-based login (Scientist, NDMA, Public)
│   │   │   └── register/page.tsx               # Agency verification request form
│   │   ├── (main)/                             # Operational Command route group
│   │   │   ├── layout.tsx                      # Topbar + AppSidebar persistent layout
│   │   │   ├── dashboard/page.tsx              # Geospatial Command Center page
│   │   │   ├── forecast/page.tsx               # Trajectory & Intensity Prediction Center (NEW)
│   │   │   └── satellite-analyzer/page.tsx     # Multi-Spectral AI Pattern Studio page
│   │   ├── favicon.ico
│   │   ├── globals.css                         # Tailwind v4 theme, animations & utility classes
│   │   ├── layout.tsx                          # Root layout with 15 fonts & Scanner background
│   │   └── page.tsx                            # Primary public Landing Page
│   ├── components/
│   │   ├── analyzer/
│   │   │   ├── DvorakTelemetryCard.tsx         # Dvorak pattern HUD with ShinyBadge, softmax & moving gradient
│   │   │   ├── GradCamStudio.tsx               # Explainable AI Grad-CAM studio with colormaps & Noise overlay
│   │   │   ├── ImageUploader.tsx               # Drag-and-drop HDF5/GeoTIFF raster uploader
│   │   │   ├── InferenceHub.tsx                # Multi-model inference orchestrator with GSAP RunInferenceButton
│   │   │   ├── PipelineExportHub.tsx           # Downstream scientific export hub with 4 GSAP rising bubble cards
│   │   │   ├── RadiometricAdjustmentsModal.tsx # Full-screen sensor radiometric adjustment modal
│   │   │   ├── RadiometricStrip.tsx            # Quick radiometric calibration strip
│   │   │   ├── SatelliteCanvas.tsx             # Interactive deep-zoom raster canvas with sub-pixel LLCC & RMW ring
│   │   │   └── ScientificUploadModal.tsx       # Multi-format satellite raster ingestion modal
│   │   ├── dashboard/
│   │   │   ├── ActionDispatchPanel.tsx         # 4-Tier emergency action dispatch panel & alert triggers
│   │   │   ├── CycloneStatusCard.tsx           # Active storm status with moving gradient title & Dvorak badge
│   │   │   ├── RealTimeParameters.tsx          # 6-card meteorological matrix with cyan text shadows
│   │   │   ├── SatelliteMapView.tsx            # Geospatial satellite preview card
│   │   │   └── TrendCharts.tsx                 # Temporal projection area chart container
│   │   ├── landing/
│   │   │   ├── CurvedWaveSeparator.tsx         # Quadratic bezier wave divider
│   │   │   ├── FeatureGrid.tsx                 # 5 Core scientific capability cards (TiltedCard)
│   │   │   ├── HeroCanvas.tsx                  # WebGL 3D interactive procedural cyclone vortex
│   │   │   ├── HeroVideo.tsx                   # Video hero with 4 HUD overlays & FoldText
│   │   │   ├── LandingMetrics.tsx              # 4 Benchmark telemetry cards with radar sweeps
│   │   │   ├── LandingTimeline.tsx             # 4-Stage IMD cyclone disaster lifecycle timeline
│   │   │   ├── SlideOverMenu.tsx               # GSAP full-screen tactical drawer menu
│   │   │   └── StormTicker.tsx                 # Continuous animated storm marquee (LogoLoop)
│   │   ├── layout/
│   │   │   ├── AppSidebar.tsx                  # Operational sidebar with active route detection
│   │   │   ├── GlobalFooter.tsx                # Video footer with NDMA 1078 helpline callout
│   │   │   ├── GlobalNav.tsx                   # Fixed glassmorphic navigation bar
│   │   │   ├── SidebarNavigation.tsx           # Compact navigation links
│   │   │   ├── Topbar.tsx                      # Command header with UTC/IST clocks & sync HUD
│   │   │   └── TopHeader.tsx                   # Alternate minimal header
│   │   ├── map/
│   │   │   └── MapLayerCanvas.tsx              # MapLibre GL + deck.gl GIS canvas container
│   │   ├── xai/
│   │   │   ├── XaiAssistantPanel.tsx           # Interactive Cyclone AI Assistant & XAI reasoning panel
│   │   │   └── XaiFloatingWidget.tsx           # Reusable floating tactical pill widget & drawer modal
│   │   └── ui/                                 # Custom primitive design system components
│   │       ├── AlertBadge.tsx                  # Domain-specific badge (Warning, AI, Watch)
│   │       ├── AlertsPill.tsx                  # Tactical alerts pill with pulsing emergency beacon
│   │       ├── Badge.tsx                       # Standard semantic badge
│   │       ├── Button.tsx                      # Primary, secondary, danger, ghost buttons
│   │       ├── Card.tsx                        # Glassmorphic & outlined card wrapper
│   │       ├── DashboardPill.tsx               # Launch Dashboard pill with GSAP circular hover (updated: label shortened to "Landing")
│   │       ├── Dial1078Button.tsx              # NDMA emergency dialer button
│   │       ├── ElasticSlider.tsx & .css        # Spring-physics slider controls for radiometric thresholds
│   │       ├── EvacuationZonesButton.tsx       # Evacuation corridor routing trigger
│   │       ├── FoldText.tsx & FoldText.css     # 3D letter origami unfolding animation (GSAP)
│   │       ├── FullscreenButton.tsx            # Browser Fullscreen API trigger with physics hover
│   │       ├── GlareHover.tsx & GlareHover.css # Interactive specular light glare effect
│   │       ├── GlowingRidges.tsx               # Three.js procedural topographic terrain shader
│   │       ├── GradientText.tsx & .css         # Animated flowing linear text gradient
│   │       ├── LayersButton.tsx                # Tactical GIS layer drawer toggle button
│   │       ├── LogoLoop.tsx & LogoLoop.css     # Smooth infinite marquee scrolling track
│   │       ├── MagicRings.tsx & MagicRings.css # Concentric rotating radar telemetry rings
│   │       ├── MenuPill.tsx                    # Tactical drawer trigger button
│   │       ├── Noise.tsx & Noise.css           # Procedural fractal noise film grain canvas
│   │       ├── PillNav.tsx & PillNav.css       # Complete pill navigation styles & math rules
│   │       ├── PixelCard.tsx & .css            # React Bits interactive canvas pixel shimmer card/modal
│   │       ├── PixelTransition.tsx & .css      # React Bits randomized GSAP pixel grid dissolve
│   │       ├── ReflectiveCard.tsx & .css       # React Bits liquid metallic displacement & sheen card/pill
│   │       ├── SatellitePill.tsx               # Analyze Satellite Feed pill button
│   │       ├── Scanner.tsx & Scanner.css       # Full-screen WebGL 2.0 OGL atmospheric shader
│   │       ├── ScientistProfilePill.tsx        # IMD Scientist operational profile capsule pill with GSAP wave
│   │       ├── ShinyBadge.tsx                  # Specular border & surface sweep pill badge
│   │       ├── ShinyText.tsx & ShinyText.css   # Continuous text specular highlight sweep
│   │       ├── SplitFlapText.tsx & .css        # Mechanical airport departure-board text animations
│   │       ├── TextType.tsx & TextType.css     # Dynamic typewriter text streaming effect
│   │       ├── TiltedCard.tsx & TiltedCard.css # 3D mouse perspective tilt card (Framer Motion)
│   │       ├── WarningPill.tsx                 # Pulsing red emergency alert beacon pill
│   │       └── WarpText.tsx & WarpText.css     # WebGL liquid text refraction & ripples (OGL)
│   ├── fonts/                                  # Local font assets
│   │   ├── Azonix.otf
│   │   ├── Magilio.otf
│   │   ├── Magilio.ttf
│   │   ├── Magilio.woff2
│   │   ├── Magilio-Slant.ttf
│   │   └── Orbitron.ttf
│   ├── lib/
│   │   ├── api.ts                              # Typed fetch client for FastAPI backend
│   │   ├── theme.ts                            # 5-palette color engine & IMD stage helper
│   │   └── utils.ts                            # Tailwind merge & clsx utility (`cn`)
│   ├── store/                                  # Zustand global reactive stores
│   │   ├── useAuthStore.ts                     # User session & role state
│   │   ├── useCycloneStore.ts                  # Active storm, basin, and playback time scrubber
│   │   └── useDashboardStore.ts                # Satellite layers, visibility, opacity, playback
│   └── types/
│       ├── cyclone.ts                          # Comprehensive cyclone domain types
│       └── index.ts                            # Exported session, layer, and storm interfaces
├── components.json                             # shadcn/ui configuration
├── LANDING_PAGE_DESIGN_SPEC.md                 # Complete landing page design specification
├── package.json                                # Project dependencies & npm scripts
├── TEXT_TYPES.md                               # Complete typography specification
└── tsconfig.json                               # TypeScript configuration
```

---

## 6. Component-by-Component Deep Dive

### 6.1 Core Landing Components (`src/components/landing/`)

#### 1. `HeroVideo.tsx`
- **Purpose:** Full-bleed hero banner utilizing `/hero_video.mp4` as a dynamic background with dark opacity vignettes (`bg-[#050B14]/30` and bottom gradient) to ensure contrast.
- **Looping & Viewport Optimization:** Uses an `IntersectionObserver` to automatically pause playback when the hero scrolls out of view, and explicitly guarantees `muted`, `defaultMuted`, `stalled`, and `ended` event listeners to prevent browser video freezes.
- **4 Absolute Glassmorphic HUD Overlays:**
  1. *Top-Left Feed Badge:* Displays active sensor `INSAT-3DR TIR-1 10.8µm`, latency `12s`, and pulsing emerald beacon.
  2. *Top-Right Performance Monitor:* Live reactive telemetry displaying simulated framerate (`59-61 FPS`) and GPU Memory usage (`140-145 MB`) using tabular digits (`[font-feature-settings:'tnum'_on]`).
  3. *Bottom-Left Telemetry Box:* Displays active Category 3 storm *Cyclone Mocha*, minimum pressure ($942\text{ hPa}$), and peak sustained wind ($185\text{ km/h}$).
  4. *Bottom-Right Shader HUD:* Identifies active shader pipeline `Sub-Kilometer LLCC Data Fusion`.
- **3D Animated Headline:** Integrates `FoldText` to animate the primary mission title across responsive breakpoints with staggered letter hinge rotations and continuous chromatic gradients.
- **Sub-Hero Typewriter:** Renders the platform value proposition using `TextType` with a blinking cyan cursor (`|`).

#### 2. `StormTicker.tsx`
- **Purpose:** Persistent live telemetry marquee displaying active cyclones, depressions, and sensor statuses.
- **Implementation:** Integrates `LogoLoop` with smooth continuous leftward velocity (`speed={80}`), slowing down to `hoverSpeed={18}` on mouse enter.
- **Track Items:** Highlights *Cyclone MOCHA* (Cat 3, $185\text{ km/h}$, $942\text{ hPa}$ in Solar Coral), *Deep Depression ARB-01* ($55\text{ km/h}$, $998\text{ hPa}$), *Invest 92B* ($35\text{ km/h}$, $1004\text{ hPa}$), *INSAT-3DR Rapid Scan Active* ($15\text{m}$ cycle), and *Severe Storm BIPARJOY* ($165\text{ km/h}$, $958\text{ hPa}$).

#### 3. `FeatureGrid.tsx`
- **Purpose:** Highlights the 5 core scientific capabilities of the platform across a responsive 5-column grid.
- **Interactive Mechanics:** Each feature is encapsulated in a `TiltedCard` with 3D perspective tilt (`rotateAmplitude={12}`, `scaleOnHover={1.055}`).
- **The 5 Pillars:**
  1. *Track 01:* Multi-Source Satellite Fusion (INSAT-3D/3DR, Oceansat-3, MOSDAC API).
  2. *Track 02:* Deep Learning Pattern Studio (Automated Dvorak, ResNet-50, YOLOv8-Eye).
  3. *Track 03:* Physics-Informed Forecasting (Navier-Stokes PINNs, 120h Track Cone).
  4. *Track 04:* Explainable AI / Grad-CAM (Eye Convection Heatmaps, Attention Weights).
  5. *Track 05:* Multi-Tier Warning Hub (IMD 4-Stage Protocol, CAP XML, Evacuation Corridors).

#### 4. `LandingMetrics.tsx`
- **Purpose:** Validates operational accuracy and scale through 4 interactive benchmark telemetry cards.
- **Holographic Radar Gauges:** Each card features a rotating SVG radar sweep gauge (`dur="4s"` infinite rotation) that illuminates on hover (`group-hover:opacity-40`), complete with concentric range rings, crosshairs, and a 45-degree trailing sweep sector.
- **Benchmarks Displayed:**
  - `96.4%`: AI Track Accuracy ($<48\text{ km}$ mean cross-track error).
  - `24H`: Rapid Intensification Early Detection Window.
  - `4 Tiers`: Standardized IMD / WMO Warning Protocol.
  - `0.08°`: Center-Fix Precision (sub-kilometer LLCC resolution).

#### 5. `LandingTimeline.tsx`
- **Purpose:** Represents the lifecycle of a tropical cyclone along the 4 official IMD warning stages.
- **Curvilinear Serpentine Layout:** Connected by a continuous horizontal gradient line on desktop (`from-[#10B981] via-[#F59E0B] to-[#DC2626]`).
- **Watermark Step Numerals:** Oversized background numbers (`1`, `2`, `3`, `4` in font-rajdhani) that transition from neutral faint opacity (`text-white/[0.04]`) into glowing alert colors on hover.
- **Milestones:**
  - *Stage 1 (T-72h):* Pre-Cyclone Watch — Low Pressure Genesis ($45\text{ km/h}$, $1002\text{ hPa}$).
  - *Stage 2 (T-48h):* Cyclone Alert — Vortex & Curved Band Formation ($85\text{ km/h}$, $990\text{ hPa}$).
  - *Stage 3 (T-24h):* Cyclone Warning — Rapid Intensification & Eyewall ($140\text{ km/h}$, $964\text{ hPa}$).
  - *Stage 4 (T-0h):* Landfall Red Alert — Coastline Impact & Storm Surge ($185\text{ km/h}$, $942\text{ hPa}$).

#### 6. `SlideOverMenu.tsx`
- **Purpose:** Full-screen tactical mission drawer providing direct navigation to all 6 platform modules.
- **GSAP Orchestration:**
  - Entrance: Container scales from `1.02` to `1.0` and fades in (`duration: 0.4s`); top bar drops from $y = -25\text{px}$; navigation items slide up from $y = 35\text{px}$ with a `0.05s` stagger.
  - Exit: Items slide up smoothly, top bar exits, and container fades out before unmounting.
- **Links:** `01 / Live Command GIS`, `02 / AI Satellite Studio`, `03 / 120h Trajectory Prediction`, `04 / Disaster Warning Hub`, `05 / Model Performance Lab`, `06 / Developer & API Hub`.

#### 7. `HeroCanvas.tsx`
- **Purpose:** Interactive procedural 3D cyclone vortex simulation developed as an alternate canvas mode.
- **Interactive Eyewall Hotspot:** Includes a pulsating circular marker at the center. Clicking the marker opens an interactive modal revealing exact LLCC coordinates ($16.2^\circ\text{N}, 88.4^\circ\text{E}$), eye diameter ($28\text{ km}$), brightness temperature ($-74.2^\circ\text{C}$), and Automated Dvorak score (T-5.5).

---

### 6.2 Interactive Custom UI Primitives (`src/components/ui/`)

| Component | File Path | Technical Mechanics & Mathematical Logic |
| :--- | :--- | :--- |
| **`WarningPill`** | `WarningPill.tsx` | Geometric circle radius calculation $R = \frac{(w^2/4 + h^2)}{2h}$ via GSAP; expanding red circle hover mask; pulsating red alert beacon. |
| **`SatellitePill`** | `SatellitePill.tsx` | Dual label-stack vertical translation on hover ($y = 0 \to -(h+8)$ and $y = h+12 \to 0$); expanding cyan hover circle. |
| **`DashboardPill`** | `DashboardPill.tsx` | Electric cyan frosted capsule pill with high-contrast text transition and GSAP circle expansion. |
| **`MenuPill`** | `MenuPill.tsx` | 38x38px square capsule button with rounded corners and circular hover expansion opening `SlideOverMenu`. |
| **`FoldText`** | `FoldText.tsx` & `.css`| 3D origami letter-unfolding animation using GSAP. Supports hinge directions (`top`, `bottom`), 3D perspective ($550\text{px}$), crease shading ($0.45$), letter stagger ($0.03\text{s}$), and continuous linear gradient animation. |
| **`Scanner`** | `Scanner.tsx` & `.css` | Fullscreen WebGL 2.0 shader using OGL. Compiles `#version 300 es` GLSL shaders; calculates vertical sweep falloff, wave ripples, scanlines, and mouse repulsion coordinates. |
| **`WarpText`** | `WarpText.tsx` & `.css`| WebGL liquid glass text displacement shader using OGL. Renders text to an offscreen canvas texture, then applies liquid refraction, ripples, and pointer influence. |
| **`TiltedCard`** | `TiltedCard.tsx` & `.css`| 3D card tilt driven by Framer Motion springs (`damping: 30`, `stiffness: 100`, `mass: 2`). Normalizes mouse $(x, y)$ coordinates to calculate dynamic `rotateX` and `rotateY`. |
| **`LogoLoop`** | `LogoLoop.tsx` & `.css` | High-performance horizontal marquee with seamless cloned loop, configurable gap, and automatic speed reduction on mouse hover. |
| **`ShinyBadge`** | `ShinyBadge.tsx` | Continuous specular highlight sweep traversing the border and surface using Framer Motion `useAnimationFrame` and linear interpolation. |
| **`TextType`** | `TextType.tsx` & `.css` | Typewriter text streaming with variable speed simulation, blinking cursor, and loop controls. |
| **`GlareHover`** | `GlareHover.tsx` & `.css`| Realistic specular light glare effect traversing cards at a custom angle ($-30^\circ$) on mouse hover. |
| **`GlowingRidges`** | `GlowingRidges.tsx` | Procedural Three.js WebGL canvas rendering multi-frequency noise ridges with exposure and gain uniforms. |
| **`Noise`** | `Noise.tsx` & `.css` | Procedural fractal noise film grain generated dynamically on an HTML5 canvas. |
| **`PixelCard`** | `PixelCard.tsx` & `.css` | Open-source interactive canvas pixel shimmer card component from React Bits. Generates animated particle pixels on an HTML5 canvas responding to hover and focus with radial gradient glow. Configured for both standard cards and tactical AI chat modals (`pixel-card-modal`). |
| **`PixelTransition`** | `PixelTransition.tsx` & `.css` | Open-source randomized pixel grid dissolve transition from React Bits powered by GSAP. Generates an $N \times N$ matrix of animated pixel blocks with staggered random reveal/hide tween sequences. Configured for both content cards and interactive tactical pill buttons (`pixel-pill-button`). |
| **`ReflectiveCard`** | `ReflectiveCard.tsx` & `.css` | Open-source liquid metallic displacement shader component from React Bits. Uses dynamic SVG filter chain (`feTurbulence`, `feDisplacementMap`, `feSpecularLighting`, `feComponentTransfer`), live webcam feed or loop video reflection, fractal noise texture, and metallic sheen. Supports both standard card (`variant="card"`) and capsule button (`variant="pill"`) configurations. |
| **`ScientistProfilePill`** | `ScientistProfilePill.tsx` | Operational profile capsule pill indicating IMD scientist credentials (`Scientist (IMD)` on desktop, `SC` on mobile). Uses circular GSAP flood expansion ($R, D, \text{originY}$), dual label-stack roll-up translation, and high-contrast dark cyber typography inversion on hover. |
| **`AlertsPill`** | `AlertsPill.tsx` | Tactical warning pill displaying active emergency alert counts with a pulsing beacon dot, cyber cyan borders, and smooth GSAP hover interactions. |
| **`ElasticSlider`** | `ElasticSlider.tsx` & `.css` | Spring-physics slider control for real-time radiometric calibration (contrast, gamma, threshold). Uses damped harmonic oscillator curves for fluid thumb movement and tactical HUD value callouts. |
| **`FullscreenButton`** | `FullscreenButton.tsx` | Browser Fullscreen API toggle with physics-based scaling, cyber glassmorphism, multi-layer drop shadows, and tooltip indicators. |
| **`LayersButton`** | `LayersButton.tsx` | Tactical GIS layer drawer trigger button with backdrop blur, cyan glow, and active state indicators. |
| **`MagicRings`** | `MagicRings.tsx` & `.css` | Multi-ring concentric rotating radar and telemetry rings with pulse animations, range ticks, and orbital satellite coordinate marks. |
| **`SplitFlapText`** | `SplitFlapText.tsx` & `.css` | Mechanical airport departure-board character cycling effect for telemetry and storm name reveals with 3D flip card perspectives. |
| **`AlertBadge`** | `AlertBadge.tsx` | Semantic status badge mapping IMD Warning tiers (`stage-1` to `stage-4`), AI confidence, and hazard levels. |
| **`Button`** | `Button.tsx` | Configurable button primitive (`primary`, `secondary`, `danger`, `ghost`, `glass`) with loading spinners. |
| **`Card`** | `Card.tsx` | Glassmorphic card container with `backdrop-blur-xl`, border tokens, and elevation levels. |

---

### 6.3 Operational Layout Components (`src/components/layout/`)

#### `GlobalNav.tsx`
- **Positioning:** Fixed top navigation (`z-50`, height $64\text{px}-80\text{px}$).
- **Glassmorphism:** High-clarity frosted glass overlay (`linear-gradient(180deg, rgba(224, 252, 255, 0.22) 0%, rgba(0, 242, 254, 0.10) 100%)`, `backdrop-filter: blur(24px) saturate(200%)`).
- **Brand Identity:** CYTORN logomark with spinning satellite icon and "Deep-Tech Climate OS" subtitle.
- **Center Capsule Cluster:** Houses `WarningPill`, `SatellitePill`, and `DashboardPill`.
- **Right Control:** Houses `MenuPill` triggering the tactical slide-over drawer.

#### `GlobalFooter.tsx`
- **Background Satellite Video:** Background video loop `/footer_video.mp4` with contrast overlays.
- **NDMA 1078 Helpline Callout:** Wrapped in `GlareHover` with glowing coral accents, providing instant access to `Dial1078Button` and `EvacuationZonesButton`.
- **Liquid Platform Summary:** Features `WarpText` rendering the platform description with interactive cursor liquid ripples.
- **Navigation Columns & Metadata Bar:** Categorized into Mission Modules, Developer Hub, Institutional Partners, and a left-aligned bottom metadata bar housing the copyright, `View Repository` (GitHub), and `Settings` links clear of the floating tactical widget.

#### `Topbar.tsx`
- **Operational Status Bar:** Anchored at the top of `/dashboard` and `/satellite-analyzer`.
- **Dual Time Clock:** Live synchronised UTC and IST clocks in `JetBrains Mono` tabular digits.
- **Stream Indicator:** Displays `MOSDAC Stream: Synced` with an emerald pulse indicator.
- **User Role Badge:** Displays active authenticated identity (e.g., `Scientist (IMD)`).

#### `AppSidebar.tsx`
- **Operational Sidebar:** Persistent left navigation drawer for the main app layout.
- **Active Route Highlighting:** Detects current path via `usePathname()` and highlights the active module with cyan glow.
- **Monitored Basin Widget:** Displays current active basin monitoring status (`Bay of Bengal • BOB-02`).

---

### 6.4 Command Dashboard Components (`src/components/dashboard/`)

#### 1. `CycloneStatusCard.tsx`
- **Dynamic Specular Gradient Typography:** Features the high-impact `heading-moving-gradient` CSS animation applied across the cyclone headline (*CYCLONE "ARNAB"*), cycling seamlessly through Deep Blue (`#0052FF`) → Electric Cyan (`#00F2FE`) → Specular White (`#FFFFFF`) → Hazard Coral (`#FF6B4A`).
- **Multi-Layered Drop Shadows:** Encapsulated in `.heading-gradient-shadow-wrapper` utilizing dual ambient drop shadows (`filter: drop-shadow(0 2px 6px rgba(0,0,0,0.9)) drop-shadow(0 4px 14px rgba(0,0,0,0.85))`) to lift text cleanly off dark glassmorphic backdrops.
- **Dynamic Category & Warning Badges:** Automatically maps storm intensity to IMD warning stages (*Stage 3 Warning / Very Severe Cyclonic Storm*) with live color-coded status badges and pulsing radar indicators.
- **Precision Meteorological Metrics:** Houses sub-pixel LLCC coordinate readouts ($16.2^\circ\text{N}, 88.4^\circ\text{E}$), maximum sustained winds ($185\text{ km/h}$ / $100\text{ kts}$), central pressure ($942\text{ hPa}$), and estimated landfall countdown ($T-24\text{h}$ to Dhamra-Puri coastline).

#### 2. `RealTimeParameters.tsx`
- **6-Matrix Meteorological Parameter Cards:**
  1. *Max Wind Speed:* $155\text{ km/h}$ ($+12\text{ km/h}$ acceleration vector).
  2. *Central Pressure:* $964\text{ hPa}$ ($-6\text{ hPa}$ rapid deepening indicator).
  3. *Sea Surface Temperature:* $30.4^\circ\text{C}$ (Convective fuel threshold $>28.5^\circ\text{C}$).
  4. *Vertical Wind Shear:* $8.5\text{ kts}$ (Highly favorable low-shear environment).
  5. *Relative Humidity:* $86\%$ (Mid-tropospheric saturation).
  6. *Estimated Rainfall Core:* $220\text{ mm/24h}$ (Extreme torrential band alert).
- **High-Definition Cyan Typography & Text Shadows:** All parameter labels and values are styled in system cyan (`#00F2FE`) with multi-layered depth text shadows (`textShadow: "0 1px 2px #000000, 0 2px 6px rgba(0,0,0,0.95), 0 0 10px rgba(0,0,0,0.9)"`).
- **Balanced Visual Ergonomics:** Standardized line-heights and padding between parameter values, tabular units, and SVG progress bars to eliminate cramped spacing and ensure instantaneous scanability under high-stress command scenarios.

#### 3. `ActionDispatchPanel.tsx`
- **Purpose:** Critical operational emergency response center enabling meteorological directors to trigger standardized multi-agency protocols.
- **4-Tier Action Dispatchers:**
  1. *Broadcast NDMA Red Alert:* Triggers mass SMS coastal warning broadcasts and emergency TV sirens.
  2. *Offshore Fishermen Recall:* Dispatches NavIC/NAVTEX emergency vessel recall signals across coastal sectors.
  3. *Port Authority Gale Warning:* Signals Signal-10 Danger Flags to Paradip, Dhamra, and Kolkata port commands.
  4. *Mobilize NDRF / Coast Guard:* Dispatches pre-landfall staging orders to national disaster response battalions.
- **Tactical Dispatch Latency:** Incorporates simulated countdown latencies, confirmation modals with agency credentials, and active dispatch state indicators.

#### 4. `TrendCharts.tsx`
- **Purpose:** Interactive telemetry graph container plotting 24-hour historical observations alongside 48-hour AI ensemble forecast trajectories.
- **Dual-Axis Synchronization:** Plots Central Pressure drop ($P_c\text{ in hPa}$) on the primary axis against Peak Sustained Winds ($V_{max}\text{ in knots}$) on the secondary axis with customized glassmorphic tooltip inspectors.

---

### 6.5 AI Pattern Analyzer Components (`src/components/analyzer/`)

#### 1. `SatelliteCanvas.tsx`
- **Purpose:** Interactive geospatial raster viewport delivering sub-pixel analysis of geostationary satellite feeds.
- **Sub-Pixel Eyewall Crosshairs:** Real-time reticle overlay highlighting the Low-Level Circulation Center (LLCC) centroid with sub-pixel precision.
- **Radius of Maximum Winds (RMW) Overlay:** Dynamic concentric ring visualization mapping the RMW boundary ($28\text{ km}$) directly over convective eyewall bands.
- **Interactive Inspection:** Supports smooth mouse-wheel zooming, pan translation, pixel brightness temperature readouts, and false-color palette switching.

#### 2. `GradCamStudio.tsx`
- **Purpose:** Explainable AI (Grad-CAM) activation inspection studio exposing deep neural feature attributions.
- **Colormap Palette Switching:** Enables meteorologists to toggle activation heatmaps across *Jet*, *Inferno*, and *Viridis* spectral representations.
- **Neural Layer Blending:** Real-time alpha blending slider ($0-100\%$) overlaying ConvNeXt-ViT / ResNet-50 layer-4 attention weights over raw thermal IR imagery.
- **Analog Tactical Noise:** Ingests dynamic film-grain canvas overlay (`Noise.tsx`, `patternAlpha={15}`) and prominent cyber cyan borders for aerospace mission-control aesthetics.

#### 3. `DvorakTelemetryCard.tsx`
- **Dynamic Specular Category Badge:** Encapsulates the storm category (`VERY SEVERE CYCLONIC STORM (VSCS)`) within `ShinyBadge.tsx` featuring traveling edge sheen (`#FFA78B`), ambient surface sweep, and deep void backdrop (`bg-[#070D18]/95`) to prevent orange tint wash.
- **Moving Gradient Pattern Banner:** Identified Meteorological Pattern title formatted in `heading-moving-gradient` with dual drop-shadows and system cyan labels with high-definition text shadows.
- **Softmax Probability Distribution:** Visualizes model classification confidences across all 7 Dvorak patterns (Eye Pattern $96.4\%$, Curved Band $2.1\%$, Central Dense Overcast $1.0\%$, Shear Pattern $0.5\%$).
- **Empirical Scale Metrics:** Real-time readouts for Automated Dvorak T-Number ($T5.5$), Current Intensity ($CI5.5$), and Knaff-Zehr estimated wind velocity.

#### 4. `PipelineExportHub.tsx`
- **Downstream Scientific Pipeline Hub:** Houses 4 mission-critical export action cards:
  1. *Send to Trajectory Prediction:* Direct deep link handoff (`/forecast?llcc=...`) transferring LLCC coordinates, $V_{max}$, and $P_c$ to the 120-hour PINN ensemble forecaster.
  2. *Commit to Research Archive:* One-click snapshot capture storing model weights, sensor telemetry, and activations into `/model-metrics`.
  3. *Export Report (PDF):* Automated generation and print dispatch of official India Meteorological Department (IMD) formatted advisory bulletins.
  4. *Raw JSON Payload:* Complete bounding box, telemetry, and probability array download.
- **Exact Alignment to `RUN AI INFERENCE` Styling & Effect:**
  - *Retained Card Shape & Geometry:* Preserves rectangular `rounded-xl` (`0.75rem`) card geometry with dual-line stacked content and right-hand icons.
  - *Retained Palette Hues:* Preserves individual color themes (Trajectory: Cyan `#00F2FE`, Archive: Emerald `#10E7A2`, Report: Coral `#FF5E36`, JSON: Tech Cyan `#00F2FE`).
  - *Cyber Glassmorphic Surface:* High-clarity backdrop blur (`backdrop-filter: blur(20px)`), translucent tinted base (`rgba(color, 0.10)`), luminous border (`1px solid rgba(color, 0.65)`), and top bevel highlight (`inset 0 1px 0 rgba(255, 255, 255, 0.4)`).
  - *Interactive GSAP Rising Bubble Fill:* An expanding circular mask ($R, D, \text{originY}$) scales from $0 \to 2.2$ on hover from bottom center, smoothly flooding the card with the button's vibrant accent color.
  - *Dual Label-Stack Roll-Up:* On hover, default text translates up ($y = -(h+12)$) while high-contrast dark cyber typography (`#050B14`) and solid dark icons slide up into place over the colored flood wave.
  - *Hover Glow & Scale:* Border brightens to 100%, elevated neon box shadow flares (`0 0 28px rgba(color, 0.85)`), and subtle spring scale (`scale(1.02)`) engages before smoothly reversing on mouse leave.

#### 5. `InferenceHub.tsx` & `RunInferenceButton`
- **Model Orchestrator:** Manages execution across ConvNeXt-ViT, DenseNet-Dvorak, and Physics-Informed Neural Networks.
- **Signature `RunInferenceButton`:** Pill-shaped capsule button with animated GSAP rising bubble fill, dark text roll-up, and real-time computation states (`Computing...` / `Run AI Inference`).

#### 6. `RadiometricAdjustmentsModal.tsx` & `RadiometricStrip.tsx`
- **Sensor Calibration Studio:** Full modal and rapid-access toolbar for adjusting sensor radiometric curves.
- **`ElasticSlider` Controls:** Integrated physics spring sliders governing Brightness ($-50\text{ to }+50$), Contrast ($0.5\times\text{ to }2.5\times$), Gamma ($0.2\text{ to }3.0$), and Convective Threshold ($-80^\circ\text{C}\text{ to }-30^\circ\text{C}$).

#### 7. `ScientificUploadModal.tsx` & `ImageUploader.tsx`
- **Multi-Source Satellite Ingestion:** Supports automated parsing and validation of INSAT-3DR HDF5 (`.h5`), GeoTIFF (`.tif`), NetCDF-4 (`.nc`), and standard PNG/JPEG raster feeds with drag-and-drop feedback.

---

### 6.6 Map Rendering Canvas (`src/components/map/`)

#### `MapLayerCanvas.tsx`
- Geospatial mapping container configured for MapLibre GL JS and deck.gl.
- Features floating controls for multi-layer toggling (TIR-1, WV, VIS, Doppler radar reflectivity, wind streamlines, and predicted trajectory cones).
- Displays active center fix coordinates ($14.234^\circ\text{N}, 88.512^\circ\text{E}$ at Zoom $6.2$).

---

### 6.7 Cyclone AI Assistant & Explainability Layer (`src/components/xai/`)

#### `XaiAssistantPanel.tsx`
- **React Bits `<PixelCard />` Modal Shell:** The entire assistant panel is wrapped in `<PixelCard variant="cyan" gap={8} speed={35} colors="#00F2FE,#38BDF8,#10E7A2,#0ea5e9" className="pixel-card-modal" />`. On mouse movement and hover, thousands of randomized cyber pixels shimmer across the background canvas in electric cyan, sky blue, and emerald neon, while maintaining full pointer-events accessibility and crisp responsiveness for all input and message interactions.
- **Header & Telemetry HUD:** Tactical badge indicating `[XAI_ENGINE: ACTIVE]` with a pulsing emerald/cyan beacon and live tabular model confidence score (`Model Confidence: 82%`).
- **Contextual Reasoning Feed:** Interactive chat stream distinguishing user queries from the AI assistant. Incorporates simulated reasoning delay with animated evaluation spinner (`Evaluating model feature attributions & atmospheric context...`).
- **Tactical Quick-Ask Chips:** High-value pre-set meteorological queries allowing users to inspect decisions without typing:
  - *"Why is the cyclone classified as strong?"* (Explains $72\text{ kt}$ sustained winds and Dvorak T4.5 / CI5.0 eyewall patterns).
  - *"Why is the predicted intensity increasing?"* (Details low vertical wind shear of $8.5\text{ kts}$, warm SST of $30.4^\circ\text{C}$, and PINN rapid intensification alerts).
  - *"What cloud structures triggered the 82% confidence score?"* (Analyzes INSAT-3DR TIR-1 Central Dense Overcast and cold cloud-top temperatures $<-75^\circ\text{C}$).
  - *"Explain the Grad-CAM eyewall attention heatmap"* (Exposes ConvNeXt-ViT layer 4 gradient concentrations $>0.88$).
  - *"How is the PINN model projecting the 120h track cone?"* (Details Navier-Stokes momentum and thermodynamic steering at 500 hPa).
- **Multi-Context Usability:** Configured with optional `onClose` callbacks for standalone full-width embedding or slide-over drawer modals.

#### `XaiFloatingWidget.tsx`
- **Purpose:** Persistent, high-tech floating tactical trigger and slide-over drawer modal ensuring seamless access to the Cyclone AI Assistant across the entire application (Landing Page, Operational Dashboard, Satellite Analyzer, and all operational mission pages).
- **React Bits `<PixelTransition />` & Tactical Rounded Rectangle Integration:**
  - Powers the button with `<PixelTransition gridSize={12} pixelColor="#00F2FE" animationStepDuration={0.35} aspectRatio="0" className="pixel-pill-button" />`.
  - **Geometry:** Modern tactical rectangle with rounded corners (`border-radius: 14px`) and electric cyan glowing outline (`border: 1.5px solid rgba(0, 242, 254, 0.85)`).
  - **Resting State (`firstContent`):** Luminous cyan robot icon (`<Bot />` with soft cyan drop-shadow) alongside top title `CYCLONE AI ASSISTANT` and bottom subtitle `Explain Model Predictions` in electric cyan (`#00F2FE`), engineered with `whitespace-nowrap` for a tailored fit without wrapping.
  - **Hover / Active State (`secondContent`):** Pulsing cyan robot icon alongside `AI REASONING STUDIO` and `Inspect Decision Drivers →`.
  - **Cybernetic Pixel Dissolve:** On hover/mouse-leave, a 12×12 randomized grid of Electric Cyan (`#00F2FE`) pixels rapidly materializes and scatters across the rounded rectangle via GSAP, creating an authentic sci-fi hologram reveal.
  - Deep space dark backdrop (`#020610`) with ambient cyan aura drop-shadows (`0 12px 36px rgba(0,0,0,0.92)`, `0 0 24px rgba(0,242,254,0.35)`).
- **Drawer Interaction:** Clicking the floating button smoothly slides open the 720px max-height glassmorphic `XaiAssistantPanel` in a backdrop-blurred overlay modal without disrupting page scrolling or navigation.

---

### 6.8 Forecast Prediction Center Components (`src/components/forecast/`)

All 10 files in this module were created in Phase 13. Collectively they implement CYTORN Page 5 — the **Trajectory & Intensity Prediction Center** — which ingests live storm parameters from upstream pages and projects them through a PINN ensemble forecasting engine.

#### 1. `types.ts` — Domain TypeScript Contracts
- **`ForecastHorizon`**: Union type for the 6 forecast time steps (`+6h` → `+120h`).
- **`ForecastMode`**: `"deterministic"` | `"ensemble"` | `"nwp_benchmark"`.
- **`SpeedUnit`**: `"km/h"` | `"knots"`.
- **`Waypoint`**: Single track point with `hour`, `lat`, `lng`, `vmaxKmh`, `vmaxKts`, `pcHpa`, `category`, `isPast`, `isLandfall`.
- **`NwpModelTrack`**: Comparative model track with error metrics (`error24hKm`, `error48hKm`, `error72hKm`), landfall target, and enabled toggle flag.
- **`LandfallInfo`**: Coastal diagnostic data — district, state, coordinates, hour offset, surge meters, peak wind, affected blocks, evacuation status.
- **`RapidIntensificationData`**: Full RI assessment — probability %, WMO/IMD threshold flag, 24h wind delta, SST, VWS, OHC, divergence level, and SHAP feature importance array.
- **`StormScenario`**: Master model wrapping all sub-types for the active storm.

#### 2. `forecastData.ts` — Static Mock Data Engine
- Defines complete `CYCLONE_MOCHA` (BOB-02, Category 4, Very Severe Cyclonic Storm) and `CYCLONE_BIPARJOY` (ARB-01, Extremely Severe Cyclonic Storm) scenario objects.
- Each scenario includes past track waypoints (T-48h to T-0h), 120h forecast track waypoints, 30 PINN ensemble member paths, 4 NWP benchmark model tracks (with error metrics and landfall targets), detailed landfall info, and rapid intensification diagnostics.
- Exports `synthesizeScenarioFromInputs(base, llcc, vmax, pc)` to override base storm parameters with live URL-injected values from `/dashboard` and `/satellite-analyzer`.

#### 3. `ForecastTopBar.tsx` — Mission Command Bar
- **Storm Selector Dropdown**: Framer Motion animated portal panel (scale + blur entrance/exit) listing all available storm scenarios with live coordinate and wind readouts.
- **6 Forecast Horizon Tabs**: `+6h`, `+12h`, `+24h`, `+48h`, `+72h`, `+120h` — each rendered as GSAP circular-flood pill buttons via the reusable `useGsapPill` hook.
- **3 Prediction Mode Toggles**: Deterministic, Ensemble, NWP Benchmark, each with contextual sub-label descriptions.
- **Speed Unit Toggle**: `km/h` / `knots` switcher with animated highlight bar.
- **Map Controls**: Cone of Uncertainty visibility toggle and Ensemble Spaghetti enable toggle.

#### 4. `ForecastGisCanvas.tsx` — Geospatial Prediction Canvas
- Renders the storm's **past track** (dashed coral segments), **AI forecast track** (solid cyan segments with category-colored waypoint markers), **120h Cone of Uncertainty** (blue polygon), and up to **30 PINN ensemble spaghetti tracks** (translucent colored lines).
- In NWP Benchmark mode, renders toggled **ECMWF, IMD-GFS, NCMRWF model tracks** with their respective color codes.
- Floating map HUD overlays display active LLCC coordinates, active prediction mode, and map control buttons.

#### 5. `LandfallCountdownBanner.tsx` — Urgency Countdown
- **Live Timer**: Counts down to projected landfall in real time (hours, minutes, seconds) rendered in `Orbitron 800` for maximum urgency.
- **Landfall Quick Stats**: District name, projected surge height, peak wind speed, and a HIGH RISK badge with pulse animation.
- **Expandable Diagnostic Section**: Reveals full coastal impact breakdown — coordinates, uncertainty window, affected administrative blocks, and current evacuation status.
- **`InterceptModelPillButton`**: GSAP circular-flood wave pill linking to `LandfallDetailsModal` with cyan → dark inversion hover.

#### 6. `IntensityStudio.tsx` — Dual-Axis Intensity Chart & RI Gauge
- **Recharts `ComposedChart`**: Plots wind speed ($V_{max}$) as a filled `Area` and central pressure ($P_c$) as a `Line` across the full temporal horizon. Supports real-time axis switching between `km/h` and `knots`. Includes `ReferenceLine` markers for the RI trigger threshold and landfall time.
- **RI Radial Gauge**: Embedded SVG gauge ring rendered in static cyan (`#00F2FE`) at the probability percentage ($78.4\%$). Displays a pulsing `HIGH RISK` badge and the \"Danger Trigger\" annotation in cyan with drop-shadow.
- **Peak Waypoint Summary Bar**: Highlights the peak wind speed, peak timing, and a color-coded cyclone category badge.

#### 7. `NwpComparisonMatrix.tsx` — Model Benchmark Table
- **Comparison Table**: Renders 4 rows (CYCLO-AI, ECMWF, IMD-GFS, NCMRWF) across 6 columns: Show on Map toggle (color-coded checkbox), Weather Model name + description, 24h/48h/72h track error (km), and Predicted Landfall Location.
- **AI Row Highlight**: The CYCLO-AI row receives a `bg-[#00F2FE]/5` background with cyan-bordered, inline-flex error badge.
- **Orange Column Headers**: All `<th>` elements styled in `#FF5E36` with `[text-shadow:0_2px_4px_rgba(0,0,0,0.95)]`.
- **Noise Overlay**: `<Noise patternAlpha={10} />` on the container background with prominent cyan glow border.
- **Whitespace Fix**: All cells have `whitespace-nowrap` and the table has `min-w-[560px]` within `overflow-x-auto` to prevent badge wrapping.
- **Guidance Note**: Plain-language explanation at the bottom: \"Lower error (km) means higher accuracy\".

#### 8. `PipelineHandoffExport.tsx` — Scientific Pipeline Hub
Split into two sections:
- **Section 1 (3 Inter-Page CTAs)**: `BroadcastAlertsPillLink` (→ `/alerts`), `SimulateFloodingPillLink` (→ `/digital-twin`), `ValidatePinnsPillLink` (→ `/physics-lab`) — each with GSAP circular flood-wave pill hover animations.
- **Section 2 (3 GIS Exporters):**
  - **Export GeoJSON** (Cyan): Generates a full `FeatureCollection` GeoJSON with AI track LineString, uncertainty cone Polygon, and NWP model comparison track lines. Downloaded as `.geojson`.
  - **Export Shapefile** (Amber): Generates a ZIP-format plain-text bundle with `README.txt` describing the contained track layers. Downloaded as `.zip`.
  - **Export CSV** (Emerald): Generates a tab-delimited CSV of all forecast waypoints including hour, coordinates, wind speed, pressure, category, and landfall flag. Downloaded as `.csv`.
  - All 3 use the shared `ExportPillButton` component with GSAP circular flood, dual-label stack roll-up, and color-coded icon swap.

#### 9. `LandfallDetailsModal.tsx` — Coastal Diagnostic Modal
- Full-screen overlay modal displaying the complete coastal impact profile: target district and state, precise coordinates, projected storm surge with uncertainty range, peak sustained winds (dual unit), estimated central pressure, uncertainty window hours, affected administrative block list, and current evacuation status with color-coded badge.
- Includes \"View on GIS Map\" and \"Report RI Event to IMD\" action buttons.

#### 10. `RiAttributionModal.tsx` — Rapid Intensification SHAP Panel
- **WMO/IMD Threshold Banner**: Defines RI as $\geq 30\text{ kts}$ ($55\text{ km/h}$) in 24 hours with the current 24h wind delta prominently displayed.
- **4 Atmospheric Driver Cards**: Sea Surface Temperature (SST vs. $28.5^\circ\text{C}$ threshold), Vertical Wind Shear (favorable/unfavorable coloring), Ocean Heat Content (OHC in $\text{kJ/cm}^2$), and Upper-Level Divergence level.
- **SHAP Importance Bar Chart**: Horizontally oriented feature importance bars ranked by contribution, color-coded by positive (intensification) or negative (inhibiting) impact.

---

## 7. Routing Architecture & Page Walkthroughs


CYTORN utilizes the Next.js 16 App Router with two distinct route groups:

```
src/app/
├── page.tsx                      # Route: / (Public Mission Showcase & Landing Page)
├── (auth)/                       # Group: Unauthenticated Security Gateway
│   ├── layout.tsx                # Centered layout with cyber cyan vignette
│   ├── login/page.tsx            # Route: /login (Role-Based Scientist/NDMA/Public Login)
│   └── register/page.tsx         # Route: /register (Agency Access Verification)
└── (main)/                       # Group: Authenticated Command Center
    ├── layout.tsx                # Topbar + AppSidebar persistent workspace
    ├── dashboard/page.tsx        # Route: /dashboard (Live Geospatial Command Dashboard)
    ├── forecast/page.tsx         # Route: /forecast (Trajectory & Intensity Prediction Center) [NEW]
    └── satellite-analyzer/page.tsx # Route: /satellite-analyzer (Multi-Spectral Pattern Studio)
```

### 7.1 Root Public Landing Page (`/`)
- Ingests `HeroVideo` with high-definition satellite loop and 4 telemetry overlays.
- Displays `StormTicker` with live basin updates.
- Showcases the 5 core scientific capabilities via `FeatureGrid` with 3D `TiltedCard` interactions.
- Validates model accuracy and operational scale via `LandingMetrics` with holographic radar sweeps.
- Illustrates cyclone lifecycle via `LandingTimeline`.
- Concludes with `GlobalFooter` featuring the NDMA 1078 helpline callout bar.
- Integrates `XaiFloatingWidget` floating at the bottom-right corner, allowing evaluators to summon the Cyclone AI Assistant directly from the home page.


### 7.2 Operational Geospatial Dashboard (`/dashboard`)
- Ingests top parameter matrix (`RealTimeParameters`) presenting 6 critical meteorological vectors with high-definition cyan typography and multi-layered text shadows.
- Spans a high-performance geospatial satellite map canvas (`MapLayerCanvas`) rendering multi-layer INSAT-3DR TIR-1 rasters, atmospheric vector streamlines, and 120-hour PINN predicted trajectory cones.
- Features `CycloneStatusCard` highlighting active Category 4 storm *Cyclone "ARNAB"* with flowing `heading-moving-gradient` specular title sweeps, dual drop shadows, and automated IMD warning stage badges.
- Houses `ActionDispatchPanel` enabling operational commanders to initiate tiered multi-agency emergency orders (NDMA Red Alert Broadcast, Offshore Fishermen Recall, Port Authority Gale Warnings, NDRF/Coast Guard Pre-Staging) with automated latency countdowns.
- Features interactive `TrendCharts` with dual-axis temporal projection graphs comparing 24-hour barometric drops against peak sustained wind trends.
- Integrates `XaiAssistantPanel` both embedded within dashboard tabs and as a slide-over drawer modal summoned by `XaiFloatingWidget`.

### 7.3 AI Satellite Analyzer & Pattern Studio (`/satellite-analyzer`)
- Houses `SatelliteCanvas`: An interactive deep-zoom raster inspection viewport featuring sub-pixel Low-Level Circulation Center (LLCC) reticle crosshairs and dynamic Radius of Maximum Winds (RMW) overlay rings ($28\text{ km}$).
- Features `GradCamStudio`: An Explainable AI studio component exposing ConvNeXt-ViT layer-4 feature attributions with live colormap switching (*Jet*, *Inferno*, *Viridis*), alpha opacity blending ($0-100\%$), and tactile film-grain noise texturing.
- Houses `DvorakTelemetryCard`: High-precision meteorological HUD presenting specular `ShinyBadge` warning badges, `heading-moving-gradient` pattern banners, softmax distribution bars across 7 Dvorak convective topologies, and empirical $T5.5 / CI5.5$ intensity metrics.
- Features `PipelineExportHub`: Scientific export center with 4 action cards (*Send to Trajectory*, *Commit to Archive*, *Export Report PDF*, *Raw JSON Payload*), engineered to match the exact cyber glass styling and interactive GSAP rising bubble hover animation of the `RUN AI INFERENCE` button.
- Ingests `RadiometricAdjustmentsModal` and `RadiometricStrip` with physics-based `ElasticSlider` controls for sensor brightness, contrast, gamma, and convective threshold tuning.
- Ingests `ScientificUploadModal` for ingesting INSAT-3DR HDF5, GeoTIFF, NetCDF-4, and PNG satellite datasets.
- Includes `InferenceHub` with the signature GSAP capsule `RunInferenceButton` for triggering deep learning pipelines.

### 7.4 Trajectory & Intensity Prediction Center (`/forecast`)
The newly built Page 5 is the operational PINN forecast command hub.
- Accepts storm parameters from `/dashboard` (via Zustand store) and `/satellite-analyzer` (via URL query params `?llcc=`, `?vmax=`, `?pc=`, `?storm=`).
- `ForecastTopBar` at the top provides storm selection, time horizon, prediction mode, and speed unit controls.
- A responsive grid renders `ForecastGisCanvas` (left, 7 of 12 columns on XL) and a right pane with `IntensityStudio` stacked above `NwpComparisonMatrix`.
- `LandfallCountdownBanner` below the canvas links to `LandfallDetailsModal` overlay.
- `PipelineHandoffExport` at the bottom provides 3 inter-page CTAs and 3 format-specific GIS exporters.
- `LandfallDetailsModal` and `RiAttributionModal` are rendered as fixed-position overlays triggered from within their respective components.

### 7.5 Authentication & Role Verification (`/login`, `/register`)
- Role selector tabs allowing instant switching between **Scientist**, **NDMA/SDMA**, and **Public**.
- Agency ID and 256-bit encrypted credential fields with password reveal toggles.
- Registration page for institutional onboarding of meteorological officers.

---

## 8. Global State Management Architecture

Built with **Zustand 5**, providing decoupled reactive stores:

### 1. `useCycloneStore.ts`
Manages active cyclone selection, monitored basins, and temporal playback:
- `activeStormId`: Currently selected cyclone (default: `"BOB-02-REMIGR"`).
- `activeBasin`: Monitored oceanic basin (`"Bay of Bengal"`, `"Arabian Sea"`, `"Global"`).
- `selectedTimestamp`: Currently scrubbed forecast time marker.
- `playbackSpeed`: Simulation velocity ($1\times$, $2\times$, $4\times$).
- `isPlaying`: Play/pause state for temporal scrubbing.
- `timeRange`: Active observation window (e.g., $[-24\text{h}, +48\text{h}]$).
- `cyclones`: Array of active and historical storm entities.

### 2. `useDashboardStore.ts`
Controls geospatial GIS layers and visualization parameters:
- `satelliteLayers`: Array of layer configs (`infrared`, `water-vapor`, `visible`, `radar-composite`).
- `toggleLayerVisibility(layerId)`: Toggles layer visibility on the map.
- `setLayerOpacity(layerId, opacity)`: Adjusts layer transparency ($0.0 - 1.0$).
- `showPredictionCone`: Toggles 120-hour forecast uncertainty cone display.

### 3. `useAuthStore.ts`
Manages authenticated scientist and official sessions:
- `user`: Active `UserSession` object (ID, name, email, agency, token).
- `role`: Current authorization level (`"meteorologist"`, `"disaster_official"`, `"public"`).
- `isAuthenticated`: Boolean authentication flag.

---

## 9. Data Domain Models, TypeScript Contracts & API Client

### 9.1 Cyclone Domain Types (`src/types/cyclone.ts`)
```typescript
export type CycloneCategory =
  | "Depression"
  | "Deep Depression"
  | "Cyclonic Storm"
  | "Severe Cyclonic Storm"
  | "Very Severe Cyclonic Storm"
  | "Extremely Severe Cyclonic Storm"
  | "Super Cyclonic Storm"
  | "Category 1" | "Category 2" | "Category 3" | "Category 4" | "Category 5";

export interface GeoCoordinate {
  latitude: number;
  longitude: number;
}

export interface TrackPoint extends GeoCoordinate {
  timestamp: string;
  windSpeedKts: number;
  centralPressureHpa: number;
  category: CycloneCategory;
  confidenceScore?: number;
}

export interface ForecastTrack {
  cycloneId: string;
  modelName: string;
  generatedAt: string;
  points: TrackPoint[];
  uncertaintyCone?: {
    radiusKm: number;
    center: GeoCoordinate;
  }[];
}

export interface WeatherParams {
  seaSurfaceTemperatureCelsius: number;
  centralPressureHpa: number;
  maximumSustainedWindKmh: number;
  windGustsKmh: number;
  verticalWindShearKts: number;
  relativeHumidityPercent: number;
  cloudTopTemperatureCelsius: number;
}

export interface CycloneData {
  id: string;
  name: string;
  basin: string;
  currentCategory: CycloneCategory;
  aiConfidenceScore: number;
  currentCoordinates: GeoCoordinate;
  currentParameters: WeatherParams;
  historicalTrack: TrackPoint[];
  predictedTracks: ForecastTrack[];
  lastUpdated: string;
  status: "Active" | "Dissipated" | "Monitoring";
}
```

### 9.2 Centralized API Client (`src/lib/api.ts`)
A typed fetch wrapper configured for integration with the FastAPI backend:
- Automatic query parameter serialization via `URLSearchParams`.
- Standard JSON request and accept headers.
- Unified error handling with HTTP status codes and response bodies.

---

## 10. Animation Physics & Mathematical Implementations

### 1. Circle Radius Calculation in Pill Buttons (`WarningPill.tsx`, `SatellitePill.tsx`)
To ensure a circular mask expanding from the bottom edge of a pill button covers its entire rectangular bounding box, the circle radius $R$ and origin offset $\Delta$ are calculated dynamically via geometry:

$$\text{Given a pill with width } w \text{ and height } h\text{:}$$

$$R = \frac{\frac{w^2}{4} + h^2}{2h}$$

$$D = 2R$$

$$\Delta = R - \sqrt{\max\left(0, R^2 - \frac{w^2}{4}\right)}$$

$$\text{originY} = D - \Delta$$

This formula guarantees that when the circle scales from $0 \to 1.2$ at transform origin $(50\%, \text{originY})$, it expands seamlessly from the bottom edge to engulf the pill without clipping.

### 2. 3D Card Tilt Spring Physics (`TiltedCard.tsx`)
Normalized mouse offsets are mapped into angular tilts using Framer Motion springs:

$$\text{rotateX} = -\left(\frac{y - y_0}{h} - 0.5\right) \times \text{amplitude}$$

$$\text{rotateY} = \left(\frac{x - x_0}{w} - 0.5\right) \times \text{amplitude}$$

With spring parameters: `damping: 30`, `stiffness: 100`, `mass: 2`.

### 3. GSAP Expanding Bubble Mask & Dual-Stack Roll-Up (`PipelineExportHub.tsx`, `ScientistProfilePill.tsx`, `RunInferenceButton`)
To achieve an organic fluid flood wave where an expanding circular mask originates from the bottom edge and engulfs wide rectangular action cards ($w \gg h$) without edge clipping:
1. The circle diameter $D = 2R$ is calculated dynamically from the bounding box dimensions $w$ and $h$ using the circumscribed circle formula:
   $$R = \frac{w^2 / 4 + h^2}{2h}$$
2. The bottom offset $\Delta = R - \sqrt{\max\left(0, R^2 - w^2 / 4\right)} + 1$ places the circle tangent to the bottom edge.
3. The transform origin is positioned at $\left(50\%, D - \Delta\right)$, ensuring the circle expands outward and upward from bottom-center.
4. On hover, GSAP scales the circle from $0 \to 2.2$, while simultaneously driving dual content layers:
   - Default Layer: $\text{translateY}(0) \to \text{translateY}(-(h+12))$ (slides out of top).
   - Inverted Hover Layer: $\text{translateY}(h+60) \to \text{translateY}(0)$ with opacity $0 \to 1$ (slides into position with high-contrast `#050B14` cyber typography).

### 4. Moving Specular Chromatic Gradient Sweeps (`globals.css`)
Applied to primary headlines via `.heading-moving-gradient`:
- A continuous linear color ramp: `linear-gradient(90deg, #0052FF 0%, #00F2FE 28%, #FFFFFF 50%, #FF6B4A 74%, #0052FF 100%)`.
- Set to `background-size: 200% 100%` and clipped via `-webkit-background-clip: text`.
- Driven by a GPU-accelerated CSS keyframe animation (`heading-gradient-flow` over $6\text{s}$ linear infinite), creating an aerospace-grade specular shimmer across characters.

### 5. Damped Harmonic Oscillator Slider Physics (`ElasticSlider.tsx`)
Tactile sensor radiometric calibration sliders leverage spring dynamics to prevent jerky adjustments:
- Position interpolation is governed by the second-order differential equation:
  $$m \frac{d^2x}{dt^2} + c \frac{dx}{dt} + k(x - x_{\text{target}}) = 0$$
- Spring stiffness $k = 300$, damping ratio $\zeta = \frac{c}{2\sqrt{mk}} = 0.85$ (slightly underdamped for snappy tactile responsiveness), eliminating overshoot while providing physical resistance at boundary limits ($0\%$ and $100\%$).

---

## 11. Current Implementation Status & Future Expansion Roadmap

### ✅ Completed & Production-Ready:
- Full-screen satellite video hero with 4 glassmorphic HUD telemetry overlays.
- 3D origami folding text animation (`FoldText`) with multi-stop chromatic gradients.
- WebGL 2.0 atmospheric scanner background (`Scanner`) with mouse reactivity.
- Geometry-calculated GSAP capsule pills (`WarningPill`, `SatellitePill`, `DashboardPill`, `MenuPill`).
- Full-screen choreographed tactical slide-over navigation drawer (`SlideOverMenu`).
- Infinite scrolling active storm ticker (`StormTicker` via `LogoLoop`).
- 3D perspective feature grid (`FeatureGrid` with `TiltedCard`).
- Operational validation metrics with interactive rotating holographic radar sweep gauges (`LandingMetrics`).
- Curvilinear 4-stage IMD cyclone disaster lifecycle timeline (`LandingTimeline`).
- Geospatial command dashboard layout with parameter micro-cards, cyclone status card, and GIS canvas.
- Multi-spectral AI pattern studio with sensor channel switching, Dvorak curve toggles, and Grad-CAM blending.
- Drag-and-drop raster uploader supporting HDF5, GeoTIFF, NetCDF, and PNG.
- Role-based authentication portal (`/login`, `/register`) supporting Scientist, NDMA, and Public roles.
- Interactive Cyclone AI Assistant (`XaiAssistantPanel`) with fully visible dynamic 3-suggestion prompts, signature GSAP send button (`ExplainPill`), natural language reasoning, React Bits `PixelCard` particle shimmer, molten `GradientText` moving gradient flow, and streamlined modal header.
- Tactically styled floating launcher widget (`XaiFloatingWidget`) with React Bits `PixelTransition` rounded-rectangle physics, proportional `<Bot />` icon, and dynamic Purple-to-Orange moving gradient typography.
- Seamless multi-surface XAI integration across Landing Page (`LandingXaiSection`), Command Dashboard drawer/tabs, and AI Pattern Studio.
- Official brand logo & favicon integration across all touchpoints (`GlobalNav`, `GlobalFooter`, `SlideOverMenu`, `Topbar`, `TopHeader`, and `AuthLayout`).
- Global footer with background video, NDMA 1078 disaster hotline callout bar, `GlareHover` mechanics, and `WarpText` liquid text displacement.
- Decoupled global reactive state management via Zustand 5.
- **Mission Control Emergency Action Dispatch Panel (`ActionDispatchPanel.tsx`):** 4-tier emergency protocol dispatcher (NDMA Red Alert Broadcast, Coastal Evacuation Corridors, Offshore Fishermen Recall, Port Authority Gale Warnings) with simulated latency countdowns and status indicators.
- **Overhauled Cyclone Status Card (`CycloneStatusCard.tsx`):** Moving specular gradient title sweeps (`#0052FF` → `#00F2FE` → `#FFFFFF` → `#FF6B4A`), dual ambient drop shadows, live wind speed gauge rings, sub-pixel LLCC coordinate readouts, and automated IMD warning stage badges.
- **Real-Time Meteorological Parameter Matrix (`RealTimeParameters.tsx`):** 6-card parameter grid with high-definition cyan typography (`#00F2FE`), multi-layered text shadows (`0 1px 2px #000, 0 2px 6px rgba(0,0,0,0.95), 0 0 10px rgba(0,0,0,0.9)`), and balanced spacing.
- **Interactive Geospatial Raster Viewport (`SatelliteCanvas.tsx`):** High-performance canvas with sub-pixel eye centroid crosshairs, dynamic Radius of Maximum Winds (RMW) overlay rings ($28\text{ km}$), pan/zoom controls, and false-color lookup tables.
- **Explainable AI Activation Studio (`GradCamStudio.tsx`):** Neural attention inspection studio exposing ConvNeXt-ViT layer-4 activation heatmaps with colormap selection (*Jet*, *Inferno*, *Viridis*), alpha opacity blending ($0-100\%$), tactile film-grain noise (`Noise.tsx`), and prominent cyber borders.
- **Automated Dvorak Pattern Telemetry HUD (`DvorakTelemetryCard.tsx`):** Specular `ShinyBadge` category telemetry, animated moving gradient pattern headings, deep void backdrop (`bg-[#070D18]/95`) preventing orange tint wash, softmax distributions across 7 Dvorak patterns, and empirical T-number/CI metrics.
- **Downstream Scientific Pipeline Export Hub (`PipelineExportHub.tsx`):** 4 downstream action cards (*Send to Trajectory*, *Commit to Archive*, *Export Report PDF*, *Raw JSON Payload*), engineered to match the exact cyber glass styling and interactive GSAP rising bubble hover animation of the `RUN AI INFERENCE` button while strictly preserving card shape, padding, and individual color themes.
- **Sensor Radiometric Calibration Suite (`RadiometricAdjustmentsModal.tsx` & `RadiometricStrip.tsx`):** Spring-physics slider controls (`ElasticSlider.tsx`) governing Brightness, Contrast, Gamma, and Convective Thresholds.
- **Multi-Format Satellite Raster Ingestion Hub (`ScientificUploadModal.tsx` & `ImageUploader.tsx`):** Direct ingestion and validation of INSAT-3DR HDF5, GeoTIFF, NetCDF-4, and PNG datasets.
- **Tactical Navigation & Micro-Interactions Suite:** IMD Scientist operational profile capsule pill (`ScientistProfilePill.tsx`), tactical alerts counter pill (`AlertsPill.tsx`), Fullscreen API toggle (`FullscreenButton.tsx`), GIS layer drawer toggle (`LayersButton.tsx`), concentric rotating telemetry rings (`MagicRings.tsx`), and mechanical departure-board text flipping (`SplitFlapText.tsx`).
- **Complete Trajectory & Intensity Prediction Center — `/forecast` (Page 5):** 10-file component architecture covering storm scenario selection with Framer Motion dropdown, 3-mode PINN prediction engine (Deterministic / Ensemble / NWP Benchmark), 120h MapLibre GL GIS canvas with track cone and 30-member ensemble spaghetti, dual-axis Recharts intensity studio, RI radial gauge at $78.4\%$ with HIGH RISK badge, NWP model accuracy comparison matrix (AI vs. ECMWF / IMD-GFS / NCMRWF), landfall countdown banner, coastal diagnostic modal, SHAP RI explainability modal, and 3-format GIS scientific exporter (GeoJSON, Shapefile, CSV).
- **GlobalNav Overlap Fix (`GlobalNav.tsx`):** Replaced `2xl:absolute 2xl:left-1/2 2xl:top-1/2 2xl:-translate-x-1/2 2xl:-translate-y-1/2` with `flex-1 min-w-0 px-2` on the center pill container. Eliminates DashboardPill / dual-clock collision on 1536px viewports (standard 1080p at 125% DPI scaling).
- **DashboardPill Label Update (`DashboardPill.tsx`):** Shortened `targetLabel` from `"Landing Page"` to `"Landing"` for a compact navbar footprint.
- **NwpComparisonMatrix Badge Fix:** Added `whitespace-nowrap`, `inline-flex`, and `min-w-[560px]` to prevent `38 km` badge from wrapping across two lines in narrow panels.
- **Export Button Label Generalization (`PipelineHandoffExport.tsx`):** Replaced verbose format labels with clean generic action labels: `Export GeoJSON`, `Export Shapefile`, `Export CSV`.

### 🚀 Upcoming Milestones (Future Scope):
1. **Live FastMapLibre GL Integration:** Connect MapLibre GL instance to live WMS/WMTS raster tile servers (MOSDAC INSAT-3DR TIR-1 layers).
2. **FastAPI Backend Webhook Synchronization:** Connect `src/lib/api.ts` to live Python model inference pipelines (ConvNeXt-ViT, YOLOv8-Eye, and PINNs Navier-Stokes solver).
3. **Common Alerting Protocol (CAP) XML Engine:** Enable automated generation and direct push of CAP v1.2 XML alerts to district administrative portals.
4. **Offline Mobile PWA Mode:** Implement Service Workers for offline coastal early warning bulletins during severe power and network grid disruptions.

---

*This report reflects the entire development history, architectural design, component implementations, and technical specifications of the CYTORN frontend codebase.*
