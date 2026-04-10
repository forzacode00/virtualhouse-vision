import { ArrowDown } from "lucide-react";

const BeforeAfterComparison = () => (
  <div className="rounded-lg border border-border bg-card p-6">
    <h2 className="mb-5 text-xl font-semibold text-foreground">Before vs. After</h2>
    <div className="grid grid-cols-2 gap-4">
      {/* Before */}
      <div className="rounded-lg border border-border bg-destructive/5 p-4 text-center">
        <div className="mb-3 text-xs font-bold uppercase tracking-wider text-destructive">Before</div>
        <div className="font-mono-kpi text-3xl text-foreground">142</div>
        <div className="text-xs text-muted-foreground">kWh/m²·yr</div>
        <div className="mt-3 space-y-1 text-xs text-muted-foreground">
          <div>Energy Label <span className="font-bold text-warning">C</span></div>
          <div>NOK 1.1M/yr</div>
        </div>
      </div>
      {/* After */}
      <div className="rounded-lg border border-success/30 bg-success/5 p-4 text-center">
        <div className="mb-3 text-xs font-bold uppercase tracking-wider text-success">After</div>
        <div className="font-mono-kpi text-3xl text-foreground">89</div>
        <div className="text-xs text-muted-foreground">kWh/m²·yr</div>
        <div className="mt-3 space-y-1 text-xs text-muted-foreground">
          <div>Energy Label <span className="font-bold text-success">A</span></div>
          <div>NOK 680K/yr</div>
        </div>
      </div>
    </div>
    {/* Delta */}
    <div className="mt-4 flex items-center justify-center gap-2 rounded-md border border-success/20 bg-success/10 px-4 py-3">
      <ArrowDown className="h-5 w-5 text-success" />
      <span className="text-sm font-bold text-success">-37% energy · saves NOK 420K/yr</span>
    </div>
  </div>
);

export default BeforeAfterComparison;
