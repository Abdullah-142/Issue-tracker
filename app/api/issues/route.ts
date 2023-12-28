import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import dbconnect from "@/app/helpers/dbconnect";
import { issueschema } from "@/app/validationschema";
import { getServerSession } from "next-auth";
import { AuthOption } from "@/app/auth/AuthOption";

export async function POST(resquest: NextRequest) {
  const session = await getServerSession(AuthOption);
  //check if user is authenticated
  if (!session) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }
  const body = await resquest.json();
  const validation = issueschema.safeParse(body);
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
  return NextResponse.json(newuser, { status: 201 });
}
