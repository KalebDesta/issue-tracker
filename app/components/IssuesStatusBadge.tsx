import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const mapping: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssuesStatusBadge = ({ status }: { status: Status }) => {
  return <Badge color={mapping[status].color}>{mapping[status].label}</Badge>;
};

export default IssuesStatusBadge;
