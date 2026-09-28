"use client";

import React, { useState } from "react";
import { 
  UploadCloud, 
  CheckCircle2, 
  X, 
  Database,
} from "lucide-react";
import { ImageUploader } from "@/components/analyzer/ImageUploader";
import Noise from "@/components/ui/Noise";

export interface IngestionSample {
  id: string;
  name: string;
  storm: string;
  basin: string;
  sensor: string;
  date: string;
  format: string;
  size: string;
  llcc: string;
  vmax: string;
  pc: string;
}

interface ScientificUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadSample: (sample: IngestionSample) => void;
  onCustomFileSelect: (file: File) => void;
}

export function ScientificUploadModal({
  isOpen,
  onClose,
  onLoadSample,
  onCustomFileSelect,
}: ScientificUploadModalProps) {
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  if (!isOpen) return null;

  const benchmarkSamples: IngestionSample[] = [
    {
      id: "biparjoy",
      name: "INSAT3DR_TIR1_20230611_BIPARJOY.h5",
      storm: "Extremely Severe Cyclone Biparjoy",
      basin: "Arabian Sea (04A)",
      sensor: "INSAT-3DR Imager TIR-1 (10.8 µm)",
      date: "11-JUN-2023 09:00 UTC",
      format: "HDF5 Scientific Data Cube",
      size: "48.2 MB",
      llcc: "18.8°N, 67.8°E",
      vmax: "165 km/h",
      pc: "956 hPa",
    },
    {
      id: "arnab",
      name: "INSAT3D_TIR1_20230514_ARNAB.nc",
      storm: 'Super Cyclonic Storm "ARNAB"',
      basin: "Bay of Bengal (01B)",
      sensor: "INSAT-3D Multi-Spectral TIR-1/TIR-2",
      date: "14-MAY-2023 03:30 UTC",
      format: "NetCDF-4 (CF-1.8 Compliant)",
      size: "62.4 MB",
      llcc: "19.5°N, 92.4°E",
      vmax: "215 km/h",
      pc: "931 hPa",
    },
    {
      id: "remal",
      name: "GOES16_ABI_L2_CMIPF_REMAL.tiff",
      storm: "Severe Cyclonic Storm Remal",
      basin: "North Bay of Bengal",
      sensor: "INSAT-3DR Rapid-Scan 5-Min",
      date: "26-MAY-2024 15:00 UTC",
      format: "GeoTIFF (EPSG:4326 Cloud Grid)",
      size: "34.1 MB",
      llcc: "21.6°N, 89.2°E",
      vmax: "120 km/h",
      pc: "978 hPa",
    },
  ];

  const handleApplyPreset = (sample: IngestionSample) => {
    onLoadSample(sample);
    onClose();
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-start justify-center pt-24 px-4 pb-4 animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden max-h-[85vh]"
        style={{
          background: "#0C1727",
          border: "1.5px solid rgba(0, 242, 254, 0.55)",
          boxShadow: "0 0 0 1px rgba(0,242,254,0.10), 0 20px 60px rgba(0,0,0,0.9), 0 0 32px rgba(0,242,254,0.14)",
        }}
      >
        <Noise
          patternSize={250}
          patternScaleX={1.5}
          patternScaleY={1.5}
          patternRefreshInterval={2}
          patternAlpha={6}
        />
        <div className="relative z-[1] p-6 space-y-5 overflow-y-auto max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1E3252]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00F2FE]/15 border border-[#00F2FE]/40 flex items-center justify-center text-[#00F2FE]">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-rajdhani text-base font-black uppercase tracking-wider">
                <span className="heading-gradient-shadow-wrapper">
                  <span className="heading-moving-gradient font-black font-rajdhani uppercase tracking-wider">
                    Multi-Source Scientific File Ingestion
                  </span>
                </span>
              </h3>
              <p className="text-xs font-mono" style={{ color: "#00F2FE", textShadow: "2px 3px 8px rgba(0,0,0,0.95)" }}>
                Parse raw multi-band satellite cubes, HDF5 matrices &amp; GeoTIFF rasters
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Existing ImageUploader Component */}
        <div>
          <div className="mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wide" style={{ color: "#00F2FE", textShadow: "2px 3px 8px rgba(0,0,0,0.95)" }}>
              Drag &amp; Drop Satellite Image
            </span>
          </div>
          <ImageUploader 
            onImageSelect={(file) => {
              setUploadedFileName(file.name);
              onCustomFileSelect(file);
            }}
          />
        </div>


        </div>
      </div>
    </div>
  );
}
