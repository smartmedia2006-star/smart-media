import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: "admin@smartmedia.com.np" },
      select: { id: true, email: true, isActive: true, passwordHash: true },
    });

    return NextResponse.json({
      dbConnected: true,
      userFound: !!user,
      isActive: user?.isActive,
      hasPasswordHash: !!user?.passwordHash,
      passwordHashPreview: user?.passwordHash?.substring(0, 10),
    });
  } catch (error: any) {
    return NextResponse.json({
      dbConnected: false,
      error: error.message,
    });
  }
}
