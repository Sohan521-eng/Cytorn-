"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bot, User, Sparkles, X, RefreshCw } from "lucide-react";
import PixelCard from "@/components/ui/PixelCard";
import GradientText from "@/components/ui/GradientText";
import ExplainPill from "@/components/ui/ExplainPill";

export interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export interface XaiAssistantPanelProps {
  onClose?: () => void;
  className?: string;
  stormName?: string;
}

const DYNAMIC_SUGGESTION_MAP: Record<string, string[]> = {
  intensity: [
    "Wind shear & SST triggering Rapid Intensification?",
    "What central pressure drop is expected in 12h?",
    "ConvNeXt-ViT vs manual Dvorak rules?",
  ],
  vision: [
    "Explain Grad-CAM eyewall attention heatmap",
    "Which convolution layers weighted the core?",
    "How is INSAT-3DR combined with Oceansat-3?",
  ],
  track: [
    "How is PINN projecting the 120h track cone?",
    "Projected landfall time window and stretch?",
    "What steering flows at 500 hPa govern the track?",
  ],
  hazard: [
    "What peak storm surge heights are projected?",
    "Recommended evacuation lead times for this category?",
    "Which administrations received automated alerts?",
  ],
};

const ROTATION_POOLS: string[][] = [
  [
    "Why is the cyclone classified as strong?",
    "Explain Grad-CAM eyewall attention heatmap",
    "How is PINN projecting the 120h track cone?",
  ],
  [
    "Why is the predicted intensity increasing?",
    "What cloud structures triggered model confidence?",
    "What peak storm surge heights are projected?",
  ],
  [
    "Projected landfall time window and stretch?",
    "ConvNeXt-ViT vs manual Dvorak rules?",
    "Wind shear & SST triggering Rapid Intensification?",
  ],
  [
    "How is INSAT-3DR combined with Oceansat-3?",
    "What steering flows at 500 hPa govern the track?",
    "Recommended evacuation lead times for this category?",
  ],
];

export default function XaiAssistantPanel({
  onClose,
  className = "",
  stormName = 'CYCLONE "ARNAB"',
}: XaiAssistantPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-msg",
      sender: "ai",
      text: `CYBER-XAI Engine online. I am monitoring active multi-spectral telemetry for ${stormName}. Ask me anything about current classifications, confidence scores, Dvorak pattern features, or intensity trends.`,
      timestamp: "12:00 UTC",
    },
  ]);
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([
    "Why is the cyclone classified as strong?",
    "Explain the Grad-CAM eyewall attention heatmap",
    "How is the PINN model projecting the 120h track cone?",
  ]);
  const [poolIndex, setPoolIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom of messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAnalyzing]);

  const handleShuffle = () => {
    const nextIdx = (poolIndex + 1) % ROTATION_POOLS.length;
    setPoolIndex(nextIdx);
    setCurrentSuggestions(ROTATION_POOLS[nextIdx].slice(0, 3));
  };

  const handleSend = (queryText?: string) => {
    const textToSend = (queryText || input).trim();
    if (!textToSend) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput("");
    setIsAnalyzing(true);

    // Update dynamic suggestions contextually based on query topic
    const lower = textToSend.toLowerCase();
    if (lower.includes("strong") || lower.includes("classified") || lower.includes("category")) {
      setCurrentSuggestions(DYNAMIC_SUGGESTION_MAP.intensity);
    } else if (lower.includes("intensity") || lower.includes("increasing") || lower.includes("ri") || lower.includes("sst") || lower.includes("shear")) {
      setCurrentSuggestions(DYNAMIC_SUGGESTION_MAP.hazard);
    } else if (lower.includes("grad-cam") || lower.includes("heatmap") || lower.includes("attention") || lower.includes("cloud") || lower.includes("confidence")) {
      setCurrentSuggestions(DYNAMIC_SUGGESTION_MAP.vision);
    } else if (lower.includes("pinn") || lower.includes("track") || lower.includes("cone") || lower.includes("trajectory") || lower.includes("120h")) {
      setCurrentSuggestions(DYNAMIC_SUGGESTION_MAP.track);
    } else if (lower.includes("landfall") || lower.includes("surge") || lower.includes("evacuation") || lower.includes("alert")) {
      setCurrentSuggestions(DYNAMIC_SUGGESTION_MAP.intensity);
    } else {
      const nextPool = ROTATION_POOLS[(poolIndex + 1) % ROTATION_POOLS.length];
      setPoolIndex((prev) => (prev + 1) % ROTATION_POOLS.length);
      setCurrentSuggestions(nextPool.filter((p) => p !== textToSend).slice(0, 3));
    }

    // Simulate XAI reasoning delay & contextual analytical response
    setTimeout(() => {
      let aiResponse = "";

      if (lower.includes("strong") || lower.includes("classified") || lower.includes("category")) {
        aiResponse = `The cyclone is classified as Strong (Category 3 equivalent) primarily because the current maximum sustained surface wind is locked at 72 kt (133 km/h), with central pressure dropping to 942 hPa. Furthermore, our ConvNeXt-ViT vision model identified a tightly wound, highly organized eyewall structure matching Dvorak pattern T4.5 / CI5.0.`;
      } else if (lower.includes("intensity increasing") || lower.includes("increasing") || lower.includes("intensification") || lower.includes("ri") || lower.includes("shear") || lower.includes("sst")) {
        aiResponse = `The predicted wind speed increases from 72 kt to 85 kt (+13 kt) over the next 6 to 12 hours. Multi-source environmental telemetry indicates vertical wind shear is favorably low (8.5 kts) while Sea Surface Temperatures (SST) remain exceptionally warm at 30.4°C (>28°C threshold), triggering our Physics-Informed Neural Network (PINN) Rapid Intensification warning.`;
      } else if (lower.includes("pressure") || lower.includes("drop") || lower.includes("hpa")) {
        aiResponse = `Central pressure is projected to drop from 942 hPa to 930 hPa over the next 12 hours. Rapid central pressure deepening of ~1 hPa/hr confirms the cyclone is undergoing active baroclinic intensification fueled by warm Bay of Bengal waters.`;
      } else if (lower.includes("dvorak") || lower.includes("convnext") || lower.includes("manual")) {
        aiResponse = `Traditional Dvorak estimation relies on subjective human interpretation of cloud curved bands. Our hybrid ConvNeXt-ViT model processes raw multi-spectral tensor embeddings to directly regress central pressure and wind speed with an RMSE < 5.2 kt, eliminating human perceptual bias.`;
      } else if (lower.includes("cloud structures") || lower.includes("confidence") || lower.includes("82%")) {
        aiResponse = `Analysis of the INSAT-3DR infrared band (TIR-1 10.8µm) reveals a prominent, symmetric Central Dense Overcast (CDO) pattern with cloud-top brightness temperatures dropping below -75°C. The sharp temperature gradient between the warm eye core and the cold convective ring accounts for the high model confidence score.`;
      } else if (lower.includes("grad-cam") || lower.includes("heatmap") || lower.includes("attention") || lower.includes("layers") || lower.includes("core")) {
        aiResponse = `The Grad-CAM attention heatmap highlights maximum feature attribution (gradients > 0.88) concentrated in the northeastern quadrant of the eyewall. This indicates the convolutional layers are primarily weighting deep convective band curvature and eyewall ring symmetry rather than peripheral cirrus outflows.`;
      } else if (lower.includes("insat") || lower.includes("scatterometer") || lower.includes("oceansat")) {
        aiResponse = `The pipeline fuses geostationary 15-minute INSAT-3DR TIR-1 (10.8µm) brightness temperatures with scatterometer ocean surface wind vector grids from Oceansat-3. This multi-sensor alignment captures both cloud-top thermodynamics and sea-surface vorticity.`;
      } else if (lower.includes("pinn") || lower.includes("track cone") || lower.includes("trajectory") || lower.includes("120h") || lower.includes("navier")) {
        aiResponse = `The 120-hour track uncertainty cone is computed using Navier-Stokes momentum and thermodynamic conservation equations embedded into our hybrid PINN architecture. Steering flow vectors at the 500 hPa geopotential height are steering the system north-northeast towards the Odisha-West Bengal coastline with a mean cross-track error <48 km.`;
      } else if (lower.includes("landfall") || lower.includes("stretch") || lower.includes("window")) {
        aiResponse = `Projected landfall is anticipated within 36 to 48 hours along the north Odisha and West Bengal coastline. Peak sustained winds near landfall are estimated at 145-165 km/h, accompanied by heavy to very heavy precipitation.`;
      } else if (lower.includes("surge") || lower.includes("coastal zones")) {
        aiResponse = `Hydrodynamic storm surge simulations project a peak tidal surge of 2.8 to 3.5 meters above astronomical high tide, particularly threatening river deltas and low-lying coastal belts in northern Odisha and the Sundarbans.`;
      } else if (lower.includes("evacuation") || lower.includes("alert") || lower.includes("cap") || lower.includes("lead times")) {
        aiResponse = `Automated Common Alerting Protocol (CAP v1.2) XML emergency feeds are dispatched to SEOC and NDMA portals. With an active Category 3 classification and 36h landfall horizon, mandatory evacuation of low-lying coastal zones within 5 km of the tidal boundary is advised.`;
      } else {
        aiResponse = `Telemetry analysis for "${textToSend}": Current multi-spectral ingestion from INSAT-3DR TIR-1 and Oceansat-3 scatterometer wind fields indicates a stable cyclonic vortex. Central pressure is holding at 942 hPa with 185 km/h peak gusts. Atmospheric moisture feeds from the Bay of Bengal remain active.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: aiResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setIsAnalyzing(false);
    }, 1100);
  };

  return (
    <PixelCard
      variant="cyan"
      gap={8}
      speed={35}
      colors="#00F2FE,#38BDF8,#10E7A2,#0ea5e9"
      autoDisappearDelay={1500}
      triggerOnMount={true}
      className={`pixel-card-modal p-5 sm:p-6 text-white font-jakarta relative z-20 ${className}`}
    >
      <div className="relative z-10 flex flex-col h-full w-full min-h-0">
        {/* Panel Header */}
        <div className="flex items-center justify-between border-b border-[#1E3252]/80 pb-4 mb-4 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-rajdhani font-bold text-lg sm:text-xl tracking-wider uppercase">
                <GradientText
                  colors={["#9333EA", "#A855F7", "#FF5E36", "#F97316", "#FF5E36", "#A855F7", "#9333EA"]}
                  animationSpeed={4}
                >
                  Cyclone AI Assistant
                </GradientText>
              </h3>
              <span className="text-[10px] font-mono text-[#00F2FE] px-2 py-0.5 bg-[#00F2FE]/15 rounded-md border border-[#00F2FE]/40 font-bold uppercase tracking-wider">
                XAI Layer
              </span>
            </div>
            <p className="text-xs text-[#38BDF8] font-jakarta">
              Explainability interface over live model tensors & multi-source satellite feeds
            </p>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              aria-label="Close Assistant Panel"
              className="p-1.5 rounded-lg bg-[#050B14] border border-[#1E3252] text-slate-400 hover:text-white hover:border-[#00F2FE] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar min-h-0">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                  msg.sender === "user"
                    ? "bg-[#1E3252] border-[#38BDF8]/40 text-[#38BDF8]"
                    : "bg-[#00F2FE]/15 border-[#00F2FE]/50 text-[#00F2FE] shadow-[0_0_10px_rgba(0,242,254,0.2)]"
                }`}
              >
                {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[82%] rounded-xl p-3.5 text-xs sm:text-sm leading-relaxed border ${
                  msg.sender === "user"
                    ? "bg-[#1E3252]/80 border-[#38BDF8]/30 text-white rounded-tr-none"
                    : "bg-[#050B14]/90 border-[#1E3252] text-slate-200 rounded-tl-none shadow-md backdrop-blur-md"
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                <span className="block text-[10px] text-[#8E9EB5] mt-2 font-jetbrains [font-feature-settings:'tnum'_on] text-right">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isAnalyzing && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#00F2FE]/15 border border-[#00F2FE]/50 text-[#00F2FE] flex items-center justify-center shrink-0 animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-[#050B14]/90 border border-[#1E3252] text-slate-300 rounded-xl rounded-tl-none p-3.5 text-xs flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#00F2FE] animate-spin" />
                <span className="font-mono text-[#00F2FE]">
                  Evaluating model feature attributions & atmospheric context...
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts (Dynamic 3 Chips) */}
        <div className="mt-2 pt-2 border-t border-[#1E3252]/80 flex flex-wrap items-center gap-1.5 shrink-0">
          <div className="flex items-center gap-1.5 shrink-0 mr-1">
            <span className="text-[11px] text-[#8E9EB5] font-rajdhani font-bold uppercase tracking-wider flex items-center">
              Quick Ask:
            </span>
            <button
              type="button"
              onClick={handleShuffle}
              disabled={isAnalyzing}
              title="Shuffle dynamic suggestions"
              aria-label="Shuffle dynamic suggestions"
              className="p-1 rounded bg-[#050B14] border border-[#1E3252] text-slate-400 hover:text-[#00F2FE] hover:border-[#00F2FE]/50 transition-all cursor-pointer active:rotate-180 disabled:opacity-40"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>

          {currentSuggestions.slice(0, 3).map((prompt, idx) => (
            <button
              key={`${prompt}-${idx}`}
              onClick={() => handleSend(prompt)}
              disabled={isAnalyzing}
              className="text-[11px] sm:text-xs bg-[#050B14] hover:bg-[#00F2FE]/15 text-slate-300 hover:text-[#00F2FE] border border-[#1E3252] hover:border-[#00F2FE]/60 px-2.5 py-1.5 rounded-lg transition-all font-jakarta text-left cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="mt-2.5 flex gap-2 shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isAnalyzing && handleSend()}
            placeholder="Ask why the model made a specific prediction or classified intensity..."
            disabled={isAnalyzing}
            className="flex-1 bg-[#050B14] border border-[#1E3252] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00F2FE] focus:ring-1 focus:ring-[#00F2FE] transition-all font-jakarta"
          />
          <ExplainPill
            onClick={() => handleSend()}
            disabled={isAnalyzing || !input.trim()}
          />
        </div>
      </div>
    </PixelCard>
  );
}
