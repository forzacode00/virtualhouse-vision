import { ReactNode } from "react";

interface KPICardProps {
  icon: ReactNode;
  value: string;
  label: string;
  accentClass?: string;
  glowColor?: string;
}

const KPICard = ({ icon, value, label, accentClass = "text-primary", glowColor = "var(--primary)" }: KPICardProps) => (
  <div
    className="group flex items-center gap-4 rounded-lg border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5"
    style={{
      // @ts-ignore
      "--glow": glowColor,
    } as React.CSSProperties}
  >
    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border bg-secondary/50 ${accentClass}`}>
      {icon}
    </div>
    <div>
      <div className={`font-mono-kpi text-3xl leading-tight ${accentClass}`}>{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  </div>
);

export default KPICard;
