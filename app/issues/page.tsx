import { prisma } from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import { Link, IssuesStatusBadge } from "@/app/components";
import NextLink from "next/link";
import IssuesToolBar from "./IssuesToolBar";
import { Issue, Status } from "@prisma/client";
import IssuesSortingButton from "./IssuesSorting";
import Pagination from "../components/Pagination";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    order: "asc" | "desc";
    page: string;
  };
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
  const validatedOrderBy = columns
    .map((column) => column.value)
    .includes(resolvedSearchParams.orderBy as keyof Issue)
    ? (resolvedSearchParams.orderBy as keyof Issue)
    : "createdAt"; // Default sorting column

  const validatedOrder = ["asc", "desc"].includes(
    resolvedSearchParams.order as "asc" | "desc"
  )
    ? (resolvedSearchParams.order as "asc" | "desc")
    : "desc"; // Default sorting direction

  const statuses = Object.values(Status);
  const validStatus = statuses.includes(resolvedSearchParams.status)
    ? resolvedSearchParams.status
    : undefined;

  const pageSize = 10;

  const itemCount = await prisma.issue.count({
    where: { status: validStatus },
  });
  const pageCount = Math.ceil(itemCount / pageSize);
  const currentPage = Math.min(
    pageCount,
    parseInt(resolvedSearchParams.page) || 1
  );
  const issues = await prisma.issue.findMany({
    where: { status: validStatus },
    orderBy: { [validatedOrderBy]: validatedOrder },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  return (
    <Flex direction="column">
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
                    query: {
                      ...resolvedSearchParams,
                      orderBy: column.value,
                      order: validatedOrder === "asc" ? "desc" : "asc",
                    },
                  }}
                >
                  {column.label}
                </NextLink>
                {resolvedSearchParams.orderBy === column.value && (
                  <IssuesSortingButton
                    column={column.value}
                    currentOrder={validatedOrder}
                  />
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
      <Pagination currentPage={currentPage} pageCount={pageCount} />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
