import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "@/app/components/Link";

export interface SummaryProp {
  open: number;
  inProgress: number;
  closed: number;
}

interface Props {
  summary: SummaryProp;
}

const IssueSummary = ({ summary }: Props) => {
  const containers: { label: string; count: number; status: Status }[] = [
    { label: "Open Issues", count: summary.open, status: "OPEN" },
    {
      label: "In-Progress Issues",
      count: summary.inProgress,
      status: "IN_PROGRESS",
    },
    { label: "Closed Issues", count: summary.closed, status: "CLOSED" },
  ];
  return (
    <Flex gap="3">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex gap="3" align="center" direction="column">
            <Link href={`issues?status=${container.status}`}>
              {container.label}
            </Link>
            <Text size="6" className="font-bold">
              {container.count}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
