"use client";

/**
 * CYCLO-AI Page 5: Trajectory & Intensity Prediction Center (/forecast)
 * 
 * SYSTEM ARCHITECTURE & INTEGRATION:
 * - Ingests starting storm state (LLCC coordinates, current wind speed, and central pressure)
 *   from Page 3 (/dashboard) and Page 4 (/satellite-analyzer) via URL parameters or store.
 * - Multi-day forward projection engine up to 120 hours.
 * - Computes empirical Cone of Uncertainty: R(t) = R_0 + gamma * t^1.15 (R_0 = 15km, gamma = 0.95).
 * - PINN Loss optimization:
 *   L_total = L_data + lambda_1 * L_NavierStokes + lambda_2 * L_Coriolis + lambda_3 * L_betaDrift
 * - 3 Prediction Modes: Deterministic AI Mode, Ensemble Dispersion Mode (30 perturbation members), AI vs. NWP Benchmark Mode.
 * - WMO / IMD Rapid Intensification criterion evaluation (>= 30 kts / 55 km/h in 24h).
 */

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCycloneStore } from "@/store/useCycloneStore";
import { 
  ForecastHorizon, 
  ForecastMode, 
  SpeedUnit, 
  StormScenario, 
  NwpModelTrack 
} from "@/components/forecast/types";
import { 
  ALL_STORMS, 
  CYCLONE_MOCHA, 
  synthesizeScenarioFromInputs 
} from "@/components/forecast/forecastData";
import { ForecastTopBar } from "@/components/forecast/ForecastTopBar";
import { ForecastGisCanvas } from "@/components/forecast/ForecastGisCanvas";
import { LandfallCountdownBanner } from "@/components/forecast/LandfallCountdownBanner";
import { IntensityStudio } from "@/components/forecast/IntensityStudio";
import { NwpComparisonMatrix } from "@/components/forecast/NwpComparisonMatrix";
import { PipelineHandoffExport } from "@/components/forecast/PipelineHandoffExport";
import { LandfallDetailsModal } from "@/components/forecast/LandfallDetailsModal";

function ForecastPredictionCenterContent() {
  const searchParams = useSearchParams();
  const { activeStormId, setActiveStormId } = useCycloneStore();

  // Ingest URL query parameters from Page 3 and Page 4
  const llccParam = searchParams.get("llcc");
  const vmaxParam = searchParams.get("vmax");
  const pcParam = searchParams.get("pc");
  const stormParam = searchParams.get("storm");

  // Determine base storm ID
  const initialStormId = useMemo(() => {
    if (stormParam) {
      const match = Object.values(ALL_STORMS).find(
        (s) => s.code.toLowerCase() === stormParam.toLowerCase() || s.id.toLowerCase().includes(stormParam.toLowerCase())
      );
      if (match) return match.id;
    }
    if (activeStormId && ALL_STORMS[activeStormId]) {
      return activeStormId;
    }
    return "BOB-02-MOCHA";
  }, [stormParam, activeStormId]);

  const [selectedStormId, setSelectedStormId] = useState<string>(initialStormId);
  const [selectedHorizon, setSelectedHorizon] = useState<ForecastHorizon>("+72h");
  const [selectedMode, setSelectedMode] = useState<ForecastMode>("deterministic");
  const [speedUnit, setSpeedUnit] = useState<SpeedUnit>("km/h");

  // Map Controls State
  const [isSpaghettiActive, setIsSpaghettiActive] = useState<boolean>(false);
  const [isConeVisible, setIsConeVisible] = useState<boolean>(true);

  // NWP Models State
  const [nwpModels, setNwpModels] = useState<NwpModelTrack[]>(
    ALL_STORMS[selectedStormId]?.nwpModels || CYCLONE_MOCHA.nwpModels
  );

  // Modals State
  const [isLandfallModalOpen, setIsLandfallModalOpen] = useState(false);

  // Sync when selected storm changes
  const handleSelectStorm = (stormId: string) => {
    setSelectedStormId(stormId);
    setActiveStormId(stormId);
    if (ALL_STORMS[stormId]) {
      setNwpModels(ALL_STORMS[stormId].nwpModels);
    }
  };

  // Toggle individual NWP model track visibility (Control 14)
  const handleToggleNwpModel = (modelId: string) => {
    setNwpModels((prev) =>
      prev.map((m) => (m.id === modelId ? { ...m, enabled: !m.enabled } : m))
    );
  };

  // Synthesize scenario with external ingested parameters if present
  const activeScenario: StormScenario = useMemo(() => {
    const base = ALL_STORMS[selectedStormId] || CYCLONE_MOCHA;

    let parsedLat: number | undefined;
    let parsedLng: number | undefined;
    if (llccParam) {
      const [latStr, lngStr] = llccParam.split(",");
      const lat = parseFloat(latStr);
      const lng = parseFloat(lngStr);
      if (!isNaN(lat) && !isNaN(lng)) {
        parsedLat = lat;
        parsedLng = lng;
      }
    }

    const parsedVmax = vmaxParam ? parseFloat(vmaxParam) : undefined;
    const parsedPc = pcParam ? parseFloat(pcParam) : undefined;

    return synthesizeScenarioFromInputs(base, {
      lat: parsedLat,
      lng: parsedLng,
      vmaxKmh: isNaN(parsedVmax ?? NaN) ? undefined : parsedVmax,
      pcHpa: isNaN(parsedPc ?? NaN) ? undefined : parsedPc
    });
  }, [selectedStormId, llccParam, vmaxParam, pcParam]);

  const isIngestedFromExternal = Boolean(llccParam || vmaxParam || pcParam);

  return (
    <div className="w-full max-w-[1680px] mx-auto min-h-screen text-white font-inter pb-12">
      {/* 1. TOP HORIZON & SCENARIO BAR */}
      <ForecastTopBar
        currentScenario={activeScenario}
        selectedHorizon={selectedHorizon}
        selectedMode={selectedMode}
        onSelectStorm={handleSelectStorm}
        onSelectHorizon={setSelectedHorizon}
        onSelectMode={setSelectedMode}
        allStorms={ALL_STORMS}
        isIngestedFromExternal={isIngestedFromExternal}
      />

      {/* DUAL-PANE TACTICAL INTERFACE */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* LEFT PANE (7 Columns on XL): GIS Trajectory Map Canvas & Tactical Dispatch */}
        <section className="xl:col-span-7 flex flex-col gap-4">
          {/* GIS Trajectory Map Canvas */}
          <ForecastGisCanvas
            scenario={activeScenario}
            selectedHorizon={selectedHorizon}
            selectedMode={selectedMode}
            nwpModels={nwpModels}
            onOpenLandfallModal={() => setIsLandfallModalOpen(true)}
            isSpaghettiActive={isSpaghettiActive}
            onToggleSpaghetti={() => setIsSpaghettiActive((prev) => !prev)}
            isConeVisible={isConeVisible}
            onToggleCone={() => setIsConeVisible((prev) => !prev)}
          />

          {/* Landfall Countdown & Dynamics Banner */}
          <LandfallCountdownBanner
            landfall={activeScenario.landfall}
            stormName={activeScenario.name}
            onOpenDetails={() => setIsLandfallModalOpen(true)}
          />

          {/* Pipeline Handoff & Scientific Export Center */}
          <PipelineHandoffExport scenario={activeScenario} />
        </section>

        {/* RIGHT PANE (5 Columns on XL): Multi-Chart Intensity Studio & NWP Matrix */}
        <section className="xl:col-span-5 flex flex-col gap-4">
          {/* Intensity & Barometric Studio with RI Gauge */}
          <IntensityStudio
            scenario={activeScenario}
            speedUnit={speedUnit}
            onToggleSpeedUnit={setSpeedUnit}
          />

          {/* NWP Model Comparison Matrix */}
          <NwpComparisonMatrix
            models={nwpModels}
            onToggleModel={handleToggleNwpModel}
          />
        </section>
      </div>

      {/* MODAL 1: Coastal Landfall Diagnostics Modal */}
      <LandfallDetailsModal
        isOpen={isLandfallModalOpen}
        onClose={() => setIsLandfallModalOpen(false)}
        landfall={activeScenario.landfall}
        stormName={activeScenario.name}
      />
    </div>
  );
}

export default function ForecastPredictionCenterPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[600px] flex flex-col items-center justify-center gap-3 text-center">
          <div className="w-12 h-12 rounded-xl bg-[#00F2FE]/10 border border-[#00F2FE]/40 flex items-center justify-center animate-spin">
            <div className="w-4 h-4 rounded-full bg-[#00F2FE]" />
          </div>
          <div className="text-sm font-orbitron font-bold text-white">
            INITIALIZING PINN TRAJECTORY ENGINE...
          </div>
          <div className="text-xs font-rajdhani text-[#8E9EB5]">
            Ingesting multi-source satellite telemetry and barotropic steering vectors
          </div>
        </div>
      }
    >
      <ForecastPredictionCenterContent />
    </Suspense>
  );
}
