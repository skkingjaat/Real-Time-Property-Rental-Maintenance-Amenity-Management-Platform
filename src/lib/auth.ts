// File: src/lib/auth.ts

import { SignJWT, jwtVerify } from "jose";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined.");
}

const secret = new TextEncoder().encode(jwtSecret);

export type AuthTokenPayload = {
    userId: string;
    role: "TENANT" | "OWNER" | "STAFF";
};

export async function createAuthToken(payload: AuthTokenPayload) {
    return new SignJWT({
        role: payload.role,
    })
        .setProtectedHeader({
            alg: "HS256",
        })
        .setSubject(payload.userId)
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(secret);
}

export async function verifyAuthToken(token: string) {
    const { payload } = await jwtVerify(token, secret);

    if (
        typeof payload.sub !== "string" ||
        (payload.role !== "TENANT" &&
            payload.role !== "OWNER" &&
            payload.role !== "STAFF")
    ) {
        throw new Error("Invalid authentication token.");
    }

    return {
        userId: payload.sub,
        role: payload.role,
    } as AuthTokenPayload;
}