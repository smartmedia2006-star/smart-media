import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { enquirySchema } from "@/lib/validators/enquiry";
import { sendEmail } from "@/lib/zohoMail";
import { redis } from "@/lib/redis";

export async function POST(req: NextRequest) {
  try {
    // Rate limiting: 5 submissions per IP per hour
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    const rateLimitKey = `enquiry:${ip}`;
    const count = await redis.incr(rateLimitKey);
    if (count === 1) await redis.expire(rateLimitKey, 3600);
    if (count > 5) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = enquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const enquiry = await prisma.enquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
        company: data.company ?? null,
        service: data.service ?? null,
        message: data.message,
        ipAddress: ip,
        source: req.headers.get("referer") ?? null,
      },
    });

    // Notify admin
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL ?? process.env.ADMIN_EMAIL;
    if (adminEmail) {
      await sendEmail({
        to: adminEmail,
        subject: `New Enquiry from ${data.name} – ${data.company ?? "Individual"}`,
        htmlBody: `
          <h2>New Enquiry Received</h2>
          <table cellpadding="8" border="1" style="border-collapse:collapse;width:100%">
            <tr><td><strong>Name</strong></td><td>${data.name}</td></tr>
            <tr><td><strong>Company</strong></td><td>${data.company ?? "—"}</td></tr>
            <tr><td><strong>Email</strong></td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td><strong>Phone</strong></td><td>${data.phone ?? "—"}</td></tr>
            <tr><td><strong>Service</strong></td><td>${data.service ?? "—"}</td></tr>
            <tr><td><strong>Message</strong></td><td>${data.message}</td></tr>
          </table>
          <p style="margin-top:16px">
            <a href="${process.env.NEXTAUTH_URL}/admin/enquiries">View in Admin Panel →</a>
          </p>
        `,
      }).catch(console.error);
    }

    // Auto-reply to enquirer
    await sendEmail({
      to: data.email,
      subject: "We've received your enquiry – Smart Media Nepal",
      htmlBody: `
        <h2>Thank you, ${data.name}!</h2>
        <p>We've received your advertising enquiry and our team will get back to you within 4 business hours.</p>
        <p>Your reference number is: <strong>#${enquiry.id.slice(-8).toUpperCase()}</strong></p>
        <p>In the meantime, feel free to call us at <strong>+977-1-4444444</strong>.</p>
        <br>
        <p>Best regards,<br><strong>Smart Media Nepal</strong></p>
      `,
    }).catch(console.error);

    return NextResponse.json({ success: true, id: enquiry.id }, { status: 201 });
  } catch (err) {
    console.error("[API/enquiries]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Admin only — handled in admin route
  return NextResponse.json({ error: "Use /api/admin/enquiries for listing" }, { status: 400 });
}
