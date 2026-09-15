// File: src/lib/validations/amenity-booking.ts

import { z } from "zod";

export const createAmenityBookingSchema = z.object({
  amenityId: z
    .string()
    .trim()
    .min(1, "Amenity ID is required."),

  bookingDate: z
    .string()
    .trim()
    .min(1, "Booking date is required."),

  checkInTime: z
    .string()
    .trim()
    .min(1, "Check-in time is required."),

  checkOutTime: z
    .string()
    .trim()
    .min(1, "Check-out time is required."),
});

export type CreateAmenityBookingInput = z.infer<
  typeof createAmenityBookingSchema
>;