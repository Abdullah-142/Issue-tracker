import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
interface Props {
  params: { id: string };
}
export default async function Detailissuepage({ params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({ where: { id: id } });
  if (!issue) notFound();
  return (
    <div>
      <h1>Issue {parseInt(id)}</h1>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  );
}
