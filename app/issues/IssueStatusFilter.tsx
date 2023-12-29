"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

export default function IssueStatusFilter() {
  const route = useRouter();
  const Status: { label: string; value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "closed", value: "CLOSE" },
  ];

  return (
    <Select.Root
      onValueChange={(value) =>
        route.push(value === "default" ? "/issues" : `/issues?status=${value}`)
      }
    >
      <Select.Trigger placeholder="Filter By status" />
      <Select.Content>
        {Status.map((status) => (
          <Select.Item
            key={status.label}
            value={status.value || "default"}
            className="text-sm"
          >
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
