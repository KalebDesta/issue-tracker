"use client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const IssuesSortingButton = () => {
  const [sorting, setSorting] = useState<"asc" | "desc">("asc");

  if (sorting === "asc")
    return (
      <ArrowUpIcon className="inline" onClick={() => setSorting("desc")} />
    );
  return <ArrowDownIcon className="inline" onClick={() => setSorting("asc")} />;
};

export default IssuesSortingButton;
