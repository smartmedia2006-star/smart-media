import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, differenceInDays } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "NPR"): string {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string, fmt = "dd MMM yyyy"): string {
  return format(new Date(date), fmt);
}

export function formatRelativeDate(date: Date | string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function daysUntil(date: Date | string): number {
  return differenceInDays(new Date(date), new Date());
}

export function generateContractNumber(): string {
  const year = new Date().getFullYear().toString().slice(-2);
  const month = String(new Date().getMonth() + 1).padStart(2, "0");
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  return `SM-${year}${month}-${random}`;
}

export function generateInvoiceNumber(): string {
  const year = new Date().getFullYear().toString().slice(-2);
  const month = String(new Date().getMonth() + 1).padStart(2, "0");
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  return `INV-${year}${month}-${random}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + "...";
}

export function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+="[^"]*"/gi, "");
}

export function parseCSV<T extends Record<string, string>>(csvText: string): T[] {
  const lines = csvText.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""));
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim().replace(/"/g, ""));
    return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? ""])) as T;
  });
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    ACTIVE: "bg-green-100 text-green-800",
    DRAFT: "bg-gray-100 text-gray-800",
    EXPIRED: "bg-red-100 text-red-800",
    TERMINATED: "bg-red-100 text-red-800",
    PENDING_RENEWAL: "bg-yellow-100 text-yellow-800",
    VACANT: "bg-green-100 text-green-800",
    BOOKED: "bg-blue-100 text-blue-800",
    MAINTENANCE: "bg-orange-100 text-orange-800",
    COMING_SOON: "bg-purple-100 text-purple-800",
    PENDING: "bg-yellow-100 text-yellow-800",
    PAID: "bg-green-100 text-green-800",
    OVERDUE: "bg-red-100 text-red-800",
    CANCELLED: "bg-gray-100 text-gray-800",
    SENT: "bg-green-100 text-green-800",
    FAILED: "bg-red-100 text-red-800",
    NEW: "bg-blue-100 text-blue-800",
    CONTACTED: "bg-purple-100 text-purple-800",
    CONVERTED: "bg-green-100 text-green-800",
    CLOSED: "bg-gray-100 text-gray-800",
  };
  return map[status] ?? "bg-gray-100 text-gray-800";
}

export function rateLimitKey(identifier: string, action: string): string {
  return `rate:${action}:${identifier}`;
}
