import { prisma } from "@/lib/prisma";
import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SettingsForm } from "@/components/admin/SettingsForm";

async function getSettings() {
  const rows = await prisma.siteSettings.findMany();
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

async function getUsers() {
  return prisma.user.findMany({ orderBy: { createdAt: "asc" } });
}

export default async function SettingsPage() {
  const session = await getAuth();
  if (!session) redirect("/admin/login");
  if (session.user.role !== "SUPER_ADMIN") redirect("/admin/dashboard");

  const [settings, users] = await Promise.all([getSettings(), getUsers()]);

  const zohoToken = await prisma.zohoToken.findFirst({ orderBy: { updatedAt: "desc" } });

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold font-heading text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Site configuration and third-party integrations
        </p>
      </div>

      <SettingsForm settings={settings} />

      {/* Zoho Mail Integration */}
      <div className="card p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">Zoho Mail Integration</h2>
        {zohoToken ? (
          <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <span className="text-green-600 text-xl">✓</span>
            <div>
              <p className="text-sm font-semibold text-green-800">Connected</p>
              <p className="text-xs text-green-600">
                Token expires: {new Date(zohoToken.expiresAt).toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <span className="text-amber-600 text-xl">⚠️</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-800">Not Connected</p>
              <p className="text-xs text-amber-600">
                Set ZOHO_CLIENT_ID and ZOHO_CLIENT_SECRET in your environment, then authorise below.
              </p>
            </div>
            <a
              href={`https://accounts.zoho.com/oauth/v2/auth?scope=ZohoMail.messages.CREATE&client_id=${process.env.ZOHO_CLIENT_ID}&response_type=code&access_type=offline&redirect_uri=${process.env.NEXT_PUBLIC_SITE_URL}/api/zoho/callback`}
              className="btn-primary text-sm py-1.5 px-3 whitespace-nowrap"
              target="_blank"
              rel="noopener noreferrer"
            >
              Authorise Zoho
            </a>
          </div>
        )}
      </div>

      {/* Users */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Admin Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead>
              <tr>
                {["Name", "Email", "Role", "Joined"].map((h) => (
                  <th key={h} className="table-header">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="table-cell font-semibold text-sm">{user.name ?? "—"}</td>
                  <td className="table-cell text-sm text-gray-600">{user.email}</td>
                  <td className="table-cell">
                    <span className={`badge text-xs ${
                      user.role === "SUPER_ADMIN"
                        ? "bg-purple-100 text-purple-700"
                        : user.role === "MANAGER"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="table-cell text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
