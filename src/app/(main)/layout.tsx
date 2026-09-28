import React from "react";
import { XaiFloatingWidget } from "@/components/xai/XaiFloatingWidget";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-transparent text-[var(--text-primary)] flex flex-col pt-16 sm:pt-20">
      <div className="flex flex-1 overflow-hidden">
        {/* Dynamic Mission Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>

      {/* Floating Tactical Cyclone AI Assistant Trigger */}
      <XaiFloatingWidget stormName='CYCLONE "ARNAB"' />
    </div>
  );
}
