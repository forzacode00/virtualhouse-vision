import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, ReferenceLine } from "recharts";

const data = [
  { month: "Jan", design: 12.5, actual: 14.8 },
  { month: "Feb", design: 11.8, actual: 15.1 },
  { month: "Mar", design: 9.5, actual: 10.8 },
  { month: "Apr", design: 7.2, actual: 7.9 },
  { month: "May", design: 5.8, actual: 6.1 },
  { month: "Jun", design: 6.5, actual: 7.2 },
  { month: "Jul", design: 8.2, actual: 9.4 },
  { month: "Aug", design: 7.8, actual: 8.9 },
  { month: "Sep", design: 7.0, actual: 7.6 },
  { month: "Oct", design: 9.2, actual: 10.1 },
  { month: "Nov", design: 11.0, actual: 12.4 },
  { month: "Dec", design: 12.2, actual: 14.2 },
];

const DesignVsActualChart = () => (
  <div className="rounded-lg border border-border bg-card p-6">
    <h2 className="mb-2 text-xl font-semibold text-foreground">Design vs. Actual Performance</h2>
    <p className="mb-6 text-xs text-muted-foreground">Monthly energy consumption — designed baseline vs. measured values</p>
    <ResponsiveContainer width="100%" height={340}>
      <AreaChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
        <defs>
          <linearGradient id="designGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(210, 70%, 55%)" stopOpacity={0.2} />
            <stop offset="100%" stopColor="hsl(210, 70%, 55%)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(38, 92%, 55%)" stopOpacity={0.25} />
            <stop offset="100%" stopColor="hsl(38, 92%, 55%)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(216, 30%, 20%)" strokeOpacity={0.5} vertical={false} />
        <XAxis
          dataKey="month"
          stroke="hsl(215, 20%, 45%)"
          tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }}
          tickLine={false}
        />
        <YAxis
          stroke="hsl(215, 20%, 45%)"
          tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }}
          label={{ value: "kWh/m²", angle: -90, position: "insideLeft", fill: "hsl(215, 20%, 55%)", fontSize: 11, dx: -5 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(216, 40%, 12%)",
            border: "1px solid hsl(216, 30%, 22%)",
            borderRadius: 8,
            color: "hsl(210, 40%, 96%)",
            fontSize: 12,
          }}
          formatter={(value: number, name: string) => [
            `${value} kWh/m²`,
            name === "design" ? "Designed" : "Actual",
          ]}
        />
        <Legend
          wrapperStyle={{ fontSize: 11, color: "hsl(215, 20%, 55%)", paddingTop: 12 }}
          formatter={(value) => (value === "design" ? "Designed consumption" : "Actual consumption")}
        />
        <Area
          type="monotone"
          dataKey="design"
          stroke="hsl(210, 70%, 55%)"
          strokeWidth={2}
          fill="url(#designGrad)"
          dot={{ r: 3, fill: "hsl(210, 70%, 55%)", stroke: "#fff", strokeWidth: 1.5 }}
        />
        <Area
          type="monotone"
          dataKey="actual"
          stroke="hsl(38, 92%, 55%)"
          strokeWidth={2}
          fill="url(#actualGrad)"
          dot={{ r: 3, fill: "hsl(38, 92%, 55%)", stroke: "#fff", strokeWidth: 1.5 }}
        />
      </AreaChart>
    </ResponsiveContainer>
    <p className="mt-3 text-center text-sm font-semibold text-warning">
      Gap = 7.5% over design = NOK 52,000/yr wasted energy
    </p>
  </div>
);

export default DesignVsActualChart;
