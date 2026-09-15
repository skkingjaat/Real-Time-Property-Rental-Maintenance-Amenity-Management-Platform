// File: src/app/api/amenities/[id]/route.ts

import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/current-user";
import { getAmenityById } from "@/services/amenity.service";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required.",
        },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    const amenity = await getAmenityById(id);

    if (!amenity) {
      return NextResponse.json(
        {
          success: false,
          message: "Amenity not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Amenity retrieved successfully.",
        data: amenity,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get amenity by ID error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to retrieve amenity.",
      },
      { status: 500 }
    );
  }
}