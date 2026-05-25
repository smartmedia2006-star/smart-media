import { prisma } from "@/lib/prisma";
import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ContractForm } from "@/components/admin/ContractForm";

async function getFormData() {
  const [clients, assets] = await Promise.all([
    prisma.client.findMany({ where: { isActive: true }, orderBy: { companyName: "asc" } }),
    prisma.asset.findMany({ where: { isActive: true }, orderBy: { name: "asc" } }),
  ]);
  return { clients, assets };
}

export default async function NewContractPage() {
  const session = await getAuth();
  if (!session) redirect("/admin/login");
  if (session.user.role === "VIEWER") redirect("/admin/contracts");

  const { clients, assets } = await getFormData();

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-heading text-gray-900">New Contract</h1>
        <p className="text-sm text-gray-500 mt-1">Create a new advertising contract and schedule automated reminders</p>
      </div>
      <div className="card p-8">
        <ContractForm clients={clients} assets={assets} />
      </div>
    </div>
  );
}
