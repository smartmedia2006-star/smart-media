"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";

const schema = z.object({
  channel: z.enum(["EMAIL", "WHATSAPP", "TELEGRAM"]),
  subject: z.string().optional(),
  message: z.string().min(5, "Message too short"),
});

type FormData = z.infer<typeof schema>;

interface Client {
  id: string;
  companyName: string;
  email: string;
  preferredChannel: string;
}

interface BulkMessageFormProps {
  clients: Client[];
  sentById: string;
}

const channelOptions = [
  { value: "EMAIL", label: "📧 Email" },
  { value: "WHATSAPP", label: "🟢 WhatsApp" },
  { value: "TELEGRAM", label: "🔵 Telegram" },
];

const TEMPLATES = [
  {
    label: "Contract Renewal Reminder",
    body: "Dear {{clientName}},\n\nThis is a reminder that your advertising contract #{{contractNumber}} expires on {{contractEndDate}}. Please contact us to discuss renewal options.\n\nBest regards,\nSmart Media Nepal",
  },
  {
    label: "Payment Reminder",
    body: "Dear {{clientName}},\n\nYour invoice of {{invoiceAmount}} is due on {{dueDate}}. Please arrange payment at your earliest convenience.\n\nThank you,\nSmart Media Nepal",
  },
  {
    label: "New Campaign Announcement",
    body: "Dear {{clientName}},\n\nWe have exciting new advertising locations available that may interest your brand. Contact us to learn more about our latest inventory.\n\nSmart Media Nepal",
  },
];

export function BulkMessageForm({ clients }: BulkMessageFormProps) {
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [result, setResult] = useState<{ succeeded: number; failed: number; total: number } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { channel: "EMAIL" },
  });

  const channel = watch("channel");

  function toggleAll() {
    if (selectAll) {
      setSelectedClients([]);
    } else {
      setSelectedClients(clients.map((c) => c.id));
    }
    setSelectAll(!selectAll);
  }

  function toggleClient(id: string) {
    setSelectedClients((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  async function onSubmit(data: FormData) {
    if (selectedClients.length === 0) {
      toast.error("Select at least one client");
      return;
    }

    const res = await fetch("/api/messages/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, clientIds: selectedClients }),
    });

    const json = await res.json();
    if (!res.ok) {
      toast.error(json.error ?? "Failed to send messages");
      return;
    }

    setResult(json);
    toast.success(`Sent to ${json.succeeded}/${json.total} clients`);
    setSelectedClients([]);
    setSelectAll(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Client selection */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="label mb-0">Recipients ({selectedClients.length} selected)</label>
          <button
            type="button"
            onClick={toggleAll}
            className="text-xs text-brand-blue-600 hover:underline"
          >
            {selectAll ? "Deselect all" : "Select all"}
          </button>
        </div>
        <div className="border border-gray-200 rounded-xl max-h-48 overflow-y-auto scrollbar-thin divide-y divide-gray-50">
          {clients.map((client) => {
            const isSelected = selectedClients.includes(client.id);
            return (
              <button
                key={client.id}
                type="button"
                onClick={() => toggleClient(client.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-gray-50 transition-colors",
                  isSelected && "bg-blue-50"
                )}
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded border flex items-center justify-center flex-shrink-0",
                    isSelected ? "bg-brand-blue-600 border-brand-blue-600" : "border-gray-300"
                  )}
                >
                  {isSelected && <CheckIcon className="w-3 h-3 text-white" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{client.companyName}</p>
                  <p className="text-xs text-gray-400 truncate">{client.email}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Select
        label="Send via"
        options={channelOptions}
        error={errors.channel?.message}
        {...register("channel")}
      />

      {channel === "EMAIL" && (
        <div>
          <label className="label">Subject (Email only)</label>
          <input
            className="input-field"
            placeholder="Email subject line"
            {...register("subject")}
          />
        </div>
      )}

      {/* Templates */}
      <div>
        <p className="label mb-1">Quick Templates</p>
        <div className="space-y-1">
          {TEMPLATES.map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => setValue("message", t.body)}
              className="w-full text-left text-xs px-3 py-2 bg-gray-50 hover:bg-blue-50 rounded-lg text-gray-600 hover:text-brand-blue-700 transition-colors"
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <Textarea
        label="Message"
        placeholder="Type your message here..."
        required
        rows={5}
        error={errors.message?.message}
        hint="Use {{clientName}}, {{contractNumber}}, {{endDate}} as placeholders"
        {...register("message")}
      />

      {result && (
        <div className={cn(
          "p-3 rounded-lg text-sm",
          result.failed > 0 ? "bg-yellow-50 text-yellow-800" : "bg-green-50 text-green-800"
        )}>
          ✅ Sent: {result.succeeded}/{result.total}
          {result.failed > 0 && ` · ❌ Failed: ${result.failed}`}
        </div>
      )}

      <Button type="submit" loading={isSubmitting} className="w-full" disabled={selectedClients.length === 0}>
        Send to {selectedClients.length} Client(s)
      </Button>
    </form>
  );
}
