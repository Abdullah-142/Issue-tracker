import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueBadge from "./components/IssueBadge";

export default async function LastestIssue() {
  const issues: Issue[] = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      assignToUser: true,
    },
  });
  return (
    <Card>
      <Heading mb={"4"}>Lastest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify={"between"} align={"center"}>
                  <Flex direction={"column"} align={"start"} gap={"2"}>
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueBadge status={issue.status} />
                  </Flex>            
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
}
