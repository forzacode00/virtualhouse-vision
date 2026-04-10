import { Cog, Fan, Cpu, Wind, Flame } from "lucide-react";

const events = [
  { month: "OCT", year: "2024", title: "Heat Pump – Compressor Failure", severity: "CRITICAL" as const, estFailure: "Nov 15, 2024", cost: "NOK 120,000", icon: Cog },
  { month: "DEC", year: "2024", title: "Ventilation Unit – Filter Blockage", severity: "WARNING" as const, estFailure: "Jan 10, 2025", cost: "NOK 18,000", icon: Fan },
  { month: "MAR", year: "2025", title: "BMS Controller – Software Update", severity: "INFO" as const, estFailure: "Apr 20, 2025", cost: "NOK 5,000 (Service)", icon: Cpu },
  { month: "JUN", year: "2025", title: "Cooling Tower – Fan Belt Wear", severity: "WARNING" as const, estFailure: "Jul 15, 2025", cost: "NOK 25,000", icon: Wind },
  { month: "SEP", year: "2025", title: "Boiler System – Pump Malfunction", severity: "CRITICAL" as const, estFailure: "Oct 01, 2025", cost: "NOK 85,000", icon: Flame },
];

const severityStyles = {
  CRITICAL: "bg-destructive/20 text-destructive border-destructive/30",
  WARNING: "bg-warning/20 text-warning border-warning/30",
  INFO: "bg-info/20 text-info border-info/30",
};

const PainPointsTimeline = () => (
  <div className="rounded-lg border border-border bg-card p-6">
    <h2 className="mb-6 text-xl font-semibold text-foreground">Future Pain Points</h2>
    <div className="space-y-0">
      {events.map((e, i) => {
        const Icon = e.icon;
        return (
          <div key={i} className="flex gap-4">
            {/* Date column */}
            <div className="flex w-14 shrink-0 flex-col items-center">
              <span className="text-xs font-semibold text-muted-foreground">{e.month}</span>
              <span className="text-xs text-muted-foreground">{e.year}</span>
            </div>
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div className="h-3 w-px bg-border" />
              <div className="h-2.5 w-2.5 rounded-full border-2 border-primary bg-background" />
              {i < events.length - 1 && <div className="w-px flex-1 bg-border" />}
            </div>
            {/* Content */}
            <div className="flex flex-1 items-center justify-between rounded-md border border-border bg-secondary/30 px-4 py-3 mb-3">
              <div>
                <div className="font-semibold text-foreground">{e.title}</div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase border ${severityStyles[e.severity]}`}>
                    {e.severity}
                  </span>
                  <span>Estimated Failure: {e.estFailure}</span>
                  <span>Cost impact: {e.cost}</span>
                </div>
              </div>
              <Icon className="h-6 w-6 shrink-0 text-muted-foreground/50" />
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default PainPointsTimeline;
