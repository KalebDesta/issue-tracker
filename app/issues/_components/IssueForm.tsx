"use client";
import { ErrorMessage, Spinner } from "@/app/components";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue, Status } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import MarkdownEditor from "./MarkDownEditor";
import StatusSelect from "./StatusSelect";

type issueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<issueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    let response;
    if (issue) {
      response = await fetch("/api/issues/" + issue.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else {
      response = await fetch("/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Convert to JSON string
      });
    }
    setSubmitting(false);
    if (response.ok) {
      setError("");
      router.push("/issues");
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
        <TextField.Root
          size={"3"}
          defaultValue={issue?.title}
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

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

        <Controller
          control={control}
          name="description"
          defaultValue={issue?.description}
          render={({ field }) => {
            return (
              <MarkdownEditor
                value={field.value}
                onChange={field.onChange}
                placeholder="Issue Description"
              />
            );
          }}
        ></Controller>

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button size={"3"} type="submit" disabled={isSubmitting}>
          {issue ? "Update Issue" : "Create Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
