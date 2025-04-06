import AuthOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import SolutionDetail from "../_components/SolutionDetail";

// Fetch function
const fetchIssue = cache((id: number) =>
  prisma.issue.findUnique({
    where: { id },
  })
);

// Use inline typing — no `Props` interface needed
const IssueDetailsPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(AuthOptions);
  const issue = await fetchIssue(parseInt(params.id));
  if (!issue) notFound();

  const solutions = await prisma.solution.findMany({
    where: { issueId: issue.id },
  });

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap={"2rem"}>
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box className="md:col-span-1">
        {session && (
          <Flex direction="column" gap="2">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        )}
      </Box>
      <Box className="md:col-span-4" mt={"-4"}>
        {solutions.map((solution) => (
          <SolutionDetail key={solution.id} solution={solution} issue={issue} />
        ))}
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;

// Also fix metadata function
export async function generateMetadata({ params }: { params: { id: string } }) {
  const issue = await fetchIssue(parseInt(params.id));

  return {
    title: `Issue Details - ${issue?.title}`,
    description: `Details of issue: ${issue?.id}`,
  };
}
