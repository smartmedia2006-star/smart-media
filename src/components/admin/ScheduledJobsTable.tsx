import { formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/Badge";

type Job = {
  id: string;
  eventType: string;
  scheduledFor: Date;
  status: string;
  contract: {
    contractNumber: string;
    client: { companyName: string };
  };
};

const eventLabels: Record<string, string> = {
  CONTRACT_EXPIRY: "Contract Expiry",
  PAYMENT_DUE: "Payment Due",
  CAMPAIGN_START: "Campaign Start",
  CAMPAIGN_END: "Campaign End",
  MAINTENANCE_DUE: "Maintenance Due",
  CUSTOM: "Custom",
};

export function ScheduledJobsTable({ jobs }: { jobs: Job[] }) {
  if (jobs.length === 0) {
    return (
      <div className="card p-8 text-center text-sm text-gray-400">
        No upcoming scheduled jobs
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <table className="min-w-full divide-y divide-gray-100">
        <thead>
          <tr>
            {["Client / Contract", "Event", "Scheduled For", "Status"].map((h) => (
              <th key={h} className="table-header text-xs">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-50">
          {jobs.map((job) => {
            const isUrgent =
              new Date(job.scheduledFor).getTime() - Date.now() < 2 * 24 * 60 * 60 * 1000;
            return (
              <tr key={job.id} className={isUrgent ? "bg-orange-50" : "hover:bg-gray-50"}>
                <td className="px-4 py-3">
                  <p className="text-sm font-semibold text-gray-900">
                    {job.contract.client.companyName}
                  </p>
                  <p className="text-xs font-mono text-gray-400">
                    #{job.contract.contractNumber}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                    {eventLabels[job.eventType] ?? job.eventType}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-gray-700">{formatDate(job.scheduledFor)}</p>
                  {isUrgent && (
                    <p className="text-xs text-orange-600 font-medium">⚡ Firing soon</p>
                  )}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={job.status} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
