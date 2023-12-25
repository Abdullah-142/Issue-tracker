import { Issuebadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
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
        <Issuebadge status={issue.status} />
        <p>{issue.createdAt.toDateString()}</p>
      </Flex>
      <Card variant="surface" className="prose" my={"5"}>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
}
