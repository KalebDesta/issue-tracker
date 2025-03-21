import { z } from "zod";

export const issueSchema = z.object({
  title: z
    .string()
    .min(1, "title is a required field")
    .max(255, "exceeded character limit"),
  description: z.string().min(1, "must provide a description of the issue"),
});

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, "title is a required field")
    .max(255, "exceeded character limit")
    .optional(),
  description: z
    .string()
    .min(1, "must provide a description of the issue")
    .max(65535, "exceeded character limit")
    .optional(),
  assignedUserId: z
    .string()
    .min(1, "user id is required")
    .max(255, "exceeds limit for the user id")
    .optional()
    .nullable(),
});
