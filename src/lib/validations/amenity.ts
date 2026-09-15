// File: src/lib/validations/amenity.ts

import { z } from "zod";

export const createAmenitySchema = z.object({
  propertyId: z
    .string()
    .trim()
    .min(1, "Property ID is required."),

  name: z
    .string()
    .trim()
    .min(2, "Amenity name must be at least 2 characters long.")
    .max(
      100,
      "Amenity name must not exceed 100 characters."
    ),
});

export type CreateAmenityInput = z.infer<
  typeof createAmenitySchema
>;