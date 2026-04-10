import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

const scenarios = [
  { title: "Replace heat pump (VP-1)", savings: "22%", cost: "NOK 1.2M", payback: "2.4 yr", recommended: true },
  { title: "Solar thermal collectors", savings: "8%", cost: "NOK 800K", payback: "4.1 yr", recommended: false },
  { title: "AI-controlled BMS upgrade", savings: "15%", cost: "NOK 450K", payback: "1.8 yr", recommended: true },
  { title: "Full HVAC retrofit", savings: "41%", cost: "NOK 3.8M", payback: "3.2 yr", recommended: false },
];

const UpgradeScenarios = () => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timers = scenarios.map((_, i) =>
      setTimeout(() => setVisibleCount(i + 1), 200 + i * 150)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="mb-5 text-xl font-semibold text-foreground">Upgrade Scenarios Simulated</h2>
      <div className="space-y-3">
        {scenarios.map((s, i) => {
          const visible = i < visibleCount;
          return (
            <div
              key={i}
              className="flex items-center justify-between rounded-md border border-border bg-secondary/30 px-4 py-3 transition-all duration-500"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)" }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{s.title}</span>
                  {s.recommended && (
                    <span className="flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold uppercase text-success border border-success/30">
                      <CheckCircle2 className="h-3 w-3" /> Recommended
                    </span>
                  )}
                </div>
                <div className="mt-1 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span>Savings: <span className="font-semibold text-success">{s.savings}</span></span>
                  <span>Cost: <span className="font-semibold text-foreground">{s.cost}</span></span>
                  <span>Payback: <span className="font-semibold text-foreground">{s.payback}</span></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpgradeScenarios;
