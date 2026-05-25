import { z } from "zod";

export const contractSchema = z.object({
  clientId: z.string().min(1, "Client is required"),
  assetIds: z.array(z.string()).min(1, "At least one asset is required"),
  startDate: z.string().refine((d) => !isNaN(Date.parse(d)), "Invalid start date"),
  endDate: z.string().refine((d) => !isNaN(Date.parse(d)), "Invalid end date"),
  totalValue: z.number().positive("Value must be positive"),
  paymentTerms: z.string().optional(),
  signedDocUrl: z.string().url().optional().or(z.literal("")),
  status: z
    .enum(["DRAFT", "ACTIVE", "EXPIRED", "TERMINATED", "PENDING_RENEWAL"])
    .default("DRAFT"),
  notes: z.string().optional(),
}).refine((d) => new Date(d.endDate) > new Date(d.startDate), {
  message: "End date must be after start date",
  path: ["endDate"],
});

export type ContractInput = z.infer<typeof contractSchema>;
