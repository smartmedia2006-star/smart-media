import { prisma } from "@/lib/prisma";
import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BulkMessageForm } from "@/components/admin/BulkMessageForm";
import { MessageLogsTable } from "@/components/admin/MessageLogsTable";

async function getData() {
  const [clients, logs] = await Promise.all([
    prisma.client.findMany({
      where: { isActive: true },
      orderBy: { companyName: "asc" },
      select: { id: true, companyName: true, email: true, preferredChannel: true },
    }),
    prisma.messageLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        client: { select: { companyName: true } },
        sentBy: { select: { name: true } },
      },
    }),
  ]);
  return { clients, logs };
}

export default async function MessagesPage() {
  const session = await getAuth();
  if (!session) redirect("/admin/login");

  const { clients, logs } = await getData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-gray-900">Messages</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Send bulk WhatsApp, Telegram, and email messages to clients
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1">
          <div className="card p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Bulk Message</h2>
            {session.user.role === "VIEWER" ? (
              <p className="text-sm text-gray-500">You need Manager or Admin access to send messages.</p>
            ) : (
              <BulkMessageForm clients={clients} sentById={session.user.id} />
            )}
          </div>
        </div>

        <div className="xl:col-span-2">
          <div className="card overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Message Log (Last 50)</h2>
            </div>
            <MessageLogsTable logs={logs} />
          </div>
        </div>
      </div>
    </div>
  );
}
