import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { z } from "zod";

const reminderRuleSchema = z.object({
  name: z.string().min(2),
  eventType: z.enum(["CONTRACT_EXPIRY", "PAYMENT_DUE", "CAMPAIGN_START", "CAMPAIGN_END", "MAINTENANCE_DUE", "CUSTOM"]),
  daysOffset: z.number().int(),
  channel: z.array(z.enum(["EMAIL", "WHATSAPP", "TELEGRAM", "SMS"])).min(1),
  templateMessage: z.string().min(10),
  subject: z.string().optional(),
  isActive: z.boolean().default(true),
});

export async function GET(_req: NextRequest) {
  try {
    await requireAdmin();
    const rules = await prisma.reminderRule.findMany({ orderBy: [{ eventType: "asc" }, { daysOffset: "asc" }] });
    return NextResponse.json(rules);
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const parsed = reminderRuleSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", issues: parsed.error.issues }, { status: 400 });
    }
    const rule = await prisma.reminderRule.create({ data: parsed.data });
    return NextResponse.json(rule, { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
