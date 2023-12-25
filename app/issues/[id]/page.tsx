import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Card, Flex, Text } from "@radix-ui/themes";
import IssueBadge from "@/app/components/IssueBadge";
interface Props {
  params: { id: string };
}
export default async function Detailissuepage({ params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({ where: { id: id } });
  if (!issue) notFound();
  return (
    <div className="space-y-3">
      <Text size={"5"} className="font-medium">
        {issue.title}
      </Text>
      <Flex gap={"3"}>
        <IssueBadge status={issue.status} />
        <p>{issue.createdAt.toDateString()}</p>
      </Flex>
      <Card variant="surface" my={"5"}>
        <p>{issue.description}</p>
      </Card>
    </div>
  );
}
