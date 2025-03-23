import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageNumber = Math.ceil(itemCount / pageSize);
  if (pageNumber <= 1) return null;
  return (
    <Flex align="center" gap="3">
      <Button color="gray" variant="ghost" disabled={currentPage === 1}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button color="gray" variant="ghost" disabled={currentPage === 1}>
        <ChevronLeftIcon />
      </Button>
      <Text size="2">
        Page {currentPage} of {pageNumber}
      </Text>
      <Button
        color="gray"
        variant="ghost"
        disabled={currentPage === pageNumber}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="ghost"
        disabled={currentPage === pageNumber}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
