// File: src/lib/validations/maintenance-request.ts

import { z } from "zod";

export const createMaintenanceRequestSchema = z.object({
  propertyId: z
    .string()
    .trim()
    .min(1, "Property ID is required."),

  issueDescription: z
    .string()
    .trim()
    .min(5, "Issue description must be at least 5 characters long.")
    .max(
      1000,
      "Issue description must not exceed 1000 characters."
    ),
});

export const updateMaintenanceStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "IN_PROGRESS",
    "COMPLETED",
  ]),
});

export type CreateMaintenanceRequestInput = z.infer<
  typeof createMaintenanceRequestSchema
>;

export type UpdateMaintenanceStatusInput = z.infer<
  typeof updateMaintenanceStatusSchema
>;