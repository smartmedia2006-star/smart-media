import { prisma } from "@/lib/prisma";
import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { formatCurrency, formatDate, getStatusColor } from "@/lib/utils";
import Link from "next/link";

async function getInvoices() {
  return prisma.invoice.findMany({
    include: {
      client: { select: { id: true, companyName: true } },
      contract: { select: { id: true, contractNumber: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function InvoicesPage() {
  const session = await getAuth();
  if (!session) redirect("/admin/login");

  const invoices = await getInvoices();

  const overdue = invoices.filter(
    (i) => i.status === "PENDING" && new Date(i.dueDate) < new Date()
  );
  const totalOutstanding = invoices
    .filter((i) => i.status === "PENDING")
    .reduce((s, i) => s + i.totalAmount, 0);

  const statusOrder = ["OVERDUE", "PENDING", "PAID", "CANCELLED", "VOID"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">Invoices</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {invoices.length} total · {overdue.length} overdue · {formatCurrency(totalOutstanding)} outstanding
          </p>
        </div>
        {session.user.role !== "VIEWER" && (
          <Link href="/admin/invoices/new" className="btn-primary py-2 px-4 text-sm">
            + New Invoice
          </Link>
        )}
      </div>

      {overdue.length > 0 && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
          <span className="text-2xl mt-0.5">🚨</span>
          <div>
            <p className="font-semibold text-red-800">Overdue Invoices</p>
            <p className="text-sm text-red-700">
              {overdue.map((i) => `${i.invoiceNumber} (${i.client.companyName})`).join(", ")}
            </p>
          </div>
        </div>
      )}

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead>
              <tr>
                {["Invoice #", "Client", "Contract", "Amount", "Due Date", "Status", ""].map((h) => (
                  <th key={h} className="table-header">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {invoices.map((invoice) => {
                const isOverdue =
                  invoice.status === "PENDING" && new Date(invoice.dueDate) < new Date();
                return (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="table-cell font-mono text-sm font-semibold text-gray-900">
                      {invoice.invoiceNumber}
                    </td>
                    <td className="table-cell">
                      <Link
                        href={`/admin/clients/${invoice.client.id}`}
                        className="text-brand-blue-600 hover:underline font-medium"
                      >
                        {invoice.client.companyName}
                      </Link>
                    </td>
                    <td className="table-cell font-mono text-sm text-gray-600">
                      {invoice.contract.contractNumber}
                    </td>
                    <td className="table-cell font-semibold">
                      {formatCurrency(invoice.totalAmount)}
                    </td>
                    <td className={`table-cell text-sm ${isOverdue ? "text-red-600 font-semibold" : "text-gray-600"}`}>
                      {formatDate(invoice.dueDate)}
                      {isOverdue && <span className="ml-1 text-xs">(OVERDUE)</span>}
                    </td>
                    <td className="table-cell">
                      <span className={`badge text-xs ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="table-cell">
                      <Link
                        href={`/admin/invoices/${invoice.id}`}
                        className="text-xs text-brand-blue-600 hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {invoices.length === 0 && (
                <tr>
                  <td colSpan={7} className="table-cell text-center text-gray-400 py-10">
                    No invoices yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
