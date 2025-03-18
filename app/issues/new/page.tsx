"use client";
import { ErrorMessage, Spinner } from "@/app/components";
import { createIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

// Dynamically import SimpleMDE with SSR disabled
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type issueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<issueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    const response = await fetch("/api/issues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Convert to JSON string
    });
    setSubmitting(false);
    if (response.ok) {
      setError("");
      router.push("/issues");
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
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          control={control}
          name="description"
          defaultValue=""
          render={({ field }) => {
            return (
              <SimpleMDE
                placeholder="Description"
                value={field.value || ""}
                onChange={field.onChange}
              />
            );
          }}
        ></Controller>

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button type="submit" disabled={isSubmitting}>
          Create New Issue
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
