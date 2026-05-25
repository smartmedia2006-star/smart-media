"use client";
import { useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/DataTable";
import { formatDate, getStatusColor } from "@/lib/utils";

type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  message: string;
  status: string;
  source: string | null;
  createdAt: Date;
};

export function EnquiriesTable({
  enquiries,
  canEdit,
}: {
  enquiries: Enquiry[];
  canEdit: boolean;
}) {
  const [selected, setSelected] = useState<Enquiry | null>(null);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/enquiries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    window.location.reload();
  }

  const columns: ColumnDef<Enquiry, unknown>[] = [
    {
      accessorKey: "name",
      header: "Contact",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-sm text-gray-900">{row.original.name}</p>
          <p className="text-xs text-gray-500">{row.original.email}</p>
          {row.original.company && (
            <p className="text-xs text-gray-400">{row.original.company}</p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "service",
      header: "Service",
      cell: ({ getValue }) => (
        <span className="text-sm text-gray-700">
          {(getValue() as string)?.replace(/_/g, " ") ?? "—"}
        </span>
      ),
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: ({ getValue }) => (
        <p className="text-sm text-gray-600 max-w-xs truncate">{getValue() as string}</p>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => (
        <span className={`badge text-xs ${getStatusColor(getValue() as string)}`}>
          {getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Received",
      cell: ({ getValue }) => (
        <span className="text-sm text-gray-500">{formatDate(getValue() as Date)}</span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => setSelected(row.original)}
            className="text-xs text-brand-blue-600 hover:underline"
          >
            View
          </button>
          {canEdit && row.original.status === "NEW" && (
            <button
              onClick={() => updateStatus(row.original.id, "CONTACTED")}
              className="text-xs text-gray-500 hover:underline"
            >
              Mark Contacted
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        data={enquiries}
        columns={columns}
        searchPlaceholder="Search enquiries..."
        emptyMessage="No enquiries yet."
      />

      {/* Enquiry detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{selected.name}</h3>
                <p className="text-sm text-gray-500">{selected.email} · {selected.phone ?? "No phone"}</p>
                {selected.company && <p className="text-sm text-gray-500">{selected.company}</p>}
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ×
              </button>
            </div>

            {selected.service && (
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Service Interest</p>
                <p className="text-sm font-medium">{selected.service.replace(/_/g, " ")}</p>
              </div>
            )}

            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Message</p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-3 rounded-lg">
                {selected.message}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-gray-400">{formatDate(selected.createdAt)}</span>
              {canEdit && (
                <div className="flex gap-2">
                  {selected.status !== "CONVERTED" && (
                    <button
                      onClick={() => { updateStatus(selected.id, "CONVERTED"); setSelected(null); }}
                      className="btn-primary text-sm py-1.5 px-3"
                    >
                      Mark Converted
                    </button>
                  )}
                  {selected.status !== "CLOSED" && (
                    <button
                      onClick={() => { updateStatus(selected.id, "CLOSED"); setSelected(null); }}
                      className="btn-outline text-sm py-1.5 px-3"
                    >
                      Close
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
