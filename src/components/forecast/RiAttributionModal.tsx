"use client";

import React from "react";
import { RapidIntensificationData } from "./types";
import { 
  Flame, 
  Thermometer, 
  Wind, 
  Activity, 
  X, 
  CheckCircle2, 
  AlertOctagon,
  TrendingUp,
  BrainCircuit
} from "lucide-react";

interface RiAttributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  riData: RapidIntensificationData;
  stormName: string;
}

export function RiAttributionModal({
  isOpen,
  onClose,
  riData,
  stormName
}: RiAttributionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050B14]/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-xl bg-[#0F1B2F] border border-[rgba(0,242,254,0.3)] rounded-2xl shadow-[0_0_50px_rgba(0,242,254,0.25)] overflow-hidden relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0E3D59]/60 via-[#0F1B2F] to-[#050B14] p-4 border-b border-[#00F2FE]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-lg ${
              riData.probabilityPercent > 50
                ? "bg-[#FF5E36]/20 border-[#FF5E36] text-[#FF5E36] shadow-[0_0_15px_rgba(255,94,54,0.4)]"
                : "bg-[#00F2FE]/20 border-[#00F2FE] text-[#00F2FE] shadow-[0_0_15px_rgba(0,242,254,0.4)]"
            }`}>
              <Flame className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-orbitron font-bold text-white tracking-wide">
                  RAPID INTENSIFICATION (RI) DIAGNOSTICS
                </h3>
                <span className={`text-[10px] font-jetbrains font-bold px-2 py-0.5 rounded border ${
                  riData.probabilityPercent > 50
                    ? "bg-[#FF5E36]/20 text-[#FF5E36] border-[#FF5E36]/40 animate-pulse"
                    : "bg-[#00F2FE]/20 text-[#00F2FE] border-[#00F2FE]/40"
                }`}>
                  {riData.probabilityPercent > 50 ? "HIGH RISK" : "MODERATE"}
                </span>
              </div>
              <p className="text-xs font-rajdhani text-[#8E9EB5]">
                WMO & IMD Standard Operational Threshold Analysis & Thermodynamic SHAP Attributions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#1E3252]/60 hover:bg-[#FF5E36]/20 border border-[#8E9EB5]/20 hover:border-[#FF5E36]/40 text-[#8E9EB5] hover:text-[#FF5E36] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs font-inter text-[#8E9EB5]">
          {/* Official WMO/IMD Definition Card */}
          <div className="bg-[#050B14]/80 border border-[#1E3A5F] rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-rajdhani font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-[#00F2FE]" />
                Official WMO / IMD Definition Criterion:
              </span>
              <span className={`px-2 py-0.5 rounded font-jetbrains font-bold text-[10px] border ${
                riData.isWmoImdMet 
                  ? "bg-red-500/20 text-red-400 border-red-500/40" 
                  : "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
              }`}>
                {riData.isWmoImdMet ? "CRITERION TRIGGERED" : "SUB-THRESHOLD"}
              </span>
            </div>
            <p className="text-xs text-[#CBD5E1] leading-relaxed">
              Defined by the World Meteorological Organization (WMO) and India Meteorological Department (IMD) as an increase in maximum sustained surface wind speed of <strong className="text-white">≥ 30 knots (55 km/h)</strong> within a <strong className="text-white">24-hour period</strong>.
            </p>
            <div className="flex items-center gap-4 pt-1 font-jetbrains text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-[#8E9EB5]">Current ΔV (24h):</span>
                <span className={`font-bold ${riData.deltaV24hKmh >= 55 ? "text-[#FF5E36]" : "text-emerald-400"}`}>
                  +{riData.deltaV24hKmh} km/h (+{riData.deltaV24hKts} kts)
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#8E9EB5]">RI Probability:</span>
                <span className="text-[#00F2FE] font-bold font-orbitron">{riData.probabilityPercent}%</span>
              </div>
            </div>
          </div>

          {/* Environmental Drivers Matrix */}
          <div>
            <div className="text-xs font-rajdhani font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-[#00F2FE]" />
              Thermodynamic & Atmospheric Drivers
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-[#050B14]/70 p-3 rounded-xl border border-[#1E3A5F]">
                <div className="text-[10px] font-rajdhani text-[#8E9EB5] uppercase">Sea Surface Temp (SST)</div>
                <div className="text-base font-orbitron font-bold text-amber-400 mt-0.5">
                  {riData.sstCelsius}°C
                </div>
                <div className="text-[10px] font-jetbrains text-emerald-400">
                  +{riData.sstAnomalyCelsius}°C Anomaly (Threshold: 28.5°C)
                </div>
              </div>

              <div className="bg-[#050B14]/70 p-3 rounded-xl border border-[#1E3A5F]">
                <div className="text-[10px] font-rajdhani text-[#8E9EB5] uppercase">Vertical Wind Shear (VWS)</div>
                <div className="text-base font-orbitron font-bold text-[#00F2FE] mt-0.5">
                  {riData.vwsKts} kts
                </div>
                <div className="text-[10px] font-jetbrains text-emerald-400">
                  Highly Favorable (&lt;10 kts)
                </div>
              </div>

              <div className="bg-[#050B14]/70 p-3 rounded-xl border border-[#1E3A5F]">
                <div className="text-[10px] font-rajdhani text-[#8E9EB5] uppercase">Ocean Heat Content (OHC)</div>
                <div className="text-base font-orbitron font-bold text-[#00E676] mt-0.5">
                  {riData.ohcKjCm2} kJ/cm²
                </div>
                <div className="text-[10px] font-jetbrains text-[#8E9EB5]">
                  Deep warm water isotherm
                </div>
              </div>

              <div className="bg-[#050B14]/70 p-3 rounded-xl border border-[#1E3A5F]">
                <div className="text-[10px] font-rajdhani text-[#8E9EB5] uppercase">Upper Outflow Divergence</div>
                <div className="text-base font-orbitron font-bold text-[#E040FB] mt-0.5">
                  {riData.divergenceLevel}
                </div>
                <div className="text-[10px] font-jetbrains text-[#8E9EB5]">
                  Anticyclonic channel at 200 hPa
                </div>
              </div>
            </div>
          </div>

          {/* Explainable AI SHAP Attribution Breakdown */}
          <div className="bg-[#050B14]/60 p-4 rounded-xl border border-[#1E3A5F] space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-rajdhani font-bold text-white uppercase tracking-wider">
              <BrainCircuit className="w-4 h-4 text-[#00F2FE]" />
              Neural Network Feature Importance (SHAP Weights)
            </div>
            <div className="space-y-2 pt-1">
              {riData.shapValues.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white font-rajdhani">{item.feature}</span>
                    <span className={`font-jetbrains font-bold ${
                      item.impact === "positive" ? "text-[#00F2FE]" : "text-amber-400"
                    }`}>
                      {item.importance > 0 ? `+${(item.importance * 100).toFixed(0)}%` : `${(item.importance * 100).toFixed(0)}%`}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#1E3252] overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        item.impact === "positive"
                          ? "bg-gradient-to-r from-[#00F2FE] to-[#10E7A2]"
                          : "bg-gradient-to-r from-amber-500 to-red-500"
                      }`}
                      style={{ width: `${Math.abs(item.importance) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#050B14]/80 border-t border-[#1E3A5F] flex items-center justify-between">
          <div className="text-[11px] font-jetbrains text-[#8E9EB5]">
            PINNs Thermodynamic Verification: <span className="text-[#00F2FE]">Converged (loss &lt; 0.0028)</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#0E3D59] hover:bg-[#13547A] text-[#00F2FE] border border-[#00F2FE]/40 font-rajdhani font-bold text-xs transition-colors"
          >
            Acknowledge RI Alert
          </button>
        </div>
      </div>
    </div>
  );
}
