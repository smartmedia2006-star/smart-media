"use client";
import { useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/Badge";
import { ConfirmModal } from "@/components/ui/Modal";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import toast from "react-hot-toast";
import { formatCurrency, formatDate, daysUntil } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Contract = {
  id: string;
  contractNumber: string;
  status: string;
  startDate: Date;
  endDate: Date;
  totalValue: number;
  client: { id: string; companyName: string; email: string };
  contractAssets: Array<{ asset: { id: string; name: string; code: string } }>;
};

interface ContractsTableProps {
  contracts: Contract[];
  canEdit: boolean;
}

export function ContractsTable({ contracts, canEdit }: ContractsTableProps) {
  const [deleteTarget, setDeleteTarget] = useState<Contract | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [tableData, setTableData] = useState(contracts);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/contracts/${deleteTarget.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setTableData((d) => d.filter((c) => c.id !== deleteTarget.id));
      toast.success("Contract terminated");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to terminate contract");
    } finally {
      setDeleting(false);
    }
  }

  const columns: ColumnDef<Contract, unknown>[] = [
    {
      accessorKey: "contractNumber",
      header: "Contract #",
      cell: ({ row }) => (
        <Link
          href={`/admin/contracts/${row.original.id}`}
          className="font-mono text-sm font-semibold text-brand-blue-600 hover:underline"
        >
          {row.original.contractNumber}
        </Link>
      ),
    },
    {
      accessorKey: "client.companyName",
      header: "Client",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-sm text-gray-900">{row.original.client.companyName}</p>
          <p className="text-xs text-gray-400">{row.original.client.email}</p>
        </div>
      ),
    },
    {
      id: "assets",
      header: "Assets",
      cell: ({ row }) => (
        <div className="max-w-[200px]">
          {row.original.contractAssets.slice(0, 2).map((ca) => (
            <span key={ca.asset.id} className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full mr-1 mb-1">
              {ca.asset.code}
            </span>
          ))}
          {row.original.contractAssets.length > 2 && (
            <span className="text-xs text-gray-400">+{row.original.contractAssets.length - 2} more</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "startDate",
      header: "Period",
      cell: ({ row }) => (
        <div className="text-sm">
          <p>{formatDate(row.original.startDate, "dd MMM yy")}</p>
          <p className="text-gray-400">→ {formatDate(row.original.endDate, "dd MMM yy")}</p>
        </div>
      ),
    },
    {
      id: "daysLeft",
      header: "Days Left",
      cell: ({ row }) => {
        if (row.original.status !== "ACTIVE") return <span className="text-gray-400 text-xs">—</span>;
        const days = daysUntil(row.original.endDate);
        return (
          <span
            className={cn(
              "text-sm font-semibold",
              days <= 0 ? "text-red-600" : days <= 7 ? "text-orange-600" : days <= 30 ? "text-yellow-600" : "text-green-600"
            )}
          >
            {days <= 0 ? "Expired" : `${days}d`}
          </span>
        );
      },
    },
    {
      accessorKey: "totalValue",
      header: "Value",
      cell: ({ getValue }) => (
        <span className="font-semibold text-sm">{formatCurrency(getValue() as number)}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Link href={`/admin/contracts/${row.original.id}`}
            className="p-1.5 text-gray-400 hover:text-brand-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <EyeIcon className="w-4 h-4" />
          </Link>
          {canEdit && (
            <>
              <Link href={`/admin/contracts/${row.original.id}/edit`}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <PencilIcon className="w-4 h-4" />
              </Link>
              <button onClick={() => setDeleteTarget(row.original)}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <TrashIcon className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        data={tableData}
        columns={columns}
        searchPlaceholder="Search contracts..."
        emptyMessage="No contracts found."
      />
      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Terminate Contract"
        message={`Are you sure you want to terminate contract #${deleteTarget?.contractNumber}? This will mark assets as vacant and cancel all pending reminders.`}
        confirmLabel="Terminate Contract"
        loading={deleting}
      />
    </>
  );
}
