"use client";
import { solutionSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue, Solution, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { ErrorMessage, Spinner } from "@/app/components";
import { Button, Callout, Flex } from "@radix-ui/themes";
import MarkdownEditor from "./MarkDownEditor";

type SolutionFormData = z.infer<typeof solutionSchema>;

const SolutionForm = ({
  issue,
  solution,
  afterSubmit,
}: {
  issue: Issue;
  solution?: Solution;
  afterSubmit: () => void;
}) => {
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<SolutionFormData>({ resolver: zodResolver(solutionSchema) });

  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);

    let solutionResponse;
    if (solution) {
      solutionResponse = await fetch("/api/solutions/" + solution.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else {
      solutionResponse = await fetch(`/api/issues/${issue.id}/solutions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: data.description,
        }),
      });
    }
    setSubmitting(false);
    if (solutionResponse.ok) {
      setError("");
      afterSubmit();
      router.replace(`/issues/${issue.id}`);
      router.refresh();
    } else {
      setError("Failed to submit due to unexpected error");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-3" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="space-y-3" onSubmit={onSubmit}>
        <Controller
          control={control}
          name="description"
          defaultValue={solution?.description}
          render={({ field }) => {
            return (
              <MarkdownEditor
                placeholder="Solution Description..."
                value={field.value || ""}
                onChange={field.onChange}
              />
            );
          }}
        ></Controller>
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Flex justify="end" gap="3" mt="4">
          <Button size="3" variant="soft" onClick={afterSubmit} type="button">
            Cancel
          </Button>
          <Button size="3" type="submit" disabled={isSubmitting}>
            Submit Solution {isSubmitting && <Spinner />}
          </Button>
        </Flex>
      </form>
    </div>
  );
};

export default SolutionForm;
