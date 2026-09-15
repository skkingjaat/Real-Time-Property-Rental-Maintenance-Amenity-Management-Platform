// File: prisma/seed.ts

import "dotenv/config";

import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined.");
}

const adapter = new PrismaPg({
  connectionString,
});



const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const passwordHash = await bcrypt.hash("owner123", 12);

  const owner = await prisma.user.upsert({
    where: {
      email: "owner001@example.com",
    },
    update: {
      role: "OWNER",
    },
    create: {
      name: "Test Owner",
      email: "owner001@example.com",
      password: passwordHash,
      role: "OWNER",
    },
  });

  console.log("Test owner created/updated:", {
    id: owner.id,
    name: owner.name,
    email: owner.email,
    role: owner.role,
  });
}

main()
  .catch((error) => {
    console.error("Seed error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });