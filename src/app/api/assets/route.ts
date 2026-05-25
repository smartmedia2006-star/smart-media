import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { assetSchema } from "@/lib/validators/asset";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format");
    const status = searchParams.get("status");
    const city = searchParams.get("city");
    const search = searchParams.get("search") ?? "";
    const publicOnly = searchParams.get("public") === "1";

    const where: Record<string, unknown> = { isActive: true };
    if (format) where.format = format;
    if (status) where.status = status;
    if (city) where.city = { contains: city, mode: "insensitive" };
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { address: { contains: search, mode: "insensitive" } },
      ];
    }

    const assets = await prisma.asset.findMany({
      where,
      orderBy: { name: "asc" },
      ...(publicOnly
        ? { select: { id: true, name: true, code: true, address: true, city: true, lat: true, lng: true, format: true, width: true, height: true, status: true, photoUrls: true } }
        : {}),
    });

    return NextResponse.json(assets);
  } catch (err) {
    console.error("[API/assets GET]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const parsed = assetSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", issues: parsed.error.issues }, { status: 400 });
    }
    const asset = await prisma.asset.create({ data: parsed.data });
    return NextResponse.json(asset, { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("[API/assets POST]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
