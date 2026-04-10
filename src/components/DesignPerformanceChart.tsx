import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell, LabelList } from "recharts";

const data = [
  { name: "Original Design", value: 116, fill: "hsl(38, 92%, 55%)" },
  { name: "After VH Optimization", value: 108, fill: "hsl(152, 60%, 48%)" },
];

const DesignPerformanceChart = () => (
  <div className="rounded-lg border border-border bg-card p-6">
    <h2 className="mb-6 text-xl font-semibold text-foreground">Simulated Annual Performance</h2>
    <ResponsiveContainer width="100%" height={380}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 40 }} barSize={64}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(216, 30%, 20%)" strokeOpacity={0.5} vertical={false} />
        <XAxis
          dataKey="name"
          stroke="hsl(215, 20%, 45%)"
          tick={{ fontSize: 12, fill: "hsl(215, 20%, 55%)" }}
          tickLine={false}
        />
        <YAxis
          domain={[0, 140]}
          tickFormatter={(v) => `${v}`}
          stroke="hsl(215, 20%, 45%)"
          tick={{ fontSize: 12, fill: "hsl(215, 20%, 55%)" }}
          label={{ value: "kWh/m²·yr", angle: -90, position: "insideLeft", fill: "hsl(215, 20%, 55%)", fontSize: 12, dx: -5 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(216, 40%, 12%)",
            border: "1px solid hsl(216, 30%, 22%)",
            borderRadius: 8,
            color: "hsl(210, 40%, 96%)",
            fontSize: 13,
          }}
          formatter={(value: number) => [`${value} kWh/m²·yr`]}
        />
        <ReferenceLine
          y={115}
          stroke="hsl(0, 72%, 55%)"
          strokeDasharray="6 4"
          strokeWidth={2}
          label={{
            value: "TEK17 Limit (115)",
            position: "right",
            fill: "hsl(0, 72%, 55%)",
            fontSize: 11,
            fontWeight: 600,
          }}
        />
        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.fill} />
          ))}
          <LabelList
            dataKey="value"
            position="top"
            fill="hsl(210, 40%, 96%)"
            fontSize={14}
            fontWeight={700}
            formatter={(v: number) => `${v}`}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
    <p className="mt-2 text-center text-sm text-success font-semibold">
      Saved 8 kWh/m²·yr = NOK 72,000/yr
    </p>
  </div>
);

export default DesignPerformanceChart;
