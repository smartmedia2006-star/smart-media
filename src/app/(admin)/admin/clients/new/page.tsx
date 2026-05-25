import { ClientForm } from "@/components/admin/ClientForm";

export default function NewClientPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-heading text-gray-900">Add New Client</h1>
        <p className="text-sm text-gray-500 mt-1">Create a new client record in Smart Media&apos;s CRM</p>
      </div>
      <div className="card p-8">
        <ClientForm />
      </div>
    </div>
  );
}
