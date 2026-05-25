"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { assetSchema, type AssetInput } from "@/lib/validators/asset";
import { Input, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface AssetFormProps {
  defaultValues?: Partial<AssetInput>;
  assetId?: string;
}

const formatOptions = [
  { value: "STATIC_BILLBOARD", label: "Static Billboard" },
  { value: "DIGITAL_SCREEN", label: "Digital Screen" },
  { value: "STREET_FURNITURE", label: "Street Furniture" },
  { value: "TRANSIT", label: "Transit" },
  { value: "MALL", label: "Mall" },
  { value: "AIRPORT", label: "Airport" },
  { value: "UNIPOLE", label: "Unipole" },
];

const illuminationOptions = [
  { value: "FRONT_LIT", label: "Front-Lit" },
  { value: "BACK_LIT", label: "Back-Lit" },
  { value: "DIGITAL", label: "Digital/LED" },
  { value: "NON_ILLUMINATED", label: "Non-Illuminated" },
];

const statusOptions = [
  { value: "VACANT", label: "Vacant" },
  { value: "BOOKED", label: "Booked" },
  { value: "MAINTENANCE", label: "Maintenance" },
  { value: "COMING_SOON", label: "Coming Soon" },
];

const cityOptions = [
  { value: "Kathmandu", label: "Kathmandu" },
  { value: "Pokhara", label: "Pokhara" },
  { value: "Bharatpur", label: "Bharatpur" },
  { value: "Biratnagar", label: "Biratnagar" },
  { value: "Birgunj", label: "Birgunj" },
  { value: "Butwal", label: "Butwal" },
  { value: "Dharan", label: "Dharan" },
  { value: "Lalitpur", label: "Lalitpur" },
  { value: "Bhaktapur", label: "Bhaktapur" },
];

export function AssetForm({ defaultValues, assetId }: AssetFormProps) {
  const router = useRouter();
  const isEditing = Boolean(assetId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AssetInput>({
    resolver: zodResolver(assetSchema),
    defaultValues: defaultValues ?? { status: "VACANT", illumination: "NON_ILLUMINATED", city: "Kathmandu" },
  });

  async function onSubmit(data: AssetInput) {
    const url = isEditing ? `/api/assets/${assetId}` : "/api/assets";
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      toast.error(err.error?.message ?? "Failed to save asset");
      return;
    }

    const asset = await res.json();
    toast.success(isEditing ? "Asset updated" : "Asset created");
    router.push(`/admin/assets/${asset.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Site Name"
          {...register("name")}
          error={errors.name?.message}
          placeholder="TIA Arrival Hall Screen A"
          required
        />
        <Input
          label="Site Code"
          {...register("code")}
          error={errors.code?.message}
          placeholder="SM-TIA-001"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Format"
          {...register("format")}
          error={errors.format?.message}
          options={formatOptions}
          required
        />
        <Select
          label="Status"
          {...register("status")}
          error={errors.status?.message}
          options={statusOptions}
        />
      </div>

      <div>
        <Input
          label="Address"
          {...register("address")}
          error={errors.address?.message}
          placeholder="Arrivals Hall, Tribhuvan International Airport"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="City"
          {...register("city")}
          error={errors.city?.message}
          options={cityOptions}
          required
        />
        <Input
          label="District/Area"
          {...register("district")}
          error={errors.district?.message}
          placeholder="Baudha"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Input
          label="Latitude"
          type="number"
          step="any"
          {...register("lat", { valueAsNumber: true })}
          error={errors.lat?.message}
          placeholder="27.6956"
        />
        <Input
          label="Longitude"
          type="number"
          step="any"
          {...register("lng", { valueAsNumber: true })}
          error={errors.lng?.message}
          placeholder="85.3591"
        />
        <Input
          label="Width"
          type="number"
          step="any"
          {...register("width", { valueAsNumber: true })}
          error={errors.width?.message}
          placeholder="40"
        />
        <Input
          label="Height"
          type="number"
          step="any"
          {...register("height", { valueAsNumber: true })}
          error={errors.height?.message}
          placeholder="20"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Size Unit"
          {...register("unit")}
          error={errors.unit?.message}
          placeholder="ft"
          defaultValue="ft"
        />
        <Select
          label="Illumination"
          {...register("illumination")}
          error={errors.illumination?.message}
          options={illuminationOptions}
        />
        <Input
          label="Daily Impressions"
          type="number"
          {...register("dailyImpressions", { valueAsNumber: true })}
          error={errors.dailyImpressions?.message}
          placeholder="50000"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Monthly Rate (NPR)"
          type="number"
          {...register("monthlyRate", { valueAsNumber: true })}
          error={errors.monthlyRate?.message}
          placeholder="150000"
          required
        />
        <Input
          label="Specifications"
          {...register("specs")}
          error={errors.specs?.message}
          placeholder="Resolution: 1920×1080, Brightness: 5000 nits"
        />
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {isEditing ? "Save Changes" : "Create Asset"}
        </Button>
      </div>
    </form>
  );
}
