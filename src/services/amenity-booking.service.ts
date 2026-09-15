// File: src/services/amenity-booking.service.ts

import { prisma } from "@/lib/prisma";

import type {
  CreateAmenityBookingInput,
} from "@/lib/validations/amenity-booking";

function buildDateTime(
  bookingDate: string,
  time: string
) {
  const date = new Date(`${bookingDate}T${time}:00`);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

export async function createAmenityBooking(
  userId: string,
  input: CreateAmenityBookingInput
) {
  const amenity = await prisma.amenity.findUnique({
    where: {
      id: input.amenityId,
    },
  });

  if (!amenity) {
    return {
      type: "NOT_FOUND" as const,
    };
  }

  if (amenity.availabilityStatus !== "AVAILABLE") {
    return {
      type: "UNAVAILABLE" as const,
    };
  }

  const checkInTime = buildDateTime(
    input.bookingDate,
    input.checkInTime
  );

  const checkOutTime = buildDateTime(
    input.bookingDate,
    input.checkOutTime
  );

  if (!checkInTime || !checkOutTime) {
    return {
      type: "INVALID_TIME" as const,
    };
  }

  if (checkInTime >= checkOutTime) {
    return {
      type: "INVALID_TIME_RANGE" as const,
    };
  }

  const conflictingBooking =
    await prisma.amenityBooking.findFirst({
      where: {
        amenityId: input.amenityId,
        checkInTime: {
          lt: checkOutTime,
        },
        checkOutTime: {
          gt: checkInTime,
        },
      },
    });

  if (conflictingBooking) {
    return {
      type: "CONFLICT" as const,
    };
  }

  const booking = await prisma.amenityBooking.create({
    data: {
      amenityId: input.amenityId,
      userId,
      bookingDate: new Date(`${input.bookingDate}T00:00:00`),
      checkInTime,
      checkOutTime,
    },
  });

  return {
    type: "SUCCESS" as const,
    data: booking,
  };
}


// File: src/services/amenity-booking.service.ts

export async function getAmenityBookings() {
  const bookings = await prisma.amenityBooking.findMany({
    orderBy: {
      checkInTime: "asc",
    },
  });

  return bookings;
}


// File: src/services/amenity-booking.service.ts

export async function getAmenityBookingById(
  bookingId: string
) {
  const booking = await prisma.amenityBooking.findUnique({
    where: {
      id: bookingId,
    },
  });

  return booking;
}


// File: src/services/amenity-booking.service.ts

export async function checkInAmenityBooking(
  bookingId: string,
  userId: string
) {
  const booking = await prisma.amenityBooking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    return {
      type: "NOT_FOUND" as const,
    };
  }

  if (booking.userId !== userId) {
    return {
      type: "FORBIDDEN" as const,
    };
  }

  if (booking.checkedInAt) {
    return {
      type: "ALREADY_CHECKED_IN" as const,
    };
  }

  const updatedBooking =
    await prisma.amenityBooking.update({
      where: {
        id: bookingId,
      },
      data: {
        checkedInAt: new Date(),
      },
    });

  return {
    type: "SUCCESS" as const,
    data: updatedBooking,
  };
}


// File: src/services/amenity-booking.service.ts

export async function checkOutAmenityBooking(
  bookingId: string,
  userId: string
) {
  const booking = await prisma.amenityBooking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    return {
      type: "NOT_FOUND" as const,
    };
  }

  if (booking.userId !== userId) {
    return {
      type: "FORBIDDEN" as const,
    };
  }

  if (!booking.checkedInAt) {
    return {
      type: "NOT_CHECKED_IN" as const,
    };
  }

  if (booking.checkedOutAt) {
    return {
      type: "ALREADY_CHECKED_OUT" as const,
    };
  }

  const updatedBooking =
    await prisma.amenityBooking.update({
      where: {
        id: bookingId,
      },
      data: {
        checkedOutAt: new Date(),
      },
    });

  return {
    type: "SUCCESS" as const,
    data: updatedBooking,
  };
}


// File: src/services/amenity-booking.service.ts

export async function getAmenityUsageOverview() {
  const [
    totalBookings,
    checkedInBookings,
    checkedOutBookings,
  ] = await Promise.all([
    prisma.amenityBooking.count(),

    prisma.amenityBooking.count({
      where: {
        checkedInAt: {
          not: null,
        },
      },
    }),

    prisma.amenityBooking.count({
      where: {
        checkedOutAt: {
          not: null,
        },
      },
    }),
  ]);

  return {
    totalBookings,
    checkedInBookings,
    checkedOutBookings,
  };
}