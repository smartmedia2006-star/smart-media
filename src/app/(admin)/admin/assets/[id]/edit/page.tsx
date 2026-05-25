import { prisma } from "@/lib/prisma";
import { getAuth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { AssetForm } from "@/components/admin/AssetForm";
import Link from "next/link";

async function getAsset(id: string) {
  return prisma.asset.findUnique({ where: { id } });
}

export default async function EditAssetPage({ params }: { params: { id: string } }) {
  const session = await getAuth();
  if (!session) redirect("/admin/login");
  if (session.user.role === "VIEWER") redirect("/admin/assets");

  const asset = await getAsset(params.id);
  if (!asset) notFound();

  const defaultValues = {
    name: asset.name,
    code: asset.code,
    address: asset.address,
    city: asset.city,
    district: asset.district ?? "",
    lat: asset.lat ?? undefined,
    lng: asset.lng ?? undefined,
    format: asset.format,
    width: asset.width ?? undefined,
    height: asset.height ?? undefined,
    unit: asset.unit,
    illumination: asset.illumination,
    status: asset.status,
    monthlyRate: asset.monthlyRate,
    dailyImpressions: asset.dailyImpressions ?? undefined,
    specs: asset.specs ?? "",
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
          <Link href="/admin/assets" className="hover:text-gray-700">Assets</Link>
          <span>/</span>
          <Link href={`/admin/assets/${asset.id}`} className="hover:text-gray-700">{asset.name}</Link>
          <span>/</span>
          <span>Edit</span>
        </div>
        <h1 className="text-2xl font-bold font-heading text-gray-900">Edit Site</h1>
      </div>
      <AssetForm defaultValues={defaultValues} assetId={asset.id} />
    </div>
  );
}
