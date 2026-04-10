import { motion } from "framer-motion";

export interface Phase {
  num: number;
  label: string;
  subtitle: string;
}

export const phases: Phase[] = [
  { num: 1, label: "Design & Verify", subtitle: "Simulate before construction" },
  { num: 2, label: "Virtual Commissioning", subtitle: "Stress-test before handover" },
  { num: 3, label: "Monitor Operations", subtitle: "Live data vs. simulation" },
  { num: 4, label: "Optimize & Predict", subtitle: "AI + physics optimization" },
  { num: 5, label: "Redesign", subtitle: "Simulate upgrades before investing" },
];

interface LifecycleStripProps {
  activePhase: number;
  onPhaseChange: (phase: number) => void;
}

const LifecycleStrip = ({ activePhase, onPhaseChange }: LifecycleStripProps) => (
  <div className="mb-6 border-b border-border">
    <div className="flex">
      {phases.map((p) => {
        const isActive = p.num === activePhase;
        return (
          <button
            key={p.num}
            onClick={() => onPhaseChange(p.num)}
            className={`relative flex-1 px-4 py-3 text-left transition-colors ${
              isActive ? "bg-primary/8" : "hover:bg-secondary/40"
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {p.num}
              </span>
              <span
                className={`text-xs font-semibold ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {p.label}
              </span>
            </div>
            <p
              className={`mt-0.5 pl-7 text-[10px] ${
                isActive ? "text-muted-foreground" : "text-muted-foreground/50"
              }`}
            >
              {p.subtitle}
            </p>
            {isActive && (
              <motion.div
                layoutId="phase-indicator"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        );
      })}
    </div>
  </div>
);

export default LifecycleStrip;
