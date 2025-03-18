"use client";
import { Button, AlertDialog, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();

  const deleteIssue = async () => {
    try {
      await fetch(`/api/issues/${issueId}`, {
        method: "DELETE",
      }).then(() => {
        router.push("/issues");
        router.refresh();
      });
    } catch (error) {
      setError(true);
    }
  };
  const [error, setError] = useState(false);

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">Delete Issue</Button>
        </AlertDialog.Trigger>

        <AlertDialog.Content>
          <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone. This will permanently delete the
            issue.
          </AlertDialog.Description>
          <Flex gap="2" align={"end"} mt={"4"}>
            <AlertDialog.Cancel>
              <Button variant="soft">Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={deleteIssue}>
                Yes, Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error Occurred!</AlertDialog.Title>
          <AlertDialog.Description>
            There was an issue that prevented the issue from being deleted.
          </AlertDialog.Description>

          <Button variant="soft" onClick={() => setError(false)}>
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
