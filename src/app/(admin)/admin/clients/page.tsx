import { prisma } from "@/lib/prisma";
import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ClientsTable } from "@/components/admin/ClientsTable";

async function getClients() {
  return prisma.client.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { contracts: true } },
    },
  });
}

export default async function ClientsPage() {
  const session = await getAuth();
  if (!session) redirect("/admin/login");

  const clients = await getClients();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">Clients</h1>
          <p className="text-sm text-gray-500 mt-0.5">{clients.length} active clients</p>
        </div>
        <div className="flex gap-3">
          <a
            href="/api/clients?format=csv"
            className="btn-ghost py-2 px-4 text-sm border border-gray-200"
          >
            Export CSV
          </a>
          <a href="/admin/clients/new" className="btn-primary py-2 px-4 text-sm">
            + Add Client
          </a>
        </div>
      </div>

      <ClientsTable clients={clients} canEdit={session.user.role !== "VIEWER"} />
    </div>
  );
}
