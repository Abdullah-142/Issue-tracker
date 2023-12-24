import prisma from "@/prisma/client";

export default async function dbconnect() {
  try {
    await prisma.$connect();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
