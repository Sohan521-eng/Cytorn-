import { create } from "zustand";
import { CycloneData } from "@/types";

interface CycloneStoreState {
  // Active storm selection
  activeStormId: string | null;
  activeBasin: "All" | "Bay of Bengal" | "Arabian Sea" | "Global";
  
  // Time scrubber state
  selectedTimestamp: string | null;
  playbackSpeed: 1 | 2 | 4;
  isPlaying: boolean;
  timeRange: [number, number]; // e.g. [-72, 72] hours

  // Live storm data collection
  cyclones: CycloneData[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setActiveStormId: (id: string | null) => void;
  setActiveBasin: (basin: "All" | "Bay of Bengal" | "Arabian Sea" | "Global") => void;
  setSelectedTimestamp: (timestamp: string | null) => void;
  setPlaybackSpeed: (speed: 1 | 2 | 4) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setTimeRange: (range: [number, number]) => void;
  setCyclones: (cyclones: CycloneData[]) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCycloneStore = create<CycloneStoreState>((set) => ({
  activeStormId: "BOB-02-ARNAB",
  activeBasin: "Bay of Bengal",
  selectedTimestamp: null,
  playbackSpeed: 1,
  isPlaying: false,
  timeRange: [-24, 48],
  cyclones: [],
  isLoading: false,
  error: null,

  setActiveStormId: (id) => set({ activeStormId: id }),
  setActiveBasin: (basin) => set({ activeBasin: basin }),
  setSelectedTimestamp: (timestamp) => set({ selectedTimestamp: timestamp }),
  setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setTimeRange: (range) => set({ timeRange: range }),
  setCyclones: (cyclones) => set({ cyclones }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
