import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { contractSchema } from "@/lib/validators/contract";
import { cancelContractReminders, scheduleContractReminders } from "@/lib/queue";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    const contract = await prisma.contract.findUnique({
      where: { id: params.id },
      include: {
        client: true,
        contractAssets: { include: { asset: true } },
        invoices: { orderBy: { dueDate: "desc" } },
        messageLogs: { orderBy: { createdAt: "desc" }, take: 20 },
        scheduledJobs: { orderBy: { scheduledFor: "asc" } },
        createdBy: { select: { name: true, email: true } },
      },
    });
    if (!contract) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(contract);
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    const body = await req.json();
    const parsed = contractSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", issues: parsed.error.issues }, { status: 400 });
    }

    const { assetIds, ...contractData } = parsed.data;

    const contract = await prisma.$transaction(async (tx) => {
      // Remove old contract-asset links
      const old = await tx.contractAsset.findMany({ where: { contractId: params.id } });
      const oldAssetIds = old.map((ca) => ca.assetId);

      await tx.contractAsset.deleteMany({ where: { contractId: params.id } });
      await tx.contractAsset.createMany({
        data: assetIds.map((assetId) => ({ contractId: params.id, assetId })),
      });

      // Reset old assets that are no longer in contract
      const removedAssets = oldAssetIds.filter((id) => !assetIds.includes(id));
      if (removedAssets.length) {
        await tx.asset.updateMany({ where: { id: { in: removedAssets } }, data: { status: "VACANT" } });
      }
      // Book new assets
      await tx.asset.updateMany({ where: { id: { in: assetIds } }, data: { status: "BOOKED" } });

      return tx.contract.update({
        where: { id: params.id },
        data: {
          ...contractData,
          startDate: new Date(contractData.startDate),
          endDate: new Date(contractData.endDate),
        },
        include: { contractAssets: { include: { asset: true } }, client: true },
      });
    });

    // Re-schedule reminders
    await cancelContractReminders(params.id);
    scheduleContractReminders(params.id).catch(console.error);

    return NextResponse.json(contract);
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    await cancelContractReminders(params.id);
    // Free up assets
    const contractAssets = await prisma.contractAsset.findMany({ where: { contractId: params.id } });
    const assetIds = contractAssets.map((ca) => ca.assetId);

    await prisma.$transaction([
      prisma.contract.update({ where: { id: params.id }, data: { status: "TERMINATED" } }),
      prisma.asset.updateMany({ where: { id: { in: assetIds } }, data: { status: "VACANT" } }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
