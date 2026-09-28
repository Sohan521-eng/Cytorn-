"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Radio, 
  Satellite, 
  Compass, 
  ShieldAlert, 
  Cpu, 
  Settings, 
  LifeBuoy, 
  MapPin 
} from "lucide-react";

export function SidebarNavigation() {
  const pathname = usePathname();

  const navItems = [
    { label: "Live Command", href: "/dashboard", icon: Radio },
    { label: "Satellite Analyzer", href: "/satellite-analyzer", icon: Satellite },
    { label: "AI Forecast", href: "/forecast", icon: Compass },
    { label: "Disaster Alerts", href: "/alerts", icon: ShieldAlert },
    { label: "Model Metrics", href: "/model-metrics", icon: Cpu },
  ];

  return (
    <aside className="w-64 border-r border-[var(--border-subtle)] bg-[var(--bg-base)]/90 flex flex-col justify-between shrink-0 p-4 h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        <div>
          <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2 font-mono">
            Mission Control
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? "bg-[var(--color-ai-cyan)]/15 text-[var(--color-ai-cyan)] border border-[var(--color-ai-cyan)]/40 shadow-[0_0_12px_rgba(0,242,254,0.15)] font-bold"
                      : "text-[var(--text-muted)] hover:text-white hover:bg-[var(--bg-surface)]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2 font-mono">
            Active Basin
          </p>
          <div className="px-3 py-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs">
            <div className="flex items-center gap-2 text-white mb-1">
              <MapPin className="w-3.5 h-3.5 text-[var(--color-ai-cyan)]" />
              <span className="font-bold">Bay of Bengal</span>
            </div>
            <p className="text-[10px] text-[var(--text-muted)]">Target: BOB-02 ARNAB</p>
          </div>
        </div>
      </div>

      <div className="space-y-1 pt-4 border-t border-[var(--border-subtle)]">
        <Link
          href="/settings"
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${
            pathname === "/settings"
              ? "text-[var(--color-ai-cyan)] font-bold"
              : "text-[var(--text-muted)] hover:text-white hover:bg-[var(--bg-surface)]"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>System Connectors</span>
        </Link>
        <Link
          href="/"
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-[var(--text-muted)] hover:text-white hover:bg-[var(--bg-surface)] transition"
        >
          <LifeBuoy className="w-4 h-4" />
          <span>Back to Landing</span>
        </Link>
      </div>
    </aside>
  );
}
