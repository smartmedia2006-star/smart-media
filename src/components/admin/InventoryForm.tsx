"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Input, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const inventorySchema = z.object({
  name: z.string().min(2, "Name is required"),
  sku: z.string().optional(),
  category: z.enum([
    "VINYL",
    "INK",
    "HARDWARE",
    "PRINTING",
    "ELECTRICAL",
    "OTHER",
  ]),
  quantity: z.number().min(0),
  unit: z.string().min(1),
  reorderLevel: z.number().min(0),
  currentCost: z.number().positive().optional(),
  supplier: z.string().optional(),
});

type InventoryFormValues = z.infer<typeof inventorySchema>;

const categoryOptions = [
  { value: "VINYL", label: "Vinyl" },
  { value: "INK", label: "Ink" },
  { value: "HARDWARE", label: "Hardware" },
  { value: "PRINTING", label: "Printing Media" },
  { value: "ELECTRICAL", label: "Electrical" },
  { value: "OTHER", label: "Other" },
];

interface InventoryFormProps {
  defaultValues?: Partial<InventoryFormValues & { id: string }>;
  itemId?: string;
}

export function InventoryForm({ defaultValues, itemId }: InventoryFormProps) {
  const router = useRouter();
  const isEditing = Boolean(itemId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InventoryFormValues>({
    resolver: zodResolver(inventorySchema),
    defaultValues: defaultValues ?? { unit: "rolls", reorderLevel: 5, quantity: 0 },
  });

  async function onSubmit(data: InventoryFormValues) {
    const url = isEditing ? `/api/inventory/${itemId}` : "/api/inventory";
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error("Failed to save item");
      return;
    }

    toast.success(isEditing ? "Item updated" : "Item added");
    router.push("/admin/inventory");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-6 space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Item Name"
          {...register("name")}
          error={errors.name?.message}
          placeholder="Premium Vinyl Roll"
          required
        />
        <Input
          label="SKU"
          {...register("sku")}
          error={errors.sku?.message}
          placeholder="VNL-3M-WHT"
        />
      </div>

      <Select
        label="Category"
        {...register("category")}
        error={errors.category?.message}
        options={categoryOptions}
        required
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Input
          label="Quantity"
          type="number"
          {...register("quantity", { valueAsNumber: true })}
          error={errors.quantity?.message}
          required
        />
        <Input
          label="Unit"
          {...register("unit")}
          error={errors.unit?.message}
          placeholder="rolls"
          required
        />
        <Input
          label="Reorder Level"
          type="number"
          {...register("reorderLevel", { valueAsNumber: true })}
          error={errors.reorderLevel?.message}
          required
        />
        <Input
          label="Unit Cost (NPR)"
          type="number"
          step="0.01"
          {...register("currentCost", { valueAsNumber: true })}
          error={errors.currentCost?.message}
        />
      </div>

      <Input
        label="Supplier"
        {...register("supplier")}
        error={errors.supplier?.message}
        placeholder="Nepal Print Supplies Pvt. Ltd."
      />

      <div className="flex items-center justify-between pt-2">
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {isEditing ? "Save Changes" : "Add Item"}
        </Button>
      </div>
    </form>
  );
}
