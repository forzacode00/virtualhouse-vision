import { AlertTriangle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

const anomalies = [
  {
    title: "Zone 3B valve delivering 40% of designed flow",
    severity: "WARNING",
    rootCause: "Valve actuator stuck since last service — sone 3B radiator circuit",
    impact: "NOK 18,000/yr",
    detail: "Designed flow: 0.8 L/s · Measured: 0.32 L/s · Room temp: 19.2°C vs. setpoint 21°C",
  },
  {
    title: "AHU-3 SFP exceeding TEK17 limit",
    severity: "CRITICAL",
    rootCause: "Clogged F7 filter or variable frequency drive fault — measured 1.82 kW/(m³/s), limit ≤ 1.5",
    impact: "NOK 12,000/yr",
    detail: "Fan power consumption 34% above design · Filter ΔP: 320 Pa (normal: < 200 Pa)",
  },
];

const LiveAnomalies = () => (
  <div className="rounded-lg border border-border bg-card p-6">
    <h2 className="mb-6 text-xl font-semibold text-foreground">Live Anomalies Detected</h2>
    <div className="space-y-4">
      {anomalies.map((a, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15, duration: 0.4 }}
          className={`rounded-lg border-l-4 p-4 ${
            a.severity === "CRITICAL"
              ? "border-l-destructive bg-destructive/5"
              : "border-l-warning bg-warning/5"
          }`}
        >
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {a.severity === "CRITICAL" ? (
                <XCircle className="h-4 w-4 text-destructive" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-warning" />
              )}
              <span className="text-sm font-semibold text-foreground">{a.title}</span>
            </div>
            <span
              className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                a.severity === "CRITICAL"
                  ? "bg-destructive/20 text-destructive"
                  : "bg-warning/20 text-warning"
              }`}
            >
              {a.severity}
            </span>
          </div>
          <p className="mb-1 text-xs text-muted-foreground">
            <span className="font-medium text-foreground/80">Root cause:</span> {a.rootCause}
          </p>
          <p className="mb-1 text-xs text-muted-foreground">{a.detail}</p>
          <p className="text-xs font-semibold text-destructive">Cost impact: {a.impact}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default LiveAnomalies;
