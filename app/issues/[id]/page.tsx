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

interface Props {
  params: { id: string };
}

const fetchUser = cache((id: number) =>
  prisma.issue.findUnique({
    where: { id: id },
  })
);

const IssueDetailsPage = async ({ params }: Props) => {
  const validParams = await params;
  const session = await getServerSession(AuthOptions);

  const issue = await fetchUser(parseInt(validParams.id));

  if (!issue) notFound();
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
    </Grid>
  );
};

export default IssueDetailsPage;

export async function generateMetadata({ params }: Props) {
  const validParams = await params;
  const issue = await fetchUser(parseInt(validParams.id));

  return {
    title: `Issue Details - ${issue?.title}`,
    description: `Details of issue: ${issue?.id}`,
  };
}
