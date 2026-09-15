// File: src/services/property.service.ts

import { prisma } from "@/lib/prisma";

import type {
  CreatePropertyInput,
  UpdatePropertyInput,
} from "@/lib/validations/property";

export async function createProperty(
  input: CreatePropertyInput,
  ownerId: string
) {
  const property = await prisma.property.create({
    data: {
      name: input.name,
      address: input.address,
      ownerId,
    },
  });

  return property;
}

export async function getOwnerProperties(ownerId: string) {
  const properties = await prisma.property.findMany({
    where: {
      ownerId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return properties;
}

export async function getOwnerPropertyById(
  propertyId: string,
  ownerId: string
) {
  const property = await prisma.property.findFirst({
    where: {
      id: propertyId,
      ownerId,
    },
  });

  return property;
}

export async function updateOwnerProperty(
  propertyId: string,
  ownerId: string,
  input: UpdatePropertyInput
) {
  const existingProperty = await prisma.property.findFirst({
    where: {
      id: propertyId,
      ownerId,
    },
  });

  if (!existingProperty) {
    return null;
  }

  const updatedProperty = await prisma.property.update({
    where: {
      id: existingProperty.id,
    },
    data: input,
  });

  return updatedProperty;
}



// File: src/services/property.service.ts

export async function deleteOwnerProperty(
  propertyId: string,
  ownerId: string
) {
  const existingProperty = await prisma.property.findFirst({
    where: {
      id: propertyId,
      ownerId,
    },
  });

  if (!existingProperty) {
    return null;
  }

  const deletedProperty = await prisma.property.delete({
    where: {
      id: existingProperty.id,
    },
  });

  return deletedProperty;
} 