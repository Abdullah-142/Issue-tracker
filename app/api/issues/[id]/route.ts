import { AuthOption } from "@/app/auth/AuthOption";
import dbconnect from "@/app/helpers/dbconnect";
import { Patchissueschema } from "@/app/validationschema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
export async function PATCH(
  resquest: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(AuthOption);
  // check if user is authenticated
  // if (!session) {
  //   return NextResponse.json("Unauthorized", { status: 401 });
  // }
  const body = await resquest.json();
  const validation = Patchissueschema.safeParse(body);
  //check if validation is success
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }


  const { assignToUserId, title, description } = body;

  if (assignToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignToUserId },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  }

  //create new user using prisma
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });

  if (!issue) {
    return NextResponse.json({ message: "Issue not found" }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: params.id },
    data: {
      title,
      description,
      assignToUserId,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  resquest: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(AuthOption);
  if (!session) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }
  try {
    await dbconnect();
    //create new user using prisma
    const issue = await prisma.issue.findUnique({
      where: { id: params.id },
    });
    if (!issue) {
      return NextResponse.json({ message: "Issue not found" }, { status: 404 });
    }
    await prisma.issue.delete({ where: { id: issue.id } });
    return NextResponse.json({ message: "Deleteted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
