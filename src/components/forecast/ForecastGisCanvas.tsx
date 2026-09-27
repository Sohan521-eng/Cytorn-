"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { 
  ForecastHorizon, 
  ForecastMode, 
  StormScenario, 
  Waypoint, 
  NwpModelTrack 
} from "./types";
import { generateUncertaintyConePolygon } from "./forecastData";
import { ShinyBadge } from "@/components/ui/ShinyBadge";
import { motion, AnimatePresence } from "framer-motion";
import Noise from "@/components/ui/Noise";
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  Crosshair, 
  Zap, 
  Check, 
  Layers, 
  Eye, 
  Info,
  MapPin,
  Compass,
  X,
  BookOpen
} from "lucide-react";

interface ForecastGisCanvasProps {
  scenario: StormScenario;
  selectedHorizon: ForecastHorizon;
  selectedMode: ForecastMode;
  nwpModels: NwpModelTrack[];
  onOpenLandfallModal: () => void;
  isSpaghettiActive: boolean;
  onToggleSpaghetti: () => void;
  isConeVisible: boolean;
  onToggleCone: () => void;
}

// Convert horizon string to numeric hours
function horizonToHours(h: ForecastHorizon): number {
  switch (h) {
    case "+6h": return 6;
    case "+12h": return 12;
    case "+24h": return 24;
    case "+48h": return 48;
    case "+72h": return 72;
    case "+120h": return 120;
    default: return 120;
  }
}

export function ForecastGisCanvas({
  scenario,
  selectedHorizon,
  selectedMode,
  nwpModels,
  onOpenLandfallModal,
  isSpaghettiActive,
  onToggleSpaghetti,
  isConeVisible,
  onToggleCone,
}: ForecastGisCanvasProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const maplibreglRef = useRef<any>(null);

  const [mapReady, setMapReady] = useState(false);
  const [mapTick, setMapTick] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoveredWaypoint, setHoveredWaypoint] = useState<Waypoint | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const legendPanelRef = useRef<HTMLDivElement>(null);

  // Close legend on Escape or outside click
  useEffect(() => {
    if (!isLegendOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLegendOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (legendPanelRef.current && !legendPanelRef.current.contains(e.target as Node)) {
        const btn = document.getElementById("toggle-map-legend-btn");
        if (btn && btn.contains(e.target as Node)) return;
        setIsLegendOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLegendOpen]);

  const maxHours = horizonToHours(selectedHorizon);

  // Filter forecast track up to the selected forecast horizon
  const visibleForecastTrack = useMemo(() => {
    return scenario.forecastTrack.filter((wp) => wp.hour <= maxHours);
  }, [scenario.forecastTrack, maxHours]);

  // Uncertainty Cone polygon coordinates
  // Empirical cross-track cone: R(t) = R_0 + gamma * t^1.15 (R_0 = 15km, gamma = 0.95)
  const conePolygonCoords = useMemo(() => {
    return generateUncertaintyConePolygon(visibleForecastTrack);
  }, [visibleForecastTrack]);

  // Project geographic coordinates [lng, lat] to screen coordinates { x, y }
  const projectPoint = useCallback((lng: number, lat: number): { x: number; y: number } | null => {
    const map = mapInstanceRef.current;
    if (!map) return null;
    try {
      const p = map.project([lng, lat]);
      return { x: Math.round(p.x * 10) / 10, y: Math.round(p.y * 10) / 10 };
    } catch {
      return null;
    }
  }, []);

  // Helper to convert an array of [lng, lat] to an SVG polygon path
  const coordsToSvgPolygon = useCallback((coords: [number, number][]): string => {
    if (!coords || coords.length === 0) return "";
    let d = "";
    coords.forEach((c, idx) => {
      const pt = projectPoint(c[0], c[1]);
      if (!pt) return;
      d += `${idx === 0 ? "M" : "L"} ${pt.x} ${pt.y} `;
    });
    return d.length > 0 ? `${d}Z` : "";
  }, [projectPoint]);

  // Helper to convert an array of [lng, lat] to an SVG polyline string
  const coordsToSvgLine = useCallback((coords: [number, number][]): string => {
    if (!coords || coords.length === 0) return "";
    let d = "";
    coords.forEach((c, idx) => {
      const pt = projectPoint(c[0], c[1]);
      if (!pt) return;
      d += `${idx === 0 ? "M" : "L"} ${pt.x} ${pt.y} `;
    });
    return d;
  }, [projectPoint]);

  // Initialize MapLibre GL
  useEffect(() => {
    let isMounted = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let map: any = null;

    async function initMap() {
      if (!mapContainerRef.current) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const maplibreglMod: any = await import("maplibre-gl");
      const maplibregl = maplibreglMod.default || maplibreglMod;
      maplibreglRef.current = maplibregl;
      if (!isMounted) return;

      const initialCenter: [number, number] = [
        scenario.currentLlcc.lng,
        scenario.currentLlcc.lat
      ];

      map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: {
          version: 8,
          sources: {
            "esri-satellite": {
              type: "raster",
              tiles: [
                "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              ],
              tileSize: 256,
              attribution: "© Esri, Earthstar Geographics"
            }
          },
          layers: [
            {
              id: "sat-base",
              type: "raster",
              source: "esri-satellite"
            }
          ]
        },
        center: initialCenter,
        zoom: 5.4,
        minZoom: 3,
        maxZoom: 14,
        attributionControl: false
      });

      mapInstanceRef.current = map;

      const handleUpdate = () => {
        if (isMounted) setMapTick((t) => (t + 1) % 10000);
      };

      map.on("load", () => {
        if (!isMounted) return;
        setMapReady(true);
        handleUpdate();
      });

      map.on("move", handleUpdate);
      map.on("zoom", handleUpdate);
      map.on("resize", handleUpdate);

      setTimeout(() => {
        if (isMounted) {
          setMapReady(true);
          handleUpdate();
        }
      }, 150);
    }

    initMap();

    return () => {
      isMounted = false;
      if (map) map.remove();
    };
  }, [scenario.id]);

  // Recenter when scenario changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (map && mapReady) {
      map.flyTo({
        center: [scenario.currentLlcc.lng, scenario.currentLlcc.lat],
        zoom: 5.4,
        essential: true
      });
      setMapTick((t) => t + 1);
    }
  }, [scenario.id, mapReady]);

  // Map Controls Handlers
  // 5. Center on Landfall
  const handleCenterLandfall = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.flyTo({
      center: [scenario.landfall.coordinates.lng, scenario.landfall.coordinates.lat],
      zoom: 7.2,
      speed: 1.2,
      curve: 1.4,
      essential: true
    });
  };

  // 7. Zoom In
  const handleZoomIn = () => {
    const map = mapInstanceRef.current;
    if (map) map.zoomIn();
  };

  // 8. Zoom Out
  const handleZoomOut = () => {
    const map = mapInstanceRef.current;
    if (map) map.zoomOut();
  };

  // 9. Fullscreen Toggle
  const handleToggleFullscreen = () => {
    if (!mapContainerRef.current) return;
    if (!document.fullscreenElement) {
      mapContainerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // SVG Paths & Projections
  // Past Track Path
  const pastTrackPath = useMemo(() => {
    if (!mapReady && mapTick < 0) return "";
    const coords: [number, number][] = scenario.pastTrack.map((p) => [p.lng, p.lat]);
    return coordsToSvgLine(coords);
  }, [mapReady, mapTick, scenario.pastTrack, coordsToSvgLine]);

  // Projected AI PINN Trajectory
  // Forward trajectory optimized via PINN Loss:
  // L_total = L_data + lambda_1 * L_NavierStokes + lambda_2 * L_Coriolis + lambda_3 * L_betaDrift
  const aiTrackPath = useMemo(() => {
    if (!mapReady && mapTick < 0) return "";
    const coords: [number, number][] = visibleForecastTrack.map((p) => [p.lng, p.lat]);
    return coordsToSvgLine(coords);
  }, [mapReady, mapTick, visibleForecastTrack, coordsToSvgLine]);

  // Uncertainty Cone Path
  const conePath = useMemo(() => {
    if (!mapReady || !isConeVisible) return "";
    return coordsToSvgPolygon(conePolygonCoords);
  }, [mapReady, isConeVisible, conePolygonCoords, coordsToSvgPolygon, mapTick]);

  // Projected Landfall Marker screen coordinate
  const landfallPoint = useMemo(() => {
    if (!mapReady && mapTick < 0) return null;
    return projectPoint(scenario.landfall.coordinates.lng, scenario.landfall.coordinates.lat);
  }, [mapReady, mapTick, scenario.landfall.coordinates, projectPoint]);

  // Projected Past Track Nodes
  const projectedPastNodes = useMemo(() => {
    if (!mapReady && mapTick < 0) return [];
    return scenario.pastTrack.map((p) => ({
      ...p,
      point: projectPoint(p.lng, p.lat)
    })).filter((n) => n.point !== null);
  }, [mapReady, mapTick, scenario.pastTrack, projectPoint]);

  // Projected AI Forecast Waypoint Nodes
  const projectedForecastNodes = useMemo(() => {
    if (!mapReady && mapTick < 0) return [];
    return visibleForecastTrack.map((p) => ({
      ...p,
      point: projectPoint(p.lng, p.lat)
    })).filter((n) => n.point !== null);
  }, [mapReady, mapTick, visibleForecastTrack, projectPoint]);

  // Projected 30 Ensemble Members (Spaghetti Plot)
  const isEnsembleRenderActive = isSpaghettiActive || selectedMode === "ensemble";
  const projectedEnsembleLines = useMemo(() => {
    if (!mapReady || !isEnsembleRenderActive) return [];
    return scenario.ensembleMembers.map((member) => ({
      id: member.id,
      name: member.name,
      color: member.color,
      path: coordsToSvgLine(member.points.slice(0, visibleForecastTrack.length + 1))
    }));
  }, [mapReady, isEnsembleRenderActive, scenario.ensembleMembers, coordsToSvgLine, visibleForecastTrack.length, mapTick]);

  // Projected NWP Comparison Lines
  const isNwpRenderActive = selectedMode === "nwp_benchmark" || nwpModels.some((m) => m.enabled && m.id !== "cyclo_ai");
  const projectedNwpLines = useMemo(() => {
    if (!mapReady || !isNwpRenderActive) return [];
    return nwpModels
      .filter((m) => m.enabled && m.id !== "cyclo_ai")
      .map((model) => ({
        id: model.id,
        name: model.name,
        color: model.color,
        path: coordsToSvgLine(model.points.slice(0, visibleForecastTrack.length + 1))
      }));
  }, [mapReady, isNwpRenderActive, nwpModels, coordsToSvgLine, visibleForecastTrack.length, mapTick]);

  return (
    <div 
      id="trajectory-gis-canvas"
      ref={mapContainerRef} 
      className={`relative w-full h-[520px] lg:h-[620px] rounded-xl overflow-hidden bg-[#050B14] ${
        isFullscreen ? "fixed inset-0 z-50 h-screen w-screen rounded-none" : ""
      }`}
      style={{
        border: "1.5px solid rgba(0, 242, 254, 0.55)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.7), 0 0 24px rgba(0,242,254,0.18)",
      }}
    >
      {/* Dark Tactical Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_80px_rgba(5,11,20,0.85)]" />

      {/* SVG GIS Projections Layer */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Radial gradient for Cone of Uncertainty */}
          <linearGradient id="coneGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#00F2FE" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#0E3D59" stopOpacity="0.08" />
          </linearGradient>

          {/* Cyan Glow Filter for AI Trajectory */}
          <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Landfall Coral Glow Filter */}
          <filter id="coralGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Cone of Uncertainty Polygon */}
        {isConeVisible && conePath && (
          <path
            d={conePath}
            fill="url(#coneGradient)"
            stroke="#00F2FE"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            strokeOpacity="0.75"
            className="transition-all duration-300"
          />
        )}

        {/* 2. Ensemble Dispersion (30 Members Spaghetti Plot) */}
        {isEnsembleRenderActive && projectedEnsembleLines.map((em) => (
          <path
            key={em.id}
            d={em.path}
            fill="none"
            stroke={em.color}
            strokeWidth="1.2"
            strokeOpacity="0.45"
            strokeDasharray="3 3"
          />
        ))}

        {/* 3. NWP Benchmark Model Lines (ECMWF, IMD-GFS, NCMRWF) */}
        {isNwpRenderActive && projectedNwpLines.map((nwp) => (
          <path
            key={nwp.id}
            d={nwp.path}
            fill="none"
            stroke={nwp.color}
            strokeWidth="2.2"
            strokeDasharray="5 3"
            strokeOpacity="0.9"
            style={{ filter: "drop-shadow(0 0 3px rgba(0,0,0,0.8))" }}
          />
        ))}

        {/* 4. Past Observed Track (Solid thick line) */}
        {pastTrackPath && (
          <g>
            {/* Outline */}
            <path
              d={pastTrackPath}
              fill="none"
              stroke="#050B14"
              strokeWidth="5.5"
              strokeLinecap="round"
            />
            {/* Core Solid Line */}
            <path
              d={pastTrackPath}
              fill="none"
              stroke="#94A3B8"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* 5. AI Projected Trajectory (Dashed Electric Cyan line with outer glow) */}
        {aiTrackPath && (
          <g>
            {/* Outer Cyan Glow Backing */}
            <path
              d={aiTrackPath}
              fill="none"
              stroke="#00F2FE"
              strokeWidth="6"
              strokeOpacity="0.3"
              strokeLinecap="round"
              filter="url(#cyanGlow)"
            />
            {/* Core Dashed Neon Line */}
            <path
              d={aiTrackPath}
              fill="none"
              stroke="#00F2FE"
              strokeWidth="2.8"
              strokeDasharray="7 5"
              strokeLinecap="round"
              filter="url(#cyanGlow)"
            />
          </g>
        )}

        {/* 6. Trajectory Waypoint Pins & Hover Hit-Boxes */}
        {projectedPastNodes.map((n, i) => (
          <g key={`past-${i}`} className="pointer-events-auto">
            <circle
              cx={n.point!.x}
              cy={n.point!.y}
              r="4.5"
              fill="#0F1B2F"
              stroke="#94A3B8"
              strokeWidth="1.8"
            />
            <circle
              cx={n.point!.x}
              cy={n.point!.y}
              r="2"
              fill="#94A3B8"
            />
          </g>
        ))}

        {/* AI Waypoint Pins (11. Trajectory Waypoint Pins) */}
        {projectedForecastNodes.map((wp, i) => (
          <g 
            key={`fore-${i}`} 
            className="pointer-events-auto cursor-pointer"
            onMouseEnter={(e) => {
              setHoveredWaypoint(wp);
              setHoverPos({ x: wp.point!.x, y: wp.point!.y });
            }}
            onMouseLeave={() => {
              setHoveredWaypoint(null);
              setHoverPos(null);
            }}
          >
            {/* Pulse Rings on LIVE (hour 0) - Prominent Dual Concentric Radar Pulse */}
            {wp.hour === 0 && (
              <g className="pointer-events-none">
                <circle
                  cx={wp.point!.x}
                  cy={wp.point!.y}
                  r="6"
                  fill="none"
                  stroke="#00F2FE"
                  strokeWidth="1.8"
                >
                  <animate
                    attributeName="r"
                    values="6;50"
                    dur="2.4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.85;0"
                    dur="2.4s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx={wp.point!.x}
                  cy={wp.point!.y}
                  r="6"
                  fill="none"
                  stroke="#00F2FE"
                  strokeWidth="1.2"
                >
                  <animate
                    attributeName="r"
                    values="6;50"
                    begin="1.2s"
                    dur="2.4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.7;0"
                    begin="1.2s"
                    dur="2.4s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            )}
            {/* Hit area */}
            <circle
              cx={wp.point!.x}
              cy={wp.point!.y}
              r="10"
              fill="transparent"
            />
            {/* Waypoint Base Ring */}
            <circle
              cx={wp.point!.x}
              cy={wp.point!.y}
              r="5.5"
              fill="#050B14"
              stroke="#00F2FE"
              strokeWidth="2"
            />
            <circle
              cx={wp.point!.x}
              cy={wp.point!.y}
              r="2.5"
              fill="#00F2FE"
            />
          </g>
        ))}

        {/* 10. Landfall Marker Pin (Flashing Dual-Ring Hazard Coral Beacon) */}
        {landfallPoint && (
          <g 
            className="pointer-events-auto cursor-pointer"
            onClick={onOpenLandfallModal}
            filter="url(#coralGlow)"
          >
            {/* Outer expanding beacon rings - Prominent Dual Concentric Emergency Wave */}
            <circle
              cx={landfallPoint.x}
              cy={landfallPoint.y}
              r="7"
              fill="none"
              stroke="#FF5E36"
              strokeWidth="2"
              className="pointer-events-none"
            >
              <animate
                attributeName="r"
                values="7;58"
                dur="2.2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.95;0"
                dur="2.2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx={landfallPoint.x}
              cy={landfallPoint.y}
              r="7"
              fill="none"
              stroke="#FF5E36"
              strokeWidth="1.3"
              className="pointer-events-none"
            >
              <animate
                attributeName="r"
                values="7;58"
                begin="1.1s"
                dur="2.2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.75;0"
                begin="1.1s"
                dur="2.2s"
                repeatCount="indefinite"
              />
            </circle>
            {/* Secondary pulsing ring */}
            <circle
              cx={landfallPoint.x}
              cy={landfallPoint.y}
              r="11"
              fill="rgba(255, 94, 54, 0.2)"
              stroke="#FF5E36"
              strokeWidth="2"
            />
            {/* Center Core Beacon */}
            <circle
              cx={landfallPoint.x}
              cy={landfallPoint.y}
              r="5"
              fill="#FFFFFF"
              stroke="#FF5E36"
              strokeWidth="2"
            />
          </g>
        )}
      </svg>

      {/* HTML OVERLAY: 10. Landfall Coastal Intercept Label */}
      {landfallPoint && (
        <div 
          onClick={onOpenLandfallModal}
          style={{ 
            left: `${landfallPoint.x}px`, 
            top: `${landfallPoint.y - 28}px`,
            transform: "translate(-50%, -100%)"
          }}
          className="absolute z-30 cursor-pointer pointer-events-auto transition-transform hover:scale-105"
        >
          <div className="relative overflow-hidden bg-[#0F1B2F]/95 backdrop-blur-md border border-[#FF5E36] px-3 py-1.5 rounded-lg shadow-[0_0_20px_rgba(255,94,54,0.4)] whitespace-nowrap">
            {/* Noise texture overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-lg z-0">
              <Noise patternSize={200} patternScaleX={1} patternScaleY={1} patternRefreshInterval={3} patternAlpha={10} />
            </div>
            <div className="relative z-10">
              <div className="text-[11px] font-orbitron font-bold text-[#FF5E36] leading-none">
                {scenario.landfall.targetDistrict}
              </div>
              <div className="text-[9px] font-jetbrains text-white font-semibold mt-1">
                Landfall T+{scenario.landfall.landfallHourOffset}h • {scenario.landfall.coordinates.lat}°N, {scenario.landfall.coordinates.lng}°E
              </div>
            </div>
          </div>
          {/* Stem pointer */}
          <div className="w-2 h-2 bg-[#FF5E36] rotate-45 mx-auto -mt-1 shadow-sm" />
        </div>
      )}

      {/* HTML OVERLAY: 11. Waypoint Hover Tooltip */}
      {hoveredWaypoint && hoverPos && (
        <div 
          style={{ 
            left: `${hoverPos.x}px`, 
            top: `${hoverPos.y - 14}px`,
            transform: "translate(-50%, -100%)"
          }}
          className="absolute z-40 pointer-events-none"
        >
          <div className="relative overflow-hidden bg-[#0F1B2F]/95 backdrop-blur-md border border-[#00F2FE]/60 text-white p-2.5 rounded-lg shadow-[0_0_20px_rgba(0,242,254,0.35)] min-w-[170px]">
            {/* Noise texture overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-lg z-0">
              <Noise patternSize={200} patternScaleX={1} patternScaleY={1} patternRefreshInterval={3} patternAlpha={12} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between border-b border-[#1E3A5F] pb-1 mb-1.5">
                <span className="text-[11px] font-orbitron font-bold text-[#00F2FE]">
                  T{hoveredWaypoint.hour >= 0 ? `+${hoveredWaypoint.hour}h` : `${hoveredWaypoint.hour}h`}
                </span>
                <span className="text-[9px] font-jetbrains px-1.5 py-0.2 rounded bg-[#00F2FE]/15 text-[#00F2FE]">
                  {hoveredWaypoint.category}
                </span>
              </div>
              <div className="space-y-0.5 text-[10px] font-jetbrains">
                <div className="flex justify-between">
                  <span className="text-[#8E9EB5]">LLCC:</span>
                  <span className="text-white">{hoveredWaypoint.lat.toFixed(2)}°N, {hoveredWaypoint.lng.toFixed(2)}°E</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8E9EB5]">Vmax:</span>
                  <span className="text-[#00F2FE] font-bold">{hoveredWaypoint.vmaxKmh} km/h ({hoveredWaypoint.vmaxKts} kts)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8E9EB5]">Central P:</span>
                  <span className="text-emerald-400 font-bold">{hoveredWaypoint.pcHpa} hPa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOP LEFT HUD: Map Layer Status & Coordinates Readout */}
      <div className="absolute top-3 left-3 z-30 flex flex-col items-start gap-1.5 pointer-events-none">
        <ShinyBadge
          className="self-start pointer-events-auto shadow-[0_4px_14px_rgba(0,0,0,0.35),0_1px_3px_rgba(0,0,0,0.2),0_0_10px_rgba(0,242,254,0.15)]"
          roundedClassName="rounded-lg"
          speed={3}
          spread={80}
          borderColor="rgba(0, 242, 254, 0.4)"
          borderShineColor="#ffffff"
          surfaceColor="rgba(0, 242, 254, 0.15)"
          surfaceShineColor="rgba(255, 255, 255, 0.55)"
        >
          <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-pulse shrink-0" />
          <span className="text-[11px] font-orbitron font-bold text-[#00F2FE] tracking-wide">
            {scenario.name}
          </span>
          <span className="text-[9px] font-jetbrains text-[#8E9EB5]">
            PINN Forward Horizon: {selectedHorizon}
          </span>
        </ShinyBadge>
      </div>

      {/* MAP LEGEND OVERLAY MODAL / PANEL */}
      <AnimatePresence>
        {isLegendOpen && (
          <motion.div
            ref={legendPanelRef}
            key="map-legend-panel"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute bottom-[130px] left-3 z-40 w-[260px] max-w-[calc(100vw-24px)] max-h-[min(500px,calc(100%-150px))] overflow-y-auto overflow-x-hidden no-scrollbar bg-[#0F1B2F]/95 backdrop-blur-xl border border-[rgba(0,242,254,0.45)] rounded-xl p-2 shadow-[0_16px_48px_rgba(0,0,0,0.9),0_0_24px_rgba(0,242,254,0.18)] select-none pointer-events-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Noise texture overlay wrapped in overflow-hidden */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl">
              <Noise patternSize={250} patternScaleX={1} patternScaleY={1} patternRefreshInterval={3} patternAlpha={8} />
            </div>

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#1E3252]">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-[#00F2FE]/15 border border-[#00F2FE]/40 flex items-center justify-center shrink-0">
                    <BookOpen className="w-3 h-3 text-[#00F2FE]" />
                  </div>
                  <h4 className="text-[11px] font-orbitron font-bold text-[#00F2FE] tracking-wide leading-none">
                    Map Symbology Legend
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLegendOpen(false)}
                  className="p-1 rounded-md text-[#8E9EB5] hover:text-[#00F2FE] hover:bg-[#00F2FE]/10 transition-colors cursor-pointer"
                  title="Close Legend"
                  aria-label="Close Legend"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Section 1: Trajectory Tracks */}
              <div className="mb-1.5">
                <span className="text-[8px] font-mono uppercase tracking-wider font-bold text-[#00F2FE] block mb-1">
                  1. Trajectory Track Lines
                </span>
                <div className="space-y-1 text-xs font-mono">
                  {/* AI PINN Track */}
                  <div className="flex items-start gap-1.5 px-2 py-1 rounded-lg bg-[#050B14]/70 border border-[rgba(0,242,254,0.3)]">
                    <div className="w-5 h-3.5 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-4 border-b-2 border-dashed border-[#00F2FE] shadow-[0_0_6px_#00F2FE]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[#00F2FE] text-[10px] leading-tight">AI PINN Projected Track</div>
                      <div className="text-[8.5px] text-slate-300 font-sans leading-tight mt-0.5">
                        Forward physics-informed neural network path.
                      </div>
                    </div>
                  </div>

                  {/* Past Observed Track */}
                  <div className="flex items-start gap-1.5 px-2 py-1 rounded-lg bg-[#050B14]/70 border border-[#1E3252]">
                    <div className="w-5 h-3.5 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-4 h-0.5 bg-[#94A3B8] rounded-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[#94A3B8] text-[10px] leading-tight">Past Observed Track</div>
                      <div className="text-[8.5px] text-slate-300 font-sans leading-tight mt-0.5">
                        Recorded trajectory fixes from INSAT-3DR &amp; Radar.
                      </div>
                    </div>
                  </div>

                  {/* Uncertainty Cone */}
                  <div className="flex items-start gap-1.5 px-2 py-1 rounded-lg bg-[#050B14]/70 border border-[rgba(0,242,254,0.2)]">
                    <div className="w-5 h-3.5 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-4 h-2.5 rounded bg-[#00F2FE]/25 border border-dashed border-[#00F2FE]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[#38BDF8] text-[10px] leading-tight">Cone of Uncertainty (R ∝ t^1.15)</div>
                      <div className="text-[8.5px] text-slate-300 font-sans leading-tight mt-0.5">
                        Predicted spatial error margin expanding over horizon.
                      </div>
                    </div>
                  </div>

                  {/* NWP Comparison Models */}
                  <div className="flex items-start gap-1.5 px-2 py-1 rounded-lg bg-[#050B14]/70 border border-[#1E3252]">
                    <div className="w-5 h-3.5 flex items-center justify-center gap-0.5 shrink-0 mt-0.5">
                      <span className="w-1.5 border-b-2 border-dashed border-[#10E7A2]" title="IMD-GFS" />
                      <span className="w-1.5 border-b-2 border-dashed border-[#D946EF]" title="ECMWF" />
                      <span className="w-1.5 border-b-2 border-dashed border-[#F59E0B]" title="NCUM" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-amber-300 text-[10px] leading-tight">NWP Benchmark Tracks</div>
                      <div className="text-[8.5px] text-slate-300 font-sans leading-tight mt-0.5">
                        Global models: <span className="text-[#10E7A2]">IMD-GFS</span>, <span className="text-[#D946EF]">ECMWF</span>, <span className="text-[#F59E0B]">NCUM</span>.
                      </div>
                    </div>
                  </div>

                  {/* Ensemble Spaghetti Plot */}
                  <div className="flex items-start gap-1.5 px-2 py-1 rounded-lg bg-[#050B14]/70 border border-[#1E3252]">
                    <div className="w-5 h-3.5 flex items-center justify-center shrink-0 mt-0.5">
                      <Zap className="w-3 h-3 text-pink-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-pink-400 text-[10px] leading-tight">30 Possible Paths (Ensemble)</div>
                      <div className="text-[8.5px] text-slate-300 font-sans leading-tight mt-0.5">
                        Path variations measuring scenario spread &amp; confidence.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Markers & Waypoints */}
              <div>
                <span className="text-[8px] font-mono uppercase tracking-wider font-bold text-[#00F2FE] block mb-1">
                  2. Map Waypoints &amp; Key Pins
                </span>
                <div className="space-y-1 text-xs font-mono">
                  {/* Eye / Current LLCC */}
                  <div className="flex items-start gap-1.5 px-2 py-1 rounded-lg bg-[#050B14]/70 border border-[rgba(0,242,254,0.2)]">
                    <div className="w-5 h-3.5 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-3 h-3 rounded-full border-2 border-[#00F2FE] bg-[#00F2FE]/30 animate-pulse flex items-center justify-center">
                        <span className="w-1 h-1 rounded-full bg-[#00F2FE]" />
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white text-[10px] leading-tight">Current Eye / LLCC (Hour 0)</div>
                      <div className="text-[8.5px] text-slate-300 font-sans leading-tight mt-0.5">
                        Real-time low-level circulation center fix.
                      </div>
                    </div>
                  </div>

                  {/* Forecast Waypoint Node */}
                  <div className="flex items-start gap-1.5 px-2 py-1 rounded-lg bg-[#050B14]/70 border border-[#1E3252]">
                    <div className="w-5 h-3.5 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-2.5 h-2.5 rounded-full border-2 border-[#00F2FE] bg-[#050B14] flex items-center justify-center">
                        <span className="w-1 h-1 rounded-full bg-[#00F2FE]" />
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[#00F2FE] text-[10px] leading-tight">Projected Waypoint Nodes</div>
                      <div className="text-[8.5px] text-slate-300 font-sans leading-tight mt-0.5">
                        Hover node to view Vmax, central pressure (Pc) &amp; GPS.
                      </div>
                    </div>
                  </div>

                  {/* Landfall Marker */}
                  <div className="flex items-start gap-1.5 px-2 py-1 rounded-lg bg-[#050B14]/70 border border-[rgba(255,94,54,0.35)]">
                    <div className="w-5 h-3.5 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-2.5 h-2.5 rotate-45 border-2 border-[#FF5E36] bg-[#FF5E36]/30 flex items-center justify-center">
                        <span className="w-0.5 h-0.5 bg-[#FF5E36]" />
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[#FF5E36] text-[10px] leading-tight">Landfall Impact Beacon</div>
                      <div className="text-[8.5px] text-slate-300 font-sans leading-tight mt-0.5">
                        Forecast coastal intercept point. Click to open modal.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dismiss hint */}
              <div className="mt-1.5 pt-1.5 border-t border-[#1E3252] flex items-center justify-between text-[8px] text-[#8E9EB5]">
                <span>CYCLO-AI GIS Symbology</span>
                <span className="text-[#00F2FE]">ESC / [X] to dismiss</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP RIGHT / FLOATING: Map Control Tools Bar (Controls 4, 5, 6, 7, 8, 9) */}
      <div className="absolute top-3 right-3 z-30 flex flex-col items-end gap-2">
        {/* Main Tools Container */}
        <div className="bg-[#0F1B2F]/90 backdrop-blur-md border border-[rgba(0,242,254,0.22)] p-1 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col gap-1">
          {/* 7. Zoom In (+) */}
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 rounded-lg bg-[#050B14]/80 hover:bg-[#1E3252] border border-[#1E3A5F] hover:border-[#00F2FE]/50 text-white flex items-center justify-center transition-all cursor-pointer"
            title="Zoom In (+)"
          >
            <ZoomIn className="w-4 h-4 text-[#8E9EB5] hover:text-[#00F2FE]" />
          </button>

          {/* 8. Zoom Out (-) */}
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 rounded-lg bg-[#050B14]/80 hover:bg-[#1E3252] border border-[#1E3A5F] hover:border-[#00F2FE]/50 text-white flex items-center justify-center transition-all cursor-pointer"
            title="Zoom Out (-)"
          >
            <ZoomOut className="w-4 h-4 text-[#8E9EB5] hover:text-[#00F2FE]" />
          </button>

          {/* 5. Center on Landfall */}
          <button
            onClick={handleCenterLandfall}
            className="w-8 h-8 rounded-lg bg-[#050B14]/80 hover:bg-[#FF5E36]/20 border border-[#1E3A5F] hover:border-[#FF5E36]/60 text-white flex items-center justify-center transition-all cursor-pointer group"
            title="Center on Landfall Pin"
          >
            <Crosshair className="w-4 h-4 text-[#8E9EB5] group-hover:text-[#FF5E36] transition-colors" />
          </button>

          {/* 9. Fullscreen Map Toggle */}
          <button
            onClick={handleToggleFullscreen}
            className="w-8 h-8 rounded-lg bg-[#050B14]/80 hover:bg-[#1E3252] border border-[#1E3A5F] hover:border-[#00F2FE]/50 text-white flex items-center justify-center transition-all cursor-pointer"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Map"}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 text-[#00F2FE]" />
            ) : (
              <Maximize2 className="w-4 h-4 text-[#8E9EB5] hover:text-[#00F2FE]" />
            )}
          </button>
        </div>
      </div>

      {/* BOTTOM LEFT: Map Layers & Symbology Toggles */}
      <div className="absolute bottom-3 left-3 z-30 flex flex-col items-start gap-1.5 pointer-events-auto">
        <div className="bg-[#0F1B2F]/90 backdrop-blur-md border border-[rgba(0,242,254,0.22)] p-1.5 rounded-xl shadow-lg flex flex-col gap-1.5 text-xs font-rajdhani">
          {/* Map Legend Toggle */}
          <button
            id="toggle-map-legend-btn"
            onClick={() => setIsLegendOpen((prev) => !prev)}
            className={`px-2.5 py-1 rounded-lg border font-bold flex items-center justify-between gap-2 transition-all cursor-pointer ${
              isLegendOpen
                ? "bg-[#00F2FE]/20 border-[#00F2FE] text-[#00F2FE] shadow-[0_0_10px_rgba(0,242,254,0.35)]"
                : "bg-[#050B14]/80 border-[#1E3A5F] text-[#8E9EB5] hover:text-white"
            }`}
            title="Toggle Map Symbology Legend"
          >
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Map Legend</span>
            </div>
            <span
              className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold tracking-wider leading-none transition-colors ${
                isLegendOpen
                  ? "bg-[#00F2FE] text-[#050B14]"
                  : "bg-[#00F2FE]/20 text-[#00F2FE]"
              }`}
            >
              {isLegendOpen ? "HIDE" : "VIEW"}
            </span>
          </button>

          {/* 4. Possible Paths Toggle */}
          <button
            onClick={onToggleSpaghetti}
            className={`px-2.5 py-1 rounded-lg border font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isSpaghettiActive
                ? "bg-[#00F2FE]/20 border-[#00F2FE] text-[#00F2FE] shadow-[0_0_10px_rgba(0,242,254,0.35)]"
                : "bg-[#050B14]/80 border-[#1E3A5F] text-[#8E9EB5] hover:text-white"
            }`}
            title="Toggle 30 possible path predictions"
          >
            <Zap className={`w-3.5 h-3.5 ${isSpaghettiActive ? "text-[#00F2FE]" : "text-[#8E9EB5]"}`} />
            <span>Possible Paths {isSpaghettiActive ? "ON" : "OFF"}</span>
          </button>

          {/* 6. Uncertainty Cone Toggle */}
          <button
            onClick={onToggleCone}
            className={`px-2.5 py-1 rounded-lg border font-bold flex items-center justify-between gap-2 transition-all cursor-pointer ${
              isConeVisible
                ? "bg-[#00F2FE]/20 border-[#00F2FE] text-[#00F2FE] shadow-[0_0_10px_rgba(0,242,254,0.35)]"
                : "bg-[#050B14]/80 border-[#1E3A5F] text-[#8E9EB5] hover:text-white"
            }`}
            title="Toggle Cone of Uncertainty visibility"
          >
            <div className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>Cone Bounds</span>
            </div>
            <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
              isConeVisible ? "bg-[#00F2FE] border-[#00F2FE] text-[#050B14]" : "border-[#8E9EB5]/40"
            }`}>
              {isConeVisible && <Check className="w-2.5 h-2.5 stroke-[3]" />}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
