"use client";

import React, { useState } from "react";
import { Bot } from "lucide-react";
import PixelTransition from "@/components/ui/PixelTransition";
import GradientText from "@/components/ui/GradientText";
import XaiAssistantPanel from "@/components/xai/XaiAssistantPanel";

export interface XaiFloatingWidgetProps {
  stormName?: string;
}

export function XaiFloatingWidget({ stormName = 'CYCLONE "ARNAB"' }: XaiFloatingWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Tactical Trigger (Rounded Rectangle with React Bits PixelTransition) */}
      <aside aria-label="Cyclone AI Assistant" className="fixed bottom-6 right-6 z-40 pointer-events-auto">
        <PixelTransition
          firstContent={
            <div className="flex items-center gap-2.5 px-3 sm:px-3.5 h-full whitespace-nowrap">
              {/* Proportional Robot Icon */}
              <Bot className="w-6 h-6 text-[#00F2FE] shrink-0 drop-shadow-[0_0_8px_rgba(0,242,254,0.7)]" strokeWidth={2.2} />

              {/* Text Block */}
              <div className="flex flex-col justify-center text-left font-rajdhani">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider leading-tight">
                  <GradientText
                    colors={["#9333EA", "#A855F7", "#FF5E36", "#F97316", "#FF5E36", "#A855F7", "#9333EA"]}
                    animationSpeed={4}
                  >
                    CYCLONE AI ASSISTANT
                  </GradientText>
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#00F2FE] font-jakarta font-semibold block leading-tight mt-0.5 tracking-tight">
                  Explain Model Predictions
                </span>
              </div>
            </div>
          }
          secondContent={
            <div className="flex items-center gap-2.5 px-3.5 sm:px-4 h-full w-full whitespace-nowrap bg-[#030914]">
              {/* Proportional Robot Icon (Active State) */}
              <Bot className="w-6 h-6 text-[#00F2FE] shrink-0 animate-pulse drop-shadow-[0_0_10px_#00F2FE]" strokeWidth={2.2} />

              {/* Text Block */}
              <div className="flex flex-col justify-center text-left font-rajdhani">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#00F2FE] leading-tight">
                  AI REASONING STUDIO
                </span>
                <span className="text-[10px] sm:text-[11px] text-white/90 font-jakarta font-semibold block leading-tight mt-0.5 tracking-tight">
                  Inspect Decision Drivers →
                </span>
              </div>
            </div>
          }
          gridSize={12}
          pixelColor="#00F2FE"
          animationStepDuration={0.35}
          aspectRatio="0"
          className="pixel-pill-button"
          onClick={() => setIsOpen(true)}
          title="Open Cyclone AI Assistant"
          ariaLabel="Cyclone AI Assistant - Explain Model Predictions"
        />
      </aside>

      {/* Slide-Over Drawer Modal */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-end p-2 sm:p-6 transition-opacity animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl h-[90vh] max-h-[720px] flex flex-col animate-in slide-in-from-right duration-300"
          >
            <XaiAssistantPanel 
              stormName={stormName}
              onClose={() => setIsOpen(false)}
              className="h-full"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default XaiFloatingWidget;
