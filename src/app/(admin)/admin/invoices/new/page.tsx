import { prisma } from "@/lib/prisma";
import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { InvoiceForm } from "@/components/admin/InvoiceForm";
import Link from "next/link";

async function getData(searchParams: { contractId?: string }) {
  const [contracts, clients] = await Promise.all([
    prisma.contract.findMany({
      where: { status: "ACTIVE" },
      select: { id: true, contractNumber: true, clientId: true, client: { select: { id: true, companyName: true } } },
      orderBy: { contractNumber: "desc" },
    }),
    prisma.client.findMany({
      where: { isActive: true },
      select: { id: true, companyName: true },
      orderBy: { companyName: "asc" },
    }),
  ]);

  return { contracts, clients };
}

export default async function NewInvoicePage({
  searchParams,
}: {
  searchParams: { contractId?: string };
}) {
  const session = await getAuth();
  if (!session) redirect("/admin/login");
  if (session.user.role === "VIEWER") redirect("/admin/invoices");

  const { contracts, clients } = await getData(searchParams);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
          <Link href="/admin/invoices" className="hover:text-gray-700">Invoices</Link>
          <span>/</span>
          <span>New Invoice</span>
        </div>
        <h1 className="text-2xl font-bold font-heading text-gray-900">Create Invoice</h1>
      </div>
      <InvoiceForm
        contracts={contracts}
        clients={clients}
        defaultContractId={searchParams.contractId}
      />
    </div>
  );
}
