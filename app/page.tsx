import { prisma } from "@/prisma/client";
import IssueSummary, { SummaryProp } from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueGraphs from "./IssueGraphs";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const InProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({
    where: { status: "CLOSED" },
  });

  const summary: SummaryProp = {
    open: open,
    inProgress: InProgress,
    closed: closed,
  };

  return (
    <Grid columns={{ initial: "1", sm: "2" }} gap={"4"}>
      <LatestIssues />
      <Flex direction={"column"} gap={"4"}>
        <IssueSummary summary={summary} />
        <IssueGraphs summary={summary} />
      </Flex>
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};
