import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { z } from "zod";
import dbconnect from "@/app/helpers/dbconnect";
//validation schema
const createissueschema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(1000),
});

export async function POST(resquest: NextRequest) {
  const body = await resquest.json();
  const validation = createissueschema.safeParse(body);
  //check if validation is success
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  await dbconnect();
  //create new user using prisma
  const newuser = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(newuser, {status: 201 });
}
