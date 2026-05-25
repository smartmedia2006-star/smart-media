import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { InventoryForm } from "@/components/admin/InventoryForm";
import Link from "next/link";

export default async function NewInventoryItemPage() {
  const session = await getAuth();
  if (!session) redirect("/admin/login");
  if (session.user.role === "VIEWER") redirect("/admin/inventory");

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
          <Link href="/admin/inventory" className="hover:text-gray-700">Inventory</Link>
          <span>/</span>
          <span>New Item</span>
        </div>
        <h1 className="text-2xl font-bold font-heading text-gray-900">Add Inventory Item</h1>
      </div>
      <InventoryForm />
    </div>
  );
}
