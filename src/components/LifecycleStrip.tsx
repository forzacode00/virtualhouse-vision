const phases = [
  { num: 1, label: "Design & Verify" },
  { num: 2, label: "Virtual Commissioning" },
  { num: 3, label: "Monitor Operations" },
  { num: 4, label: "Optimize & Predict" },
  { num: 5, label: "Redesign" },
];

const activePhase = 3;

const LifecycleStrip = () => (
  <div className="rounded-lg border border-border bg-card px-6 py-5">
    <h3 className="mb-4 text-sm font-semibold text-foreground">Building Lifecycle Coverage</h3>
    <div className="flex items-center justify-between">
      {phases.map((p, i) => (
        <div key={p.num} className="flex flex-1 items-center">
          {/* Pill */}
          <div
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all whitespace-nowrap ${
              p.num === activePhase
                ? "border-primary/60 bg-primary/15 text-primary shadow-[0_0_12px_hsl(185_70%_50%/0.2)]"
                : "border-border bg-secondary/30 text-muted-foreground"
            }`}
          >
            <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
              p.num === activePhase ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              {p.num}
            </span>
            {p.label}
          </div>
          {/* Connector line */}
          {i < phases.length - 1 && (
            <div className={`h-px flex-1 mx-1 ${p.num < activePhase ? "bg-primary/40" : "bg-border"}`} />
          )}
        </div>
      ))}
    </div>
  </div>
);

export default LifecycleStrip;
