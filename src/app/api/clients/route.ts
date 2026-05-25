import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { clientSchema } from "@/lib/validators/client";
import Papa from "papaparse";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "50");
    const search = searchParams.get("search") ?? "";
    const format = searchParams.get("format"); // csv

    const where = search
      ? {
          OR: [
            { companyName: { contains: search, mode: "insensitive" as const } },
            { contactPerson: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {};

    if (format === "csv") {
      const clients = await prisma.client.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });
      const csv = Papa.unparse(
        clients.map((c) => ({
          ID: c.id,
          Company: c.companyName,
          Brand: c.brandName ?? "",
          Contact: c.contactPerson,
          Email: c.email,
          Phone: c.phone,
          "Country Code": c.countryCode,
          City: c.city ?? "",
          "Preferred Channel": c.preferredChannel,
          "Telegram Chat ID": c.telegramChatId ?? "",
          Active: c.isActive,
          Created: c.createdAt.toISOString(),
        }))
      );
      return new Response(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": "attachment; filename=clients.csv",
        },
      });
    }

    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          _count: { select: { contracts: true } },
        },
      }),
      prisma.client.count({ where }),
    ]);

    return NextResponse.json({ clients, total, page, limit });
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("[API/clients GET]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const parsed = clientSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", issues: parsed.error.issues }, { status: 400 });
    }

    const client = await prisma.client.create({ data: parsed.data });
    return NextResponse.json(client, { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("[API/clients POST]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
