import { prisma } from "@/lib/prisma";
import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { EnquiriesTable } from "@/components/admin/EnquiriesTable";

async function getEnquiries() {
  return prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function EnquiriesPage() {
  const session = await getAuth();
  if (!session) redirect("/admin/login");

  const enquiries = await getEnquiries();
  const newCount = enquiries.filter((e) => e.status === "NEW").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-gray-900">Enquiries</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {enquiries.length} total · {newCount} new
        </p>
      </div>

      <EnquiriesTable
        enquiries={enquiries}
        canEdit={session.user.role !== "VIEWER"}
      />
    </div>
  );
}
