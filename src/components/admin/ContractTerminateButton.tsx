"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ContractTerminateButton({
  contractId,
  contractNumber,
}: {
  contractId: string;
  contractNumber: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function terminate() {
    if (
      !confirm(
        `Terminate contract ${contractNumber}?\n\nThis will:\n• Release all associated sites to VACANT\n• Cancel all pending reminders\n• Mark the contract as TERMINATED\n\nThis action cannot be undone.`
      )
    )
      return;

    setLoading(true);
    try {
      const res = await fetch(`/api/contracts/${contractId}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/contracts");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={terminate}
      disabled={loading}
      className="py-2 px-4 text-sm bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded-xl font-medium transition-colors disabled:opacity-50"
    >
      {loading ? "Terminating…" : "Terminate"}
    </button>
  );
}
