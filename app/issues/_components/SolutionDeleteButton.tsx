"use client";
import { Spinner } from "@/app/components";
import { Button, AlertDialog, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteSolutionAlert = ({
  issueId,
  solutionId,
  open,
  onOpenChange,
}: {
  issueId: number;
  solutionId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const deleteSolution = async () => {
    try {
      setDeleting(true);
      await fetch(`/api/solutions/${solutionId}`, {
        method: "DELETE",
      }).then(() => {
        setDeleting(false);
        onOpenChange(false);
        router.push(`/issues/${issueId}`);
        router.refresh();
      });
    } catch (error) {
      console.log(error);
      setError(true);
      setDeleting(false);
    }
  };

  return (
    <>
      <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
        <AlertDialog.Content>
          <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone. This will permanently delete the
            solution.
          </AlertDialog.Description>
          <Flex gap="2" align={"end"} mt={"4"}>
            <AlertDialog.Cancel>
              <Button variant="soft">Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                onClick={deleteSolution}
                disabled={isDeleting}
              >
                {isDeleting && <Spinner />} Yes, Delete Solution
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error} onOpenChange={setError}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error Occurred!</AlertDialog.Title>
          <AlertDialog.Description>
            There was an issue that prevented the solution from being deleted.
          </AlertDialog.Description>

          <Button variant="soft" onClick={() => setError(false)}>
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteSolutionAlert;
