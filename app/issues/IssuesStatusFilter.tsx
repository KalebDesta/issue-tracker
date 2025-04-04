"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const statusMap: { label: string; value: Status | "none" }[] = [
  { label: "All", value: "none" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssuesStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || "none"}
      onValueChange={(status) => {
        const query = new URLSearchParams(searchParams.toString());
        if (status !== "none") {
          query.set("status", status);
        } else {
          query.delete("status");
        }
        router.replace(`/issues?${query.toString()}`);
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
