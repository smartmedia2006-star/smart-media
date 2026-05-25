import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { z } from "zod";

const InvoiceSchema = z.object({
  contractId: z.string(),
  clientId: z.string(),
  amount: z.number().positive(),
  taxAmount: z.number().min(0).default(0),
  dueDate: z.string(),
  notes: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const clientId = searchParams.get("clientId");
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "50");

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (clientId) where.clientId = clientId;

  const [invoices, total] = await Promise.all([
    prisma.invoice.findMany({
      where,
      include: {
        client: { select: { id: true, companyName: true } },
        contract: { select: { id: true, contractNumber: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.invoice.count({ where }),
  ]);

  return NextResponse.json({ invoices, total, page, limit });
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = InvoiceSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });

  const d = parsed.data;
  const totalAmount = d.amount + d.taxAmount;

  const invoiceNumber = `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;

  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber,
      contractId: d.contractId,
      clientId: d.clientId,
      amount: d.amount,
      taxAmount: d.taxAmount,
      totalAmount,
      dueDate: new Date(d.dueDate),
      status: "PENDING",
    },
    include: {
      client: { select: { id: true, companyName: true } },
      contract: { select: { id: true, contractNumber: true } },
    },
  });

  return NextResponse.json(invoice, { status: 201 });
}
