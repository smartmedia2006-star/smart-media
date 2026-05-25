"use client";
import { useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/DataTable";
import { PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";

type InventoryItem = {
  id: string;
  name: string;
  sku: string | null;
  category: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
  currentCost: number | null;
  supplier: string | null;
  lastRestocked: Date | null;
};

export function InventoryTable({ items, canEdit }: { items: InventoryItem[]; canEdit: boolean }) {
  const columns: ColumnDef<InventoryItem, unknown>[] = [
    {
      accessorKey: "name",
      header: "Item",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-sm text-gray-900">{row.original.name}</p>
          {row.original.sku && (
            <p className="text-xs font-mono text-gray-400">{row.original.sku}</p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ getValue }) => (
        <span className="badge bg-gray-100 text-gray-600 text-xs">
          {(getValue() as string).replace(/_/g, " ")}
        </span>
      ),
    },
    {
      id: "stock",
      header: "Stock",
      cell: ({ row }) => {
        const isLow = row.original.quantity <= row.original.reorderLevel;
        return (
          <div>
            <p className={cn("font-semibold text-sm", isLow ? "text-red-600" : "text-gray-900")}>
              {row.original.quantity} {row.original.unit}
            </p>
            {isLow && (
              <p className="text-xs text-red-500">⚠️ Below reorder ({row.original.reorderLevel})</p>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "currentCost",
      header: "Unit Cost",
      cell: ({ getValue }) =>
        getValue() ? (
          <span className="text-sm">NPR {(getValue() as number).toLocaleString()}</span>
        ) : (
          <span className="text-gray-400">—</span>
        ),
    },
    {
      accessorKey: "supplier",
      header: "Supplier",
      cell: ({ getValue }) => (
        <span className="text-sm text-gray-600">{getValue() as string ?? "—"}</span>
      ),
    },
    {
      accessorKey: "lastRestocked",
      header: "Last Restocked",
      cell: ({ getValue }) =>
        getValue() ? (
          <span className="text-sm text-gray-500">{formatDate(getValue() as Date)}</span>
        ) : (
          <span className="text-gray-400">—</span>
        ),
    },
    ...(canEdit
      ? [
          {
            id: "actions",
            header: "",
            cell: ({ row }: { row: { original: InventoryItem } }) => (
              <Link
                href={`/admin/inventory/${row.original.id}/edit`}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors inline-flex"
              >
                <PencilIcon className="w-4 h-4" />
              </Link>
            ),
          } as ColumnDef<InventoryItem, unknown>,
        ]
      : []),
  ];

  return (
    <DataTable
      data={items}
      columns={columns}
      searchPlaceholder="Search inventory..."
      emptyMessage="No inventory items found."
    />
  );
}
