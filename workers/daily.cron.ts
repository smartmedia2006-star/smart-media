// Daily cron job: checks for overdue invoices, low inventory, and missed reminders
import { PrismaClient } from "@prisma/client";
import { sendEmail } from "../src/lib/zohoMail";
import { formatDate } from "date-fns";

const prisma = new PrismaClient();

async function checkOverdueInvoices(): Promise<void> {
  const today = new Date();
  const overdue = await prisma.invoice.findMany({
    where: {
      status: "PENDING",
      dueDate: { lt: today },
    },
    include: { client: true, contract: true },
  });

  for (const invoice of overdue) {
    await prisma.invoice.update({
      where: { id: invoice.id },
      data: { status: "OVERDUE" },
    });
    console.log(`Marked invoice ${invoice.invoiceNumber} as OVERDUE`);
  }
}

async function checkExpiringContracts(): Promise<void> {
  const today = new Date();
  const in30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

  const expiring = await prisma.contract.findMany({
    where: {
      status: "ACTIVE",
      endDate: { gte: today, lte: in30Days },
    },
    include: { client: true },
  });

  if (expiring.length > 0) {
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
    if (adminEmail) {
      const rows = expiring
        .map(
          (c) =>
            `<tr><td>${c.contractNumber}</td><td>${c.client.companyName}</td><td>${formatDate(c.endDate, "dd MMM yyyy")}</td></tr>`
        )
        .join("");

      await sendEmail({
        to: adminEmail,
        subject: `${expiring.length} contract(s) expiring in 30 days`,
        htmlBody: `
          <h2>Contracts Expiring Soon</h2>
          <table border="1" cellpadding="8" cellspacing="0">
            <thead><tr><th>Contract #</th><th>Client</th><th>Expiry Date</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        `,
      });
    }
  }
}

async function checkLowInventory(): Promise<void> {
  const lowStock = await prisma.inventoryItem.findMany({
    where: {
      isActive: true,
      quantity: { lte: prisma.inventoryItem.fields.reorderLevel },
    },
  });

  if (lowStock.length > 0) {
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
    if (adminEmail) {
      const rows = lowStock
        .map(
          (item) =>
            `<tr><td>${item.name}</td><td>${item.quantity} ${item.unit}</td><td>${item.reorderLevel} ${item.unit}</td><td>${item.supplier ?? "N/A"}</td></tr>`
        )
        .join("");

      await sendEmail({
        to: adminEmail,
        subject: `Low Inventory Alert: ${lowStock.length} item(s) need restocking`,
        htmlBody: `
          <h2>Low Inventory Alert</h2>
          <table border="1" cellpadding="8" cellspacing="0">
            <thead><tr><th>Item</th><th>Current Qty</th><th>Reorder Level</th><th>Supplier</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
          <p>Please reorder these items to avoid production delays.</p>
        `,
      });
    }
  }
}

async function updateExpiredContracts(): Promise<void> {
  const today = new Date();
  const result = await prisma.contract.updateMany({
    where: {
      status: "ACTIVE",
      endDate: { lt: today },
    },
    data: { status: "EXPIRED" },
  });
  if (result.count > 0) {
    console.log(`Marked ${result.count} contract(s) as EXPIRED`);
  }
}

async function main(): Promise<void> {
  console.log(`[Cron] Running daily tasks at ${new Date().toISOString()}`);
  try {
    await updateExpiredContracts();
    await checkOverdueInvoices();
    await checkExpiringContracts();
    await checkLowInventory();
    console.log("[Cron] Daily tasks completed");
  } catch (err) {
    console.error("[Cron] Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
