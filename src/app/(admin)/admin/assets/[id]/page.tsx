import { prisma } from "@/lib/prisma";
import { getAuth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { formatCurrency, formatDate, getStatusColor } from "@/lib/utils";
import Link from "next/link";

async function getAsset(id: string) {
  return prisma.asset.findUnique({
    where: { id },
    include: {
      contractAssets: {
        include: {
          contract: {
            include: { client: { select: { id: true, companyName: true } } },
          },
        },
        orderBy: { contract: { startDate: "desc" } },
      },
    },
  });
}

export default async function AssetPage({ params }: { params: { id: string } }) {
  const session = await getAuth();
  if (!session) redirect("/admin/login");

  const asset = await getAsset(params.id);
  if (!asset) notFound();

  const activeContract = asset.contractAssets.find(
    (ca) => ca.contract.status === "ACTIVE"
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Link href="/admin/assets" className="hover:text-gray-700">Assets</Link>
            <span>/</span>
            <span>{asset.name}</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">{asset.name}</h1>
          <p className="text-sm text-gray-500 font-mono mt-0.5">{asset.code}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`badge ${getStatusColor(asset.status)}`}>{asset.status}</span>
          {session.user.role !== "VIEWER" && (
            <Link href={`/admin/assets/${asset.id}/edit`} className="btn-outline py-2 px-4 text-sm">
              Edit Site
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Site info */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Site Details</h2>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-gray-500">Address</dt>
              <dd className="mt-0.5 font-medium">{asset.address}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">City</dt>
              <dd>{asset.city}</dd>
            </div>
            {asset.lat && asset.lng && (
              <div className="flex justify-between">
                <dt className="text-gray-500">GPS</dt>
                <dd className="font-mono text-xs">
                  {asset.lat.toFixed(4)}, {asset.lng.toFixed(4)}
                </dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-gray-500">Format</dt>
              <dd>
                <span className="badge bg-blue-50 text-blue-700 text-xs">
                  {asset.format.replace(/_/g, " ")}
                </span>
              </dd>
            </div>
            {asset.width && asset.height && (
              <div className="flex justify-between">
                <dt className="text-gray-500">Size</dt>
                <dd>{asset.width} × {asset.height} {asset.unit}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-gray-500">Illumination</dt>
              <dd>{asset.illumination.replace(/_/g, " ")}</dd>
            </div>
            {asset.dailyImpressions && (
              <div className="flex justify-between">
                <dt className="text-gray-500">Daily Impressions</dt>
                <dd className="font-semibold">{asset.dailyImpressions.toLocaleString()}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Financials */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Rates & Booking</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Monthly Rate</dt>
              <dd className="font-bold text-brand-blue-700 text-base">
                {formatCurrency(asset.monthlyRate)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Current Status</dt>
              <dd>
                <span className={`badge text-xs ${getStatusColor(asset.status)}`}>
                  {asset.status}
                </span>
              </dd>
            </div>
            {activeContract && (
              <>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Booked By</dt>
                  <dd>
                    <Link
                      href={`/admin/clients/${activeContract.contract.client.id}`}
                      className="text-brand-blue-600 hover:underline font-medium"
                    >
                      {activeContract.contract.client.companyName}
                    </Link>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Contract</dt>
                  <dd>
                    <Link
                      href={`/admin/contracts/${activeContract.contract.id}`}
                      className="font-mono text-brand-blue-600 hover:underline"
                    >
                      {activeContract.contract.contractNumber}
                    </Link>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Booked Until</dt>
                  <dd>{formatDate(activeContract.contract.endDate)}</dd>
                </div>
              </>
            )}
            {asset.specs && (
              <div>
                <dt className="text-gray-500">Specifications</dt>
                <dd className="mt-1 text-gray-600 text-xs">{asset.specs}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      {/* Contract history */}
      {asset.contractAssets.length > 0 && (
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Contract History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead>
                <tr>
                  {["Contract #", "Client", "Period", "Rate", "Status"].map((h) => (
                    <th key={h} className="table-header">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-50">
                {asset.contractAssets.map((ca) => (
                  <tr key={ca.id} className="hover:bg-gray-50">
                    <td className="table-cell">
                      <Link
                        href={`/admin/contracts/${ca.contract.id}`}
                        className="font-mono text-sm text-brand-blue-600 hover:underline"
                      >
                        {ca.contract.contractNumber}
                      </Link>
                    </td>
                    <td className="table-cell">
                      <Link
                        href={`/admin/clients/${ca.contract.client.id}`}
                        className="text-sm font-medium hover:underline"
                      >
                        {ca.contract.client.companyName}
                      </Link>
                    </td>
                    <td className="table-cell text-sm text-gray-600">
                      {formatDate(ca.contract.startDate)} → {formatDate(ca.contract.endDate)}
                    </td>
                    <td className="table-cell text-sm font-semibold">
                      {formatCurrency(ca.customRate ?? asset.monthlyRate)}/mo
                    </td>
                    <td className="table-cell">
                      <span className={`badge text-xs ${getStatusColor(ca.contract.status)}`}>
                        {ca.contract.status}
                      </span>
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
