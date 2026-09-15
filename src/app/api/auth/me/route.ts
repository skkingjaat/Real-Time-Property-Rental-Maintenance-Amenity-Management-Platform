// File: src/app/api/auth/me/route.ts

import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/current-user";

export async function GET() {
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

  return NextResponse.json(
    {
      success: true,
      message: "Authenticated user retrieved successfully.",
      data: currentUser,
    },
    { status: 200 }
  );
}