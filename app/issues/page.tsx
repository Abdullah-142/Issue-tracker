import { Issuebadge, Link } from "@/app/components";
import Buttonaction from "@/app/issues/Buttonaction";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import { Metadata } from "next";
import Pagination from "../components/Pagination";
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
  const pageSize = 6;
  const issues = await prisma.issue.findMany({
    where,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <div>
      <Buttonaction />
      {issues.length !== 0 && (
        <Table.Root variant="surface" my={"4"}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Issues</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Created At
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                  <div className="block md:hidden">
                    <Issuebadge status={issue.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <Issuebadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
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
