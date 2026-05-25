import { prisma } from "@/lib/prisma";
import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/utils";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { OccupancyChart } from "@/components/admin/OccupancyChart";

async function getReportData() {
  const now = new Date();
  const yearStart = new Date(now.getFullYear(), 0, 1);

  const [
    ytdRevenue,
    activeContracts,
    assetsByFormat,
    topClients,
    contractsByStatus,
  ] = await Promise.all([
    prisma.invoice.aggregate({
      where: { status: "PAID", paidDate: { gte: yearStart } },
      _sum: { totalAmount: true },
    }),
    prisma.contract.count({ where: { status: "ACTIVE" } }),
    prisma.asset.groupBy({
      by: ["format"],
      where: { isActive: true },
      _count: true,
    }),
    prisma.client.findMany({
      where: { isActive: true },
      take: 5,
      include: {
        contracts: {
          where: { status: "ACTIVE" },
          select: { totalValue: true },
        },
        _count: { select: { contracts: true } },
      },
      orderBy: { contracts: { _count: "desc" } },
    }),
    prisma.contract.groupBy({
      by: ["status"],
      _count: true,
    }),
  ]);

  return {
    ytdRevenue: ytdRevenue._sum.totalAmount ?? 0,
    activeContracts,
    assetsByFormat,
    topClients,
    contractsByStatus,
  };
}

export default async function ReportsPage() {
  const session = await getAuth();
  if (!session) redirect("/admin/login");

  const data = await getReportData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-heading text-gray-900">Reports & Analytics</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Business performance overview — {new Date().getFullYear()}
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "YTD Revenue", value: formatCurrency(data.ytdRevenue), color: "blue" },
          { label: "Active Contracts", value: data.activeContracts, color: "green" },
          { label: "Asset Formats", value: data.assetsByFormat.length, color: "purple" },
          {
            label: "Top Client Contracts",
            value: data.topClients[0]?._count.contracts ?? 0,
            color: "orange",
          },
        ].map((kpi) => (
          <div key={kpi.label} className="card p-5 text-center">
            <p className="text-2xl font-extrabold font-heading text-gray-900">{kpi.value}</p>
            <p className="text-sm text-gray-500 mt-1">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Revenue – Last 6 Months</h2>
          <RevenueChart />
        </div>
        <div className="card p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Asset Occupancy by Format</h2>
          <OccupancyChart data={data.assetsByFormat} />
        </div>
      </div>

      {/* Contract status breakdown */}
      <div className="card p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Contract Status Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {data.contractsByStatus.map((s) => (
            <div key={s.status} className="text-center">
              <p className="text-2xl font-bold text-gray-900">{s._count}</p>
              <p className="text-xs text-gray-500 mt-1">{s.status.replace(/_/g, " ")}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top clients table */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Top Clients by Contract Volume</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead>
              <tr>
                {["#", "Client", "Total Contracts", "Active Value"].map((h) => (
                  <th key={h} className="table-header">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {data.topClients.map((client, i) => {
                const activeValue = client.contracts.reduce((s, c) => s + c.totalValue, 0);
                return (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="table-cell font-bold text-gray-400">{i + 1}</td>
                    <td className="table-cell font-semibold">{client.companyName}</td>
                    <td className="table-cell">{client._count.contracts}</td>
                    <td className="table-cell font-semibold text-brand-blue-600">
                      {formatCurrency(activeValue)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
