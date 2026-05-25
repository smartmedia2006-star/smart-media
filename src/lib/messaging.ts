import { sendWhatsApp, interpolateTemplate, formatWhatsAppNumber } from "@/lib/whatsapp";
import { sendTelegram } from "@/lib/telegram";
import { sendEmail } from "@/lib/zohoMail";
import { prisma } from "@/lib/prisma";
import { MessageChannel, MessageStatus, PreferredChannel } from "@prisma/client";

export interface SendMessageParams {
  clientId: string;
  contractId?: string;
  channel: MessageChannel;
  recipient: string;
  subject?: string;
  body: string;
  sentById?: string;
  variables?: Record<string, string>;
}

export async function sendMessage(params: SendMessageParams): Promise<string> {
  const { clientId, contractId, channel, recipient, subject, body, sentById, variables } = params;
  const content = variables ? interpolateTemplate(body, variables) : body;
  const subjectInterp = subject && variables ? interpolateTemplate(subject, variables) : subject;

  const log = await prisma.messageLog.create({
    data: {
      clientId,
      contractId,
      channel,
      recipient,
      subject: subjectInterp,
      messageContent: content,
      status: "PENDING",
      sentById,
    },
  });

  try {
    let externalId: string | undefined;

    switch (channel) {
      case "WHATSAPP": {
        const phone = formatWhatsAppNumber(recipient);
        const result = await sendWhatsApp({ to: phone, body: content });
        externalId = result.sid;
        break;
      }
      case "TELEGRAM": {
        const result = await sendTelegram({ chatId: recipient, text: content });
        externalId = String(result.messageId);
        break;
      }
      case "EMAIL": {
        const result = await sendEmail({
          to: recipient,
          subject: subjectInterp ?? "Message from Smart Media",
          htmlBody: content,
        });
        externalId = result.messageId;
        break;
      }
    }

    await prisma.messageLog.update({
      where: { id: log.id },
      data: {
        status: "SENT",
        sentAt: new Date(),
        externalId,
      },
    });

    return log.id;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    await prisma.messageLog.update({
      where: { id: log.id },
      data: {
        status: "FAILED",
        errorMessage,
      },
    });
    throw err;
  }
}

export async function sendToClient(params: {
  clientId: string;
  contractId?: string;
  subject?: string;
  body: string;
  sentById?: string;
  variables?: Record<string, string>;
}): Promise<void> {
  const client = await prisma.client.findUnique({ where: { id: params.clientId } });
  if (!client) throw new Error("Client not found");

  const channels = getChannelsForPreference(client.preferredChannel);

  await Promise.allSettled(
    channels.map((channel) => {
      const recipient = getRecipientForChannel(client, channel);
      if (!recipient) return Promise.resolve();
      return sendMessage({ ...params, channel, recipient });
    })
  );
}

function getChannelsForPreference(pref: PreferredChannel): MessageChannel[] {
  switch (pref) {
    case "WHATSAPP": return ["WHATSAPP"];
    case "TELEGRAM": return ["TELEGRAM"];
    case "EMAIL": return ["EMAIL"];
    case "ALL": return ["EMAIL", "WHATSAPP", "TELEGRAM"];
  }
}

function getRecipientForChannel(
  client: { email: string; phone: string; countryCode: string; telegramChatId: string | null },
  channel: MessageChannel
): string | null {
  switch (channel) {
    case "EMAIL": return client.email;
    case "WHATSAPP": return `${client.countryCode}${client.phone.replace(/\D/g, "")}`;
    case "TELEGRAM": return client.telegramChatId;
    default: return null;
  }
}
