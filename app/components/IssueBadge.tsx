import React from "react";
import { Badge } from "@radix-ui/themes";
import { Status } from "@prisma/client";

const statusMap: Record<
  Status,
  { lable: string; color: "red" | "yellow" | "green" }
> = {
  OPEN: { lable: "Open", color: "red" },
  IN_PROGRESS: { lable: "In Progress", color: "yellow" },
  CLOSE: { lable: "Closed", color: "green" },
};

function IssueBadge({ status }: { status: Status }) {
  return (
    <div>
      <Badge size={"1"} color={statusMap[status].color}>
        {statusMap[status].lable}
      </Badge>
    </div>
  );
}

export default IssueBadge;
