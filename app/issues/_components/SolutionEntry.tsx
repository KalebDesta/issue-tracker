"use client";
import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import GenerateSolutionButton from "../[id]/GenerateSolutionButton";
import ProvideSolutionButton from "../[id]/ProvideSolutionButton";
import SolutionForm from "./SolutionForm";
import { Issue } from "@prisma/client";

const SolutionEntry = ({ issue }: { issue: Issue }) => {
  const [solutionForm, setSolutionForm] = useState(false);
  const toggleForm = () => {
    setSolutionForm((prev) => !prev); // ✅ Toggle form visibility
  };

  if (!solutionForm)
    return (
      <Flex gap="2" mt="3">
        <ProvideSolutionButton
          onClick={() => setSolutionForm(!solutionForm)}
        ></ProvideSolutionButton>
        <GenerateSolutionButton issue={issue}></GenerateSolutionButton>
      </Flex>
    );
  return (
    <div className="mt-5">
      <SolutionForm issue={issue} afterSubmit={toggleForm} />
    </div>
  );
};

export default SolutionEntry;
