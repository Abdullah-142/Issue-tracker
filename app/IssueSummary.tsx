import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
interface Props {
  open: number;
  closed: number;
  inProgress: number;
}
export default function IssueSummary({ open, closed, inProgress }: Props) {
  const container: { lable: string; value: number; status: Status }[] = [
    {
      lable: "Open issue",
      value: open,
      status: "OPEN",
    },
    {
      lable: "Closed issue",
      value: closed,
      status: "CLOSE",
    },
    {
      lable: "In Progress issue",
      value: inProgress,
      status: "IN_PROGRESS",
    },
  ];
  return (
    <Flex gap={'3'}>
      {container.map((item) => (
        <Card key={item.lable}>
          <Flex direction="column" gap="1">
            <Link className="text-sm font-medium" href={`/issues?status=${item.status}`}>{item.lable}</Link>
            <Text size={'5'} className="font-bold">{item.value}</Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}
