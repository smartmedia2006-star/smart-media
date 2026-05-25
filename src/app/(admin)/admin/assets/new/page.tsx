import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AssetForm } from "@/components/admin/AssetForm";
import Link from "next/link";

export default async function NewAssetPage() {
  const session = await getAuth();
  if (!session) redirect("/admin/login");
  if (session.user.role === "VIEWER") redirect("/admin/assets");

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
          <Link href="/admin/assets" className="hover:text-gray-700">Assets</Link>
          <span>/</span>
          <span>New Site</span>
        </div>
        <h1 className="text-2xl font-bold font-heading text-gray-900">Add Advertising Site</h1>
      </div>
      <AssetForm />
    </div>
  );
}
