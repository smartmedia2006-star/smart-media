"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface SettingsFormProps {
  settings: Record<string, string>;
}

interface FormValues {
  company_name: string;
  company_phone: string;
  company_email: string;
  company_address: string;
  whatsapp_number: string;
  admin_notification_email: string;
  invoice_footer_note: string;
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      company_name: settings.company_name ?? "",
      company_phone: settings.company_phone ?? "",
      company_email: settings.company_email ?? "",
      company_address: settings.company_address ?? "",
      whatsapp_number: settings.whatsapp_number ?? "",
      admin_notification_email: settings.admin_notification_email ?? "",
      invoice_footer_note: settings.invoice_footer_note ?? "",
    },
  });

  async function onSubmit(data: FormValues) {
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card p-6 space-y-6">
      <h2 className="font-semibold text-gray-900">General Settings</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Company Name</label>
            <input {...register("company_name")} className="input-field" />
          </div>
          <div>
            <label className="label">Company Phone</label>
            <input {...register("company_phone")} className="input-field" />
          </div>
          <div>
            <label className="label">Company Email</label>
            <input type="email" {...register("company_email")} className="input-field" />
          </div>
          <div>
            <label className="label">WhatsApp Number</label>
            <input {...register("whatsapp_number")} className="input-field" placeholder="+977..." />
          </div>
          <div>
            <label className="label">Admin Notification Email</label>
            <input type="email" {...register("admin_notification_email")} className="input-field" />
          </div>
          <div>
            <label className="label">Company Address</label>
            <input {...register("company_address")} className="input-field" />
          </div>
        </div>
        <div>
          <label className="label">Invoice Footer Note</label>
          <textarea {...register("invoice_footer_note")} className="input-field" rows={2} />
        </div>
        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="btn-primary py-2 px-5">
            {saving ? "Saving…" : "Save Settings"}
          </button>
          {saved && <span className="text-sm text-green-600 font-medium">✓ Saved!</span>}
        </div>
      </form>
    </div>
  );
}
