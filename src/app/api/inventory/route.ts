import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { z } from "zod";

const inventorySchema = z.object({
  name: z.string().min(2),
  sku: z.string().optional(),
  category: z.enum(["VINYL", "INK", "HARDWARE", "PRINTING", "ELECTRICAL", "OTHER"]),
  quantity: z.number().min(0),
  unit: z.string().min(1),
  reorderLevel: z.number().min(0),
  currentCost: z.number().positive().optional(),
  supplier: z.string().optional(),
  supplierPhone: z.string().optional(),
  location: z.string().optional(),
  notes: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const lowStock = searchParams.get("lowStock") === "1";

    const items = await prisma.inventoryItem.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });

    const withStatus = items.map((item) => ({
      ...item,
      isLowStock: item.quantity <= item.reorderLevel,
    }));

    return NextResponse.json(withStatus);
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
    const parsed = inventorySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", issues: parsed.error.issues }, { status: 400 });
    }
    const item = await prisma.inventoryItem.create({
      data: { ...parsed.data, lastRestocked: new Date() },
    });
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
