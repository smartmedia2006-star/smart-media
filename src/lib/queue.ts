import { Queue, Worker, Job } from "bullmq";
import { redis } from "@/lib/redis";

export const QUEUE_NAME = "smart-media-reminders";

export const reminderQueue = new Queue(QUEUE_NAME, {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
    removeOnComplete: { count: 100 },
    removeOnFail: { count: 200 },
  },
});

export interface ReminderJobData {
  contractId: string;
  clientId: string;
  eventType: string;
  scheduledJobId: string;
}

export async function scheduleContractReminders(contractId: string): Promise<void> {
  const { prisma } = await import("@/lib/prisma");

  const contract = await prisma.contract.findUnique({
    where: { id: contractId },
    include: {
      client: true,
      contractAssets: { include: { asset: true } },
      invoices: { orderBy: { dueDate: "asc" }, take: 1 },
    },
  });

  if (!contract) return;

  const activeRules = await prisma.reminderRule.findMany({
    where: { isActive: true },
  });

  await prisma.scheduledJob.deleteMany({
    where: { contractId, status: { in: ["PENDING"] } },
  });

  for (const rule of activeRules) {
    let triggerDate: Date | null = null;

    switch (rule.eventType) {
      case "CONTRACT_EXPIRY": {
        triggerDate = new Date(contract.endDate);
        triggerDate.setDate(triggerDate.getDate() + rule.daysOffset);
        break;
      }
      case "CAMPAIGN_START": {
        triggerDate = new Date(contract.startDate);
        triggerDate.setDate(triggerDate.getDate() + rule.daysOffset);
        break;
      }
      case "CAMPAIGN_END": {
        triggerDate = new Date(contract.endDate);
        triggerDate.setDate(triggerDate.getDate() + rule.daysOffset);
        break;
      }
      case "PAYMENT_DUE": {
        const nextInvoice = contract.invoices[0];
        if (nextInvoice) {
          triggerDate = new Date(nextInvoice.dueDate);
          triggerDate.setDate(triggerDate.getDate() + rule.daysOffset);
        }
        break;
      }
    }

    if (!triggerDate || triggerDate <= new Date()) continue;

    const scheduledJob = await prisma.scheduledJob.create({
      data: {
        contractId,
        eventType: rule.eventType as never,
        scheduledFor: triggerDate,
        status: "PENDING",
      },
    });

    const delay = triggerDate.getTime() - Date.now();

    const jobData: ReminderJobData = {
      contractId,
      clientId: contract.clientId,
      eventType: rule.eventType,
      scheduledJobId: scheduledJob.id,
    };

    const bullJob = await reminderQueue.add(
      `${rule.eventType}-${contractId}-${rule.id}`,
      jobData,
      { delay, jobId: scheduledJob.id }
    );

    await prisma.scheduledJob.update({
      where: { id: scheduledJob.id },
      data: { bullJobId: bullJob.id },
    });
  }
}

export async function cancelContractReminders(contractId: string): Promise<void> {
  const { prisma } = await import("@/lib/prisma");

  const jobs = await prisma.scheduledJob.findMany({
    where: { contractId, status: "PENDING" },
  });

  await Promise.allSettled(
    jobs.map(async (job) => {
      if (job.bullJobId) {
        const bullJob = await reminderQueue.getJob(job.bullJobId);
        if (bullJob) await bullJob.remove();
      }
    })
  );

  await prisma.scheduledJob.updateMany({
    where: { contractId, status: "PENDING" },
    data: { status: "CANCELLED" },
  });
}
