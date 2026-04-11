import { AlertTriangle, TrendingDown, Banknote, Lightbulb, CheckCircle2, Activity, Brain, Wrench, Zap, Shield, XCircle, Gauge } from "lucide-react";
import { motion } from "framer-motion";
import KPICard from "./KPICard";
import SimulationGauge from "./SimulationGauge";
import PainPointsTimeline from "./PainPointsTimeline";
import PerformanceChart from "./PerformanceChart";
import DesignIssuesTimeline from "./DesignIssuesTimeline";
import DesignPerformanceChart from "./DesignPerformanceChart";
import CommissioningTests from "./CommissioningTests";
import SystemReadiness from "./SystemReadiness";
import UpgradeScenarios from "./UpgradeScenarios";
import BeforeAfterComparison from "./BeforeAfterComparison";
import LiveAnomalies from "./LiveAnomalies";
import DesignVsActualChart from "./DesignVsActualChart";


const phaseData: Record<number, {
  kpis: { icon: React.ReactNode; value: string; label: string; accentClass: string; glowColor: string }[];
  insight: string;
  gauge: { score: number; label: string };
  sectionLabel: string;
  sectionDesc: string;
  detailLabel: string;
  detailDesc: string;
}> = {
  1: {
    gauge: { score: 87, label: "Simulation Score" },
    kpis: [
      { icon: <AlertTriangle className="h-7 w-7" />, value: "3", label: "Design Conflicts", accentClass: "text-destructive", glowColor: "var(--destructive)" },
      { icon: <Shield className="h-7 w-7" />, value: "Marginal", label: "TEK17 Compliance", accentClass: "text-warning", glowColor: "var(--warning)" },
      { icon: <Zap className="h-7 w-7" />, value: "116", label: "Projected kWh/m²·yr", accentClass: "text-warning", glowColor: "var(--warning)" },
    ],
    insight: "Simulation found 3 design conflicts and marginal TEK17 compliance. Optimization reduces energy use from 116 to 108 kWh/m²·yr, saving NOK 72,000/yr.",
    sectionLabel: "Key metrics",
    sectionDesc: "Summary of the simulation results for this design phase",
    detailLabel: "Detailed analysis",
    detailDesc: "Design issues identified and simulated performance impact",
  },
  2: {
    gauge: { score: 72, label: "Commissioning Score" },
    kpis: [
      { icon: <XCircle className="h-7 w-7" />, value: "4 / 12", label: "Failed Tests", accentClass: "text-destructive", glowColor: "var(--destructive)" },
      { icon: <CheckCircle2 className="h-7 w-7" />, value: "847", label: "BACnet Points Verified", accentClass: "text-success", glowColor: "var(--success)" },
      { icon: <Gauge className="h-7 w-7" />, value: "67%", label: "Handover Readiness", accentClass: "text-warning", glowColor: "var(--warning)" },
    ],
    insight: "4 of 12 commissioning tests failed. Cooling interlock and fire damper issues must be resolved before handover. BACnet verification passed 847/847 points.",
    sectionLabel: "Key metrics",
    sectionDesc: "Virtual commissioning test results before physical handover",
    detailLabel: "Test results & system status",
    detailDesc: "Individual test outcomes and readiness per system",
  },
  3: {
    gauge: { score: 91, label: "Building Health" },
    kpis: [
      { icon: <AlertTriangle className="h-7 w-7" />, value: "2", label: "Active Anomalies", accentClass: "text-warning", glowColor: "var(--warning)" },
      { icon: <TrendingDown className="h-7 w-7" />, value: "+7.5%", label: "Energy vs. Design", accentClass: "text-warning", glowColor: "var(--warning)" },
      { icon: <Banknote className="h-7 w-7" />, value: "NOK 34K", label: "Monthly Savings Found", accentClass: "text-success", glowColor: "var(--success)" },
    ],
    insight: "Live monitoring detected 2 anomalies: valve actuator in zone 3B and AHU-3 SFP exceeding TEK17 limit. Combined impact: NOK 30,000/yr. Root causes identified.",
    sectionLabel: "Key metrics",
    sectionDesc: "Live operational data compared against simulation baseline",
    detailLabel: "Anomalies & performance",
    detailDesc: "Active issues detected and energy performance tracking",
  },
  4: {
    gauge: { score: 87, label: "Simulation Score" },
    kpis: [
      { icon: <AlertTriangle className="h-7 w-7" />, value: "3", label: "Components at Risk", accentClass: "text-warning", glowColor: "var(--warning)" },
      { icon: <TrendingDown className="h-7 w-7" />, value: "14%", label: "Energy Waste", accentClass: "text-destructive", glowColor: "var(--destructive)" },
      { icon: <Banknote className="h-7 w-7" />, value: "NOK 600K", label: "Estimated Savings", accentClass: "text-success", glowColor: "var(--success)" },
    ],
    insight: "Based on simulation: planned maintenance saves NOK 600K vs. reactive repairs over 24 months. Typical ROI: 4 months.",
    sectionLabel: "Key metrics",
    sectionDesc: "AI-driven predictions for maintenance and energy optimization",
    detailLabel: "Predictions & simulations",
    detailDesc: "Forecasted failures and long-term performance degradation",
  },
  5: {
    gauge: { score: 62, label: "Current Score" },
    kpis: [
      { icon: <Wrench className="h-7 w-7" />, value: "4", label: "Upgrade Options", accentClass: "text-primary", glowColor: "var(--primary)" },
      { icon: <Banknote className="h-7 w-7" />, value: "NOK 890K/yr", label: "Potential Savings", accentClass: "text-success", glowColor: "var(--success)" },
      { icon: <Activity className="h-7 w-7" />, value: "2.8 yrs", label: "Payback Period", accentClass: "text-success", glowColor: "var(--success)" },
    ],
    insight: "Simulated 4 upgrade scenarios — the optimal combination yields 37% energy reduction with a 2.8-year payback period, saving NOK 420K annually.",
    sectionLabel: "Key metrics",
    sectionDesc: "Current building score and upgrade potential",
    detailLabel: "Upgrade scenarios",
    detailDesc: "Simulated options with cost, savings and payback analysis",
  },
};

const PhasePanels = ({ phase }: { phase: number }) => {
  if (phase === 1) {
    return (
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[55fr_45fr]">
        <DesignIssuesTimeline />
        <DesignPerformanceChart />
      </section>
    );
  }
  if (phase === 2) {
    return (
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[55fr_45fr]">
        <CommissioningTests />
        <SystemReadiness />
      </section>
    );
  }
  if (phase === 3) {
    return (
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[55fr_45fr]">
        <LiveAnomalies />
        <DesignVsActualChart />
      </section>
    );
  }
  if (phase === 5) {
    return (
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[55fr_45fr]">
        <UpgradeScenarios />
        <BeforeAfterComparison />
      </section>
    );
  }
  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-[55fr_45fr]">
      <PainPointsTimeline />
      <PerformanceChart />
    </section>
  );
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
      {/* Section label: KPIs */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-8 w-1.5 rounded-full bg-primary" />
        <div>
          <h2 className="text-lg font-bold text-foreground">{data.sectionLabel}</h2>
          <p className="text-sm text-muted-foreground">{data.sectionDesc}</p>
        </div>
      </div>

      {/* KPI Row */}
      <section data-tour="kpi-section" className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="group rounded-lg border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_0_24px_hsl(185_70%_50%/0.12)]">
          <SimulationGauge score={data.gauge.score} label={data.gauge.label} />
        </div>
        {data.kpis.map((kpi, i) => (
          <div key={i} className="transition-all duration-300 hover:shadow-[0_0_24px_hsl(0_0%_50%/0.08)]">
            <KPICard {...kpi} />
          </div>
        ))}
      </section>

      {/* Insight callout — high visibility */}
      <div data-tour="insight-box" className="mb-8 rounded-md border border-primary/25 bg-gradient-to-r from-primary/8 via-primary/4 to-transparent px-4 py-3">
        <div className="mb-1 flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
            <Lightbulb className="h-3 w-3 text-primary" />
          </div>
          <span className="text-xs font-semibold text-primary">VirtualHouse Insight</span>
        </div>
        <p className="text-xs leading-relaxed text-foreground/80">
          {data.insight}
        </p>
      </div>

      {/* Section label: Details */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-8 w-1.5 rounded-full bg-primary" />
        <div>
          <h2 className="text-lg font-bold text-foreground">{data.detailLabel}</h2>
          <p className="text-sm text-muted-foreground">{data.detailDesc}</p>
        </div>
      </div>

      {/* Main Content */}
      <div data-tour="detail-section">
        <PhasePanels phase={phase} />
      </div>
    </motion.div>
  );
};

export default PhaseContent;
