"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const statusMap: { label: String; value: Status | "none" }[] = [
  { label: "All", value: "none" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssuesStatusFilter = () => {
  const router = useRouter();

  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status !== "none" ? `?status=${status}` : "";
        router.replace("/issues" + query);
      }}
    >
      <Select.Trigger placeholder="Filter By Status..."></Select.Trigger>
      <Select.Content>
        {statusMap.map((status) => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssuesStatusFilter;
