import { Table } from "@radix-ui/themes";
import Link from "next/link";
import { IssuesStatusBadge } from "../components";
import IssuesSortingButton from "./IssuesSorting";
import NextLink from "next/link";
import { Status, Issue } from "@prisma/client";

export interface IssueQuery {
  status: Status | undefined;
  orderBy: keyof Issue;
  order: "asc" | "desc";
  page: string;
}

interface Props {
  resolvedSearchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ resolvedSearchParams, issues }: Props) => {
  return (
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
                    order:
                      resolvedSearchParams.order === "asc" ? "desc" : "asc",
                  },
                }}
              >
                {column.label}
              </NextLink>
              {resolvedSearchParams.orderBy === column.value && (
                <IssuesSortingButton
                  column={column.value}
                  currentOrder={resolvedSearchParams.order}
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
  );
};

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  {
    label: "Date Created",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
