"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";

export default function IssueStatusFilter() {
  const Status: { label: string; value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSE" },
  ];

  return (
    <Select.Root>
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
