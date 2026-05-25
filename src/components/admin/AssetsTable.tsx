"use client";
import { useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/Badge";
import { ConfirmModal } from "@/components/ui/Modal";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import toast from "react-hot-toast";
import { formatCurrency } from "@/lib/utils";

type Asset = {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  format: string;
  width: number | null;
  height: number | null;
  unit: string;
  status: string;
  monthlyRate: number;
  illumination: string;
  _count: { contractAssets: number };
};

const formatLabel: Record<string, string> = {
  STATIC_BILLBOARD: "Billboard",
  DIGITAL_SCREEN: "Digital",
  STREET_FURNITURE: "Street Furn.",
  TRANSIT: "Transit",
  MALL: "Mall",
  AIRPORT: "Airport",
  UNIPOLE: "Unipole",
};

export function AssetsTable({ assets, canEdit }: { assets: Asset[]; canEdit: boolean }) {
  const [deleteTarget, setDeleteTarget] = useState<Asset | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [tableData, setTableData] = useState(assets);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/assets/${deleteTarget.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setTableData((d) => d.filter((a) => a.id !== deleteTarget.id));
      toast.success("Asset deactivated");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete asset");
    } finally {
      setDeleting(false);
    }
  }

  const columns: ColumnDef<Asset, unknown>[] = [
    {
      accessorKey: "name",
      header: "Asset Name",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-sm text-gray-900">{row.original.name}</p>
          <p className="text-xs font-mono text-gray-400">{row.original.code}</p>
        </div>
      ),
    },
    {
      accessorKey: "address",
      header: "Location",
      cell: ({ row }) => (
        <div>
          <p className="text-sm text-gray-700 truncate max-w-[160px]">{row.original.address}</p>
          <p className="text-xs text-gray-400">{row.original.city}</p>
        </div>
      ),
    },
    {
      accessorKey: "format",
      header: "Format",
      cell: ({ getValue }) => (
        <span className="badge bg-blue-100 text-blue-700 text-xs">
          {formatLabel[getValue() as string] ?? getValue() as string}
        </span>
      ),
    },
    {
      id: "size",
      header: "Size",
      cell: ({ row }) =>
        row.original.width && row.original.height ? (
          <span className="text-sm font-mono text-gray-600">
            {row.original.width}×{row.original.height} {row.original.unit}
          </span>
        ) : (
          <span className="text-gray-400">—</span>
        ),
    },
    {
      accessorKey: "monthlyRate",
      header: "Monthly Rate",
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
      accessorKey: "_count.contractAssets",
      header: "Contracts",
      cell: ({ getValue }) => (
        <span className="text-sm text-gray-600">{getValue() as number}</span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Link href={`/admin/assets/${row.original.id}`}
            className="p-1.5 text-gray-400 hover:text-brand-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <EyeIcon className="w-4 h-4" />
          </Link>
          {canEdit && (
            <>
              <Link href={`/admin/assets/${row.original.id}/edit`}
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
        searchPlaceholder="Search assets by name or location..."
        emptyMessage="No assets found."
      />
      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Deactivate Asset"
        message={`Deactivate "${deleteTarget?.name}"? It will be hidden from new contracts but historical data is preserved.`}
        confirmLabel="Deactivate"
        loading={deleting}
      />
    </>
  );
}
