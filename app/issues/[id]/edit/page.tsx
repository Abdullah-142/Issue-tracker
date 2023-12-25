import React from "react";
import prisma from "@/prisma/client";
import FormData from "../../_component/FromData";
import { notFound } from "next/navigation";
interface Props {
  params: { id: string };
}

export default async function EditIssuePage({ params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({ where: { id: id } });
  if (!issue) notFound();

  return (
    <div>
      <FormData issue={issue} />
    </div>
  );
}
