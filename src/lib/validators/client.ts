import { z } from "zod";

export const clientSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  brandName: z.string().optional(),
  contactPerson: z.string().min(2, "Contact person name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number is required"),
  countryCode: z.string().default("+977"),
  telegramChatId: z.string().optional(),
  preferredChannel: z.enum(["WHATSAPP", "TELEGRAM", "EMAIL", "ALL"]).default("EMAIL"),
  address: z.string().optional(),
  city: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  gstVat: z.string().optional(),
  notes: z.string().optional(),
});

export type ClientInput = z.infer<typeof clientSchema>;
