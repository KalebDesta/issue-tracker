"use client";
import { User, Solution, Issue } from "@prisma/client";
import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import SolutionDropDown from "./SolutionDropDown";
import SolutionForm from "./SolutionForm";
import { useState } from "react";

const SolutionDetailClient = ({
  user,
  solution,
  issue,
}: {
  user: User;
  solution: Solution;
  issue: Issue;
}) => {
  const [editing, setEditing] = useState(false);

  return (
    <Flex gap="3" align="start" width="100%">
      <Avatar size="3" src={user.image!} fallback="?" radius="full" mt="5" />
      <Box
        width="100%"
        className="prose max-w-full border border-gray-200 rounded-lg p-3"
        mt="4"
      >
        <Flex justify="between" align="center" mb="2">
          <Flex gap="4" align="center">
            <Text weight="medium" size="3">
              {user.name}
            </Text>
            <Text color="gray" weight="regular">
              {solution.createdAt.toDateString()}
            </Text>
          </Flex>

          <SolutionDropDown
            solutionId={solution.id}
            issueId={solution.issueId}
            handleEditing={() => {
              setEditing(true);
            }}
          />
        </Flex>

        <Box mt="-3" mb="-4">
          {!editing && <ReactMarkdown>{solution.description}</ReactMarkdown>}
        </Box>

        {editing && (
          <SolutionForm
            issue={issue}
            solution={solution}
            afterSubmit={() => setEditing(false)}
          />
        )}
      </Box>
    </Flex>
  );
};

export default SolutionDetailClient;
