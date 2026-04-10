import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

const systems = [
  { name: "Heating", status: "ready" as const, detail: "Ready" },
  { name: "Cooling", status: "warning" as const, detail: "Interlock issue" },
  { name: "Ventilation", status: "ready" as const, detail: "Ready" },
  { name: "BMS / Controls", status: "fail" as const, detail: "2 failures" },
  { name: "Fire Safety", status: "fail" as const, detail: "Damper issue" },
  { name: "Pumps", status: "warning" as const, detail: "Cascade logic" },
];

const statusConfig = {
  ready: { icon: CheckCircle2, colorClass: "text-success", borderClass: "border-success/30", bgClass: "bg-success/5" },
  warning: { icon: AlertTriangle, colorClass: "text-warning", borderClass: "border-warning/30", bgClass: "bg-warning/5" },
  fail: { icon: XCircle, colorClass: "text-destructive", borderClass: "border-destructive/30", bgClass: "bg-destructive/5" },
};

const SystemReadiness = () => (
  <div className="rounded-lg border border-border bg-card p-6">
    <h2 className="mb-6 text-xl font-semibold text-foreground">System Readiness</h2>
    <div className="grid grid-cols-2 gap-3">
      {systems.map((s) => {
        const cfg = statusConfig[s.status];
        const Icon = cfg.icon;
        return (
          <div
            key={s.name}
            className={`flex items-center gap-3 rounded-lg border ${cfg.borderClass} ${cfg.bgClass} px-4 py-4`}
          >
            <Icon className={`h-6 w-6 shrink-0 ${cfg.colorClass}`} />
            <div>
              <div className="text-sm font-semibold text-foreground">{s.name}</div>
              <div className={`text-xs ${cfg.colorClass}`}>{s.detail}</div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default SystemReadiness;
