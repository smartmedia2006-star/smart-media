import { prisma } from "@/lib/prisma";
import { getAuth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { ContractForm } from "@/components/admin/ContractForm";
import Link from "next/link";

async function getContractData(id: string) {
  const [contract, assets] = await Promise.all([
    prisma.contract.findUnique({
      where: { id },
      include: { contractAssets: { select: { assetId: true, customRate: true } } },
    }),
    prisma.asset.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    }),
  ]);
  return { contract, assets };
}

export default async function EditContractPage({ params }: { params: { id: string } }) {
  const session = await getAuth();
  if (!session) redirect("/admin/login");
  if (session.user.role === "VIEWER") redirect("/admin/contracts");

  const { contract, assets } = await getContractData(params.id);
  if (!contract) notFound();

  const clients = await prisma.client.findMany({
    where: { isActive: true },
    select: { id: true, companyName: true, email: true },
    orderBy: { companyName: "asc" },
  });

  const defaultValues = {
    clientId: contract.clientId,
    startDate: contract.startDate.toISOString().split("T")[0],
    endDate: contract.endDate.toISOString().split("T")[0],
    totalValue: contract.totalValue,
    paymentTerms: contract.paymentTerms,
    status: contract.status,
    notes: contract.notes ?? "",
    signedDocUrl: contract.signedDocUrl ?? "",
    assetIds: contract.contractAssets.map((a) => a.assetId),
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
          <Link href="/admin/contracts" className="hover:text-gray-700">Contracts</Link>
          <span>/</span>
          <Link href={`/admin/contracts/${contract.id}`} className="hover:text-gray-700 font-mono">
            {contract.contractNumber}
          </Link>
          <span>/</span>
          <span>Edit</span>
        </div>
        <h1 className="text-2xl font-bold font-heading text-gray-900">Edit Contract</h1>
      </div>
      <ContractForm
        clients={clients}
        assets={assets}
        defaultValues={defaultValues}
        contractId={contract.id}
      />
    </div>
  );
}
