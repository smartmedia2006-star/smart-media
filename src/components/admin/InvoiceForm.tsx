"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Input, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  contractId: z.string().min(1, "Contract is required"),
  clientId: z.string().min(1, "Client is required"),
  amount: z.number().positive("Amount must be positive"),
  taxAmount: z.number().min(0).default(0),
  dueDate: z.string().min(1, "Due date is required"),
});

type FormValues = z.infer<typeof schema>;

interface Contract {
  id: string;
  contractNumber: string;
  clientId: string;
  client: { id: string; companyName: string };
}

interface InvoiceFormProps {
  contracts: Contract[];
  clients: { id: string; companyName: string }[];
  defaultContractId?: string;
}

export function InvoiceForm({ contracts, clients, defaultContractId }: InvoiceFormProps) {
  const router = useRouter();
  const [taxRate, setTaxRate] = useState(13);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      contractId: defaultContractId ?? "",
      clientId: defaultContractId
        ? (contracts.find((c) => c.id === defaultContractId)?.clientId ?? "")
        : "",
      taxAmount: 0,
    },
  });

  const selectedContractId = watch("contractId");
  const amount = watch("amount");

  function onContractChange(contractId: string) {
    const contract = contracts.find((c) => c.id === contractId);
    if (contract) {
      setValue("clientId", contract.clientId);
    }
  }

  function applyTax() {
    if (amount && taxRate >= 0) {
      setValue("taxAmount", Math.round((amount * taxRate) / 100));
    }
  }

  async function onSubmit(data: FormValues) {
    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error("Failed to create invoice");
      return;
    }

    const invoice = await res.json();
    toast.success("Invoice created");
    router.push(`/admin/invoices/${invoice.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-6 space-y-5">
      <div>
        <label className="label">Contract</label>
        <select
          {...register("contractId")}
          onChange={(e) => { register("contractId").onChange(e); onContractChange(e.target.value); }}
          className="input-field"
        >
          <option value="">— Select contract —</option>
          {contracts.map((c) => (
            <option key={c.id} value={c.id}>
              {c.contractNumber} — {c.client.companyName}
            </option>
          ))}
        </select>
        {errors.contractId && <p className="text-xs text-red-600 mt-1">{errors.contractId.message}</p>}
      </div>

      <div>
        <label className="label">Client</label>
        <select {...register("clientId")} className="input-field">
          <option value="">— Select client —</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>{c.companyName}</option>
          ))}
        </select>
        {errors.clientId && <p className="text-xs text-red-600 mt-1">{errors.clientId.message}</p>}
      </div>

      <Input
        label="Amount (NPR)"
        type="number"
        step="0.01"
        {...register("amount", { valueAsNumber: true })}
        error={errors.amount?.message}
        required
      />

      <div>
        <label className="label">Tax</label>
        <div className="flex gap-2">
          <input
            type="number"
            className="input-field w-24"
            value={taxRate}
            onChange={(e) => setTaxRate(Number(e.target.value))}
            min={0}
            max={100}
            placeholder="13"
          />
          <span className="flex items-center text-sm text-gray-500">%</span>
          <button type="button" onClick={applyTax} className="btn-outline py-2 px-3 text-sm">
            Apply
          </button>
          <input
            type="number"
            className="input-field flex-1"
            {...register("taxAmount", { valueAsNumber: true })}
            placeholder="Tax amount"
          />
        </div>
        {errors.taxAmount && <p className="text-xs text-red-600 mt-1">{errors.taxAmount.message}</p>}
      </div>

      {amount > 0 && (
        <div className="p-3 bg-gray-50 rounded-lg text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span>NPR {(amount || 0).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Tax</span>
            <span>NPR {(watch("taxAmount") || 0).toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold border-t border-gray-200 pt-2 mt-2">
            <span>Total</span>
            <span>NPR {((amount || 0) + (watch("taxAmount") || 0)).toLocaleString()}</span>
          </div>
        </div>
      )}

      <Input
        label="Due Date"
        type="date"
        {...register("dueDate")}
        error={errors.dueDate?.message}
        required
      />

      <div className="flex items-center justify-between pt-2">
        <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" loading={isSubmitting}>Create Invoice</Button>
      </div>
    </form>
  );
}
