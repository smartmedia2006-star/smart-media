"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Invoice {
  id: string;
  invoiceNumber: string;
  status: string;
}

export function InvoiceActions({ invoice }: { invoice: Invoice }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function updateStatus(status: string) {
    setLoading(status);
    try {
      await fetch(`/api/invoices/${invoice.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      router.refresh();
    } finally {
      setLoading(null);
    }
  }

  async function deleteInvoice() {
    if (!confirm(`Delete invoice ${invoice.invoiceNumber}? This cannot be undone.`)) return;
    setLoading("delete");
    await fetch(`/api/invoices/${invoice.id}`, { method: "DELETE" });
    router.push("/admin/invoices");
  }

  return (
    <div className="flex flex-wrap gap-3">
      {invoice.status === "PENDING" && (
        <>
          <button
            onClick={() => updateStatus("PAID")}
            disabled={loading !== null}
            className="btn-primary py-2 px-4 text-sm"
          >
            {loading === "PAID" ? "Updating…" : "Mark as Paid"}
          </button>
          <button
            onClick={() => updateStatus("VOID")}
            disabled={loading !== null}
            className="btn-outline py-2 px-4 text-sm"
          >
            Void Invoice
          </button>
        </>
      )}
      {invoice.status === "PAID" && (
        <button
          onClick={() => updateStatus("PENDING")}
          disabled={loading !== null}
          className="btn-outline py-2 px-4 text-sm"
        >
          Revert to Pending
        </button>
      )}
      <button
        onClick={deleteInvoice}
        disabled={loading !== null}
        className="ml-auto text-sm text-red-600 hover:text-red-700 px-3 py-2 hover:bg-red-50 rounded-lg transition-colors"
      >
        {loading === "delete" ? "Deleting…" : "Delete Invoice"}
      </button>
    </div>
  );
}
