import { Issuebadge, Link } from "@/app/components";
import Buttonaction from "@/app/issues/Buttonaction";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import { Metadata } from "next";
import Pagination from "../components/Pagination";
import IssueData from "./IssueData";
interface Props {
  searchParams: { status: Status; page: string };
}
async function IssuePage({ searchParams }: Props) {
  const statuss = Object.values(Status);
  const status = statuss.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 7;
  const issues = await prisma.issue.findMany({
    where,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <div>
      <Buttonaction />
      {issues.length !== 0 && <IssueData issues={issues} />}
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        itemCount={issueCount}
      />
    </div>
  );
}
export const metadata: Metadata = {
  title: "Issue Tracker - Issues List",
  description: "View all issues",
};
export const dynamic = "force-dynamic";

export default IssuePage;
