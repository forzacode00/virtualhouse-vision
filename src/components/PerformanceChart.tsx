import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";

const data = [
  { year: 2024, heating: 95, cooling: 92, ahu: 82 },
  { year: 2025, heating: 93, cooling: 89, ahu: 80 },
  { year: 2026, heating: 91, cooling: 85, ahu: 76 },
  { year: 2027, heating: 89, cooling: 80, ahu: 72 },
  { year: 2028, heating: 87, cooling: 75, ahu: 68 },
  { year: 2029, heating: 85, cooling: 70, ahu: 65 },
  { year: 2030, heating: 83, cooling: 66, ahu: 62 },
  { year: 2031, heating: 80, cooling: 63, ahu: 60 },
  { year: 2032, heating: 78, cooling: 62, ahu: 58 },
  { year: 2033, heating: 76, cooling: 61, ahu: 56 },
  { year: 2034, heating: 75, cooling: 60, ahu: 55 },
];

const PerformanceChart = () => (
  <div className="rounded-lg border border-border bg-card p-6">
    <h2 className="mb-6 text-xl font-semibold text-foreground">System Performance Simulation</h2>
    <ResponsiveContainer width="100%" height={380}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="gradHeating" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(185, 70%, 50%)" stopOpacity={0.2} />
            <stop offset="100%" stopColor="hsl(185, 70%, 50%)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradCooling" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(38, 92%, 55%)" stopOpacity={0.2} />
            <stop offset="100%" stopColor="hsl(38, 92%, 55%)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradAhu" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(0, 72%, 55%)" stopOpacity={0.2} />
            <stop offset="100%" stopColor="hsl(0, 72%, 55%)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(216, 30%, 22%)" />
        <XAxis dataKey="year" stroke="hsl(215, 20%, 55%)" tick={{ fontSize: 12 }} />
        <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} stroke="hsl(215, 20%, 55%)" tick={{ fontSize: 12 }} label={{ value: "Efficiency (%)", angle: -90, position: "insideLeft", fill: "hsl(215, 20%, 55%)", fontSize: 12 }} />
        <Tooltip contentStyle={{ backgroundColor: "hsl(216, 40%, 14%)", border: "1px solid hsl(216, 30%, 22%)", borderRadius: 8, color: "hsl(210, 40%, 96%)" }} formatter={(value: number) => `${value}%`} />
        <Area type="monotone" dataKey="heating" stroke="hsl(185, 70%, 50%)" fill="url(#gradHeating)" strokeWidth={2} dot={{ r: 3, fill: "hsl(185, 70%, 50%)" }} name="Heating Loop Efficiency" />
        <Area type="monotone" dataKey="cooling" stroke="hsl(38, 92%, 55%)" fill="url(#gradCooling)" strokeWidth={2} dot={{ r: 3, fill: "hsl(38, 92%, 55%)" }} name="Cooling Coil Efficiency" />
        <Area type="monotone" dataKey="ahu" stroke="hsl(0, 72%, 55%)" fill="url(#gradAhu)" strokeWidth={2} dot={{ r: 3, fill: "hsl(0, 72%, 55%)" }} name="AHU (Air Handling Unit) Efficiency" />
        <Legend wrapperStyle={{ fontSize: 12, color: "hsl(215, 20%, 55%)" }} />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default PerformanceChart;
