import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const item = await prisma.inventoryItem.update({
    where: { id: params.id },
    data: {
      name: body.name,
      sku: body.sku,
      category: body.category,
      quantity: body.quantity,
      unit: body.unit,
      reorderLevel: body.reorderLevel,
      currentCost: body.currentCost,
      supplier: body.supplier,
    },
  });

  return NextResponse.json(item);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.inventoryItem.update({
    where: { id: params.id },
    data: { isActive: false },
  });

  return NextResponse.json({ success: true });
}
