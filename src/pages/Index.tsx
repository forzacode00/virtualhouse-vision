import { CheckCircle, AlertTriangle, TrendingDown, Banknote } from "lucide-react";
import KPICard from "@/components/KPICard";
import PainPointsTimeline from "@/components/PainPointsTimeline";
import PerformanceChart from "@/components/PerformanceChart";

const Index = () => (
  <div className="min-h-screen px-6 py-6 lg:px-10">
    {/* Header */}
    <header className="mb-8">
      <h1 className="text-2xl text-foreground">
        <span className="font-light">Virtual</span>
        <span className="font-bold">House</span>
      </h1>
    </header>

    {/* KPI Row */}
    <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <KPICard icon={<CheckCircle className="h-7 w-7" />} value="87/100" label="Simulation Score" accentClass="text-primary" />
      <KPICard icon={<AlertTriangle className="h-7 w-7" />} value="3" label="Components at Risk" accentClass="text-warning" />
      <KPICard icon={<TrendingDown className="h-7 w-7" />} value="14%" label="Energy Waste" accentClass="text-destructive" />
      <KPICard icon={<Banknote className="h-7 w-7" />} value="NOK 600K" label="Estimated Savings" accentClass="text-success" />
    </section>

    {/* Main Content */}
    <section className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-[55fr_45fr]">
      <PainPointsTimeline />
      <PerformanceChart />
    </section>

    {/* Footer */}
    <footer className="flex items-center justify-between border-t border-border pt-4 text-sm text-muted-foreground">
      <div className="text-lg text-foreground">
        <span className="font-light">▲</span>
      </div>
      <div className="flex gap-6">
        <span className="cursor-pointer hover:text-foreground transition-colors">Settings</span>
        <span className="cursor-pointer hover:text-foreground transition-colors">Help Center</span>
        <span className="cursor-pointer hover:text-foreground transition-colors">User Profile</span>
      </div>
    </footer>
  </div>
);

export default Index;
