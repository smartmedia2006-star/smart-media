import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") ?? "dashboard";

    if (type === "dashboard") {
      const now = new Date();
      const in30 = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

      const [
        totalClients,
        activeContracts,
        totalAssets,
        vacantAssets,
        expiringContracts,
        overdueInvoices,
        recentMessages,
        lowStockItems,
        monthlyRevenue,
      ] = await Promise.all([
        prisma.client.count({ where: { isActive: true } }),
        prisma.contract.count({ where: { status: "ACTIVE" } }),
        prisma.asset.count({ where: { isActive: true } }),
        prisma.asset.count({ where: { status: "VACANT", isActive: true } }),
        prisma.contract.count({ where: { status: "ACTIVE", endDate: { lte: in30, gte: now } } }),
        prisma.invoice.count({ where: { status: "OVERDUE" } }),
        prisma.messageLog.count({ where: { createdAt: { gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) } } }),
        prisma.inventoryItem.count({ where: { isActive: true } }),
        prisma.invoice.aggregate({
          where: { status: "PAID", paidDate: { gte: new Date(now.getFullYear(), now.getMonth(), 1) } },
          _sum: { totalAmount: true },
        }),
      ]);

      return NextResponse.json({
        totalClients,
        activeContracts,
        totalAssets,
        vacantAssets,
        bookedAssets: totalAssets - vacantAssets,
        occupancyRate: totalAssets > 0 ? Math.round(((totalAssets - vacantAssets) / totalAssets) * 100) : 0,
        expiringContracts,
        overdueInvoices,
        recentMessages,
        lowStockItems,
        monthlyRevenue: monthlyRevenue._sum.totalAmount ?? 0,
      });
    }

    if (type === "occupancy") {
      const assets = await prisma.asset.findMany({
        where: { isActive: true },
        include: {
          contractAssets: {
            include: { contract: { select: { status: true, startDate: true, endDate: true } } },
          },
        },
      });
      return NextResponse.json(assets);
    }

    if (type === "revenue") {
      const months = 6;
      const data = [];
      for (let i = months - 1; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        const start = new Date(d.getFullYear(), d.getMonth(), 1);
        const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);

        const result = await prisma.invoice.aggregate({
          where: { paidDate: { gte: start, lte: end }, status: "PAID" },
          _sum: { totalAmount: true },
        });

        data.push({
          month: start.toLocaleString("default", { month: "short", year: "2-digit" }),
          revenue: result._sum.totalAmount ?? 0,
        });
      }
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: "Unknown report type" }, { status: 400 });
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("[API/reports]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
