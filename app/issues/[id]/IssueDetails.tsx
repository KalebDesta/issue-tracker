import { IssuesStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import SolutionEntry from "../_components/SolutionEntry";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap={"4"} my={"2"}>
        <IssuesStatusBadge status={issue.status} />
        <Text color="gray">{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
      <SolutionEntry issue={issue} />
    </>
  );
};

export default IssueDetails;
