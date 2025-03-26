import { prisma } from "@/prisma/client";
import { Solution } from "@prisma/client";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Text,
} from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import SolutionDropDown from "./SolutionDropDown";

const SolutionDetail = async ({ solution }: { solution: Solution }) => {
  const user = await prisma.user.findUnique({
    where: { id: solution.providerUserId },
  });
  if (!user) return null;
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
            <Text weight="medium" size="4">
              {user.name}
            </Text>
            <Text color="gray" weight="regular">
              {solution.createdAt.toDateString()}
            </Text>
          </Flex>

          <SolutionDropDown
            solutionId={solution.id}
            issueId={solution.issueId}
          />
        </Flex>
        <ReactMarkdown>{solution.description}</ReactMarkdown>
      </Box>
    </Flex>
  );
};

export default SolutionDetail;
