import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(
      new URL(`/admin/settings?zoho=error&msg=${error ?? "no_code"}`, req.url)
    );
  }

  try {
    const response = await axios.post(
      "https://accounts.zoho.com/oauth/v2/token",
      new URLSearchParams({
        code,
        client_id: process.env.ZOHO_CLIENT_ID!,
        client_secret: process.env.ZOHO_CLIENT_SECRET!,
        redirect_uri: process.env.ZOHO_REDIRECT_URI!,
        grant_type: "authorization_code",
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token, refresh_token, expires_in } = response.data;
    const expiresAt = new Date(Date.now() + expires_in * 1000);

    await prisma.zohoToken.upsert({
      where: { id: "singleton" },
      update: { accessToken: access_token, refreshToken: refresh_token, expiresAt, updatedAt: new Date() },
      create: { id: "singleton", accessToken: access_token, refreshToken: refresh_token, expiresAt, updatedAt: new Date() },
    });

    return NextResponse.redirect(new URL("/admin/settings?zoho=connected", req.url));
  } catch (err) {
    console.error("[Zoho OAuth callback]", err);
    return NextResponse.redirect(new URL("/admin/settings?zoho=error&msg=token_exchange", req.url));
  }
}
