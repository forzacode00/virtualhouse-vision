const SimulationGauge = ({ score = 87, max = 100, label = "Simulation Score" }: { score?: number; max?: number; label?: string }) => {
  const pct = score / max;
  const radius = 52;
  const stroke = 7;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - pct);

  return (
    <div className="flex items-center gap-5">
      <div className="relative h-[130px] w-[130px] shrink-0">
        {/* Glow filter */}
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 120 120">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Track */}
          <circle cx="60" cy="60" r={radius} fill="none" stroke="hsl(216, 30%, 18%)" strokeWidth={stroke} />
          {/* Arc */}
          <circle
            cx="60" cy="60" r={radius} fill="none"
            stroke="hsl(185, 70%, 50%)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            filter="url(#glow)"
          />
        </svg>
        {/* Number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono-kpi text-5xl text-primary">{score}</span>
          <span className="mt-3 text-lg text-muted-foreground font-light">/{max}</span>
        </div>
      </div>
      <div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  );
};

export default SimulationGauge;
