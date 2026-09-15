// File: src/lib/validations/property.ts

import { z } from "zod";

export const createPropertySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Property name must be at least 2 characters long.")
    .max(100, "Property name must not exceed 100 characters."),

  address: z
    .string()
    .trim()
    .min(5, "Property address must be at least 5 characters long.")
    .max(255, "Property address must not exceed 255 characters."),
});

export const updatePropertySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Property name must be at least 2 characters long.")
      .max(100, "Property name must not exceed 100 characters.")
      .optional(),

    address: z
      .string()
      .trim()
      .min(5, "Property address must be at least 5 characters long.")
      .max(255, "Property address must not exceed 255 characters.")
      .optional(),
  })
  .refine(
    (data) => data.name !== undefined || data.address !== undefined,
    {
      message: "At least one property field must be provided for update.",
    }
  );

export type CreatePropertyInput = z.infer<
  typeof createPropertySchema
>;

export type UpdatePropertyInput = z.infer<
  typeof updatePropertySchema
>;