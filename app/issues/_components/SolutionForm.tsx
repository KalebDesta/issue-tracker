"use client";
import { solutionSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { ErrorMessage, Spinner } from "@/app/components";
import { Button, Callout } from "@radix-ui/themes";
import MarkdownEditor from "./MarkDownEditor";

type SolutionFormData = z.infer<typeof solutionSchema>;

const SolutionForm = ({
  issue,
  afterSubmit,
}: {
  issue: Issue;
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
    //add a case for editing the solution
    solutionResponse = await fetch(`/api/issues/${issue.id}/solutions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: data.description,
      }),
    });
    setSubmitting(false);
    if (solutionResponse.ok) {
      setError("");
      afterSubmit();
      //router.refresh();
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

        <Button size={"3"} type="submit" disabled={isSubmitting}>
          Submit Solution {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default SolutionForm;
