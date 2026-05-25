import { Worker, Job } from "bullmq";
import { PrismaClient } from "@prisma/client";
import Redis from "ioredis";

const prisma = new PrismaClient();
const connection = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: null,
});

interface ReminderJobData {
  contractId: string;
  clientId: string;
  eventType: string;
  scheduledJobId: string;
}

async function processReminderJob(job: Job<ReminderJobData>): Promise<void> {
  const { contractId, clientId, eventType, scheduledJobId } = job.data;

  const scheduledJob = await prisma.scheduledJob.findUnique({
    where: { id: scheduledJobId },
  });

  if (!scheduledJob || scheduledJob.status !== "PENDING") {
    console.log(`Job ${scheduledJobId} already processed or cancelled.`);
    return;
  }

  await prisma.scheduledJob.update({
    where: { id: scheduledJobId },
    data: { status: "PROCESSING" },
  });

  const contract = await prisma.contract.findUnique({
    where: { id: contractId },
    include: {
      client: true,
      contractAssets: { include: { asset: true } },
      invoices: {
        where: { status: { in: ["PENDING", "OVERDUE"] } },
        orderBy: { dueDate: "asc" },
        take: 1,
      },
    },
  });

  if (!contract) {
    await prisma.scheduledJob.update({
      where: { id: scheduledJobId },
      data: { status: "FAILED", errorMessage: "Contract not found", executedAt: new Date() },
    });
    return;
  }

  const rules = await prisma.reminderRule.findMany({
    where: { eventType: eventType as never, isActive: true },
  });

  if (rules.length === 0) {
    await prisma.scheduledJob.update({
      where: { id: scheduledJobId },
      data: { status: "COMPLETED", executedAt: new Date() },
    });
    return;
  }

  const assetNames = contract.contractAssets.map((ca) => ca.asset.name).join(", ");
  const { default: formatDate } = await import("date-fns/format");
  const endDateStr = formatDate(contract.endDate, "dd MMM yyyy");
  const startDateStr = formatDate(contract.startDate, "dd MMM yyyy");
  const daysLeft = Math.ceil(
    (contract.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  const variables: Record<string, string> = {
    clientName: contract.client.contactPerson,
    companyName: contract.client.companyName,
    contractNumber: contract.contractNumber,
    assetName: assetNames,
    contractEndDate: endDateStr,
    contractStartDate: startDateStr,
    daysLeft: String(daysLeft),
    invoiceAmount: contract.invoices[0]
      ? `NPR ${contract.invoices[0].totalAmount.toLocaleString()}`
      : "",
    dueDate: contract.invoices[0]
      ? formatDate(contract.invoices[0].dueDate, "dd MMM yyyy")
      : "",
    renewUrl: `${process.env.NEXTAUTH_URL}/contact?ref=${contract.contractNumber}`,
    siteUrl: process.env.NEXTAUTH_URL || "https://smartmedia.com.np",
  };

  const { sendMessage } = await import("../src/lib/messaging");

  for (const rule of rules) {
    const messageContent = rule.templateMessage.replace(
      /\{\{(\w+)\}\}/g,
      (_, key) => variables[key] ?? `{{${key}}}`
    );

    for (const channel of rule.channel) {
      let recipient: string | null = null;
      switch (channel) {
        case "EMAIL":
          recipient = contract.client.email;
          break;
        case "WHATSAPP":
          recipient = `${contract.client.countryCode}${contract.client.phone.replace(/\D/g, "")}`;
          break;
        case "TELEGRAM":
          recipient = contract.client.telegramChatId;
          break;
      }

      if (!recipient) continue;

      try {
        await sendMessage({
          clientId,
          contractId,
          channel: channel as never,
          recipient,
          subject: rule.subject || undefined,
          body: messageContent,
        });
      } catch (err) {
        console.error(`Failed to send ${channel} to ${recipient}:`, err);
      }
    }
  }

  await prisma.scheduledJob.update({
    where: { id: scheduledJobId },
    data: { status: "COMPLETED", executedAt: new Date() },
  });
}

const worker = new Worker("smart-media-reminders", processReminderJob, {
  connection,
  concurrency: 5,
});

worker.on("completed", (job) => {
  console.log(`[Worker] Job ${job.id} completed successfully`);
});

worker.on("failed", async (job, err) => {
  console.error(`[Worker] Job ${job?.id} failed:`, err.message);
  if (job?.data?.scheduledJobId) {
    await prisma.scheduledJob.update({
      where: { id: job.data.scheduledJobId },
      data: { status: "FAILED", errorMessage: err.message, executedAt: new Date() },
    }).catch(console.error);
  }
});

worker.on("error", (err) => {
  console.error("[Worker] Worker error:", err);
});

console.log("[Worker] Reminder worker started");

process.on("SIGTERM", async () => {
  console.log("[Worker] Shutting down gracefully...");
  await worker.close();
  await prisma.$disconnect();
  process.exit(0);
});
