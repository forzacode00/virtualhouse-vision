import { AlertTriangle, TrendingDown, Banknote, Lightbulb, Ruler, CheckCircle2, Activity, Brain, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import KPICard from "./KPICard";
import SimulationGauge from "./SimulationGauge";
import PainPointsTimeline from "./PainPointsTimeline";
import PerformanceChart from "./PerformanceChart";

const phaseData: Record<number, {
  kpis: { icon: React.ReactNode; value: string; label: string; accentClass: string; glowColor: string }[];
  insight: string;
  gauge: { score: number; label: string };
}> = {
  1: {
    gauge: { score: 87, label: "Design Score" },
    kpis: [
      { icon: <Ruler className="h-7 w-7" />, value: "12", label: "Design Conflicts Found", accentClass: "text-warning", glowColor: "var(--warning)" },
      { icon: <TrendingDown className="h-7 w-7" />, value: "23%", label: "Energy Over-spec", accentClass: "text-destructive", glowColor: "var(--destructive)" },
      { icon: <Banknote className="h-7 w-7" />, value: "NOK 1.2M", label: "Avoided Rework", accentClass: "text-success", glowColor: "var(--success)" },
    ],
    insight: "Simulation detected 12 design conflicts and 23% energy over-specification before construction began — saving NOK 1.2M in rework costs.",
  },
  2: {
    gauge: { score: 91, label: "Commissioning Score" },
    kpis: [
      { icon: <CheckCircle2 className="h-7 w-7" />, value: "94%", label: "Systems Validated", accentClass: "text-primary", glowColor: "var(--primary)" },
      { icon: <AlertTriangle className="h-7 w-7" />, value: "7", label: "Pre-Handover Issues", accentClass: "text-warning", glowColor: "var(--warning)" },
      { icon: <Banknote className="h-7 w-7" />, value: "NOK 340K", label: "Defect Savings", accentClass: "text-success", glowColor: "var(--success)" },
    ],
    insight: "Virtual commissioning stress-tested all systems before handover, catching 7 issues that would have cost NOK 340K to fix post-occupancy.",
  },
  3: {
    gauge: { score: 87, label: "Simulation Score" },
    kpis: [
      { icon: <AlertTriangle className="h-7 w-7" />, value: "3", label: "Components at Risk", accentClass: "text-warning", glowColor: "var(--warning)" },
      { icon: <TrendingDown className="h-7 w-7" />, value: "14%", label: "Energy Waste", accentClass: "text-destructive", glowColor: "var(--destructive)" },
      { icon: <Banknote className="h-7 w-7" />, value: "NOK 600K", label: "Estimated Savings", accentClass: "text-success", glowColor: "var(--success)" },
    ],
    insight: "Based on simulation: planned maintenance saves NOK 600K vs. reactive repairs over 24 months. Typical ROI: 4 months.",
  },
  4: {
    gauge: { score: 93, label: "Optimization Score" },
    kpis: [
      { icon: <Brain className="h-7 w-7" />, value: "18", label: "AI Recommendations", accentClass: "text-primary", glowColor: "var(--primary)" },
      { icon: <TrendingDown className="h-7 w-7" />, value: "31%", label: "Energy Reduction", accentClass: "text-success", glowColor: "var(--success)" },
      { icon: <Banknote className="h-7 w-7" />, value: "NOK 920K", label: "Annual Savings", accentClass: "text-success", glowColor: "var(--success)" },
    ],
    insight: "AI-driven optimization combined with physics models identified 18 actionable improvements, reducing energy consumption by 31%.",
  },
  5: {
    gauge: { score: 78, label: "Upgrade Readiness" },
    kpis: [
      { icon: <Wrench className="h-7 w-7" />, value: "4", label: "Upgrade Scenarios", accentClass: "text-primary", glowColor: "var(--primary)" },
      { icon: <Activity className="h-7 w-7" />, value: "45%", label: "Efficiency Gain Potential", accentClass: "text-success", glowColor: "var(--success)" },
      { icon: <Banknote className="h-7 w-7" />, value: "NOK 2.1M", label: "10-Year ROI", accentClass: "text-success", glowColor: "var(--success)" },
    ],
    insight: "Simulated 4 upgrade scenarios before investing — the optimal path yields 45% efficiency gains with NOK 2.1M ROI over 10 years.",
  },
};

const PhaseContent = ({ phase }: { phase: number }) => {
  const data = phaseData[phase];

  return (
    <motion.div
      key={phase}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
    >
      {/* KPI Row */}
      <section className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="group rounded-lg border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_0_24px_hsl(185_70%_50%/0.12)]">
          <SimulationGauge score={data.gauge.score} label={data.gauge.label} />
        </div>
        {data.kpis.map((kpi, i) => (
          <div key={i} className="transition-all duration-300 hover:shadow-[0_0_24px_hsl(0_0%_50%/0.08)]">
            <KPICard {...kpi} />
          </div>
        ))}
      </section>

      {/* Insight callout */}
      <div className="mb-8 flex items-start gap-2.5 rounded-md border border-success/20 bg-success/5 px-4 py-3 text-[12px] text-muted-foreground">
        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-success" />
        <span>
          <span className="font-semibold text-success">What this means:</span>{" "}
          {data.insight}
        </span>
      </div>

      {/* Main Content */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[55fr_45fr]">
        <PainPointsTimeline />
        <PerformanceChart />
      </section>
    </motion.div>
  );
};

export default PhaseContent;
