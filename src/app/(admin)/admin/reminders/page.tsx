import { prisma } from "@/lib/prisma";
import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReminderRulesManager } from "@/components/admin/ReminderRulesManager";
import { ScheduledJobsTable } from "@/components/admin/ScheduledJobsTable";

async function getData() {
  const [rules, upcomingJobs] = await Promise.all([
    prisma.reminderRule.findMany({ orderBy: [{ eventType: "asc" }, { daysOffset: "asc" }] }),
    prisma.scheduledJob.findMany({
      where: { status: "PENDING", scheduledFor: { gte: new Date() } },
      include: {
        contract: { include: { client: { select: { companyName: true } } } },
      },
      orderBy: { scheduledFor: "asc" },
      take: 30,
    }),
  ]);
  return { rules, upcomingJobs };
}

export default async function RemindersPage() {
  const session = await getAuth();
  if (!session) redirect("/admin/login");

  const { rules, upcomingJobs } = await getData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-heading text-gray-900">Reminder Engine</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Configure automated WhatsApp, Telegram, and email reminders for contracts and payments
        </p>
      </div>

      {/* How it works */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
        <h3 className="font-semibold text-brand-blue-900 mb-2">How Automated Reminders Work</h3>
        <ul className="space-y-1.5 text-sm text-brand-blue-800">
          <li>• When a contract is created or updated, the system schedules BullMQ jobs based on the rules below</li>
          <li>• Each job fires at the scheduled time and sends messages via the client&apos;s preferred channel</li>
          <li>• A negative days offset (e.g. -7) means 7 days BEFORE the event; positive means AFTER</li>
          <li>• All sent messages are logged in the Messages tab with delivery status</li>
          <li>• If contract dates change, old jobs are cancelled and new ones are rescheduled automatically</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Rules manager */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Reminder Rules</h2>
          <ReminderRulesManager
            rules={rules}
            canEdit={session.user.role !== "VIEWER"}
          />
        </div>

        {/* Upcoming jobs */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Upcoming Scheduled Jobs ({upcomingJobs.length})
          </h2>
          <ScheduledJobsTable jobs={upcomingJobs} />
        </div>
      </div>
    </div>
  );
}
