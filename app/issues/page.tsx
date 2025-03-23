import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { Link, IssuesStatusBadge } from "@/app/components";
import NextLink from "next/link";
import IssuesToolBar from "./IssuesToolBar";
import { Issue, Status } from "@prisma/client";
import IssuesSortingButton from "./IssuesSorting";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue };
}

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  {
    label: "Date Created",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

const IssuesPage = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;
  const statuses = Object.values(Status);
  const status = statuses.includes(resolvedSearchParams.status)
    ? resolvedSearchParams.status
    : undefined;
  const issues = await prisma.issue.findMany({
    where: { status: status },
  });

  return (
    <div>
      <IssuesToolBar />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: { ...resolvedSearchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {resolvedSearchParams.orderBy === column.value && (
                  <IssuesSortingButton />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssuesStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssuesStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
