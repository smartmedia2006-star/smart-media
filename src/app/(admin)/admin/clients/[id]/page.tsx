import { prisma } from "@/lib/prisma";
import { getAuth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { formatCurrency, formatDate, getStatusColor } from "@/lib/utils";
import Link from "next/link";

async function getClient(id: string) {
  return prisma.client.findUnique({
    where: { id },
    include: {
      contracts: {
        include: {
          contractAssets: { include: { asset: true } },
          invoices: true,
        },
        orderBy: { createdAt: "desc" },
      },
      invoices: { orderBy: { createdAt: "desc" }, take: 10 },
      _count: { select: { contracts: true } },
    },
  });
}

export default async function ClientPage({ params }: { params: { id: string } }) {
  const session = await getAuth();
  if (!session) redirect("/admin/login");

  const client = await getClient(params.id);
  if (!client) notFound();

  const totalContractValue = client.contracts.reduce((s, c) => s + c.totalValue, 0);
  const activeContracts = client.contracts.filter((c) => c.status === "ACTIVE");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Link href="/admin/clients" className="hover:text-gray-700">Clients</Link>
            <span>/</span>
            <span>{client.companyName}</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">{client.companyName}</h1>
          {client.brandName && client.brandName !== client.companyName && (
            <p className="text-sm text-gray-500">Brand: {client.brandName}</p>
          )}
        </div>
        {session.user.role !== "VIEWER" && (
          <Link href={`/admin/clients/${client.id}/edit`} className="btn-outline py-2 px-4 text-sm">
            Edit Client
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-5 text-center">
          <p className="text-2xl font-extrabold font-heading text-gray-900">{client._count.contracts}</p>
          <p className="text-sm text-gray-500 mt-1">Total Contracts</p>
        </div>
        <div className="card p-5 text-center">
          <p className="text-2xl font-extrabold font-heading text-brand-blue-700">{activeContracts.length}</p>
          <p className="text-sm text-gray-500 mt-1">Active Contracts</p>
        </div>
        <div className="card p-5 text-center">
          <p className="text-2xl font-extrabold font-heading text-gray-900">{formatCurrency(totalContractValue)}</p>
          <p className="text-sm text-gray-500 mt-1">Total Contract Value</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Contact Information</h2>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-gray-500">Contact Person</dt>
              <dd className="font-medium mt-0.5">{client.contactPerson}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Email</dt>
              <dd className="mt-0.5">
                <a href={`mailto:${client.email}`} className="text-brand-blue-600 hover:underline">
                  {client.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Phone</dt>
              <dd className="mt-0.5">
                <a href={`tel:${client.countryCode}${client.phone}`} className="text-brand-blue-600 hover:underline">
                  {client.countryCode} {client.phone}
                </a>
              </dd>
            </div>
            {client.telegramChatId && (
              <div>
                <dt className="text-gray-500">Telegram Chat ID</dt>
                <dd className="font-mono mt-0.5">{client.telegramChatId}</dd>
              </div>
            )}
            <div>
              <dt className="text-gray-500">Preferred Channel</dt>
              <dd className="mt-0.5">
                <span className="badge bg-blue-50 text-blue-700 text-xs">{client.preferredChannel}</span>
              </dd>
            </div>
            {client.city && (
              <div>
                <dt className="text-gray-500">City</dt>
                <dd className="mt-0.5">{client.city}</dd>
              </div>
            )}
            {client.gstVat && (
              <div>
                <dt className="text-gray-500">GST/VAT</dt>
                <dd className="font-mono mt-0.5">{client.gstVat}</dd>
              </div>
            )}
            {client.website && (
              <div>
                <dt className="text-gray-500">Website</dt>
                <dd className="mt-0.5">
                  <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-brand-blue-600 hover:underline">
                    {client.website}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Notes */}
        {client.notes && (
          <div className="card p-6 space-y-2">
            <h2 className="font-semibold text-gray-900">Notes</h2>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{client.notes}</p>
          </div>
        )}
      </div>

      {/* Contracts */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Contracts</h2>
          {session.user.role !== "VIEWER" && (
            <Link href={`/admin/contracts/new?clientId=${client.id}`} className="text-sm text-brand-blue-600 hover:underline">
              + New Contract
            </Link>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead>
              <tr>
                {["Contract #", "Period", "Value", "Assets", "Status"].map((h) => (
                  <th key={h} className="table-header">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {client.contracts.map((contract) => (
                <tr key={contract.id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <Link href={`/admin/contracts/${contract.id}`} className="font-mono text-sm text-brand-blue-600 hover:underline">
                      {contract.contractNumber}
                    </Link>
                  </td>
                  <td className="table-cell text-sm text-gray-600">
                    {formatDate(contract.startDate)} → {formatDate(contract.endDate)}
                  </td>
                  <td className="table-cell font-semibold text-sm">{formatCurrency(contract.totalValue)}</td>
                  <td className="table-cell text-sm text-gray-600">
                    {contract.contractAssets.map((ca) => ca.asset.name).join(", ")}
                  </td>
                  <td className="table-cell">
                    <span className={`badge text-xs ${getStatusColor(contract.status)}`}>{contract.status}</span>
                  </td>
                </tr>
              ))}
              {client.contracts.length === 0 && (
                <tr>
                  <td colSpan={5} className="table-cell text-center text-gray-400 py-8">No contracts yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent invoices */}
      {client.invoices.length > 0 && (
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Recent Invoices</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead>
                <tr>
                  {["Invoice #", "Amount", "Due", "Status"].map((h) => (
                    <th key={h} className="table-header">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-50">
                {client.invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50">
                    <td className="table-cell">
                      <Link href={`/admin/invoices/${inv.id}`} className="font-mono text-sm text-brand-blue-600 hover:underline">
                        {inv.invoiceNumber}
                      </Link>
                    </td>
                    <td className="table-cell text-sm">{formatCurrency(inv.totalAmount)}</td>
                    <td className="table-cell text-sm text-gray-600">{formatDate(inv.dueDate)}</td>
                    <td className="table-cell">
                      <span className={`badge text-xs ${getStatusColor(inv.status)}`}>{inv.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
