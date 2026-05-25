import { cn, getStatusColor } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "status";
  status?: string;
  className?: string;
}

export function Badge({ children, variant = "default", status, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "badge",
        variant === "status" && status ? getStatusColor(status) : "bg-gray-100 text-gray-800",
        className
      )}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const label = status.replace(/_/g, " ");
  return (
    <span className={cn("badge", getStatusColor(status))}>
      {label}
    </span>
  );
}
