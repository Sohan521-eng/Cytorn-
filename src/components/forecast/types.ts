export type ForecastHorizon = "+6h" | "+12h" | "+24h" | "+48h" | "+72h" | "+120h";

export type ForecastMode = 
  | "deterministic" // Single high-confidence PINN trajectory
  | "ensemble"      // 30 perturbation members spaghetti plot
  | "nwp_benchmark"; // AI vs. NWP Benchmark Mode (ECMWF, IMD-GFS, NCMRWF)

export type SpeedUnit = "km/h" | "knots";

export interface Waypoint {
  hour: number;
  label: string; // e.g., "-24h", "0h", "+6h", "+36h", "+120h"
  lat: number;
  lng: number;
  vmaxKmh: number;
  vmaxKts: number;
  pcHpa: number;
  category: string;
  isPast?: boolean;
  isLandfall?: boolean;
}

export interface EnsembleMember {
  id: number;
  name: string;
  color: string;
  points: [number, number][]; // [lng, lat]
  landfallErrorKm: number;
}

export interface NwpModelTrack {
  id: "cyclo_ai" | "ecmwf" | "imd_gfs" | "ncmrwf";
  name: string;
  fullName: string;
  color: string;
  error24hKm: number;
  error48hKm: number;
  error72hKm: number;
  landfallTarget: string;
  landfallCoords: [number, number]; // [lat, lng]
  points: [number, number][]; // [lng, lat]
  enabled: boolean;
}

export interface LandfallInfo {
  targetDistrict: string;
  targetState: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  landfallHourOffset: number; // e.g. 38.25 (T+38h 15m)
  targetTimestamp: string;
  uncertaintyWindowHours: number; // e.g. 3.5 (+/- 3.5h)
  projectedSurgeMeters: number; // e.g. 3.2m
  peakWindSpeedKmh: number;
  peakWindSpeedKts: number;
  centralPressureHpa: number;
  affectedBlocks: string[];
  evacuationStatus: string;
}

export interface RapidIntensificationData {
  probabilityPercent: number; // e.g. 78.4%
  isWmoImdMet: boolean; // >= 30 knots (55 km/h) in 24 hours
  deltaV24hKmh: number;
  deltaV24hKts: number;
  sstCelsius: number; // Sea Surface Temperature
  sstAnomalyCelsius: number; // Anomaly above 28.5C threshold
  vwsKts: number; // Vertical Wind Shear
  ohcKjCm2: number; // Ocean Heat Content
  divergenceLevel: "High" | "Moderate" | "Low";
  shapValues: {
    feature: string;
    importance: number;
    impact: "positive" | "negative";
  }[];
}

export interface StormScenario {
  id: string;
  name: string;
  code: string;
  basin: string;
  activeStatus: string;
  currentLlcc: {
    lat: number;
    lng: number;
  };
  currentVmaxKmh: number;
  currentPcHpa: number;
  pastTrack: Waypoint[];
  forecastTrack: Waypoint[];
  ensembleMembers: EnsembleMember[];
  nwpModels: NwpModelTrack[];
  landfall: LandfallInfo;
  rapidIntensification: RapidIntensificationData;
}
