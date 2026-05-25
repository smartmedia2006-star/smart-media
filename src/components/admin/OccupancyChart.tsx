"use client";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#1d4ed8", "#dc2626", "#7c3aed", "#059669", "#d97706", "#0891b2", "#be185d"];

const FORMAT_LABELS: Record<string, string> = {
  STATIC_BILLBOARD: "Billboard",
  DIGITAL_SCREEN: "Digital",
  STREET_FURNITURE: "Street Furn.",
  TRANSIT: "Transit",
  MALL: "Mall",
  AIRPORT: "Airport",
  UNIPOLE: "Unipole",
};

interface OccupancyChartProps {
  data: Array<{ format: string; _count: number }>;
}

export function OccupancyChart({ data }: OccupancyChartProps) {
  const chartData = data.map((d) => ({
    name: FORMAT_LABELS[d.format] ?? d.format,
    value: d._count,
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={85}
          paddingAngle={3}
          dataKey="value"
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => [`${value} sites`, ""]}
          contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "12px" }}
        />
        <Legend iconSize={10} iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
