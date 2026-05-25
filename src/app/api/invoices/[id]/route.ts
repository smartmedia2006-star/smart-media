import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const invoice = await prisma.invoice.findUnique({
    where: { id: params.id },
    include: {
      client: true,
      contract: { include: { assets: { include: { asset: true } } } },
    },
  });

  if (!invoice) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(invoice);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const invoice = await prisma.invoice.update({
    where: { id: params.id },
    data: {
      status: body.status,
      paidDate: body.status === "PAID" ? new Date() : body.paidDate ? new Date(body.paidDate) : undefined,
      amount: body.amount,
      taxAmount: body.taxAmount,
      totalAmount: body.amount != null && body.taxAmount != null ? body.amount + body.taxAmount : undefined,
      dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
    },
    include: {
      client: { select: { id: true, companyName: true } },
      contract: { select: { id: true, contractNumber: true } },
    },
  });

  return NextResponse.json(invoice);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.invoice.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
