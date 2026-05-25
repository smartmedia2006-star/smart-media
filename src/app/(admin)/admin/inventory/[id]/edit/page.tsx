import { prisma } from "@/lib/prisma";
import { getAuth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { InventoryForm } from "@/components/admin/InventoryForm";
import Link from "next/link";

async function getItem(id: string) {
  return prisma.inventoryItem.findUnique({ where: { id } });
}

export default async function EditInventoryItemPage({ params }: { params: { id: string } }) {
  const session = await getAuth();
  if (!session) redirect("/admin/login");
  if (session.user.role === "VIEWER") redirect("/admin/inventory");

  const item = await getItem(params.id);
  if (!item) notFound();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
          <Link href="/admin/inventory" className="hover:text-gray-700">Inventory</Link>
          <span>/</span>
          <span>{item.name}</span>
          <span>/</span>
          <span>Edit</span>
        </div>
        <h1 className="text-2xl font-bold font-heading text-gray-900">Edit Item</h1>
      </div>
      <InventoryForm defaultValues={item} itemId={item.id} />
    </div>
  );
}
