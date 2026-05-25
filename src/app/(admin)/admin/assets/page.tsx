import { prisma } from "@/lib/prisma";
import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AssetsTable } from "@/components/admin/AssetsTable";

async function getAssets() {
  return prisma.asset.findMany({
    where: { isActive: true },
    orderBy: [{ city: "asc" }, { name: "asc" }],
    include: {
      _count: { select: { contractAssets: true } },
    },
  });
}

export default async function AssetsPage() {
  const session = await getAuth();
  if (!session) redirect("/admin/login");

  const assets = await getAssets();
  const vacant = assets.filter((a) => a.status === "VACANT").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">Assets / Sites</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {assets.length} total · {vacant} vacant · {assets.length - vacant} booked
          </p>
        </div>
        {session.user.role !== "VIEWER" && (
          <a href="/admin/assets/new" className="btn-primary py-2 px-4 text-sm">
            + Add Asset
          </a>
        )}
      </div>
      <AssetsTable assets={assets} canEdit={session.user.role !== "VIEWER"} />
    </div>
  );
}
