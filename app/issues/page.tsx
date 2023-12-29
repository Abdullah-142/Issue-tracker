import { Link, Issuebadge } from "@/app/components";
import Buttonaction from "@/app/issues/Buttonaction";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
interface Props {
  searchParams: { status: Status };
}
async function IssuePage({ searchParams }: Props) {
  const statuss = Object.values(Status);
  const status = statuss.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
  });

  return (
    <div>
      <Buttonaction />
      {issues.length !== 0 && (
        <Table.Root variant="surface">
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
            {issues
              .map((issue) => (
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
              ))
              .reverse()}
          </Table.Body>
        </Table.Root>
      )}
    </div>
  );
}

export const dynamic = "force-dynamic";

export default IssuePage;
