import { Box, Card, Flex } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const IssueDetailsLoading = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex gap={"4"} my={"2"}>
        <Skeleton width="6rem" />
        <Skeleton width="10rem" />
      </Flex>
      <Card>
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default IssueDetailsLoading;
