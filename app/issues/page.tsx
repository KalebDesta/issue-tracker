import { prisma } from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import Pagination from "../components/Pagination";
import IssuesToolBar from "./IssuesToolBar";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Metadata } from "next";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    order: "asc" | "desc";
    page: string;
  };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;
  const validatedOrderBy = columnNames.includes(
    resolvedSearchParams.orderBy as keyof Issue
  )
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
  const finalParams: IssueQuery = {
    order: validatedOrder,
    status: validStatus,
    orderBy: validatedOrderBy,
    page: currentPage.toString(),
  };
  return (
    <Flex direction="column" gap="3">
      <IssuesToolBar />
      <IssueTable resolvedSearchParams={finalParams} issues={issues} />
      <Pagination currentPage={currentPage} pageCount={pageCount} />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issues List",
  description: "View a list of all project issues",
};

export default IssuesPage;
