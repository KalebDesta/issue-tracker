import { IssuesStatusBadge } from "@/app/components";
import { prisma } from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(await params.id) },
  });

  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"2rem"}>
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap={"4"} my={"2"}>
          <IssuesStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
