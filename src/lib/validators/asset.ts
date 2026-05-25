import { z } from "zod";

export const assetSchema = z.object({
  name: z.string().min(2, "Asset name is required"),
  code: z.string().min(2, "Asset code is required").toUpperCase(),
  description: z.string().optional(),
  address: z.string().min(5, "Address is required"),
  city: z.string().default("Kathmandu"),
  district: z.string().default("Bagmati"),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
  format: z.enum([
    "STATIC_BILLBOARD",
    "DIGITAL_SCREEN",
    "STREET_FURNITURE",
    "TRANSIT",
    "MALL",
    "AIRPORT",
    "UNIPOLE",
  ]),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
  unit: z.string().default("ft"),
  illumination: z
    .enum(["FRONT_LIT", "BACK_LIT", "DIGITAL", "NON_ILLUMINATED"])
    .default("NON_ILLUMINATED"),
  status: z.enum(["VACANT", "BOOKED", "MAINTENANCE", "COMING_SOON"]).default("VACANT"),
  monthlyRate: z.number().positive("Monthly rate must be positive"),
  dailyImpressions: z.number().int().positive().optional(),
  photoUrls: z.array(z.string()).default([]),
  specs: z.string().optional(),
  productionNotes: z.string().optional(),
});

export type AssetInput = z.infer<typeof assetSchema>;
