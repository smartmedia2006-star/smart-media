import { prisma } from "@/lib/prisma";
import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { InventoryTable } from "@/components/admin/InventoryTable";

async function getInventory() {
  return prisma.inventoryItem.findMany({
    where: { isActive: true },
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });
}

export default async function InventoryPage() {
  const session = await getAuth();
  if (!session) redirect("/admin/login");

  const items = await getInventory();
  const lowStock = items.filter((i) => i.quantity <= i.reorderLevel);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">Inventory</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {items.length} items · {lowStock.length} low stock
          </p>
        </div>
        {session.user.role !== "VIEWER" && (
          <a href="/admin/inventory/new" className="btn-primary py-2 px-4 text-sm">
            + Add Item
          </a>
        )}
      </div>

      {lowStock.length > 0 && (
        <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="font-semibold text-amber-800">Low Stock Alert</p>
            <p className="text-sm text-amber-700">
              {lowStock.map((i) => i.name).join(", ")} — below reorder level.
              Admin has been notified.
            </p>
          </div>
        </div>
      )}

      <InventoryTable items={items} canEdit={session.user.role !== "VIEWER"} />
    </div>
  );
}
