import { formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/Badge";

type MessageLog = {
  id: string;
  channel: string;
  recipient: string;
  subject: string | null;
  messageContent: string;
  status: string;
  sentAt: Date | null;
  createdAt: Date;
  client: { companyName: string };
  sentBy: { name: string } | null;
};

const channelIcon: Record<string, string> = {
  WHATSAPP: "🟢",
  TELEGRAM: "🔵",
  EMAIL: "📧",
  SMS: "📱",
};

export function MessageLogsTable({ logs }: { logs: MessageLog[] }) {
  if (logs.length === 0) {
    return (
      <div className="px-5 py-10 text-center text-sm text-gray-400">
        No messages sent yet
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-100">
        <thead>
          <tr>
            {["Client", "Channel", "Subject / Content", "Status", "Sent At", "By"].map((h) => (
              <th key={h} className="table-header">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-50">
          {logs.map((log) => (
            <tr key={log.id} className="hover:bg-gray-50">
              <td className="table-cell font-medium text-sm">{log.client.companyName}</td>
              <td className="table-cell">
                <span className="text-sm">{channelIcon[log.channel]} {log.channel}</span>
              </td>
              <td className="table-cell">
                <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                  {log.subject ?? log.messageContent.slice(0, 50) + "..."}
                </p>
                <p className="text-xs text-gray-400 truncate max-w-[200px]">{log.recipient}</p>
              </td>
              <td className="table-cell">
                <StatusBadge status={log.status} />
              </td>
              <td className="table-cell text-sm text-gray-500">
                {log.sentAt ? formatDate(log.sentAt, "dd MMM, HH:mm") : "—"}
              </td>
              <td className="table-cell text-sm text-gray-500">
                {log.sentBy?.name ?? "System"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
