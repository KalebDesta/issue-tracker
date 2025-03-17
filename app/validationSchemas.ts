import { z } from "zod";

export const createIssueSchema = z.object({
  title: z
    .string()
    .min(1, "title is a required field")
    .max(255, "exceeded character limit"),
  description: z.string().min(1, "must provide a description of the issue"),
});
