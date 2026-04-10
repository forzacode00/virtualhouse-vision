import { AlertTriangle, TrendingDown, Banknote } from "lucide-react";
import KPICard from "@/components/KPICard";
import SimulationGauge from "@/components/SimulationGauge";
import PainPointsTimeline from "@/components/PainPointsTimeline";
import PerformanceChart from "@/components/PerformanceChart";

const Index = () => (
  <div className="min-h-screen px-6 py-6 lg:px-10">
    {/* Header */}
    <header className="mb-8 flex items-center gap-3">
      <h1 className="text-2xl text-foreground">
        <span className="font-light">Virtual</span>
        <span className="font-bold">House</span>
      </h1>
      {/* DEMO indicator */}
      <div className="flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-0.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
        </span>
        <span className="font-mono-kpi text-[10px] tracking-widest text-success">DEMO</span>
      </div>
    </header>

    {/* KPI Row */}
    <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {/* Simulation Score — custom gauge card */}
      <div className="group rounded-lg border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_0_24px_hsl(185_70%_50%/0.12)]">
        <SimulationGauge />
      </div>
      <div className="transition-all duration-300 hover:shadow-[0_0_24px_hsl(38_92%_55%/0.12)]">
        <KPICard icon={<AlertTriangle className="h-7 w-7" />} value="3" label="Components at Risk" accentClass="text-warning" glowColor="var(--warning)" />
      </div>
      <div className="transition-all duration-300 hover:shadow-[0_0_24px_hsl(0_72%_55%/0.12)]">
        <KPICard icon={<TrendingDown className="h-7 w-7" />} value="14%" label="Energy Waste" accentClass="text-destructive" glowColor="var(--destructive)" />
      </div>
      <div className="transition-all duration-300 hover:shadow-[0_0_24px_hsl(152_60%_48%/0.12)]">
        <KPICard icon={<Banknote className="h-7 w-7" />} value="NOK 600K" label="Estimated Savings" accentClass="text-success" glowColor="var(--success)" />
      </div>
    </section>

    {/* Main Content */}
    <section className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-[55fr_45fr]">
      <PainPointsTimeline />
      <PerformanceChart />
    </section>

    {/* Footer */}
    <footer className="flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
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

export default Index;
