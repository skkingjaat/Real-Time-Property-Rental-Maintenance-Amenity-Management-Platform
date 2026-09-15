// File: src/app/api/auth/login/route.ts

import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { loginSchema } from "@/lib/validations/auth";
import { loginUser } from "@/services/auth.service";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const validatedData = loginSchema.parse(body);

        const result = await loginUser(validatedData);

        const response = NextResponse.json(
            {
                success: true,
                message: "Login successful.",
                data: result.user,
            },
            { status: 200 }
        );

        response.cookies.set({
            name: "auth_token",
            value: result.token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Validation failed.",
                    errors: error.issues,
                },
                { status: 400 }
            );
        }

        if (error instanceof Error) {
            return NextResponse.json(
                {
                    success: false,
                    message: error.message,
                },
                { status: 401 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: "Internal server error.",
            },
            { status: 500 }
        );
    }
}