import React from "react";
import LastestIssue from "./LastestIssue";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSE" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  return (
    <div>
      <IssueSummary open={open} closed={closed} inProgress={inProgress} />
    </div>
  );
}
