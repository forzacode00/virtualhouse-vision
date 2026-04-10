import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LifecycleStrip from "@/components/LifecycleStrip";
import PhaseContent from "@/components/PhaseContent";

const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

const Index = () => {
  const [activePhase, setActivePhase] = useState(1);

  return (
    <div className="min-h-screen px-6 py-6 lg:px-10">
      {/* Header */}
      <header className="mb-6 flex items-center gap-3">
        <h1 className="text-2xl text-foreground">
          <span className="font-light">Virtual</span>
          <span className="font-bold">House</span>
        </h1>
        <div className="flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-0.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <span className="font-mono-kpi text-[10px] tracking-widest text-success">DEMO</span>
        </div>
      </header>

      {/* Context strip */}
      <div className="mb-4 flex items-center justify-between border-b border-border pb-3 text-[11px] text-muted-foreground">
        <span>Parkveien Kontorbygg · 6,000 m² · Oslo</span>
        <span>Simulation period: 2024–2034 · Last updated: {today}</span>
      </div>

      {/* Data input / uploaded documents */}
      <ProjectData />

      {/* Lifecycle navigation */}
      <LifecycleStrip activePhase={activePhase} onPhaseChange={setActivePhase} />

      {/* Phase content */}
      <AnimatePresence mode="wait">
        <PhaseContent phase={activePhase} />
      </AnimatePresence>

      {/* Footer */}
      <footer className="mt-8 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
        <div className="text-foreground">
          <span className="font-light">▲</span>
        </div>
        <span className="text-[10px] tracking-wider opacity-40 font-mono-kpi">VirtualHouse™ Investor Demo</span>
        <div className="flex gap-6">
          <span className="cursor-pointer transition-colors hover:text-foreground">Settings</span>
          <span className="cursor-pointer transition-colors hover:text-foreground">Help Center</span>
          <span className="cursor-pointer transition-colors hover:text-foreground">User Profile</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
