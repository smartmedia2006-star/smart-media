import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const FROM = process.env.TWILIO_WHATSAPP_FROM || "whatsapp:+14155238886";

export interface WhatsAppMessage {
  to: string;
  body: string;
  mediaUrl?: string;
}

export async function sendWhatsApp({
  to,
  body,
  mediaUrl,
}: WhatsAppMessage): Promise<{ sid: string; status: string }> {
  const toNumber = to.startsWith("whatsapp:") ? to : `whatsapp:${to}`;

  const params: Parameters<typeof client.messages.create>[0] = {
    from: FROM,
    to: toNumber,
    body,
  };

  if (mediaUrl) {
    params.mediaUrl = [mediaUrl];
  }

  const message = await client.messages.create(params);

  return { sid: message.sid, status: message.status };
}

export function formatWhatsAppNumber(phone: string, countryCode = "+977"): string {
  const cleaned = phone.replace(/\D/g, "");
  if (phone.startsWith("+")) return phone;
  if (phone.startsWith("00")) return "+" + cleaned.slice(2);
  if (countryCode) return countryCode + cleaned;
  return "+" + cleaned;
}

export function interpolateTemplate(
  template: string,
  variables: Record<string, string>
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => variables[key] ?? `{{${key}}}`);
}
