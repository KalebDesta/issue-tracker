import { Status } from "@prisma/client";
import { Flex, RadioCards } from "@radix-ui/themes";
import { FormEvent } from "react";

interface Props {
  value: Status;
  onChange: (value: Status) => void;
}

const StatusSelect = ({ value, onChange }: Props) => {
  return (
    <RadioCards.Root
      value={value}
      variant="surface"
      size={"1"}
      onValueChange={onChange}
    >
      <Flex align="center" gap="1">
        {statuses.map((status) => (
          <RadioCards.Item key={status} value={status}>
            {mapping[status].label}
          </RadioCards.Item>
        ))}
      </Flex>
    </RadioCards.Root>
  );
};

export default StatusSelect;

const statuses = Object.values(Status);
const mapping: Record<
  Status,
  { label: String; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};
