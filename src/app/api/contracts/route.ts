import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, getAuth } from "@/lib/auth";
import { contractSchema } from "@/lib/validators/contract";
import { generateContractNumber } from "@/lib/utils";
import { scheduleContractReminders } from "@/lib/queue";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const clientId = searchParams.get("clientId");
    const expiringDays = searchParams.get("expiringDays");
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "20");

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (clientId) where.clientId = clientId;
    if (expiringDays) {
      const days = parseInt(expiringDays);
      const cutoff = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
      where.status = "ACTIVE";
      where.endDate = { lte: cutoff, gte: new Date() };
    }

    const [contracts, total] = await Promise.all([
      prisma.contract.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          client: { select: { id: true, companyName: true, email: true, phone: true } },
          contractAssets: { include: { asset: { select: { id: true, name: true, code: true } } } },
          _count: { select: { invoices: true } },
        },
      }),
      prisma.contract.count({ where }),
    ]);

    return NextResponse.json({ contracts, total, page, limit });
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("[API/contracts GET]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAdmin();
    const body = await req.json();
    const parsed = contractSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", issues: parsed.error.issues }, { status: 400 });
    }

    const { assetIds, ...contractData } = parsed.data;
    const contractNumber = generateContractNumber();

    const contract = await prisma.$transaction(async (tx) => {
      const c = await tx.contract.create({
        data: {
          ...contractData,
          contractNumber,
          startDate: new Date(contractData.startDate),
          endDate: new Date(contractData.endDate),
          createdById: session.user.id,
          contractAssets: {
            create: assetIds.map((assetId) => ({ assetId })),
          },
        },
        include: {
          contractAssets: { include: { asset: true } },
          client: true,
        },
      });

      // Update asset statuses to BOOKED
      await tx.asset.updateMany({
        where: { id: { in: assetIds } },
        data: { status: "BOOKED" },
      });

      return c;
    });

    // Schedule reminders asynchronously
    scheduleContractReminders(contract.id).catch(console.error);

    return NextResponse.json(contract, { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("[API/contracts POST]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
