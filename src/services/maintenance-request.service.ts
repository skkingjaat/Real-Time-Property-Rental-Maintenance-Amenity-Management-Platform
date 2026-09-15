// File: src/services/maintenance-request.service.ts

import { prisma } from "@/lib/prisma";

import type {
  CreateMaintenanceRequestInput,
  UpdateMaintenanceStatusInput,
} from "@/lib/validations/maintenance-request";

export async function createMaintenanceRequest(
  input: CreateMaintenanceRequestInput
) {
  const property = await prisma.property.findUnique({
    where: {
      id: input.propertyId,
    },
  });

  if (!property) {
    return null;
  }

  const maintenanceRequest =
    await prisma.maintenanceRequest.create({
      data: {
        propertyId: input.propertyId,
        issueDescription: input.issueDescription,
      },
    });

  return maintenanceRequest;
}

export async function getMaintenanceRequests() {
  const maintenanceRequests =
    await prisma.maintenanceRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  return maintenanceRequests;
}

export async function getMaintenanceRequestById(
  maintenanceRequestId: string
) {
  const maintenanceRequest =
    await prisma.maintenanceRequest.findUnique({
      where: {
        id: maintenanceRequestId,
      },
    });

  return maintenanceRequest;
}

export async function updateMaintenanceStatus(
  maintenanceRequestId: string,
  input: UpdateMaintenanceStatusInput
) {
  const maintenanceRequest =
    await prisma.maintenanceRequest.findUnique({
      where: {
        id: maintenanceRequestId,
      },
    });

  if (!maintenanceRequest) {
    return {
      type: "NOT_FOUND" as const,
    };
  }

  const currentStatus = maintenanceRequest.status;
  const nextStatus = input.status;

  const validTransition =
    (currentStatus === "PENDING" &&
      nextStatus === "IN_PROGRESS") ||
    (currentStatus === "IN_PROGRESS" &&
      nextStatus === "COMPLETED");

  if (!validTransition) {
    return {
      type: "INVALID_TRANSITION" as const,
      currentStatus,
      nextStatus,
    };
  }

  const updatedMaintenanceRequest =
    await prisma.maintenanceRequest.update({
      where: {
        id: maintenanceRequestId,
      },
      data: {
        status: nextStatus,
        resolutionDate:
          nextStatus === "COMPLETED"
            ? new Date()
            : null,
      },
    });

  return {
    type: "SUCCESS" as const,
    data: updatedMaintenanceRequest,
  };
}



// File: src/services/maintenance-request.service.ts

export async function getMaintenanceOverview() {
  const [
    totalRequests,
    pendingRequests,
    inProgressRequests,
    completedRequests,
  ] = await Promise.all([
    prisma.maintenanceRequest.count(),

    prisma.maintenanceRequest.count({
      where: {
        status: "PENDING",
      },
    }),

    prisma.maintenanceRequest.count({
      where: {
        status: "IN_PROGRESS",
      },
    }),

    prisma.maintenanceRequest.count({
      where: {
        status: "COMPLETED",
      },
    }),
  ]);

  return {
    totalRequests,
    pendingRequests,
    inProgressRequests,
    completedRequests,
  };
}