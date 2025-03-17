"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";

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

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-3" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          const response = await fetch("/api/issues", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // Convert to JSON string
          });
          if (response.ok) {
            setError("");
            router.push("/issues");
          } else {
            setError("Failed to submit issue");
          }
        })}
      >
        <TextField.Root
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        {errors.title && (
          <Text as="p" color="red">
            {errors.title.message}
          </Text>
        )}

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

        {errors.description && (
          <Text as="p" color="red">
            {errors.description.message}
          </Text>
        )}

        <Button type="submit">Create New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
