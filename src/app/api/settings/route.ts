import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await prisma.siteSettings.findMany();
  const settings = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  return NextResponse.json(settings);
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();

  await Promise.all(
    Object.entries(body).map(([key, value]) =>
      prisma.siteSettings.upsert({
        where: { key },
        update: { value: value as string },
        create: { key, value: value as string },
      })
    )
  );

  return NextResponse.json({ success: true });
}
