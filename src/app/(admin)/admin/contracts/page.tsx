import { prisma } from "@/lib/prisma";
import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ContractsTable } from "@/components/admin/ContractsTable";

async function getContracts() {
  return prisma.contract.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      client: { select: { id: true, companyName: true, email: true } },
      contractAssets: {
        include: { asset: { select: { id: true, name: true, code: true } } },
      },
    },
  });
}

export default async function ContractsPage() {
  const session = await getAuth();
  if (!session) redirect("/admin/login");

  const contracts = await getContracts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">Contracts</h1>
          <p className="text-sm text-gray-500 mt-0.5">{contracts.length} total contracts</p>
        </div>
        {session.user.role !== "VIEWER" && (
          <a href="/admin/contracts/new" className="btn-primary py-2 px-4 text-sm">
            + New Contract
          </a>
        )}
      </div>
      <ContractsTable contracts={contracts} canEdit={session.user.role !== "VIEWER"} />
    </div>
  );
}
