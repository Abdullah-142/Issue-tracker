import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import dbconnect from "@/app/helpers/dbconnect";
import { issueschema } from "@/app/validationschema";

export async function PATCH(
  resquest: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await resquest.json();
  const validation = issueschema.safeParse(body);
  //check if validation is success
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  await dbconnect();
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
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  resquest: NextRequest,
  { params }: { params: { id: string } }
) {
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
