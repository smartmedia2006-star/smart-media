"use client";
import { useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/Badge";
import { ConfirmModal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import toast from "react-hot-toast";
import { formatDate } from "@/lib/utils";

type Client = {
  id: string;
  companyName: string;
  brandName: string | null;
  contactPerson: string;
  email: string;
  phone: string;
  preferredChannel: string;
  isActive: boolean;
  createdAt: Date;
  _count: { contracts: number };
};

interface ClientsTableProps {
  clients: Client[];
  canEdit: boolean;
}

export function ClientsTable({ clients, canEdit }: ClientsTableProps) {
  const [deleteTarget, setDeleteTarget] = useState<Client | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [tableData, setTableData] = useState(clients);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/clients/${deleteTarget.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setTableData((d) => d.filter((c) => c.id !== deleteTarget.id));
      toast.success(`${deleteTarget.companyName} removed`);
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete client");
    } finally {
      setDeleting(false);
    }
  }

  const channelIcon: Record<string, string> = {
    WHATSAPP: "🟢",
    TELEGRAM: "🔵",
    EMAIL: "📧",
    ALL: "🌐",
  };

  const columns: ColumnDef<Client, unknown>[] = [
    {
      accessorKey: "companyName",
      header: "Company",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-gray-900">{row.original.companyName}</p>
          {row.original.brandName && (
            <p className="text-xs text-gray-500">{row.original.brandName}</p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "contactPerson",
      header: "Contact Person",
    },
    {
      accessorKey: "email",
      header: "Email / Phone",
      cell: ({ row }) => (
        <div>
          <a href={`mailto:${row.original.email}`} className="text-brand-blue-600 hover:underline text-sm">
            {row.original.email}
          </a>
          <p className="text-xs text-gray-500">{row.original.phone}</p>
        </div>
      ),
    },
    {
      accessorKey: "preferredChannel",
      header: "Channel",
      cell: ({ getValue }) => {
        const channel = getValue() as string;
        return (
          <span className="text-sm">
            {channelIcon[channel]} {channel}
          </span>
        );
      },
    },
    {
      accessorKey: "_count.contracts",
      header: "Contracts",
      cell: ({ row }) => (
        <span className="font-semibold text-brand-blue-600">
          {row.original._count.contracts}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Added",
      cell: ({ getValue }) => (
        <span className="text-sm text-gray-500">{formatDate(getValue() as Date)}</span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Link
            href={`/admin/clients/${row.original.id}`}
            className="p-1.5 text-gray-400 hover:text-brand-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="View"
          >
            <EyeIcon className="w-4 h-4" />
          </Link>
          {canEdit && (
            <>
              <Link
                href={`/admin/clients/${row.original.id}/edit`}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Edit"
              >
                <PencilIcon className="w-4 h-4" />
              </Link>
              <Link
                href={`/admin/messages?clientId=${row.original.id}`}
                className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Send message"
              >
                <ChatBubbleLeftEllipsisIcon className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setDeleteTarget(row.original)}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
              >
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
        searchPlaceholder="Search clients..."
        emptyMessage="No clients found. Add your first client to get started."
      />

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Remove Client"
        message={`Are you sure you want to remove "${deleteTarget?.companyName}"? This is a soft delete — existing data will be retained.`}
        confirmLabel="Remove Client"
        loading={deleting}
      />
    </>
  );
}
