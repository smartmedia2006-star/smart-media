import { prisma } from "@/lib/prisma";
import { getAuth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { formatCurrency, formatDate, getStatusColor } from "@/lib/utils";
import Link from "next/link";
import { InvoiceActions } from "@/components/admin/InvoiceActions";

async function getInvoice(id: string) {
  return prisma.invoice.findUnique({
    where: { id },
    include: {
      client: true,
      contract: {
        include: { assets: { include: { asset: true } } },
      },
    },
  });
}

export default async function InvoicePage({ params }: { params: { id: string } }) {
  const session = await getAuth();
  if (!session) redirect("/admin/login");

  const invoice = await getInvoice(params.id);
  if (!invoice) notFound();

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Link href="/admin/invoices" className="hover:text-gray-700">Invoices</Link>
            <span>/</span>
            <span className="font-mono">{invoice.invoiceNumber}</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">{invoice.invoiceNumber}</h1>
        </div>
        <span className={`badge ${getStatusColor(invoice.status)}`}>{invoice.status}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Invoice details */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Invoice Details</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Invoice Number</dt>
              <dd className="font-mono font-semibold">{invoice.invoiceNumber}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Amount</dt>
              <dd className="font-semibold">{formatCurrency(invoice.amount)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Tax</dt>
              <dd>{formatCurrency(invoice.taxAmount)}</dd>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-3">
              <dt className="font-semibold">Total</dt>
              <dd className="font-bold text-brand-blue-700">{formatCurrency(invoice.totalAmount)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Due Date</dt>
              <dd className={new Date(invoice.dueDate) < new Date() && invoice.status === "PENDING" ? "text-red-600 font-semibold" : ""}>
                {formatDate(invoice.dueDate)}
              </dd>
            </div>
            {invoice.paidDate && (
              <div className="flex justify-between">
                <dt className="text-gray-500">Paid Date</dt>
                <dd className="text-green-700 font-semibold">{formatDate(invoice.paidDate)}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Client & Contract */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Billing Info</h2>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-gray-500 mb-0.5">Client</dt>
              <dd>
                <Link href={`/admin/clients/${invoice.client.id}`} className="font-semibold text-brand-blue-600 hover:underline">
                  {invoice.client.companyName}
                </Link>
                {invoice.client.gstVat && (
                  <p className="text-xs text-gray-400 font-mono">{invoice.client.gstVat}</p>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500 mb-0.5">Contract</dt>
              <dd>
                <Link href={`/admin/contracts/${invoice.contract.id}`} className="font-mono text-brand-blue-600 hover:underline">
                  {invoice.contract.contractNumber}
                </Link>
              </dd>
            </div>
            <div>
              <dt className="text-gray-500 mb-0.5">Sites</dt>
              <dd className="text-gray-700">
                {invoice.contract.assets.map((ca) => ca.asset.name).join(", ")}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {session.user.role !== "VIEWER" && (
        <InvoiceActions invoice={invoice} />
      )}
    </div>
  );
}
