import axios from "axios";
import { prisma } from "@/lib/prisma";

const ZOHO_TOKEN_URL = "https://accounts.zoho.com/oauth/v2/token";
const ZOHO_MAIL_API = "https://mail.zoho.com/api";

interface ZohoTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
}

async function refreshAccessToken(refreshToken: string): Promise<string> {
  const response = await axios.post<ZohoTokenResponse>(
    ZOHO_TOKEN_URL,
    new URLSearchParams({
      refresh_token: refreshToken,
      client_id: process.env.ZOHO_CLIENT_ID!,
      client_secret: process.env.ZOHO_CLIENT_SECRET!,
      grant_type: "refresh_token",
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  const { access_token, expires_in } = response.data;
  const expiresAt = new Date(Date.now() + expires_in * 1000);

  await prisma.zohoToken.updateMany({
    data: {
      accessToken: access_token,
      expiresAt,
      updatedAt: new Date(),
    },
  });

  return access_token;
}

async function getAccessToken(): Promise<string> {
  const tokenRecord = await prisma.zohoToken.findFirst({
    orderBy: { updatedAt: "desc" },
  });

  if (tokenRecord && tokenRecord.expiresAt > new Date(Date.now() + 60_000)) {
    return tokenRecord.accessToken;
  }

  const refreshToken =
    tokenRecord?.refreshToken ?? process.env.ZOHO_REFRESH_TOKEN!;

  if (!refreshToken) throw new Error("No Zoho refresh token available");

  return refreshAccessToken(refreshToken);
}

export interface EmailMessage {
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  htmlBody: string;
  textBody?: string;
  attachments?: Array<{ name: string; content: string; mimeType: string }>;
}

export async function sendEmail(message: EmailMessage): Promise<{ messageId: string }> {
  const accessToken = await getAccessToken();
  const accountId = process.env.ZOHO_ACCOUNT_ID!;

  const toList = Array.isArray(message.to)
    ? message.to.map((e) => ({ address: e }))
    : [{ address: message.to }];

  const payload: Record<string, unknown> = {
    fromAddress: process.env.ZOHO_FROM_EMAIL,
    toAddress: toList,
    subject: message.subject,
    content: message.htmlBody,
    mailFormat: "html",
  };

  if (message.cc) {
    payload.ccAddress = Array.isArray(message.cc)
      ? message.cc.map((e) => ({ address: e }))
      : [{ address: message.cc }];
  }

  const response = await axios.post(
    `${ZOHO_MAIL_API}/accounts/${accountId}/messages`,
    payload,
    {
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  return { messageId: response.data?.data?.messageId ?? "sent" };
}

export function buildContractExpiryEmail(vars: {
  clientName: string;
  contractNumber: string;
  assetNames: string;
  endDate: string;
  daysLeft: number;
  renewUrl: string;
}): { subject: string; htmlBody: string } {
  const subject = `Contract ${vars.contractNumber} expiring in ${vars.daysLeft} day(s)`;
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1d4ed8; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; }
    .footer { background: #1e3a8a; color: #94a3b8; padding: 16px; font-size: 12px; border-radius: 0 0 8px 8px; }
    .cta { display: inline-block; background: #dc2626; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin: 16px 0; }
    .alert { background: #fef3c7; border: 1px solid #f59e0b; padding: 12px; border-radius: 6px; margin: 12px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin:0">Smart Media Nepal</h2>
      <p style="margin:4px 0 0">Contract Renewal Reminder</p>
    </div>
    <div class="content">
      <p>Dear <strong>${vars.clientName}</strong>,</p>
      <div class="alert">
        ⚠️ Your advertising contract <strong>#${vars.contractNumber}</strong> expires in <strong>${vars.daysLeft} day(s)</strong> on <strong>${vars.endDate}</strong>.
      </div>
      <p><strong>Assets covered:</strong> ${vars.assetNames}</p>
      <p>To ensure uninterrupted advertising continuity, please renew your contract at the earliest.</p>
      <a href="${vars.renewUrl}" class="cta">Renew Contract Now</a>
      <p>Alternatively, reply to this email or contact us at <a href="mailto:info@smartmedia.com.np">info@smartmedia.com.np</a> or call <strong>+977-1-XXXXXXX</strong>.</p>
    </div>
    <div class="footer">
      <p>Smart Media Pvt. Ltd. | Kathmandu, Nepal | smartmedia.com.np</p>
      <p>You are receiving this as the designated contact for contract #${vars.contractNumber}.</p>
    </div>
  </div>
</body>
</html>`;
  return { subject, htmlBody };
}

export function buildPaymentReminderEmail(vars: {
  clientName: string;
  invoiceNumber: string;
  amount: string;
  dueDate: string;
  daysLeft: number;
  payUrl: string;
}): { subject: string; htmlBody: string } {
  const subject = `Payment Due: Invoice #${vars.invoiceNumber} – ${vars.daysLeft} day(s) remaining`;
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1d4ed8; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; }
    .footer { background: #1e3a8a; color: #94a3b8; padding: 16px; font-size: 12px; border-radius: 0 0 8px 8px; }
    .amount-box { background: white; border: 2px solid #1d4ed8; padding: 16px; border-radius: 8px; text-align: center; margin: 16px 0; }
    .cta { display: inline-block; background: #1d4ed8; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin: 16px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin:0">Smart Media Nepal</h2>
      <p style="margin:4px 0 0">Payment Reminder</p>
    </div>
    <div class="content">
      <p>Dear <strong>${vars.clientName}</strong>,</p>
      <p>This is a friendly reminder that the following invoice is due in <strong>${vars.daysLeft} day(s)</strong>:</p>
      <div class="amount-box">
        <p style="margin:0;font-size:14px;color:#666">Invoice #${vars.invoiceNumber}</p>
        <p style="margin:8px 0;font-size:28px;font-weight:bold;color:#1d4ed8">${vars.amount}</p>
        <p style="margin:0;color:#dc2626">Due: ${vars.dueDate}</p>
      </div>
      <a href="${vars.payUrl}" class="cta">View Invoice</a>
      <p>For payment methods or queries, contact <a href="mailto:accounts@smartmedia.com.np">accounts@smartmedia.com.np</a>.</p>
    </div>
    <div class="footer">
      <p>Smart Media Pvt. Ltd. | Kathmandu, Nepal | smartmedia.com.np</p>
    </div>
  </div>
</body>
</html>`;
  return { subject, htmlBody };
}
