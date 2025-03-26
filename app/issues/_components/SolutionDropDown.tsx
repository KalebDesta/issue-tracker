"use client";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { useState } from "react";
import DeleteSolutionAlert from "./SolutionDeleteButton";

const SolutionDropDown = ({
  issueId,
  solutionId,
  handleEditing,
}: {
  issueId: number;
  solutionId: number;
  handleEditing: () => void;
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="ghost" size="1">
            <DotsVerticalIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content variant="solid">
          <DropdownMenu.Item
            onSelect={() => {
              handleEditing();
            }}
          >
            Edit Solution
          </DropdownMenu.Item>

          <DropdownMenu.Separator />

          <DropdownMenu.Item onSelect={() => setDialogOpen(true)} color="red">
            Delete Solution
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <DeleteSolutionAlert
        issueId={issueId}
        solutionId={solutionId}
        open={isDialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
};

export default SolutionDropDown;
