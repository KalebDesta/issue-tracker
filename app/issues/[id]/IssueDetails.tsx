import { IssuesStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import GenerateSolutionButton from "./GenerateSolutionButton";
import ProvideSolutionButton from "./ProvideSolutionButton";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Card>
        <Heading>{issue.title}</Heading>
        <Flex gap={"4"} my={"2"}>
          <IssuesStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose max-w-full">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
        <Flex gap="2" mt="2">
          <ProvideSolutionButton></ProvideSolutionButton>
          <GenerateSolutionButton></GenerateSolutionButton>
        </Flex>
      </Card>
    </>
  );
};

export default IssueDetails;
