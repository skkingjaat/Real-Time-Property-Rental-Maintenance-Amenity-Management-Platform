// File: src/services/amenity.service.ts

import { prisma } from "@/lib/prisma";

import type {
  CreateAmenityInput,
} from "@/lib/validations/amenity";

export async function createAmenity(
  input: CreateAmenityInput
) {
  const property = await prisma.property.findUnique({
    where: {
      id: input.propertyId,
    },
  });

  if (!property) {
    return null;
  }

  const amenity = await prisma.amenity.create({
    data: {
      propertyId: input.propertyId,
      name: input.name,
    },
  });

  return amenity;
}

export async function getAmenities() {
  const amenities = await prisma.amenity.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return amenities;
}

export async function getAmenityById(
  amenityId: string
) {
  const amenity = await prisma.amenity.findUnique({
    where: {
      id: amenityId,
    },
  });

  return amenity;
}