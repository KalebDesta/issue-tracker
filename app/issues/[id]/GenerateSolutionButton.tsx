"use client";
import { Spinner } from "@/app/components";
import { Issue } from "@prisma/client";
import { MagicWandIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const GenerateSolutionButton = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const generateSolution = (issue: Issue) => {
    setLoading(true);
    fetch(`/api/issues/${issue.id}/ai-assistant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        setLoading(false);
        router.refresh();
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
      });
  };
  return (
    <Button
      variant="soft"
      onClick={() => generateSolution(issue)}
      disabled={isLoading}
    >
      {!isLoading && <MagicWandIcon />}
      {isLoading && <Spinner />}
      Generate Solution
    </Button>
  );
};

export default GenerateSolutionButton;
