import { prisma } from "@/lib/prisma";
import { getAuth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { formatCurrency, formatDate, daysUntil, getStatusColor } from "@/lib/utils";
import Link from "next/link";
import { ContractTerminateButton } from "@/components/admin/ContractTerminateButton";

async function getContract(id: string) {
  return prisma.contract.findUnique({
    where: { id },
    include: {
      client: true,
      contractAssets: { include: { asset: true } },
      invoices: { orderBy: { createdAt: "desc" } },
      scheduledJobs: { orderBy: { scheduledFor: "asc" } },
      createdBy: { select: { name: true, email: true } },
    },
  });
}

export default async function ContractPage({ params }: { params: { id: string } }) {
  const session = await getAuth();
  if (!session) redirect("/admin/login");

  const contract = await getContract(params.id);
  if (!contract) notFound();

  const days = daysUntil(contract.endDate);
  const isExpiringSoon = days !== null && days >= 0 && days <= 30;
  const isExpired = days !== null && days < 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Link href="/admin/contracts" className="hover:text-gray-700">Contracts</Link>
            <span>/</span>
            <span className="font-mono">{contract.contractNumber}</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">{contract.contractNumber}</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            <Link href={`/admin/clients/${contract.client.id}`} className="text-brand-blue-600 hover:underline">
              {contract.client.companyName}
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`badge ${getStatusColor(contract.status)}`}>{contract.status}</span>
          {session.user.role !== "VIEWER" && contract.status === "ACTIVE" && (
            <div className="flex gap-2">
              <Link href={`/admin/contracts/${contract.id}/edit`} className="btn-outline py-2 px-4 text-sm">
                Edit
              </Link>
              <ContractTerminateButton contractId={contract.id} contractNumber={contract.contractNumber} />
            </div>
          )}
        </div>
      </div>

      {isExpiringSoon && (
        <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <span className="text-2xl">⚠️</span>
          <p className="text-sm text-amber-800 font-medium">
            This contract expires in <strong>{days} day{days !== 1 ? "s" : ""}</strong>.
            {session.user.role !== "VIEWER" && (
              <> Consider <Link href={`/admin/contracts/new?clientId=${contract.clientId}`} className="underline">creating a renewal</Link>.</>
            )}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contract details */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Contract Details</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Start Date</dt>
              <dd className="font-medium">{formatDate(contract.startDate)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">End Date</dt>
              <dd className={`font-medium ${isExpired ? "text-red-600" : isExpiringSoon ? "text-amber-600" : ""}`}>
                {formatDate(contract.endDate)}
                {!isExpired && days !== null && days >= 0 && (
                  <span className="ml-1 text-xs text-gray-400">({days}d left)</span>
                )}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Total Value</dt>
              <dd className="font-bold text-brand-blue-700">{formatCurrency(contract.totalValue)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Payment Terms</dt>
              <dd>{contract.paymentTerms.replace(/_/g, " ")}</dd>
            </div>
            {contract.notes && (
              <div>
                <dt className="text-gray-500">Notes</dt>
                <dd className="mt-1 text-gray-600 whitespace-pre-wrap">{contract.notes}</dd>
              </div>
            )}
            {contract.signedDocUrl && (
              <div className="flex justify-between">
                <dt className="text-gray-500">Signed Document</dt>
                <dd>
                  <a href={contract.signedDocUrl} target="_blank" rel="noopener noreferrer" className="text-brand-blue-600 hover:underline text-xs">
                    Download
                  </a>
                </dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-gray-500">Created By</dt>
              <dd>{contract.createdBy?.name ?? contract.createdBy?.email ?? "—"}</dd>
            </div>
          </dl>
        </div>

        {/* Sites */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Advertising Sites ({contract.contractAssets.length})</h2>
          <div className="space-y-3">
            {contract.contractAssets.map((ca) => (
              <div key={ca.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm text-gray-900">{ca.asset.name}</p>
                  <p className="text-xs text-gray-500">{ca.asset.address}, {ca.asset.city}</p>
                  <p className="text-xs text-gray-400">{ca.asset.format.replace(/_/g, " ")}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{formatCurrency(ca.customRate ?? ca.asset.monthlyRate)}/mo</p>
                  <Link href={`/admin/assets/${ca.asset.id}`} className="text-xs text-brand-blue-600 hover:underline">
                    View site
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invoices */}
      {contract.invoices.length > 0 && (
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Invoices</h2>
            <Link href="/admin/invoices" className="text-sm text-brand-blue-600 hover:underline">
              View all invoices
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead>
                <tr>
                  {["Invoice #", "Amount", "Due", "Paid", "Status"].map((h) => (
                    <th key={h} className="table-header">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-50">
                {contract.invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50">
                    <td className="table-cell">
                      <Link href={`/admin/invoices/${inv.id}`} className="font-mono text-sm text-brand-blue-600 hover:underline">
                        {inv.invoiceNumber}
                      </Link>
                    </td>
                    <td className="table-cell text-sm font-semibold">{formatCurrency(inv.totalAmount)}</td>
                    <td className="table-cell text-sm text-gray-600">{formatDate(inv.dueDate)}</td>
                    <td className="table-cell text-sm text-gray-600">
                      {inv.paidDate ? formatDate(inv.paidDate) : "—"}
                    </td>
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

      {/* Scheduled jobs */}
      {contract.scheduledJobs.length > 0 && (
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Scheduled Reminders</h2>
          <div className="space-y-2">
            {contract.scheduledJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm">
                <div>
                  <p className="font-medium text-gray-900">{job.eventType.replace(/_/g, " ")}</p>
                  <p className="text-xs text-gray-500">{formatDate(job.scheduledFor)}</p>
                </div>
                <span className={`badge text-xs ${getStatusColor(job.status)}`}>{job.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
