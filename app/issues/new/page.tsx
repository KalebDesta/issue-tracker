"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import SimpleMDE with SSR disabled
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface issueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, handleSubmit, control } = useForm<issueForm>();
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
        <Controller
          control={control}
          name="description"
          render={({ field }) => {
            return <SimpleMDE placeholder="Description" {...field} />;
          }}
        ></Controller>

        <Button type="submit">Create New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
