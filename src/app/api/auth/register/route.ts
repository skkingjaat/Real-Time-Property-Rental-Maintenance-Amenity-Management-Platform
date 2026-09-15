// File: src/app/api/auth/register/route.ts

import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { registerSchema } from "@/lib/validations/auth";
import { registerUser } from "@/services/auth.service";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const validatedData = registerSchema.parse(body);

        const user = await registerUser(validatedData);

        return NextResponse.json(
            {
                success: true,
                message: "Registration successful.",
                data: user,
            },
            { status: 201 }
        );
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
                { status: 400 }
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