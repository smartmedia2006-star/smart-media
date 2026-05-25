"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { clientSchema, type ClientInput } from "@/lib/validators/client";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface ClientFormProps {
  defaultValues?: Partial<ClientInput>;
  clientId?: string;
}

const channelOptions = [
  { value: "EMAIL", label: "📧 Email" },
  { value: "WHATSAPP", label: "🟢 WhatsApp" },
  { value: "TELEGRAM", label: "🔵 Telegram" },
  { value: "ALL", label: "🌐 All Channels" },
];

const countryCodes = [
  { value: "+977", label: "🇳🇵 +977 (Nepal)" },
  { value: "+91", label: "🇮🇳 +91 (India)" },
  { value: "+1", label: "🇺🇸 +1 (USA)" },
  { value: "+44", label: "🇬🇧 +44 (UK)" },
  { value: "+86", label: "🇨🇳 +86 (China)" },
  { value: "+971", label: "🇦🇪 +971 (UAE)" },
];

export function ClientForm({ defaultValues, clientId }: ClientFormProps) {
  const router = useRouter();
  const isEditing = !!clientId;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ClientInput>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      preferredChannel: "EMAIL",
      countryCode: "+977",
      ...defaultValues,
    },
  });

  const preferredChannel = watch("preferredChannel");

  async function onSubmit(data: ClientInput) {
    const url = isEditing ? `/api/clients/${clientId}` : "/api/clients";
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      toast.error(err.error ?? "Failed to save client");
      return;
    }

    toast.success(isEditing ? "Client updated successfully" : "Client created successfully");
    router.push("/admin/clients");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Company Name"
          placeholder="ABC Pvt. Ltd."
          required
          error={errors.companyName?.message}
          {...register("companyName")}
        />
        <Input
          label="Brand Name (if different)"
          placeholder="ABC Brand"
          error={errors.brandName?.message}
          {...register("brandName")}
        />
      </div>

      <Input
        label="Contact Person"
        placeholder="Full name of primary contact"
        required
        error={errors.contactPerson?.message}
        {...register("contactPerson")}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Email Address"
          type="email"
          placeholder="contact@company.com"
          required
          error={errors.email?.message}
          {...register("email")}
        />
        <div>
          <label className="label">Phone Number <span className="text-red-500">*</span></label>
          <div className="flex gap-2">
            <select
              className="input-field w-32 flex-shrink-0"
              {...register("countryCode")}
            >
              {countryCodes.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            <Input
              placeholder="9812345678"
              error={errors.phone?.message}
              {...register("phone")}
            />
          </div>
        </div>
      </div>

      <Select
        label="Preferred Communication Channel"
        options={channelOptions}
        error={errors.preferredChannel?.message}
        {...register("preferredChannel")}
      />

      {(preferredChannel === "TELEGRAM" || preferredChannel === "ALL") && (
        <Input
          label="Telegram Chat ID"
          placeholder="e.g. 123456789"
          hint="The client's Telegram chat ID — they can get this from @userinfobot"
          error={errors.telegramChatId?.message}
          {...register("telegramChatId")}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="City"
          placeholder="Kathmandu"
          {...register("city")}
        />
        <Input
          label="VAT / PAN Number"
          placeholder="PAN/VAT registration number"
          {...register("gstVat")}
        />
      </div>

      <Input
        label="Website"
        type="url"
        placeholder="https://www.company.com.np"
        error={errors.website?.message}
        {...register("website")}
      />

      <Textarea
        label="Address"
        placeholder="Full business address"
        rows={2}
        {...register("address")}
      />

      <Textarea
        label="Notes"
        placeholder="Internal notes about this client..."
        rows={3}
        {...register("notes")}
      />

      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={isSubmitting}>
          {isEditing ? "Update Client" : "Create Client"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
