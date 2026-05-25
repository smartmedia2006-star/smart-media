import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { sendMessage } from "@/lib/messaging";
import { z } from "zod";

const bulkSchema = z.object({
  clientIds: z.array(z.string()).min(1, "Select at least one client"),
  channel: z.enum(["EMAIL", "WHATSAPP", "TELEGRAM"]),
  subject: z.string().optional(),
  message: z.string().min(5, "Message too short"),
});

export async function POST(req: NextRequest) {
  try {
    const session = await requireAdmin();
    const body = await req.json();
    const parsed = bulkSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", issues: parsed.error.issues }, { status: 400 });
    }

    const { clientIds, channel, subject, message } = parsed.data;

    const clients = await prisma.client.findMany({
      where: { id: { in: clientIds }, isActive: true },
    });

    const results = await Promise.allSettled(
      clients.map((client) => {
        let recipient: string | null = null;
        switch (channel) {
          case "EMAIL": recipient = client.email; break;
          case "WHATSAPP": recipient = `${client.countryCode}${client.phone.replace(/\D/g, "")}`; break;
          case "TELEGRAM": recipient = client.telegramChatId; break;
        }
        if (!recipient) return Promise.reject(new Error(`No ${channel} contact for ${client.companyName}`));
        return sendMessage({
          clientId: client.id,
          channel,
          recipient,
          subject,
          body: message,
          sentById: session.user.id,
        });
      })
    );

    const succeeded = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;
    const errors = results
      .filter((r): r is PromiseRejectedResult => r.status === "rejected")
      .map((r) => r.reason?.message ?? "Unknown error");

    return NextResponse.json({ succeeded, failed, errors, total: clients.length });
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("[API/messages/bulk]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
