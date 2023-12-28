import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
export async function GET(resquest: NextRequest) {
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });
  if (users.length === 0) {
    return NextResponse.json('User not found', {status: 404 });
  }

  return NextResponse.json(users, { status: 200 });
}
