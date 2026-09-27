"use client";

import React from "react";
import { NwpModelTrack } from "./types";
import Noise from "@/components/ui/Noise";
import { Check } from "lucide-react";

interface NwpComparisonMatrixProps {
  models: NwpModelTrack[];
  onToggleModel: (modelId: string) => void;
}

export function NwpComparisonMatrix({
  models,
  onToggleModel,
}: NwpComparisonMatrixProps) {
  return (
    <div 
      id="nwp-comparison-matrix"
      className="w-full bg-[#0F1B2F]/95 backdrop-blur-md border border-[#00F2FE]/60 rounded-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(0,242,254,0.18)] flex flex-col gap-3 relative overflow-hidden"
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl z-0">
        <Noise 
          patternSize={250} 
          patternScaleX={1} 
          patternScaleY={1} 
          patternRefreshInterval={3} 
          patternAlpha={10} 
        />
      </div>

      {/* Background accents */}
      <div className="absolute top-0 right-0 w-48 h-20 bg-[#00F2FE]/5 blur-2xl pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-48 h-20 bg-[#FF5E36]/5 blur-2xl pointer-events-none z-0" />

      {/* Main content layer */}
      <div className="relative z-10 flex flex-col gap-3">

      {/* Header */}
      <div className="border-b border-[#1E3A5F] pb-2.5">
        <h3 className="text-sm font-orbitron font-bold text-[#00F2FE] tracking-wide [text-shadow:0_2px_4px_rgba(0,0,0,0.95)]">
          FORECAST ACCURACY &amp; MODEL COMPARISON
        </h3>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-xs font-inter border-collapse">
          <thead>
            <tr className="border-b border-[#1E3A5F] text-[10.5px] font-rajdhani font-bold text-[#FF5E36] [text-shadow:0_2px_4px_rgba(0,0,0,0.95)] uppercase tracking-wider">
              <th className="py-2 px-2.5 whitespace-nowrap">Show on Map</th>
              <th className="py-2 px-2.5 whitespace-nowrap">Weather Model</th>
              <th className="py-2 px-2.5 text-center whitespace-nowrap">24h Error (Day 1)</th>
              <th className="py-2 px-2.5 text-center whitespace-nowrap">48h Error (Day 2)</th>
              <th className="py-2 px-2.5 text-center whitespace-nowrap">72h Error (Day 3)</th>
              <th className="py-2 px-2.5 whitespace-nowrap">Predicted Landfall Location</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E3A5F]/60">
            {models.map((model) => {
              const isAi = model.id === "cyclo_ai";

              const simpleDesc = 
                model.id === "cyclo_ai" 
                  ? "Physics-Guided AI Model (Our Proposed System)"
                  : model.id === "ecmwf" 
                    ? "European Weather Agency (Top Global Model)"
                    : model.id === "imd_gfs" 
                      ? "India Meteorological Department (Official National Model)"
                      : model.id === "ncmrwf" 
                        ? "India National Medium-Range Weather Research Center"
                        : model.fullName;

              return (
                <tr 
                  key={model.id}
                  className={`hover:bg-[#1E3252]/30 transition-colors ${
                    isAi ? "bg-[#00F2FE]/5" : ""
                  }`}
                >
                  {/* Checkbox */}
                  <td className="py-2.5 px-2.5 whitespace-nowrap">
                    <label className="flex items-center gap-2 cursor-pointer" title="Click to show or hide this track on the map">
                      <input
                        type="checkbox"
                        checked={model.enabled}
                        onChange={() => onToggleModel(model.id)}
                        className="sr-only"
                      />
                      <div 
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                          model.enabled
                            ? "border-transparent"
                            : "border-[#8E9EB5]/40 bg-[#050B14]"
                        }`}
                        style={{ backgroundColor: model.enabled ? model.color : undefined }}
                      >
                        {model.enabled && <Check className="w-3 h-3 text-[#050B14] stroke-[3]" />}
                      </div>
                      <span 
                        className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                        style={{ backgroundColor: model.color }}
                      />
                    </label>
                  </td>

                  {/* Model Name */}
                  <td className="py-2.5 px-2.5">
                    <div className="font-jetbrains font-bold text-white text-xs [text-shadow:0_2px_4px_rgba(0,0,0,0.95)] whitespace-nowrap">
                      {model.name}
                    </div>
                    <div className="text-[10px] text-[#8E9EB5] font-rajdhani truncate max-w-[240px] [text-shadow:0_1px_3px_rgba(0,0,0,0.95)]">
                      {simpleDesc}
                    </div>
                  </td>

                  {/* 24h Error */}
                  <td className="py-2.5 px-2.5 text-center font-jetbrains whitespace-nowrap">
                    <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded font-bold whitespace-nowrap [text-shadow:0_2px_4px_rgba(0,0,0,0.95)] ${
                      isAi 
                        ? "bg-[#00F2FE]/15 text-[#00F2FE] border border-[#00F2FE]/30 shadow-[0_0_8px_rgba(0,242,254,0.15)]" 
                        : "text-white"
                    }`}>
                      {model.error24hKm} km
                    </span>
                  </td>

                  {/* 48h Error */}
                  <td className="py-2.5 px-2.5 text-center font-jetbrains font-medium text-[#CBD5E1] whitespace-nowrap [text-shadow:0_2px_4px_rgba(0,0,0,0.95)]">
                    {model.error48hKm} km
                  </td>

                  {/* 72h Error */}
                  <td className="py-2.5 px-2.5 text-center font-jetbrains font-medium text-[#CBD5E1] whitespace-nowrap [text-shadow:0_2px_4px_rgba(0,0,0,0.95)]">
                    {model.error72hKm} km
                  </td>

                  {/* Projected Landfall Target */}
                  <td className="py-2.5 px-2.5 font-rajdhani font-semibold text-white whitespace-nowrap [text-shadow:0_2px_4px_rgba(0,0,0,0.95)]">
                    📍 {model.landfallTarget}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Easy-to-understand Guidance Note */}
      <div className="pt-2 border-t border-[#1E3A5F]/60 flex items-center text-[10px] font-inter text-[#8E9EB5]">
        <span className="flex items-center gap-1 text-[#38BDF8] [text-shadow:0_2px_4px_rgba(0,0,0,0.95)]">
          <span>💡</span>
          <span><strong>How to read:</strong> Lower error (km) means higher accuracy (the prediction is closer to the cyclone's real path).</span>
        </span>
      </div>
      </div>
    </div>
  );
}
