import { prisma } from "@/lib/prisma";
import { getAuth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { ClientForm } from "@/components/admin/ClientForm";
import Link from "next/link";

async function getClient(id: string) {
  return prisma.client.findUnique({ where: { id } });
}

export default async function EditClientPage({ params }: { params: { id: string } }) {
  const session = await getAuth();
  if (!session) redirect("/admin/login");
  if (session.user.role === "VIEWER") redirect("/admin/clients");

  const client = await getClient(params.id);
  if (!client) notFound();

  const defaultValues = {
    email: client.email,
    companyName: client.companyName,
    brandName: client.brandName ?? undefined,
    contactPerson: client.contactPerson,
    phone: client.phone,
    countryCode: client.countryCode,
    preferredChannel: client.preferredChannel,
    telegramChatId: client.telegramChatId ?? undefined,
    address: client.address ?? undefined,
    city: client.city ?? undefined,
    website: client.website ?? undefined,
    vatNumber: client.vatNumber ?? undefined,
    notes: client.notes ?? undefined,
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
          <Link href="/admin/clients" className="hover:text-gray-700">Clients</Link>
          <span>/</span>
          <Link href={`/admin/clients/${client.id}`} className="hover:text-gray-700">{client.companyName}</Link>
          <span>/</span>
          <span>Edit</span>
        </div>
        <h1 className="text-2xl font-bold font-heading text-gray-900">Edit Client</h1>
      </div>
      <ClientForm defaultValues={defaultValues} clientId={client.id} />
    </div>
  );
}
