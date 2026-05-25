import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: { value: number; label: string };
  color?: "blue" | "red" | "green" | "yellow" | "purple";
  className?: string;
}

const colorMap = {
  blue: { bg: "bg-blue-100", text: "text-blue-600", icon: "text-blue-500" },
  red: { bg: "bg-red-100", text: "text-red-600", icon: "text-red-500" },
  green: { bg: "bg-green-100", text: "text-green-600", icon: "text-green-500" },
  yellow: { bg: "bg-yellow-100", text: "text-yellow-600", icon: "text-yellow-500" },
  purple: { bg: "bg-purple-100", text: "text-purple-600", icon: "text-purple-500" },
};

export function StatCard({ title, value, subtitle, icon, trend, color = "blue", className }: StatCardProps) {
  const colors = colorMap[color];
  return (
    <div className={cn("stat-card", className)}>
      {icon && (
        <div className={cn("flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center", colors.bg)}>
          <div className={cn("w-6 h-6", colors.icon)}>{icon}</div>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
        <p className="mt-1 text-2xl font-bold font-heading text-gray-900">{value}</p>
        {(subtitle || trend) && (
          <div className="mt-1 flex items-center gap-2">
            {trend && (
              <span
                className={cn(
                  "text-xs font-semibold",
                  trend.value >= 0 ? "text-green-600" : "text-red-600"
                )}
              >
                {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
            )}
            {subtitle && <span className="text-xs text-gray-500">{subtitle}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
