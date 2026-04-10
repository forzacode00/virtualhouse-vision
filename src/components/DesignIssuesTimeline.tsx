import { Zap, Thermometer, Wind, GitBranch } from "lucide-react";
import { useEffect, useState } from "react";

const events = [
  {
    title: "Simultaneous heating/cooling in zones 3–5",
    severity: "CRITICAL" as const,
    detail: "Cost if unresolved: NOK 89,000/yr",
    icon: Zap,
  },
  {
    title: "Heat pump undersized for peak load (Feb)",
    severity: "WARNING" as const,
    detail: "COP drops below 2.5",
    icon: Thermometer,
  },
  {
    title: "VAV minimum airflow too high for night mode",
    severity: "INFO" as const,
    detail: "12% energy waste",
    icon: Wind,
  },
  {
    title: "Radiator circuit and AHU sharing return line",
    severity: "CRITICAL" as const,
    detail: "Temperature conflict",
    icon: GitBranch,
  },
];

const severityStyles = {
  CRITICAL: "bg-destructive/20 text-destructive border-destructive/30",
  WARNING: "bg-warning/20 text-warning border-warning/30",
  INFO: "bg-info/20 text-info border-info/30",
};

const severityBorder = {
  CRITICAL: "border-l-destructive",
  WARNING: "border-l-warning",
  INFO: "border-l-info",
};

const DesignIssuesTimeline = () => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    const timers: NodeJS.Timeout[] = [];
    events.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), 200 + i * 150));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="mb-6 text-xl font-semibold text-foreground">Design Issues Found</h2>
      <div className="space-y-0">
        {events.map((e, i) => {
          const Icon = e.icon;
          const visible = i < visibleCount;
          return (
            <div
              key={i}
              className="flex gap-4 transition-all duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
              }}
            >
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className="h-3 w-px bg-border" />
                <div className="h-2.5 w-2.5 rounded-full border-2 border-primary bg-background" />
                {i < events.length - 1 && <div className="w-px flex-1 bg-border" />}
              </div>
              {/* Content */}
              <div className={`flex flex-1 items-center justify-between rounded-md border border-border border-l-[3px] ${severityBorder[e.severity]} bg-secondary/30 px-4 py-3 mb-3`}>
                <div>
                  <div className="font-semibold text-foreground">{e.title}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase border ${severityStyles[e.severity]}`}>
                      {e.severity}
                    </span>
                    <span>{e.detail}</span>
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
};

export default DesignIssuesTimeline;
