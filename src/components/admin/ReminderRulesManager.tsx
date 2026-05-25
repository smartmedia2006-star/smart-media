"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Rule = {
  id: string;
  name: string;
  eventType: string;
  daysOffset: number;
  channel: string[];
  templateMessage: string;
  subject: string | null;
  isActive: boolean;
};

const schema = z.object({
  name: z.string().min(2),
  eventType: z.enum(["CONTRACT_EXPIRY", "PAYMENT_DUE", "CAMPAIGN_START", "CAMPAIGN_END", "MAINTENANCE_DUE", "CUSTOM"]),
  daysOffset: z.number().int(),
  channel: z.array(z.string()).min(1),
  templateMessage: z.string().min(10),
  subject: z.string().optional(),
  isActive: z.boolean().default(true),
});

type FormData = z.infer<typeof schema>;

const eventOptions = [
  { value: "CONTRACT_EXPIRY", label: "Contract Expiry" },
  { value: "PAYMENT_DUE", label: "Payment Due" },
  { value: "CAMPAIGN_START", label: "Campaign Start" },
  { value: "CAMPAIGN_END", label: "Campaign End" },
  { value: "MAINTENANCE_DUE", label: "Maintenance Due" },
  { value: "CUSTOM", label: "Custom" },
];

const eventLabels: Record<string, string> = {
  CONTRACT_EXPIRY: "Contract Expiry",
  PAYMENT_DUE: "Payment Due",
  CAMPAIGN_START: "Campaign Start",
  CAMPAIGN_END: "Campaign End",
  MAINTENANCE_DUE: "Maintenance Due",
  CUSTOM: "Custom",
};

const channelOptions = ["EMAIL", "WHATSAPP", "TELEGRAM"];

export function ReminderRulesManager({ rules: initialRules, canEdit }: { rules: Rule[]; canEdit: boolean }) {
  const [rules, setRules] = useState(initialRules);
  const [showForm, setShowForm] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["EMAIL"]);
  const [deleting, setDeleting] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { eventType: "CONTRACT_EXPIRY", daysOffset: -7, isActive: true },
  });

  function toggleChannel(ch: string) {
    setSelectedChannels((prev) =>
      prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]
    );
  }

  async function onSubmit(data: FormData) {
    const res = await fetch("/api/reminders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, channel: selectedChannels }),
    });

    if (!res.ok) {
      toast.error("Failed to create rule");
      return;
    }

    const newRule = await res.json();
    setRules((r) => [...r, newRule]);
    toast.success("Reminder rule created");
    setShowForm(false);
    reset();
    setSelectedChannels(["EMAIL"]);
  }

  async function deleteRule(id: string) {
    setDeleting(id);
    const res = await fetch(`/api/reminders/${id}`, { method: "DELETE" });
    if (res.ok) {
      setRules((r) => r.filter((rule) => rule.id !== id));
      toast.success("Rule deleted");
    } else {
      toast.error("Failed to delete rule");
    }
    setDeleting(null);
  }

  return (
    <div className="space-y-3">
      {rules.map((rule) => (
        <div key={rule.id} className={cn("card p-4", !rule.isActive && "opacity-60")}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-brand-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  {eventLabels[rule.eventType]}
                </span>
                <span className="text-xs text-gray-500">
                  {rule.daysOffset < 0 ? `${Math.abs(rule.daysOffset)}d before` : rule.daysOffset === 0 ? "On the day" : `${rule.daysOffset}d after`}
                </span>
                {!rule.isActive && (
                  <span className="text-xs text-red-500 font-medium">Inactive</span>
                )}
              </div>
              <p className="text-sm font-semibold text-gray-900">{rule.name}</p>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{rule.templateMessage}</p>
              <div className="flex gap-1.5 mt-2">
                {rule.channel.map((ch) => (
                  <span key={ch} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {ch === "WHATSAPP" ? "🟢" : ch === "TELEGRAM" ? "🔵" : "📧"} {ch}
                  </span>
                ))}
              </div>
            </div>
            {canEdit && (
              <button
                onClick={() => deleteRule(rule.id)}
                disabled={deleting === rule.id}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ))}

      {rules.length === 0 && !showForm && (
        <div className="text-center py-8 text-sm text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
          No reminder rules configured yet
        </div>
      )}

      {canEdit && (
        <>
          {showForm ? (
            <div className="card p-5 border-brand-blue-200">
              <h3 className="font-semibold text-gray-900 mb-4">New Reminder Rule</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input label="Rule Name" placeholder="e.g. 7-day contract expiry warning"
                  required error={errors.name?.message} {...register("name")} />

                <div className="grid grid-cols-2 gap-3">
                  <Select label="Event Type" options={eventOptions}
                    error={errors.eventType?.message} {...register("eventType")} />
                  <Input label="Days Offset" type="number"
                    hint="Negative = before event, positive = after"
                    error={errors.daysOffset?.message}
                    {...register("daysOffset", { valueAsNumber: true })} />
                </div>

                <div>
                  <label className="label">Channels</label>
                  <div className="flex gap-2">
                    {channelOptions.map((ch) => (
                      <button
                        key={ch}
                        type="button"
                        onClick={() => toggleChannel(ch)}
                        className={cn(
                          "flex-1 py-2 text-xs font-semibold rounded-lg border transition-colors",
                          selectedChannels.includes(ch)
                            ? "bg-brand-blue-600 text-white border-brand-blue-600"
                            : "bg-white text-gray-600 border-gray-300 hover:border-brand-blue-300"
                        )}
                      >
                        {ch === "WHATSAPP" ? "🟢 WhatsApp" : ch === "TELEGRAM" ? "🔵 Telegram" : "📧 Email"}
                      </button>
                    ))}
                  </div>
                </div>

                <Input label="Email Subject (optional)" placeholder="Subject for email channel"
                  {...register("subject")} />

                <Textarea label="Message Template" required rows={4}
                  placeholder="Dear {{clientName}}, your contract expires on {{contractEndDate}}..."
                  hint="Placeholders: {{clientName}}, {{companyName}}, {{contractNumber}}, {{assetName}}, {{contractEndDate}}, {{daysLeft}}"
                  error={errors.templateMessage?.message} {...register("templateMessage")} />

                <div className="flex gap-3">
                  <Button type="submit" loading={isSubmitting} size="sm">Create Rule</Button>
                  <Button type="button" variant="ghost" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
                </div>
              </form>
            </div>
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm text-brand-blue-600 border-2 border-dashed border-brand-blue-200 rounded-xl hover:border-brand-blue-400 hover:bg-blue-50 transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
              Add Reminder Rule
            </button>
          )}
        </>
      )}
    </div>
  );
}
