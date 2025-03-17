"use client";
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import React from "react";
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

  return (
    <form
      className="space-y-3 max-w-xl"
      onSubmit={handleSubmit(async (data) => {
        console.log(data);
        const response = await fetch("/api/issues", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // Convert to JSON string
        });
        if (response.ok) {
          router.push("/issues");
        } else {
          console.error("Failed to submit issue", await response.text());
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
  );
};

export default NewIssuePage;
