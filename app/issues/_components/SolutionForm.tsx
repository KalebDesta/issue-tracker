"use client";
import { solutionSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue, Status, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { ErrorMessage, Spinner } from "@/app/components";
import StatusSelect from "./StatusSelect";
import { Button, Callout } from "@radix-ui/themes";

type SolutionFormData = z.infer<typeof solutionSchema>;

const SolutionForm = ({ issue }: { issue: Issue }) => {
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
    const patchResponse = await fetch("/api/issues/" + issue.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: data.status }),
    });
    if (patchResponse.ok) {
      let solutionResponse;
      //add a case for editing the solution
      solutionResponse = await fetch(`/api/issues/${issue.id}/solutions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //   userId: user.id,
          description: data.description,
        }),
      });
      setSubmitting(false);
      if (solutionResponse.ok) {
        setError("");
        router.push(`issues/${issue.id}`);
        router.refresh();
      } else {
        setError("Failed to submit due to unexpected error");
      }
    } else {
      setSubmitting(false);
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
              <SimpleMDE
                placeholder="Solution Description..."
                value={field.value || ""}
                onChange={field.onChange}
              />
            );
          }}
        ></Controller>
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Controller
          name="status"
          control={control}
          defaultValue={issue?.status} // Provide a default value if necessary
          render={({ field }) => (
            <StatusSelect
              value={(field.value as Status) || "OPEN"}
              onChange={field.onChange}
            />
          )}
        />
        <ErrorMessage>{errors.status?.message}</ErrorMessage>

        <Button size={"3"} type="submit" disabled={isSubmitting}>
          Submit Solution {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default SolutionForm;
