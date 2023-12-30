import { Issuebadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Flex, Card, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

export default function Details({ issue }: { issue: Issue }) {
  return (
    <>
      <Text size={"5"} className="font-medium">
        {issue.title}
      </Text>
      <Flex gap={"3"} mt={"2"}>
        <Issuebadge status={issue.status} />
        <p>{issue.createdAt.toDateString()}</p>
      </Flex>
      <Card className="prose max-w-full" mt={"4"}>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
}


