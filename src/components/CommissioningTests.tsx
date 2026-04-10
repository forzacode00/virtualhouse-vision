import { CheckCircle2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

const tests = [
  { name: "Heating setpoint response", passed: true, detail: "4.2 min response" },
  { name: "Ventilation night-mode", passed: true, detail: "34% energy reduction" },
  { name: "Cooling + heating interlock", passed: false, detail: "Both running simultaneously" },
  { name: "Fire damper signal", passed: false, detail: "2 dampers not responding" },
  { name: "BACnet verification", passed: true, detail: "847/847 OK" },
  { name: "AHU filter alarm", passed: false, detail: "Wrong threshold" },
  { name: "Pump cascade logic", passed: false, detail: "P2 not activating at 60%" },
];

const CommissioningTests = () => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    const timers: NodeJS.Timeout[] = [];
    tests.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), 200 + i * 120));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="mb-6 text-xl font-semibold text-foreground">Commissioning Test Results</h2>
      <div className="space-y-2">
        {tests.map((t, i) => {
          const visible = i < visibleCount;
          return (
            <div
              key={i}
              className={`flex items-center gap-3 rounded-md border px-4 py-3 transition-all duration-500 ${
                t.passed
                  ? "border-success/20 bg-success/5 border-l-[3px] border-l-success"
                  : "border-destructive/20 bg-destructive/5 border-l-[3px] border-l-destructive"
              }`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
              }}
            >
              {t.passed ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
              ) : (
                <XCircle className="h-5 w-5 shrink-0 text-destructive" />
              )}
              <div className="flex-1">
                <span className="text-sm font-semibold text-foreground">{t.name}</span>
                <span className="ml-2 text-xs text-muted-foreground">— {t.detail}</span>
              </div>
              <span
                className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase border ${
                  t.passed
                    ? "bg-success/20 text-success border-success/30"
                    : "bg-destructive/20 text-destructive border-destructive/30"
                }`}
              >
                {t.passed ? "PASSED" : "FAILED"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommissioningTests;
