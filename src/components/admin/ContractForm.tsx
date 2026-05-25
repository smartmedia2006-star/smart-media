"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { contractSchema, type ContractInput } from "@/lib/validators/contract";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { CheckIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";

interface ContractFormProps {
  clients: Array<{ id: string; companyName: string; email: string }>;
  assets: Array<{ id: string; name: string; code: string; format: string; monthlyRate: number; status: string }>;
  defaultValues?: Partial<ContractInput>;
  contractId?: string;
}

const statusOptions = [
  { value: "DRAFT", label: "Draft" },
  { value: "ACTIVE", label: "Active" },
  { value: "TERMINATED", label: "Terminated" },
  { value: "PENDING_RENEWAL", label: "Pending Renewal" },
];

export function ContractForm({ clients, assets, defaultValues, contractId }: ContractFormProps) {
  const router = useRouter();
  const isEditing = !!contractId;
  const [selectedAssets, setSelectedAssets] = useState<string[]>(defaultValues?.assetIds ?? []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<ContractInput>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      status: "DRAFT",
      ...defaultValues,
      assetIds: selectedAssets,
    },
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  function toggleAsset(assetId: string) {
    setSelectedAssets((prev) => {
      const next = prev.includes(assetId) ? prev.filter((id) => id !== assetId) : [...prev, assetId];
      setValue("assetIds", next, { shouldValidate: true });
      return next;
    });
  }

  function calculateDuration(): number {
    if (!startDate || !endDate) return 0;
    const diff = new Date(endDate).getTime() - new Date(startDate).getTime();
    return Math.ceil(diff / (30 * 24 * 60 * 60 * 1000));
  }

  function calculateSuggestedValue(): number {
    const months = calculateDuration();
    return selectedAssets.reduce((sum, id) => {
      const asset = assets.find((a) => a.id === id);
      return sum + (asset?.monthlyRate ?? 0) * months;
    }, 0);
  }

  async function onSubmit(data: ContractInput) {
    const url = isEditing ? `/api/contracts/${contractId}` : "/api/contracts";
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, assetIds: selectedAssets }),
    });

    if (!res.ok) {
      const err = await res.json();
      toast.error(err.error ?? "Failed to save contract");
      return;
    }

    toast.success(
      isEditing
        ? "Contract updated. Reminders rescheduled."
        : "Contract created! Automated reminders have been scheduled."
    );
    router.push("/admin/contracts");
    router.refresh();
  }

  const suggestedValue = calculateSuggestedValue();
  const duration = calculateDuration();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Client selection */}
      <Select
        label="Client"
        placeholder="Select a client..."
        required
        options={clients.map((c) => ({ value: c.id, label: `${c.companyName} (${c.email})` }))}
        error={errors.clientId?.message}
        {...register("clientId")}
      />

      {/* Asset selection */}
      <div>
        <label className="label">
          Advertising Assets / Sites <span className="text-red-500">*</span>
        </label>
        {errors.assetIds && (
          <p className="text-sm text-red-600 mb-2">{errors.assetIds.message}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-64 overflow-y-auto border border-gray-200 rounded-xl p-3 scrollbar-thin">
          {assets.map((asset) => {
            const isSelected = selectedAssets.includes(asset.id);
            const isOccupied = asset.status === "BOOKED" && !isSelected;
            return (
              <button
                key={asset.id}
                type="button"
                onClick={() => !isOccupied && toggleAsset(asset.id)}
                disabled={isOccupied}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border text-left transition-all",
                  isSelected
                    ? "border-brand-blue-500 bg-blue-50"
                    : isOccupied
                    ? "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
                    : "border-gray-200 hover:border-brand-blue-300 hover:bg-blue-50/50"
                )}
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded border flex items-center justify-center flex-shrink-0",
                    isSelected ? "bg-brand-blue-600 border-brand-blue-600" : "border-gray-300"
                  )}
                >
                  {isSelected && <CheckIcon className="w-3 h-3 text-white" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{asset.name}</p>
                  <p className="text-xs text-gray-400">
                    {asset.code} · {formatCurrency(asset.monthlyRate)}/mo
                    {isOccupied && " · Occupied"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-gray-500 mt-1">{selectedAssets.length} asset(s) selected</p>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Start Date"
          type="date"
          required
          error={errors.startDate?.message}
          {...register("startDate")}
        />
        <Input
          label="End Date"
          type="date"
          required
          error={errors.endDate?.message}
          {...register("endDate")}
        />
      </div>

      {/* Value with suggestion */}
      <div>
        <Input
          label="Total Contract Value (NPR)"
          type="number"
          required
          placeholder="0"
          error={errors.totalValue?.message}
          hint={
            suggestedValue > 0
              ? `Suggested based on selected assets × ${duration} months: ${formatCurrency(suggestedValue)}`
              : undefined
          }
          {...register("totalValue", { valueAsNumber: true })}
        />
        {suggestedValue > 0 && (
          <button
            type="button"
            onClick={() =>
              (document.querySelector('input[name="totalValue"]') as HTMLInputElement)!.value = String(suggestedValue)
            }
            className="mt-1 text-xs text-brand-blue-600 hover:underline"
          >
            Use suggested value: {formatCurrency(suggestedValue)}
          </button>
        )}
      </div>

      <Input
        label="Payment Terms"
        placeholder="e.g. 50% advance, 50% on installation"
        {...register("paymentTerms")}
      />

      <Input
        label="Signed Contract Document URL"
        type="url"
        placeholder="https://drive.google.com/..."
        error={errors.signedDocUrl?.message}
        {...register("signedDocUrl")}
      />

      <Select
        label="Contract Status"
        options={statusOptions}
        error={errors.status?.message}
        {...register("status")}
      />

      <Textarea
        label="Internal Notes"
        placeholder="Additional notes for internal reference..."
        rows={3}
        {...register("notes")}
      />

      <div className="bg-blue-50 rounded-xl p-4 text-sm text-gray-700">
        <p className="font-semibold text-gray-900 mb-1">📅 Automated Reminders</p>
        <p>
          Upon saving, the system will automatically schedule WhatsApp, Telegram, and email reminders
          based on your configured Reminder Rules — including contract expiry warnings (7, 3, 1 days before)
          and payment due reminders.
        </p>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={isSubmitting}>
          {isEditing ? "Update Contract" : "Create Contract & Schedule Reminders"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
