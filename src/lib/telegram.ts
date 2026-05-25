import axios from "axios";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

export interface TelegramMessage {
  chatId: string;
  text: string;
  parseMode?: "HTML" | "Markdown" | "MarkdownV2";
  disableWebPagePreview?: boolean;
}

export async function sendTelegram({
  chatId,
  text,
  parseMode = "HTML",
  disableWebPagePreview = true,
}: TelegramMessage): Promise<{ messageId: number; status: string }> {
  const response = await axios.post(`${API_BASE}/sendMessage`, {
    chat_id: chatId,
    text,
    parse_mode: parseMode,
    disable_web_page_preview: disableWebPagePreview,
  });

  if (!response.data.ok) {
    throw new Error(`Telegram API error: ${response.data.description}`);
  }

  return {
    messageId: response.data.result.message_id,
    status: "sent",
  };
}

export async function sendTelegramDocument({
  chatId,
  documentUrl,
  caption,
}: {
  chatId: string;
  documentUrl: string;
  caption?: string;
}): Promise<void> {
  await axios.post(`${API_BASE}/sendDocument`, {
    chat_id: chatId,
    document: documentUrl,
    caption,
  });
}

export async function getBotInfo(): Promise<{ id: number; username: string; name: string }> {
  const response = await axios.get(`${API_BASE}/getMe`);
  if (!response.data.ok) throw new Error("Failed to get bot info");
  const bot = response.data.result;
  return { id: bot.id, username: bot.username, name: bot.first_name };
}

export function formatTelegramHTML(message: string): string {
  return message
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .replace(/\*(.*?)\*/g, "<i>$1</i>")
    .replace(/`(.*?)`/g, "<code>$1</code>");
}
