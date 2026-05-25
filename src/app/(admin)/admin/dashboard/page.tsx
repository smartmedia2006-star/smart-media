import { prisma } from "@/lib/prisma";
import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  UsersIcon,
  MapPinIcon,
  DocumentTextIcon,
  BellAlertIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { StatCard } from "@/components/ui/StatCard";
import { formatCurrency, formatDate, daysUntil } from "@/lib/utils";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/Badge";
import { RevenueChart } from "@/components/admin/RevenueChart";

async function getDashboardData() {
  const now = new Date();
  const in30 = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    totalClients,
    activeContracts,
    totalAssets,
    vacantAssets,
    expiringContracts,
    overdueInvoices,
    monthlyRevenue,
    recentEnquiries,
    upcomingContracts,
  ] = await Promise.all([
    prisma.client.count({ where: { isActive: true } }),
    prisma.contract.count({ where: { status: "ACTIVE" } }),
    prisma.asset.count({ where: { isActive: true } }),
    prisma.asset.count({ where: { status: "VACANT", isActive: true } }),
    prisma.contract.findMany({
      where: { status: "ACTIVE", endDate: { lte: in30, gte: now } },
      include: { client: { select: { companyName: true } }, contractAssets: { include: { asset: { select: { name: true } } }, take: 1 } },
      orderBy: { endDate: "asc" },
      take: 5,
    }),
    prisma.invoice.count({ where: { status: "OVERDUE" } }),
    prisma.invoice.aggregate({
      where: { status: "PAID", paidDate: { gte: monthStart } },
      _sum: { totalAmount: true },
    }),
    prisma.enquiry.findMany({ where: { status: "NEW" }, orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.contract.findMany({
      where: { status: "ACTIVE" },
      include: { client: { select: { companyName: true } } },
      orderBy: { endDate: "asc" },
      take: 8,
    }),
  ]);

  return {
    totalClients,
    activeContracts,
    totalAssets,
    vacantAssets,
    bookedAssets: totalAssets - vacantAssets,
    occupancyRate: totalAssets > 0 ? Math.round(((totalAssets - vacantAssets) / totalAssets) * 100) : 0,
    expiringContracts,
    overdueInvoices,
    monthlyRevenue: monthlyRevenue._sum.totalAmount ?? 0,
    recentEnquiries,
    upcomingContracts,
  };
}

export default async function DashboardPage() {
  const session = await getAuth();
  if (!session) redirect("/admin/login");

  const data = await getDashboardData();

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">
            Welcome back, {session.user.name.split(" ")[0]}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {new Date().toLocaleDateString("en-NP", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/contracts/new" className="btn-primary py-2 px-4 text-sm">
            + New Contract
          </Link>
          <Link href="/admin/clients/new" className="btn-outline py-2 px-4 text-sm">
            + New Client
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Contracts"
          value={data.activeContracts}
          icon={<DocumentTextIcon />}
          color="blue"
          subtitle="currently live"
        />
        <StatCard
          title="Total Clients"
          value={data.totalClients}
          icon={<UsersIcon />}
          color="green"
          subtitle="active accounts"
        />
        <StatCard
          title="Site Occupancy"
          value={`${data.occupancyRate}%`}
          icon={<MapPinIcon />}
          color="purple"
          subtitle={`${data.vacantAssets} sites vacant`}
        />
        <StatCard
          title="Revenue (This Month)"
          value={formatCurrency(data.monthlyRevenue)}
          icon={<CurrencyDollarIcon />}
          color="yellow"
          subtitle="from paid invoices"
        />
      </div>

      {/* Alert strip */}
      {(data.expiringContracts.length > 0 || data.overdueInvoices > 0) && (
        <div className="flex flex-wrap gap-3">
          {data.expiringContracts.length > 0 && (
            <Link
              href="/admin/contracts?status=ACTIVE&expiring=30"
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-sm font-medium hover:bg-amber-100 transition-colors"
            >
              <BellAlertIcon className="w-4 h-4" />
              {data.expiringContracts.length} contract(s) expiring within 30 days
            </Link>
          )}
          {data.overdueInvoices > 0 && (
            <Link
              href="/admin/invoices?status=OVERDUE"
              className="flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 text-red-800 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
            >
              <ExclamationTriangleIcon className="w-4 h-4" />
              {data.overdueInvoices} overdue invoice(s) need attention
            </Link>
          )}
        </div>
      )}

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expiring contracts */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Contracts Expiring Soon</h2>
            <Link href="/admin/contracts" className="text-xs text-brand-blue-600 hover:underline font-medium">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {data.expiringContracts.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">No contracts expiring in 30 days 🎉</p>
            ) : (
              data.expiringContracts.map((contract) => {
                const days = daysUntil(contract.endDate);
                return (
                  <div key={contract.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{contract.client.companyName}</p>
                      <p className="text-xs text-gray-500">
                        #{contract.contractNumber} · {contract.contractAssets[0]?.asset.name ?? "—"}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          days <= 3
                            ? "bg-red-100 text-red-700"
                            : days <= 7
                            ? "bg-orange-100 text-orange-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {days <= 0 ? "Today!" : `${days}d left`}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">{formatDate(contract.endDate)}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* New enquiries */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">New Enquiries</h2>
            <Link href="/admin/enquiries" className="text-xs text-brand-blue-600 hover:underline font-medium">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {data.recentEnquiries.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">No new enquiries</p>
            ) : (
              data.recentEnquiries.map((enq) => (
                <div key={enq.id} className="px-5 py-3.5 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-gray-900 truncate">{enq.name}</p>
                    <StatusBadge status={enq.status} />
                  </div>
                  <p className="text-xs text-gray-500 truncate">{enq.company ?? enq.email}</p>
                  <p className="text-xs text-gray-400 mt-1">{formatDate(enq.createdAt, "dd MMM, HH:mm")}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Revenue chart + asset status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Revenue – Last 6 Months</h2>
          <RevenueChart />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Site Availability</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-gray-600">Booked</span>
                <span className="font-semibold text-gray-900">{data.bookedAssets}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-blue-600 rounded-full"
                  style={{ width: `${data.occupancyRate}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-gray-600">Vacant</span>
                <span className="font-semibold text-gray-900">{data.vacantAssets}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${100 - data.occupancyRate}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</p>
            <div className="space-y-2">
              <Link href="/admin/contracts/new" className="flex items-center gap-2 text-sm text-brand-blue-600 hover:underline">
                <DocumentTextIcon className="w-4 h-4" />
                Create New Contract
              </Link>
              <Link href="/admin/assets/new" className="flex items-center gap-2 text-sm text-brand-blue-600 hover:underline">
                <MapPinIcon className="w-4 h-4" />
                Add New Asset
              </Link>
              <Link href="/admin/messages" className="flex items-center gap-2 text-sm text-brand-blue-600 hover:underline">
                <BellAlertIcon className="w-4 h-4" />
                Send Bulk Reminder
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
