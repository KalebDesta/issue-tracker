import { prisma } from "@/prisma/client";
import IssueSummary, { SummaryProp } from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueGraphs from "./IssueGraphs";
import { Flex, Grid } from "@radix-ui/themes";

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
    <Grid columns={{ initial: "1", md: "2" }} gap={"4"}>
      <Flex direction={"column"} gap={"4"}>
        <IssueSummary summary={summary} />
        <IssueGraphs summary={summary} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
